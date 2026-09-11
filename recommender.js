class Recommender {
  constructor(scores, answers) {
    this.scores = scores;
    this.answers = answers;
  }

  calculateCompatibility(activity) {
    let compatibility = 0;
    
    // 1. 60% Profile Match
    let profileSum = 0;
    activity.perfiles_recomendados.forEach(p => {
      profileSum += (this.scores.percentages[p] || 0);
    });
    let avgProfileScore = activity.perfiles_recomendados.length ? (profileSum / activity.perfiles_recomendados.length) : 0;
    compatibility += (avgProfileScore * 0.6);

    // 2. 25% Tag Match
    let tagOverlap = activity.tags.filter(t => this.scores.topTags.includes(t)).length;
    let maxExpectedTags = 2; // Expect at least 2 tags to match for max score
    compatibility += (Math.min(tagOverlap / maxExpectedTags, 1) * 25);

    // 3. 15% Level Match
    if (this.scores.level === 'básico' && activity.nivel.toLowerCase().includes('básico')) compatibility += 15;
    else if (this.scores.level === 'intermedio-avanzado' && activity.nivel.toLowerCase().includes('intermedio')) compatibility += 15;
    else if (this.scores.level === 'básico-intermedio' && activity.nivel.toLowerCase().includes('intermedio')) compatibility += 15;
    else if (this.scores.level === 'avanzado' && activity.nivel.toLowerCase().includes('avanzado')) compatibility += 15;
    else compatibility += 5; // Partial match

    // 4. +15% Bonus for preferred format
    let preferredFormatQ9 = this.answers['q9']; // Get preferred activity format
    let q9Option = QUESTIONS.find(q => q.id === 'q9').options.find(o => o.id === preferredFormatQ9);
    let isPreferred = q9Option && q9Option.tags.some(t => {
      let actType = (activity.tipo || '').toLowerCase();
      return actType.includes(t) || (t === 'curso' && actType.includes('capacita')) || (t === 'taller' && actType.includes('capacita'));
    });
    if (isPreferred) compatibility += 15;

    // 5. +10% Bonus for objectives match
    let objAnswers = this.answers['q4'] || [];
    let q4Options = QUESTIONS.find(q => q.id === 'q4').options;
    let objTags = [];
    objAnswers.forEach(optId => {
      let opt = q4Options.find(o => o.id === optId);
      if (opt && opt.tags) objTags.push(...opt.tags);
    });
    if (activity.tags.some(t => objTags.includes(t))) {
      compatibility += 10;
    }

    return Math.min(Math.round(compatibility), 100);
  }

  getRecommendations() {
    let recs = ACTIVITIES.map(act => {
      return {
        ...act,
        compatibility: this.calculateCompatibility(act)
      };
    });

    recs.sort((a,b) => b.compatibility - a.compatibility);
    
    // Get top 5 recommendations
    let topRecommendations = recs.slice(0, 5);
    
    // Build Route
    let route = this.buildRoute(recs);

    return { topRecommendations, route };
  }

  buildRoute(sortedRecs) {
    let route = [];
    
    // 1. Top Curso/Taller/Capacitación
    let step1 = sortedRecs.find(r => r.tipo === 'Curso' || r.tipo === 'Taller' || r.tipo === 'Capacitación' || r.tipo === 'Capacitacion');
    if (step1) route.push({ ...step1, stepTitle: "Paso 1: Desarrolla Habilidades" });

    // 2. Top Visita o Caso Práctico
    let step2 = sortedRecs.find(r => (r.tipo === 'Visita' || r.categoria === 'Experiencias Empresariales' || r.tipo === 'Capacitación') && r.id !== (step1?.id));
    if (step2) route.push({ ...step2, stepTitle: "Paso 2: Aplica y Conoce" });

    // 3. Si tiene alto interés en networking (X > 60%), agregar evento
    if ((this.scores.percentages['X'] || 0) > 60) {
      let step3 = sortedRecs.find(r => r.tipo === 'Evento' || r.tipo === 'Competencia');
      if (step3 && !route.some(rt => rt.id === step3.id)) {
        route.push({ ...step3, stepTitle: "Paso 3: Conecta y Destaca" });
      }
    }

    return route;
  }
}

window.Recommender = Recommender;
