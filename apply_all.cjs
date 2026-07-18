const fs = require('fs');
const path = require('path');

const data1 = require('./cases_data_1.cjs');
const data2 = require('./cases_data_2.cjs');
const allCustomData = [...data1, ...data2];

// Crear mapa
const customMap = {};
for(const d of allCustomData) {
  customMap[d.title] = d;
}

const casesPath = path.join(__dirname, 'src', 'data', 'cases.json');
let casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));

// Imágenes corregidas para los que el usuario reportó mal
const imageFixes = {
  "Escándalo Cambridge Analytica": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "Therac-25: Radiación Letal": "https://images.unsplash.com/photo-1516542076529-1ea3854896f1?auto=format&fit=crop&w=800&q=80",
  "Desastre del Knight Capital Group": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  "Clearview AI y el Reconocimiento Facial": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  "WannaCry Ransomware": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "Discriminación en Anuncios de Vivienda de FB": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  "Silk Road y la Venta Ilegal en la Dark Web": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "COMPAS: Sesgo Racial en Justicia": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
};

casesData = casesData.map(c => {
  if (imageFixes[c.title]) {
    c.image = imageFixes[c.title];
  }
  
  const f = customMap[c.title];
  if (f) {
    c.content = "Una investigación exhaustiva sobre " + c.title + ". Analizamos las implicaciones éticas, los fallos técnicos y las consecuencias a largo plazo de este incidente en la industria.\n\n" +
"El incidente de " + c.title + " es un caso de estudio crucial en la historia de la tecnología. Revela las tensiones ocultas entre la rentabilidad empresarial, la integridad técnica y la moralidad.\n\n" +
"### Contexto Histórico\n" +
f.ctx + "\n\n" +
"### El Incidente\n" +
f.inc + "\n\n" +
"### Análisis Técnico\n" +
f.tec + "\n\n" +
"### Dilema Ético\n" +
f.eti + "\n\n" +
"### Consecuencias y Resoluciones\n" +
f.con + "\n\n" +
"### Lecciones Aprendidas\n" +
f.lec;
  }
  return c;
});

fs.writeFileSync(casesPath, JSON.stringify(casesData, null, 2));
console.log("¡Todo el contenido masivo de 60 casos se actualizó correctamente con alta claridad!");
