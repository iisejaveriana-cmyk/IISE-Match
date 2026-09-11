const CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx0B_5BrQ3mK_2YbaGpGZfzQqH4vL7rITfjxcHHaC4J_Do3q6yrZbnD1juOBO3E0qV8Rg/exec", // Set to Apps Script URL or leave empty for local mode
  TEST_SCENARIOS: [
    { name: "Estudiante Analítico", expected: "D", desc: "Prioriza datos, herramientas como Power BI y Excel" },
    { name: "Estudiante Tecnológico", expected: "T", desc: "Le interesa la IA, automatización y herramientas generativas" },
    { name: "Estudiante Líder", expected: "L", desc: "Busca networking, habilidades de comunicación y liderazgo" },
    { name: "Estudiante Supply Chain", expected: "S", desc: "Interesado en logística, inventarios, y compras" },
    { name: "Estudiante Emprendedor", expected: "P", desc: "Orientado a construir proyectos, retos e innovación" }
  ]
};
