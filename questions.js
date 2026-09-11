const QUESTIONS = [
  {
    id: 'q1',
    module: 'A',
    type: 'dropdown',
    required: true,
    question: '¿Qué carrera estudias?',
    options: [
      { id: 'q1_1',  text: 'Ingeniería Industrial',              scores: { D:0, T:0, E:1, L:0, O:2, S:2, X:0, P:0, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q1_2',  text: 'Ingeniería de Sistemas y Computación', scores: { D:2, T:3, E:0, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q1_3',  text: 'Ingeniería Civil',                   scores: { D:0, T:0, E:0, L:0, O:2, S:0, X:0, P:1, F:0, H:0, G:1, C:0 }, tags: [] },
      { id: 'q1_4',  text: 'Ingeniería Electrónica',             scores: { D:1, T:3, E:0, L:0, O:1, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q1_5',  text: 'Ingeniería Biomédica',               scores: { D:1, T:2, E:0, L:0, O:1, S:0, X:0, P:1, F:0, H:0, G:2, C:0 }, tags: [] },
      { id: 'q1_6',  text: 'Ingeniería Ambiental',               scores: { D:0, T:0, E:0, L:0, O:1, S:1, X:0, P:0, F:0, H:0, G:3, C:0 }, tags: [] },
      { id: 'q1_7',  text: 'Ingeniería Química',                 scores: { D:0, T:1, E:0, L:0, O:2, S:1, X:0, P:0, F:0, H:0, G:1, C:0 }, tags: [] },
      { id: 'q1_8',  text: 'Administración de Empresas',         scores: { D:0, T:0, E:3, L:1, O:0, S:0, X:1, P:1, F:1, H:1, G:0, C:2 }, tags: [] },
      { id: 'q1_9',  text: 'Economía',                           scores: { D:2, T:0, E:2, L:0, O:0, S:0, X:0, P:0, F:3, H:0, G:0, C:1 }, tags: [] },
      { id: 'q1_10', text: 'Finanzas y Comercio Internacional',  scores: { D:1, T:0, E:2, L:0, O:0, S:2, X:1, P:0, F:3, H:0, G:0, C:1 }, tags: [] },
      { id: 'q1_11', text: 'Contaduría Pública',                 scores: { D:2, T:0, E:1, L:0, O:1, S:0, X:0, P:0, F:3, H:0, G:0, C:0 }, tags: [] },
      { id: 'q1_12', text: 'Comunicación Social',                scores: { D:0, T:1, E:0, L:3, O:0, S:0, X:2, P:1, F:0, H:2, G:1, C:0 }, tags: [] },
      { id: 'q1_13', text: 'Diseño Industrial',                  scores: { D:0, T:1, E:0, L:0, O:1, S:0, X:0, P:3, F:0, H:0, G:1, C:0 }, tags: [] },
      { id: 'q1_14', text: 'Diseño Gráfico',                     scores: { D:0, T:2, E:0, L:0, O:0, S:0, X:0, P:2, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q1_15', text: 'Derecho',                            scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:0, F:0, H:1, G:2, C:1 }, tags: [] },
      { id: 'q1_16', text: 'Psicología',                         scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:1, P:0, F:0, H:3, G:2, C:0 }, tags: [] },
      { id: 'q1_17', text: 'Medicina',                           scores: { D:1, T:1, E:0, L:1, O:1, S:0, X:0, P:0, F:0, H:1, G:3, C:0 }, tags: [] },
      { id: 'q1_18', text: 'Enfermería',                         scores: { D:0, T:0, E:0, L:1, O:1, S:0, X:0, P:0, F:0, H:2, G:3, C:0 }, tags: [] },
      { id: 'q1_19', text: 'Arquitectura',                       scores: { D:0, T:1, E:0, L:0, O:1, S:0, X:0, P:2, F:0, H:0, G:1, C:0 }, tags: [] },
      { id: 'q1_20', text: 'Microbiología',                      scores: { D:1, T:1, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:3, C:0 }, tags: [] },
      { id: 'q1_21', text: 'Biología',                           scores: { D:1, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:3, C:0 }, tags: [] },
      { id: 'q1_22', text: 'Química',                            scores: { D:1, T:1, E:0, L:0, O:1, S:0, X:0, P:0, F:0, H:0, G:2, C:0 }, tags: [] },
      { id: 'q1_23', text: 'Matemáticas',                        scores: { D:3, T:1, E:0, L:0, O:1, S:0, X:0, P:0, F:1, H:0, G:0, C:0 }, tags: [] },
      { id: 'q1_24', text: 'Filosofía',                          scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:0, P:0, F:0, H:1, G:2, C:1 }, tags: [] },
      { id: 'q1_25', text: 'Teología',                           scores: { D:0, T:0, E:0, L:1, O:0, S:0, X:0, P:0, F:0, H:1, G:2, C:0 }, tags: [] },
      { id: 'q1_26', text: 'Otra carrera',                       scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] }
    ]
  },
  {
    id: 'q2',
    module: 'A',
    type: 'select',
    required: true,
    question: '¿En qué semestre estás?',
    options: [
      { id: 'q2_1', text: '1-2',           scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q2_2', text: '3-4',           scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q2_3', text: '5-6',           scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q2_4', text: '7-8',           scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q2_5', text: '9 en adelante', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] }
    ]
  },
  {
    id: 'q3',
    module: 'A',
    type: 'select',
    required: true,
    question: '¿Cuál es tu experiencia con IISE?',
    options: [
      { id: 'q3_1', text: 'Nunca he participado',                  scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q3_2', text: 'Sí, participé una vez',                 scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q3_3', text: 'Sí, he participado varias veces',       scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q3_4', text: 'Soy miembro activo del capítulo',       scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: [] }
    ]
  },
  {
    id: 'q4',
    module: 'A',
    type: 'multiselect',
    maxSelections: 3,
    required: true,
    question: '¿Cuál es tu objetivo principal al participar en actividades extracurriculares?',
    subtitle: 'Elige hasta 3 opciones',
    options: [
      { id: 'q4_1', text: 'Aprender una herramienta para mi hoja de vida',         scores: { D:3, T:2, E:1, L:0, O:1, S:0, X:0, P:1, F:1, H:0, G:0, C:0 }, tags: ["herramienta","hoja_de_vida"] },
      { id: 'q4_2', text: 'Conocer empresas por dentro',                           scores: { D:0, T:1, E:1, L:0, O:1, S:2, X:3, P:0, F:0, H:0, G:0, C:1 }, tags: ["visita","empresa"] },
      { id: 'q4_3', text: 'Conectar con profesionales del sector',                 scores: { D:0, T:0, E:1, L:2, O:0, S:1, X:3, P:0, F:0, H:1, G:0, C:1 }, tags: ["networking"] },
      { id: 'q4_4', text: 'Desarrollar habilidades de liderazgo y comunicación',   scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:0, P:1, F:0, H:2, G:0, C:0 }, tags: ["liderazgo","comunicacion"] },
      { id: 'q4_5', text: 'Aprender sobre tecnología e innovación',                scores: { D:1, T:3, E:1, L:0, O:1, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: ["tecnologia","ia"] },
      { id: 'q4_6', text: 'Complementar lo que veo en mis clases',                 scores: { D:1, T:1, E:1, L:1, O:2, S:2, X:0, P:1, F:1, H:1, G:1, C:1 }, tags: ["academico"] },
      { id: 'q4_7', text: 'Resolver problemas reales de empresas',                 scores: { D:2, T:1, E:2, L:1, O:2, S:1, X:1, P:2, F:0, H:0, G:0, C:3 }, tags: ["practica","casos"] },
      { id: 'q4_8', text: 'Explorar en qué área profesional me gustaría trabajar', scores: { D:1, T:1, E:2, L:1, O:1, S:1, X:2, P:1, F:1, H:1, G:1, C:1 }, tags: ["orientacion"] },
      { id: 'q4_9', text: 'Prepararme para prácticas o primer empleo',             scores: { D:1, T:1, E:1, L:1, O:1, S:1, X:2, P:1, F:1, H:1, G:0, C:1 }, tags: ["practicas"] }
    ]
  },
  {
    id: 'q5',
    module: 'B',
    type: 'multiselect',
    maxSelections: 4,
    required: true,
    question: '¿Cuáles de estas áreas te interesan más?',
    subtitle: 'Elige hasta 4 opciones',
    options: [
      { id: 'q5_1', text: 'Análisis de datos y visualización',                          scores: { D:3, T:1, E:1, L:0, O:1, S:0, X:0, P:0, F:1, H:0, G:0, C:1 }, tags: ["datos","analitica"] },
      { id: 'q5_2', text: 'Inteligencia artificial y automatización',                   scores: { D:1, T:3, E:1, L:0, O:1, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: ["ia","automatizacion"] },
      { id: 'q5_3', text: 'Logística y cadena de suministro',                          scores: { D:0, T:0, E:1, L:0, O:2, S:3, X:1, P:0, F:0, H:0, G:0, C:0 }, tags: ["logistica","supply_chain"] },
      { id: 'q5_4', text: 'Liderazgo y trabajo en equipo',                              scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:2, F:0, H:2, G:0, C:0 }, tags: ["liderazgo","equipos"] },
      { id: 'q5_5', text: 'Estrategia y toma de decisiones empresariales',              scores: { D:1, T:0, E:3, L:1, O:1, S:1, X:0, P:1, F:1, H:0, G:0, C:2 }, tags: ["estrategia","negocios"] },
      { id: 'q5_6', text: 'Optimización de procesos y productividad',                   scores: { D:1, T:1, E:1, L:0, O:3, S:2, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: ["lean","optimizacion"] },
      { id: 'q5_7', text: 'Emprendimiento e innovación',                                scores: { D:0, T:2, E:1, L:1, O:0, S:0, X:0, P:3, F:0, H:0, G:1, C:1 }, tags: ["emprendimiento","innovacion"] },
      { id: 'q5_8', text: 'Comunicación, negociación y habilidades profesionales',      scores: { D:0, T:0, E:1, L:3, O:0, S:1, X:1, P:0, F:0, H:2, G:0, C:1 }, tags: ["negociacion","comunicacion"] },
      { id: 'q5_9', text: 'Conocer empresas y sectores industriales',                   scores: { D:0, T:0, E:1, L:0, O:1, S:2, X:3, P:0, F:0, H:0, G:0, C:0 }, tags: ["empresas","visitas"] },
      { id: 'q5_10', text: 'Finanzas, costos y análisis de rentabilidad',               scores: { D:1, T:0, E:2, L:0, O:0, S:0, X:0, P:0, F:3, H:0, G:0, C:1 }, tags: ["finanzas","rentabilidad"] },
      { id: 'q5_11', text: 'Talento humano, cultura organizacional y bienestar',        scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:1, P:0, F:0, H:3, G:1, C:0 }, tags: ["talento","cultura_organizacional"] },
      { id: 'q5_12', text: 'Sostenibilidad, impacto social y responsabilidad empresarial', scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:1, P:1, F:0, H:1, G:3, C:0 }, tags: ["sostenibilidad","impacto_social"] }
    ]
  },
  {
    id: 'q6',
    module: 'B',
    type: 'multiselect',
    maxSelections: null,
    required: true,
    question: '¿Qué herramientas te gustaría aprender o perfeccionar?',
    subtitle: 'Elige todas las que quieras',
    options: [
      { id: 'q6_1', text: 'Excel básico e intermedio',                               scores: { D:2, T:0, E:1, L:0, O:1, S:1, X:0, P:0, F:2, H:0, G:0, C:1 }, tags: ["excel","datos"] },
      { id: 'q6_2', text: 'Excel avanzado (tablas dinámicas, macros)',               scores: { D:3, T:1, E:2, L:0, O:1, S:1, X:0, P:0, F:3, H:0, G:0, C:1 }, tags: ["excel_avanzado","datos"] },
      { id: 'q6_3', text: 'Power BI o Tableau (visualización)',                      scores: { D:3, T:1, E:2, L:0, O:1, S:1, X:0, P:0, F:2, H:0, G:0, C:1 }, tags: ["power_bi","visualizacion"] },
      { id: 'q6_4', text: 'Python para análisis de datos',                           scores: { D:3, T:2, E:0, L:0, O:1, S:0, X:0, P:1, F:1, H:0, G:0, C:0 }, tags: ["python","programacion"] },
      { id: 'q6_5', text: 'SQL y bases de datos',                                    scores: { D:3, T:2, E:0, L:0, O:0, S:0, X:0, P:0, F:1, H:0, G:0, C:0 }, tags: ["sql","datos"] },
      { id: 'q6_6', text: 'Herramientas de IA generativa (ChatGPT, Gemini...)',      scores: { D:1, T:3, E:1, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: ["ia_generativa","tecnologia"] },
      { id: 'q6_7', text: 'Finanzas / Modelación financiera (valuación, costos)',    scores: { D:1, T:0, E:2, L:0, O:0, S:0, X:0, P:0, F:3, H:0, G:0, C:1 }, tags: ["finanzas","modelacion"] },
      { id: 'q6_8', text: 'Habilidades blandas (liderazgo, comunicación, negociación)', scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:0, P:1, F:0, H:2, G:0, C:1 }, tags: ["habilidades_blandas"] },
      { id: 'q6_9', text: 'No me interesa aprender herramientas digitales ahora',   scores: { D:-1, T:-1, E:0, L:0, O:0, S:0, X:0, P:0, F:-1, H:0, G:0, C:0 }, tags: [], isNone: true }
    ]
  },
  {
    id: 'q7',
    module: 'B',
    type: 'scale',
    required: true,
    question: 'Del 1 al 5, ¿qué tanto te interesa la tecnología y estar al día con las últimas tendencias digitales?',
    options: [
      { id: 'q7_1', text: '1 - Nada',    value: 1, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q7_2', text: '2 - Poco',    value: 2, scores: { D:0, T:1, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q7_3', text: '3 - Neutral', value: 3, scores: { D:1, T:2, E:0, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q7_4', text: '4 - Bastante', value: 4, scores: { D:1, T:3, E:0, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q7_5', text: '5 - Mucho',   value: 5, scores: { D:1, T:4, E:0, L:0, O:0, S:0, X:0, P:2, F:0, H:0, G:0, C:0 }, tags: [] }
    ]
  },
  {
    id: 'q8',
    module: 'B',
    type: 'multiselect',
    maxSelections: 3,
    required: true,
    question: '¿Qué habilidades "blandas" o profesionales te gustaría fortalecer?',
    subtitle: 'Elige hasta 3 opciones',
    options: [
      { id: 'q8_1', text: 'Negociación y persuasión',                    scores: { D:0, T:0, E:1, L:3, O:0, S:1, X:0, P:0, F:0, H:1, G:0, C:2 }, tags: ["negociacion"] },
      { id: 'q8_2', text: 'Liderazgo de equipos',                        scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:0, P:2, F:0, H:2, G:0, C:1 }, tags: ["liderazgo"] },
      { id: 'q8_3', text: 'Comunicación efectiva y presentaciones',      scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:0, F:0, H:2, G:1, C:2 }, tags: ["comunicacion"] },
      { id: 'q8_4', text: 'Gestión de proyectos',                        scores: { D:0, T:1, E:1, L:1, O:1, S:0, X:0, P:3, F:0, H:0, G:0, C:2 }, tags: ["proyectos"] },
      { id: 'q8_5', text: 'Pensamiento analítico y resolución de problemas', scores: { D:2, T:1, E:2, L:0, O:2, S:0, X:0, P:1, F:2, H:0, G:0, C:3 }, tags: ["analitica","problemas"] },
      { id: 'q8_6', text: 'Trabajo en entornos multidisciplinarios',     scores: { D:0, T:1, E:1, L:2, O:0, S:0, X:2, P:1, F:0, H:2, G:2, C:1 }, tags: ["interdisciplinar"] },
      { id: 'q8_7', text: 'Pensamiento crítico sobre impacto social/ambiental', scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:0, P:1, F:0, H:1, G:3, C:1 }, tags: ["impacto_social"] }
    ]
  },
  {
    id: 'q9',
    module: 'B',
    type: 'select',
    required: true,
    question: 'Si tuvieras que elegir SOLO UNA actividad para este fin de semana, sería:',
    options: [
      { id: 'q9_1', text: 'Un curso estructurado con teoría y práctica',                 scores: { D:2, T:1, E:1, L:0, O:1, S:1, X:0, P:1, F:2, H:0, G:0, C:1 }, tags: ["curso"] },
      { id: 'q9_2', text: 'Un taller intensivo donde resuelvo casos reales',             scores: { D:2, T:1, E:2, L:0, O:2, S:1, X:0, P:2, F:1, H:0, G:0, C:3 }, tags: ["taller","casos"] },
      { id: 'q9_3', text: 'Una visita a una empresa para ver cómo funciona',             scores: { D:0, T:1, E:1, L:0, O:1, S:2, X:3, P:0, F:0, H:0, G:1, C:0 }, tags: ["visita"] },
      { id: 'q9_4', text: 'Un evento de networking con profesionales',                   scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:3, P:0, F:0, H:2, G:1, C:1 }, tags: ["networking"] },
      { id: 'q9_5', text: 'Una charla de un experto de la industria',                   scores: { D:0, T:1, E:1, L:1, O:0, S:1, X:2, P:0, F:1, H:0, G:1, C:1 }, tags: ["charla"] },
      { id: 'q9_6', text: 'Un reto o competencia empresarial',                          scores: { D:1, T:1, E:2, L:1, O:1, S:0, X:1, P:3, F:0, H:0, G:0, C:2 }, tags: ["reto","competencia"] }
    ]
  },
  {
    id: 'q10',
    module: 'C',
    type: 'select',
    required: true,
    question: 'Te contratan en una empresa con problemas. ¿Cuál de estos te entusiasmaría más resolver?',
    options: [
      { id: 'q10_1', text: 'Los productos llegan tarde a los clientes',                    scores: { D:0, T:1, E:0, L:0, O:2, S:3, X:0, P:0, F:0, H:0, G:0, C:1 }, tags: ["logistica","distribucion"] },
      { id: 'q10_2', text: 'Tienen demasiados productos almacenados sin rotar',           scores: { D:1, T:0, E:0, L:0, O:3, S:2, X:0, P:0, F:1, H:0, G:0, C:1 }, tags: ["inventarios","lean"] },
      { id: 'q10_3', text: 'Empleados pierden tiempo haciendo tareas manuales',           scores: { D:1, T:3, E:0, L:0, O:2, S:0, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: ["automatizacion","eficiencia"] },
      { id: 'q10_4', text: 'Muchos datos pero no saben interpretarlos',                   scores: { D:3, T:1, E:1, L:0, O:0, S:0, X:0, P:0, F:1, H:0, G:0, C:2 }, tags: ["datos","analitica"] },
      { id: 'q10_5', text: 'Dificultades para negociar con proveedores',                  scores: { D:0, T:0, E:1, L:3, O:0, S:2, X:0, P:0, F:0, H:0, G:0, C:2 }, tags: ["negociacion","compras"] },
      { id: 'q10_6', text: 'No tienen estrategia clara para crecer',                      scores: { D:1, T:0, E:3, L:1, O:0, S:0, X:0, P:2, F:1, H:0, G:0, C:3 }, tags: ["estrategia","crecimiento"] },
      { id: 'q10_7', text: 'Alta rotación de personal y cultura organizacional débil',    scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:0, P:0, F:0, H:3, G:1, C:2 }, tags: ["cultura_organizacional","talento"] },
      { id: 'q10_8', text: 'Impacto ambiental negativo o falta de prácticas sostenibles', scores: { D:0, T:0, E:1, L:0, O:1, S:0, X:0, P:0, F:0, H:0, G:3, C:1 }, tags: ["sostenibilidad","impacto_ambiental"] }
    ]
  },
  {
    id: 'q11',
    module: 'C',
    type: 'select',
    required: true,
    question: '¿Qué experiencia crees que le daría más valor a tu formación actual?',
    options: [
      { id: 'q11_1', text: 'Un taller de análisis de datos con un caso real',              scores: { D:3, T:1, E:1, L:0, O:1, S:0, X:0, P:0, F:1, H:0, G:0, C:2 }, tags: ["datos","taller"] },
      { id: 'q11_2', text: 'Una sesión de IA aplicada a negocios',                        scores: { D:1, T:3, E:1, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: ["ia","tecnologia"] },
      { id: 'q11_3', text: 'Visitar una empresa logística o de manufactura',              scores: { D:0, T:0, E:1, L:0, O:2, S:2, X:3, P:0, F:0, H:0, G:0, C:0 }, tags: ["visita","logistica"] },
      { id: 'q11_4', text: 'Un curso intensivo de negociación y habilidades blandas',     scores: { D:0, T:0, E:1, L:3, O:0, S:1, X:0, P:0, F:0, H:2, G:0, C:2 }, tags: ["negociacion"] },
      { id: 'q11_5', text: 'Un bootcamp de gestión de proyectos',                         scores: { D:0, T:1, E:1, L:1, O:1, S:0, X:0, P:3, F:0, H:0, G:0, C:2 }, tags: ["proyectos","gestion"] },
      { id: 'q11_6', text: 'Un evento de networking con gerentes y directivos',           scores: { D:0, T:0, E:1, L:2, O:0, S:0, X:3, P:0, F:0, H:1, G:0, C:1 }, tags: ["networking","liderazgo"] },
      { id: 'q11_7', text: 'Un taller de finanzas para no financieros o valoración',      scores: { D:1, T:0, E:2, L:0, O:0, S:0, X:0, P:0, F:3, H:0, G:0, C:2 }, tags: ["finanzas"] },
      { id: 'q11_8', text: 'Una charla sobre sostenibilidad e impacto en empresas reales', scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:1, P:1, F:0, H:0, G:3, C:1 }, tags: ["sostenibilidad"] }
    ]
  },
  {
    id: 'q12',
    module: 'C',
    type: 'select',
    required: true,
    question: 'En un trabajo en grupo universitario, usualmente eres:',
    options: [
      { id: 'q12_1', text: 'El que analiza la información y saca conclusiones',             scores: { D:3, T:1, E:2, L:0, O:1, S:0, X:0, P:0, F:2, H:0, G:0, C:2 }, tags: [] },
      { id: 'q12_2', text: 'El que propone ideas innovadoras',                              scores: { D:0, T:2, E:1, L:1, O:0, S:0, X:0, P:3, F:0, H:0, G:1, C:1 }, tags: [] },
      { id: 'q12_3', text: 'El que organiza al equipo y coordina',                          scores: { D:0, T:0, E:1, L:3, O:1, S:0, X:0, P:1, F:0, H:2, G:0, C:1 }, tags: [] },
      { id: 'q12_4', text: 'El que investiga benchmarks y aprende de otros',               scores: { D:1, T:1, E:1, L:0, O:0, S:1, X:3, P:0, F:0, H:0, G:1, C:1 }, tags: [] },
      { id: 'q12_5', text: 'El que diseña los procesos y define los pasos',                scores: { D:1, T:1, E:1, L:0, O:3, S:1, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q12_6', text: 'El que gestiona recursos y proveedores',                        scores: { D:0, T:0, E:1, L:1, O:1, S:3, X:0, P:0, F:1, H:0, G:0, C:1 }, tags: [] },
      { id: 'q12_7', text: 'El que se preocupa por el bienestar del equipo y el clima',    scores: { D:0, T:0, E:0, L:2, O:0, S:0, X:1, P:0, F:0, H:3, G:2, C:0 }, tags: [] }
    ]
  },
  {
    id: 'q13',
    module: 'C',
    type: 'select',
    required: true,
    question: 'Tienes que tomar una decisión importante pero hay poca información. Lo primero que haces es:',
    options: [
      { id: 'q13_1', text: 'Analizar datos de ventas y costos',                             scores: { D:3, T:1, E:1, L:0, O:0, S:0, X:0, P:0, F:2, H:0, G:0, C:1 }, tags: [] },
      { id: 'q13_2', text: 'Investigar qué tecnología podría automatizar procesos',         scores: { D:1, T:3, E:0, L:0, O:2, S:0, X:0, P:1, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q13_3', text: 'Revisar cómo fluye el producto desde el proveedor',            scores: { D:0, T:0, E:1, L:0, O:1, S:3, X:0, P:0, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q13_4', text: 'Hablar con el equipo para identificar problemas de gestión',   scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:1, P:0, F:0, H:2, G:0, C:2 }, tags: [] },
      { id: 'q13_5', text: 'Mapear procesos para encontrar ineficiencias',                  scores: { D:1, T:1, E:0, L:0, O:3, S:1, X:0, P:1, F:0, H:0, G:0, C:2 }, tags: [] },
      { id: 'q13_6', text: 'Diseñar una estrategia de crecimiento',                        scores: { D:0, T:1, E:3, L:1, O:0, S:0, X:0, P:2, F:1, H:0, G:0, C:2 }, tags: [] },
      { id: 'q13_7', text: 'Evaluar el impacto social o ambiental de la decisión',         scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:0, P:0, F:0, H:1, G:3, C:1 }, tags: [] }
    ]
  },
  {
    id: 'q14',
    module: 'C',
    type: 'select',
    required: true,
    question: '¿Qué artículo de negocios te interesaría leer hoy?',
    options: [
      { id: 'q14_1', text: 'Cómo Amazon optimiza su cadena de suministro con datos',              scores: { D:2, T:1, E:1, L:0, O:1, S:3, X:0, P:0, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q14_2', text: 'Las 10 aplicaciones de IA que están transformando negocios',           scores: { D:0, T:3, E:1, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q14_3', text: 'Cómo Zara coordina su logística global',                              scores: { D:0, T:0, E:1, L:0, O:1, S:3, X:1, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q14_4', text: 'Las habilidades de negociación que todo profesional necesita',         scores: { D:0, T:0, E:1, L:3, O:0, S:0, X:0, P:0, F:0, H:2, G:0, C:2 }, tags: [] },
      { id: 'q14_5', text: 'Cómo Toyota eliminó el desperdicio con Lean',                         scores: { D:1, T:0, E:0, L:0, O:3, S:1, X:0, P:0, F:0, H:0, G:0, C:1 }, tags: [] },
      { id: 'q14_6', text: 'Startups colombianas que están revolucionando su industria',           scores: { D:0, T:2, E:1, L:0, O:0, S:0, X:1, P:3, F:0, H:0, G:1, C:1 }, tags: [] },
      { id: 'q14_7', text: 'El valor de las finanzas y la rentabilidad en las decisiones gerenciales', scores: { D:1, T:0, E:2, L:0, O:0, S:0, X:0, P:0, F:3, H:0, G:0, C:2 }, tags: [] },
      { id: 'q14_8', text: 'Empresas con culturas organizacionales que retienen al mejor talento',  scores: { D:0, T:0, E:1, L:1, O:0, S:0, X:1, P:0, F:0, H:3, G:1, C:0 }, tags: [] },
      { id: 'q14_9', text: 'Cómo las empresas líderes incorporan sostenibilidad en su estrategia',  scores: { D:0, T:0, E:2, L:0, O:0, S:0, X:0, P:1, F:0, H:0, G:3, C:1 }, tags: [] }
    ]
  },
  {
    id: 'q15',
    module: 'D',
    type: 'multiselect',
    maxSelections: 2,
    required: true,
    question: '¿Cómo sientes que aprendes mejor?',
    subtitle: 'Elige hasta 2 opciones',
    options: [
      { id: 'q15_1', text: 'Leyendo y estudiando teoría',                         scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["teorico"],  modifier: "curso" },
      { id: 'q15_2', text: 'Haciendo ejercicios prácticos',                       scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["practico"], modifier: "taller" },
      { id: 'q15_3', text: 'Analizando casos de empresas reales',                 scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["casos"],   modifier: "caso_empresarial" },
      { id: 'q15_4', text: 'Visitando lugares y viendo in-situ',                  scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["visual","visita"], modifier: "visita" },
      { id: 'q15_5', text: 'Discutiendo y debatiendo con otros',                  scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["social"],  modifier: "networking" },
      { id: 'q15_6', text: 'Construyendo o creando algo nuevo',                   scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: ["creativo"], modifier: "taller" }
    ]
  },
  {
    id: 'q16',
    module: 'D',
    type: 'select',
    required: true,
    question: '¿Qué modalidad prefieres para las actividades de IISE?',
    options: [
      { id: 'q16_1', text: 'Presencial (en la universidad o en una empresa)', scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q16_2', text: 'Virtual (desde casa)',                            scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q16_3', text: 'Híbrida (combinación)',                           scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q16_4', text: 'No tengo preferencia',                            scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] }
    ]
  },
  {
    id: 'q17',
    module: 'D',
    type: 'select',
    required: true,
    question: '¿Cómo evaluarías tu nivel actual en los temas que te interesan?',
    options: [
      { id: 'q17_1', text: 'Principiante total, estoy explorando',              scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, level: 'básico' },
      { id: 'q17_2', text: 'Conocimientos básicos, quiero profundizar',         scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, level: 'básico-intermedio' },
      { id: 'q17_3', text: 'Conocimiento intermedio, quiero especializarme',    scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, level: 'intermedio-avanzado' },
      { id: 'q17_4', text: 'Tengo experiencia, busco aplicarlo',                scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, level: 'avanzado' }
    ]
  },
  {
    id: 'q18',
    module: 'D',
    type: 'scale',
    required: true,
    question: 'Del 1 al 5, ¿qué tan importante es para ti hacer contactos (networking) y acercarte a la industria real?',
    options: [
      { id: 'q18_1', text: '1 - Nada importante',    value: 1, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q18_2', text: '2 - Poco importante',    value: 2, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:1, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q18_3', text: '3 - Neutral',             value: 3, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:2, P:0, F:0, H:0, G:0, C:0 }, tags: [] },
      { id: 'q18_4', text: '4 - Bastante importante', value: 4, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:3, P:0, F:0, H:1, G:0, C:1 }, tags: [] },
      { id: 'q18_5', text: '5 - Muy importante',      value: 5, scores: { D:0, T:0, E:0, L:0, O:0, S:0, X:4, P:0, F:0, H:1, G:0, C:1 }, tags: [] }
    ]
  }
];
