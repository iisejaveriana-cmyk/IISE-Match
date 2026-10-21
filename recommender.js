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

    // 4. +15% Bonus for preferred format (from q11: the experience that adds most value)
    const FORMAT_BY_Q11 = {
      q11_1: ['taller', 'capacita'],
      q11_2: ['charla', 'taller'],
      q11_3: ['visita'],
      q11_4: ['curso', 'capacita'],
      q11_5: ['curso', 'taller', 'capacita'],
      q11_6: ['evento'],
      q11_7: ['taller', 'curso'],
      q11_8: ['charla']
    };
    let preferredFormats = FORMAT_BY_Q11[this.answers['q11']] || [];
    let actType = (activity.tipo || '').toLowerCase();
    if (preferredFormats.some(f => actType.includes(f))) compatibility += 15;

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

    // 6. Modality preference (q16): bonus if it fits, penalty if it clashes
    let modalityAnswer = this.answers['q16'];
    let actMod = (activity.modalidad || '').toLowerCase();
    if (modalityAnswer === 'q16_1' || modalityAnswer === 'q16_2') {
      let preferred = modalityAnswer === 'q16_1' ? 'presencial' : 'virtual';
      if (actMod.includes(preferred) || actMod.includes('híbrida')) compatibility += 5;
      else compatibility -= 10;
    } else if (modalityAnswer === 'q16_3' && actMod.includes('híbrida')) {
      compatibility += 5;
    }

    return Math.max(Math.min(Math.round(compatibility), 100), 0);
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
