/* ============================================================
   IISE MATCH — Student Profiles
   Pontificia Universidad Javeriana · Capítulo IISE 771
   12 Profiles: D, T, E, L, O, S, X, P, F, H, G, C
   ============================================================ */

const PROFILES = {

  /* ── ORIGINAL 8 PROFILES ───────────── */

  D: {
    code: 'D',
    name: 'Analista de Datos',
    emoji: '📊',
    color: '#4cc9f0',
    description: 'Conviertes datos en decisiones. Tienes una mente analítica que detecta patrones, tendencias y oportunidades ocultas en los números.',
    keywords: ['datos', 'análisis', 'Power BI', 'Excel', 'Python', 'visualización'],
    actividades_tipo: ['Curso', 'Taller'],
    tags_afinidad: ['datos', 'analitica', 'power_bi', 'excel', 'python', 'sql', 'visualizacion']
  },

  T: {
    code: 'T',
    name: 'Innovador Digital',
    emoji: '🤖',
    color: '#7b2fbe',
    description: 'La tecnología es tu terreno. Exploras cómo la IA, la automatización y lo digital pueden transformar industrias completas.',
    keywords: ['IA', 'automatización', 'tecnología', 'Python', 'Machine Learning', 'innovación'],
    actividades_tipo: ['Taller', 'Charla'],
    tags_afinidad: ['ia', 'automatizacion', 'tecnologia', 'python', 'transformacion_digital']
  },

  E: {
    code: 'E',
    name: 'Estratega Empresarial',
    emoji: '📈',
    color: '#f5a623',
    description: 'Piensas en grande. Te apasiona entender los negocios de manera holística y tomar decisiones con impacto estratégico.',
    keywords: ['estrategia', 'negocios', 'toma de decisiones', 'análisis', 'gestión'],
    actividades_tipo: ['Curso', 'Charla'],
    tags_afinidad: ['estrategia', 'negocios', 'gestion', 'toma_de_decisiones']
  },

  L: {
    code: 'L',
    name: 'Líder y Comunicador',
    emoji: '🤝',
    color: '#e94560',
    description: 'Tu fortaleza está en las personas. Inspiras, persuades y construyes puentes entre equipos y stakeholders.',
    keywords: ['liderazgo', 'negociación', 'comunicación', 'equipos', 'influencia'],
    actividades_tipo: ['Taller', 'Evento'],
    tags_afinidad: ['liderazgo', 'negociacion', 'comunicacion', 'equipos', 'habilidades_profesionales']
  },

  O: {
    code: 'O',
    name: 'Optimizador de Procesos',
    emoji: '⚙️',
    color: '#00d9a3',
    description: 'Encuentras el desperdicio que otros no ven. Tu mentalidad está orientada a hacer los sistemas más eficientes y efectivos.',
    keywords: ['Lean', 'optimización', 'procesos', 'eficiencia', 'mejora continua', 'simulación'],
    actividades_tipo: ['Taller', 'Curso'],
    tags_afinidad: ['lean', 'optimizacion', 'procesos', 'eficiencia', 'mejora_continua']
  },

  S: {
    code: 'S',
    name: 'Supply Chain Strategist',
    emoji: '🚚',
    color: '#06d6a0',
    description: 'Entiendes que detrás de cada producto hay una cadena compleja. Te fascina optimizar el flujo desde el origen hasta el cliente.',
    keywords: ['Supply Chain', 'logística', 'inventarios', 'compras', 'distribución'],
    actividades_tipo: ['Curso', 'Visita'],
    tags_afinidad: ['supply_chain', 'logistica', 'inventarios', 'compras', 'distribucion']
  },

  X: {
    code: 'X',
    name: 'Explorador Empresarial',
    emoji: '🏢',
    color: '#fb8500',
    description: 'Aprendes viviendo experiencias reales. Te energiza conocer empresas, conectar con profesionales y descubrir cómo funciona el mundo corporativo.',
    keywords: ['networking', 'visitas', 'experiencias', 'industria', 'conexiones'],
    actividades_tipo: ['Visita', 'Evento'],
    tags_afinidad: ['visita', 'networking', 'experiencia', 'empresas', 'profesionales']
  },

  P: {
    code: 'P',
    name: 'Constructor de Proyectos',
    emoji: '🚀',
    color: '#ff6b6b',
    description: 'Eres un hacedor. Te impulsa tomar una idea, convertirla en un proyecto y llevarlo a la realidad con creatividad e iniciativa.',
    keywords: ['proyectos', 'emprendimiento', 'innovación', 'gestión', 'acción'],
    actividades_tipo: ['Taller', 'Competencia'],
    tags_afinidad: ['proyectos', 'emprendimiento', 'innovacion', 'gestion', 'reto']
  },

  /* ── 4 NEW PROFILES ─────────────────── */

  F: {
    code: 'F',
    name: 'Analista Financiero',
    emoji: '💰',
    color: '#2ec4b6',
    description: 'Los números de negocio son tu lenguaje. Evalúas inversiones, analizas rentabilidad y entiendes cómo el dinero fluye y genera valor en las organizaciones.',
    keywords: ['finanzas', 'inversiones', 'rentabilidad', 'costos', 'presupuesto', 'ROI', 'valoración'],
    actividades_tipo: ['Curso', 'Taller'],
    tags_afinidad: ['finanzas', 'rentabilidad', 'costos', 'presupuesto', 'valoracion', 'roi']
  },

  H: {
    code: 'H',
    name: 'Conector de Talento & Cultura',
    emoji: '🧠',
    color: '#e76f51',
    description: 'Entiendes que las organizaciones son, ante todo, personas. Te apasionan la cultura organizacional, el desarrollo del talento y el bienestar de los equipos.',
    keywords: ['talento', 'cultura', 'recursos humanos', 'bienestar', 'employer branding', 'psicología organizacional'],
    actividades_tipo: ['Taller', 'Charla'],
    tags_afinidad: ['talento', 'cultura_organizacional', 'bienestar', 'marca_empleadora', 'soft_skills']
  },

  G: {
    code: 'G',
    name: 'Líder de Impacto Social',
    emoji: '🌱',
    color: '#52b788',
    description: 'Crees que los negocios deben tener propósito. Te motiva crear valor sostenible, generar impacto positivo en comunidades y alinear la estrategia empresarial con el bienestar del planeta.',
    keywords: ['sostenibilidad', 'impacto social', 'ESG', 'propósito', 'responsabilidad empresarial', 'circularidad'],
    actividades_tipo: ['Charla', 'Evento'],
    tags_afinidad: ['sostenibilidad', 'impacto_social', 'esg', 'responsabilidad', 'proposito']
  },

  C: {
    code: 'C',
    name: 'Consultor de Negocios',
    emoji: '🔎',
    color: '#9b5de5',
    description: 'Eres un solucionador de problemas integral. Combinas analítica, estrategia y comunicación para diagnosticar situaciones complejas y proponer soluciones que transforman empresas.',
    keywords: ['consultoría', 'diagnóstico', 'solución de problemas', 'análisis empresarial', 'casos', 'recomendaciones'],
    actividades_tipo: ['Taller', 'Competencia'],
    tags_afinidad: ['consultoria', 'casos_empresariales', 'diagnostico', 'estrategia', 'analitica']
  }

};

/* ── COMBINED PROFILES ───────────────────────────────────────────────── */
const COMBINED_PROFILES = [

  /* Original combinations */
  { profiles: ['D','T'], name: 'Analista Digital',             description: 'Combinas el poder de los datos con el pensamiento tecnológico para crear soluciones inteligentes.' },
  { profiles: ['D','E'], name: 'Analista Estratégico',         description: 'Usas datos para respaldar decisiones de alto impacto empresarial.' },
  { profiles: ['D','S'], name: 'Data Strategist en Supply Chain', description: 'Llevas la analítica al corazón de la cadena de suministro.' },
  { profiles: ['T','P'], name: 'Innovador Emprendedor',        description: 'Usas la tecnología como palanca para construir cosas nuevas desde cero.' },
  { profiles: ['E','L'], name: 'Líder Estratégico',            description: 'Combinas visión de negocio con la capacidad de inspirar y movilizar personas.' },
  { profiles: ['L','P'], name: 'Líder de Proyectos',           description: 'Tienes la energía para liderar equipos y ejecutar proyectos con éxito.' },
  { profiles: ['O','S'], name: 'Experto en Operaciones',       description: 'Optimizas cada eslabón de la cadena de valor con precisión quirúrgica.' },
  { profiles: ['S','L'], name: 'Negociador de Supply Chain',   description: 'Combinas gestión de cadena de suministro con habilidades de negociación de alto nivel.' },
  { profiles: ['X','L'], name: 'Conector Empresarial',         description: 'Construyes relaciones genuinas mientras exploras el mundo corporativo.' },
  { profiles: ['T','O'], name: 'Automatizador de Procesos',    description: 'Usas tecnología para hacer los procesos más eficientes y libres de desperdicios.' },
  { profiles: ['D','O'], name: 'Ingeniero de Datos y Procesos', description: 'Analizas datos para optimizar sistemas complejos y tomar decisiones basadas en evidencia.' },
  { profiles: ['E','P'], name: 'Emprendedor Estratégico',      description: 'Tienes visión estratégica para llevar proyectos de innovación al éxito.' },

  /* New combinations with F, H, G, C */
  { profiles: ['F','E'], name: 'CFO Estratégico',              description: 'Combinas análisis financiero riguroso con visión estratégica de negocios.' },
  { profiles: ['F','D'], name: 'Analista de Finanzas y Datos', description: 'Usas herramientas de datos para modelar y proyectar el desempeño financiero de las organizaciones.' },
  { profiles: ['F','C'], name: 'Consultor Financiero',         description: 'Diagnosticas problemas empresariales desde la perspectiva financiera y propones soluciones concretas.' },
  { profiles: ['H','L'], name: 'Líder de Personas',            description: 'Combinas habilidades de liderazgo con una profunda comprensión de la psicología organizacional.' },
  { profiles: ['H','G'], name: 'Agente de Cambio Cultural',    description: 'Transformas culturas organizacionales hacia el bienestar, la inclusión y el propósito.' },
  { profiles: ['H','X'], name: 'Embajador de Marca Empleadora', description: 'Conectas el talento humano con las oportunidades del mercado laboral.' },
  { profiles: ['G','E'], name: 'Estratega de Sostenibilidad',  description: 'Diseñas estrategias empresariales con triple impacto: económico, social y ambiental.' },
  { profiles: ['G','P'], name: 'Emprendedor de Impacto',       description: 'Construyes proyectos que generan valor para la sociedad y son económicamente viables.' },
  { profiles: ['C','E'], name: 'Consultor Estratégico',        description: 'Eres un diagnosta de negocios que combina pensamiento sistémico con visión estratégica.' },
  { profiles: ['C','D'], name: 'Consultor Data-Driven',        description: 'Tus recomendaciones de consultoría se basan en datos sólidos y análisis riguroso.' },
  { profiles: ['C','L'], name: 'Consultor y Facilitador',      description: 'Combinas el diagnóstico empresarial con la habilidad de comunicar y persuadir a equipos directivos.' }

];
