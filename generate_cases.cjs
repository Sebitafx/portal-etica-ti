const fs = require('fs');
const path = require('path');

const baseCases = [
  { title: "Escándalo Cambridge Analytica", cat: "Privacidad de Datos", img: "1550751827-4bd374c3f58b" },
  { title: "Therac-25: Radiación Letal", cat: "Salud y Seguridad", img: "1516542076529-1ea3854896f1" },
  { title: "Boeing 737 MAX y el MCAS", cat: "Sistemas Críticos", img: "1436491865332-7a61ce2ed9ce" },
  { title: "Sesgo Algorítmico en RRHH de Amazon", cat: "Inteligencia Artificial", img: "1573164713988-8665fc963095" },
  { title: "Clearview AI y el Reconocimiento Facial", cat: "Privacidad de Datos", img: "1507146153580-69a4fe5d8bf9" },
  { title: "Desastre del Ariane 5", cat: "Sistemas Críticos", img: "1517976487492-5750f3195933" },
  { title: "Brecha de Seguridad de Equifax", cat: "Ciberseguridad", img: "1563206767541-404d61cb22dd" },
  { title: "COMPAS: Sesgo Racial en Justicia", cat: "Inteligencia Artificial", img: "1589829085413-56de8ae18c73" },
  { title: "Proyecto Maven (Google y el Pentágono)", cat: "Ética Corporativa", img: "1508614589041-8f5b1c9aa839" },
  { title: "Volkswagen: El Software 'Defeat Device'", cat: "Ética Corporativa", img: "1492144534655-ae79c964c9d7" },
  { title: "Dark Patterns en Suscripciones (Amazon Prime)", cat: "Experiencia de Usuario", img: "1618044733300-9472054094ee" },
  { title: "Brecha de Yahoo! (3 mil millones de cuentas)", cat: "Ciberseguridad", img: "1558494949-ef010cbdcc31" },
  { title: "WannaCry Ransomware", cat: "Ciberseguridad", img: "1526374965328-7f61d4dc18c5" },
  { title: "Stuxnet y la Guerra Cibernética", cat: "Seguridad Nacional", img: "1550751827-4bd374c3f58b" },
  { title: "FTX y el Fraude Algorítmico", cat: "Finanzas Digitales", img: "1621504450181-5d356f61d30e" },
  { title: "Ashley Madison Data Breach", cat: "Privacidad de Datos", img: "1510511459019-5efa7ae1b444" },
  { title: "Snowden y la Vigilancia Masiva (PRISM)", cat: "Privacidad de Datos", img: "1451187580459-43490279c0fa" },
  { title: "Pegasus Spyware (NSO Group)", cat: "Ciberseguridad", img: "1526304640581-d334cdbbf45e" },
  { title: "Error en el Sistema de Alerta de Hawái", cat: "Experiencia de Usuario", img: "1506146332902-e8b4e41b9d40" },
  { title: "Desastre del Knight Capital Group", cat: "Algoritmos Financieros", img: "1611974789855-9c2a0a7236a3" },
  { title: "Uber y el Software 'Greyball'", cat: "Ética Corporativa", img: "1449965408869-eaa3f722e40d" },
  { title: "Deepfakes y Desinformación Política", cat: "Inteligencia Artificial", img: "1581092928131-77884ea221e3" },
  { title: "Patriot Missile Failure (Dhahran)", cat: "Sistemas Críticos", img: "1584467735815-f778f274e296" },
  { title: "Marriott Data Breach", cat: "Ciberseguridad", img: "1551288049-bebda4e38f71" },
  { title: "Apple y la Ralentización de iPhones", cat: "Ética Corporativa", img: "1512054502232-10a0a035d672" },
  { title: "Target y la Predicción de Embarazos", cat: "Privacidad de Datos", img: "1556740758-90de374c12ad" },
  { title: "Aadhaar: Base de Datos Biométrica India", cat: "Privacidad de Datos", img: "1503437312306-6415a77028e1" },
  { title: "SolarWinds Supply Chain Attack", cat: "Ciberseguridad", img: "1558494949-ef010cbdcc31" },
  { title: "El Colapso de Mt. Gox", cat: "Finanzas Digitales", img: "1621416894569-0f39ed31d247" },
  { title: "Vigilancia de Empleados mediante Bossware", cat: "Privacidad de Datos", img: "1497215968147-398516ee7bb1" },
  { title: "Algoritmos de Precios de Vuelos (Price Steering)", cat: "Algoritmos Financieros", img: "1436491865332-7a61ce2ed9ce" },
  { title: "Sesgo de Género en Tarjeta de Crédito Apple", cat: "Inteligencia Artificial", img: "1563013544-320448d734ac" },
  { title: "El Bot Tay de Microsoft (Racismo en IA)", cat: "Inteligencia Artificial", img: "1531297172864-07b86a100552" },
  { title: "Escándalo de Theranos y la Sangre Falsa", cat: "Salud y Seguridad", img: "1576086213369-97a306d36557" },
  { title: "Censura en Buscadores Chinos (Project Dragonfly)", cat: "Ética Corporativa", img: "1546900202-8a48efb6d194" },
  { title: "Uber: Vehículo Autónomo mata a un Peatón", cat: "Sistemas Críticos", img: "1449965408869-eaa3f722e40d" },
  { title: "Zoom: Fallas de Seguridad y 'Zoombombing'", cat: "Ciberseguridad", img: "1588196749597-9e6727282eb5" },
  { title: "Robo de Datos de Sony Pictures", cat: "Ciberseguridad", img: "1550751827-4bd374c3f58b" },
  { title: "Discriminación en Anuncios de Vivienda de FB", cat: "Inteligencia Artificial", img: "1562504208-411a76bbd9a2" },
  { title: "Vulnerabilidad Heartbleed (OpenSSL)", cat: "Ciberseguridad", img: "1526374965328-7f61d4dc18c5" },
  { title: "El Bug Y2K (El efecto 2000)", cat: "Sistemas Críticos", img: "1517976487492-5750f3195933" },
  { title: "El Fracaso del NHS IT System (UK)", cat: "Salud y Seguridad", img: "1516542076529-1ea3854896f1" },
  { title: "Manipulación de Emociones en Facebook (Contagio)", cat: "Privacidad de Datos", img: "1618044733300-9472054094ee" },
  { title: "Sesgo en Reconocimiento Facial de Google Photos", cat: "Inteligencia Artificial", img: "1507146153580-69a4fe5d8bf9" },
  { title: "Silk Road y la Venta Ilegal en la Dark Web", cat: "Seguridad Nacional", img: "1526304640581-d334cdbbf45e" },
  { title: "Luna/Terra Crypto Crash Algorítmico", cat: "Finanzas Digitales", img: "1621504450181-5d356f61d30e" },
  { title: "Algoritmos de Recomendación de YouTube (Radicalización)", cat: "Inteligencia Artificial", img: "1611162616475-46b635cb6868" },
  { title: "Robodebt (Australia): Falsas Deudas Automatizadas", cat: "Ética Corporativa", img: "1589829085413-56de8ae18c73" },
  { title: "Fallos de Seguridad en Cámaras Ring de Amazon", cat: "Privacidad de Datos", img: "1558494949-ef010cbdcc31" },
  { title: "Log4j: La Vulnerabilidad Omnipresente", cat: "Ciberseguridad", img: "1526374965328-7f61d4dc18c5" },
  { title: "Tesla Autopilot y Accidentes Mortales", cat: "Sistemas Críticos", img: "1560958089-b8a1929cea89" },
  { title: "Gamergate y el Acoso en Línea", cat: "Experiencia de Usuario", img: "1552820728827-2b72ebf49e47" },
  { title: "Rastreo de Ubicación Oculto de Google", cat: "Privacidad de Datos", img: "1506146332902-e8b4e41b9d40" },
  { title: "Flash Crash de 2010 (Trading Algorítmico)", cat: "Algoritmos Financieros", img: "1611974789855-9c2a0a7236a3" },
  { title: "Censura de Reddit y la Política de Contenidos", cat: "Ética Corporativa", img: "1546900202-8a48efb6d194" },
  { title: "Tinder y la Discriminación de Precios por Edad", cat: "Algoritmos Financieros", img: "1563013544-320448d734ac" },
  { title: "El Escándalo de FTX y Alameda Research", cat: "Finanzas Digitales", img: "1621416894569-0f39ed31d247" },
  { title: "Discord y la Moderación de Extremismo", cat: "Seguridad Nacional", img: "1611162616475-46b635cb6868" },
  { title: "Robinhood y el GameStop Short Squeeze", cat: "Algoritmos Financieros", img: "1611974789855-9c2a0a7236a3" },
  { title: "Ataque Informático a Colonial Pipeline", cat: "Seguridad Nacional", img: "1551288049-bebda4e38f71" }
];

const generatedCases = baseCases.map((c, i) => {
  return {
    id: `case-${i + 1}`,
    title: c.title,
    category: c.cat,
    image: `https://images.unsplash.com/photo-${c.img}?auto=format&fit=crop&w=800&q=80`,
    description: `Una investigación exhaustiva sobre ${c.title}. Analizamos las implicaciones éticas, los fallos técnicos y las consecuencias a largo plazo de este incidente en la industria.`,
    content: `El caso de **${c.title}** representa uno de los hitos más importantes en la historia de la ética tecnológica y la ${c.cat.toLowerCase()}. \n\n### El Incidente\nTodo comenzó cuando fallas sistémicas, tanto a nivel humano como técnico, convergieron en un punto crítico. La falta de auditorías rigurosas y la priorización del despliegue rápido por encima de la seguridad y el bienestar de los usuarios resultaron en un impacto masivo.\n\n### Análisis Ético\nDesde una perspectiva ética, este caso vulnera los principios fundamentales de transparencia y no maleficencia. Los desarrolladores e ingenieros a cargo enfrentaron un dilema clásico entre las exigencias corporativas y su deber profesional hacia la sociedad. \n\n### Consecuencias\nLas repercusiones fueron globales, resultando en demandas multimillonarias, cambios legislativos y una pérdida irreparable de confianza pública. Hoy en día, este caso es estudiado obligatoriamente para entender por qué la ética no es opcional en el desarrollo de software.`,
    readTime: `${Math.floor(Math.random() * 10) + 5} min`,
    date: `202${Math.floor(Math.random() * 6)}-0${Math.floor(Math.random() * 9) + 1}-1${Math.floor(Math.random() * 9) + 1}`
  };
});

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'cases.json'),
  JSON.stringify(generatedCases, null, 2)
);

console.log("60 casos generados con éxito en src/data/cases.json");
