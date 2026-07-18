module.exports = [
  {
    title: "Escándalo Cambridge Analytica",
    ctx: "Ocurrió entre 2014 y 2018, principalmente en Estados Unidos y Reino Unido. Implicó a Facebook y a la consultora política Cambridge Analytica. En ese momento, Facebook permitía a los desarrolladores acceder a datos masivos de usuarios sin regulaciones estrictas.",
    inc: "Cambridge Analytica obtuvo los datos privados de 87 millones de usuarios de Facebook a través de un test psicológico. Luego, usaron esa información para crear anuncios políticos hiper-personalizados e influir en las elecciones de EE.UU. y el Brexit.",
    tec: "El problema técnico fue el diseño de la API Graph de Facebook. Permitía que si una persona instalaba una app, la app también podía descargar todos los datos de sus amigos sin que ellos dieran permiso.",
    eti: "El dilema fue la invasión a la privacidad y la manipulación psicológica. Se utilizaron los miedos y creencias de las personas, obtenidos sin su consentimiento claro, para alterar la democracia.",
    con: "Facebook pagó una multa récord de 5.000 millones de dólares a la FTC. Cambridge Analytica se declaró en quiebra. Zuckerberg tuvo que testificar ante el Congreso y se impulsaron leyes como el GDPR en Europa.",
    lec: "Las empresas tecnológicas deben proteger la privacidad por defecto. Los datos personales no pueden ser comercializados a terceros sin un consentimiento explícito, claro y directo."
  },
  {
    title: "Therac-25: Radiación Letal",
    ctx: "Sucedió entre 1985 y 1987 en hospitales de Estados Unidos y Canadá. El Therac-25 era una máquina de radioterapia fabricada por AECL (Atomic Energy of Canada Limited).",
    inc: "Debido a un error informático, la máquina disparó dosis masivas de radiación a seis pacientes, dándoles hasta 100 veces la dosis indicada. Tres de ellos murieron directamente por quemaduras radioactivas.",
    tec: "La causa técnica fue una 'condición de carrera' (race condition). Si el operador escribía los comandos en el teclado muy rápido, el software fallaba y activaba el rayo de alta potencia sin el escudo protector metálico.",
    eti: "La empresa AECL fue negligente. Cuando los hospitales reportaron los primeros accidentes, la empresa los ignoró, diciendo que era 'imposible' que la máquina fallara y culparon a los operadores.",
    con: "La máquina fue retirada del mercado y se pagaron indemnizaciones a las familias. Este caso obligó a la FDA a cambiar drásticamente cómo se aprueba y audita el software médico.",
    lec: "Los sistemas que controlan vidas humanas deben tener seguros físicos (hardware), y el software nunca debe ser el único encargado de evitar una tragedia. Probar el código es vital."
  },
  {
    title: "Boeing 737 MAX y el MCAS",
    ctx: "Ocurrió en 2018 (Indonesia) y 2019 (Etiopía). Los implicados fueron la corporación Boeing, la agencia de aviación FAA y cientos de pasajeros. Boeing estaba apurada por sacar un avión que compitiera con Airbus.",
    inc: "Dos aviones Boeing 737 MAX se estrellaron pocos minutos después de despegar, matando a 346 personas. El avión automáticamente empujaba la nariz hacia abajo y los pilotos no podían detenerlo.",
    tec: "La causa fue el sistema MCAS. Un software diseñado para compensar el peso de los nuevos motores. Este sistema dependía de un solo sensor externo; al fallar el sensor, el software creyó que el avión estaba subiendo demasiado y lo empujó en picada.",
    eti: "El dilema ético fue económico: Boeing ocultó la existencia del sistema MCAS a los pilotos para que las aerolíneas no tuvieran que pagar costosos entrenamientos en simulador, priorizando las ventas sobre la seguridad.",
    con: "Toda la flota del 737 MAX fue prohibida de volar en todo el mundo durante casi dos años. Boeing perdió miles de millones de dólares, su CEO fue despedido, y enfrentaron demandas penales.",
    lec: "Nunca se debe sacrificar la seguridad por ganancias. Ocultar información crítica a los operadores (pilotos) para ahorrar dinero es inaceptable. Los sistemas críticos siempre deben tener sensores redundantes."
  },
  {
    title: "Sesgo Algorítmico en RRHH de Amazon",
    ctx: "Ocurrió alrededor de 2014-2015 en la sede de Amazon, Estados Unidos. La empresa quería crear una Inteligencia Artificial para automatizar la revisión de miles de currículums de candidatos.",
    inc: "Se descubrió que la IA estaba penalizando los currículums de mujeres que postulaban a puestos de programadores. Si el currículum decía 'club de mujeres' o 'universidad femenina', la IA le bajaba el puntaje.",
    tec: "El algoritmo se entrenó con los datos de contrataciones de Amazon de los últimos 10 años. Como en esos 10 años la mayoría de los contratados fueron hombres, la IA aprendió matemáticamente que ser mujer era una característica negativa para el éxito.",
    eti: "El problema moral fue delegar decisiones laborales a una caja negra que reproducía el machismo histórico del sector tecnológico, perjudicando oportunidades de empleo de forma invisible.",
    con: "Amazon tuvo que desmantelar el proyecto en secreto antes de que se usara masivamente. Sin embargo, cuando se filtró a la prensa, dañó la reputación de la empresa respecto a la diversidad.",
    lec: "La Inteligencia Artificial no es objetiva ni neutral; aprende de los datos que le damos. Si le damos datos sesgados, automatizará y empeorará la discriminación."
  },
  {
    title: "Clearview AI y el Reconocimiento Facial",
    ctx: "Comenzó en 2017 en Estados Unidos. La startup Clearview AI desarrolló un software de reconocimiento facial para venderlo a departamentos de policía y empresas de seguridad privada.",
    inc: "La empresa descargó masivamente y sin permiso más de 3.000 millones de fotos de personas desde Facebook, Instagram, Twitter y LinkedIn, creando una base de datos gigante para identificar a cualquiera en la calle.",
    tec: "Utilizaron técnicas de 'Web Scraping' a escala global, rompiendo los términos de servicio de todas las redes sociales, para entrenar redes neuronales profundas que conectaban un rostro con un nombre y perfil.",
    eti: "Destruyeron el derecho al anonimato público. Tomaron fotos que la gente subió para sus amigos y las convirtieron en una herramienta de vigilancia policial sin pedir permiso.",
    con: "Fueron demandados por Apple, Google y Facebook. Países de Europa y Australia declararon la herramienta ilegal y ordenaron borrar los datos de sus ciudadanos. Recibieron multas millonarias.",
    lec: "La información pública no significa que sea de uso libre para la vigilancia biométrica. El consentimiento de los usuarios debe ser el pilar de cualquier herramienta de identificación masiva."
  },
  {
    title: "Desastre del Ariane 5",
    ctx: "Ocurrió en 1996 en la Guayana Francesa. La Agencia Espacial Europea lanzó su nuevo y costoso cohete comercial, el Ariane 5, tras una década de desarrollo.",
    inc: "Exactamente 37 segundos después de despegar, el cohete se desvió abruptamente, se rompió por la fuerza del aire y se autodestruyó en el cielo, perdiendo una carga de satélites científicos.",
    tec: "Un error de código. El software intentó convertir un número decimal de 64 bits (la velocidad del cohete) a un entero de 16 bits. El Ariane 5 era mucho más rápido que su predecesor, por lo que el número era demasiado grande, causando un desbordamiento (overflow) que apagó la computadora de vuelo.",
    eti: "La negligencia consistió en reutilizar el software del antiguo cohete Ariane 4 sin hacer pruebas reales de vuelo simulado con los nuevos motores más potentes del Ariane 5 para ahorrar dinero en pruebas.",
    con: "Se perdieron 500 millones de dólares en equipo y años de investigación científica. Se tuvo que reescribir toda la política de pruebas de la agencia espacial.",
    lec: "Reutilizar código no es malo, pero hacerlo sin pruebas exhaustivas en el nuevo entorno es un error fatal. Todo sistema crítico debe probarse simulando las condiciones reales de estrés."
  },
  {
    title: "Brecha de Seguridad de Equifax",
    ctx: "Sucedió en 2017 en Estados Unidos. Equifax es una de las tres agencias de crédito más grandes del país, que almacena el historial financiero de casi todos los ciudadanos.",
    inc: "Hackers robaron los números de seguridad social, fechas de nacimiento, direcciones y nombres de 147 millones de estadounidenses, dejándolos expuestos al robo de identidad de por vida.",
    tec: "Los atacantes entraron por una vulnerabilidad conocida (CVE-2017-5638) en el software Apache Struts. El parche para arreglarlo había sido lanzado meses antes, pero Equifax olvidó instalarlo en su portal de quejas.",
    eti: "Además de la negligencia técnica, los ejecutivos de Equifax tardaron meses en avisar al público. Peor aún, algunos directivos vendieron sus acciones de la empresa antes de anunciar el hackeo, usando información privilegiada.",
    con: "Equifax acordó pagar hasta 700 millones de dólares en multas e indemnizaciones. Sus altos ejecutivos fueron forzados a renunciar y algunos enfrentaron cargos criminales por tráfico de influencias.",
    lec: "No aplicar parches de seguridad a tiempo es negligencia grave. La transparencia inmediata ante las víctimas de un hackeo es una obligación ética ineludible."
  },
  {
    title: "COMPAS: Sesgo Racial en Justicia",
    ctx: "A partir de 2016 en Estados Unidos, el sistema judicial empezó a usar un software llamado COMPAS (Correctional Offender Management Profiling for Alternative Sanctions) de la empresa Northpointe.",
    inc: "El algoritmo se usaba para predecir si un criminal volvería a delinquir. Se demostró que el software clasificaba erróneamente a las personas afroamericanas como de 'alto riesgo' el doble de veces que a las personas blancas.",
    tec: "El algoritmo de Machine Learning utilizaba encuestas de 137 preguntas sobre antecedentes familiares, barrio y educación. Aunque no preguntaba explícitamente la raza, usaba variables que estaban indirectamente vinculadas a la demografía racial en EE.UU.",
    eti: "El problema fue permitir que un software de 'caja negra' dictara sentencias de cárcel sin que los jueces o los acusados pudieran auditar cómo llegaba a esa conclusión, perpetuando el racismo sistémico.",
    con: "Generó un debate nacional masivo liderado por ProPublica. Varios estados tuvieron que dejar de usar sistemas de predicción de riesgo algorítmico o someterlos a revisiones estrictas.",
    lec: "La justicia automatizada es peligrosa. Las herramientas predictivas que afectan los derechos humanos deben ser de código abierto y auditables por expertos independientes."
  },
  {
    title: "Proyecto Maven (Google y el Pentágono)",
    ctx: "Ocurrió en 2018 en Estados Unidos. Google firmó un contrato secreto con el Departamento de Defensa de EE.UU. para desarrollar tecnología militar.",
    inc: "Se descubrió que Google estaba usando sus avanzadas herramientas de inteligencia artificial y reconocimiento de imágenes para ayudar a los drones militares a identificar mejor sus objetivos, lo que podría usarse para ataques letales.",
    tec: "Utilizaban TensorFlow y modelos de visión por computadora para clasificar automáticamente vehículos, personas y edificios a partir de los videos de baja resolución grabados por drones en zonas de guerra.",
    eti: "Miles de empleados de Google protestaron internamente, argumentando que no fueron contratados para crear armas o herramientas de muerte, exigiendo que la tecnología de Google no se usara para la guerra.",
    con: "Ante la presión interna y la renuncia de varios ingenieros clave, Google decidió no renovar el contrato militar en 2019 y publicó sus 'Principios de IA', prohibiendo el desarrollo de IA para armamento.",
    lec: "Los ingenieros de software tienen una voz y responsabilidad moral sobre cómo se aplica su trabajo. Las empresas deben ser transparentes con sus empleados sobre quién es el cliente final."
  },
  {
    title: "Volkswagen: El Software 'Defeat Device'",
    ctx: "Sucedió a nivel global, estallando en 2015. Volkswagen, el fabricante de autos alemán, enfrentaba estrictas regulaciones medioambientales en EE.UU. sobre las emisiones de sus autos diésel.",
    inc: "La empresa instaló un software malicioso en 11 millones de automóviles en todo el mundo. El software detectaba si el auto estaba en un laboratorio de pruebas; si era así, activaba filtros ecológicos. En la calle, el auto contaminaba hasta 40 veces más del límite legal.",
    tec: "El código en la unidad de control del motor leía parámetros como la velocidad del volante y la presión atmosférica. Al notar un patrón de laboratorio, cambiaba la inyección de combustible para pasar la prueba.",
    eti: "Fue un engaño corporativo premeditado, ordenado desde altos mandos, que envenenó el aire de las ciudades, afectando la salud pública de millones de personas para poder vender autos 'Ecológicos'.",
    con: "Volkswagen pagó más de 30.000 millones de dólares en multas y demandas. Varios ejecutivos fueron arrestados y encarcelados por fraude y conspiración.",
    lec: "El software puede ser utilizado para cometer fraudes a gran escala. Escribir código para evadir deliberadamente regulaciones de salud pública es un delito grave."
  },
  {
    title: "Dark Patterns en Suscripciones (Amazon Prime)",
    ctx: "A lo largo de la década de 2010 y 2020 a nivel global, las plataformas de comercio electrónico, destacando Amazon, buscaron maximizar la retención de usuarios.",
    inc: "Múltiples usuarios denunciaron (y agencias regulatorias confirmaron) que Amazon diseñó el proceso de cancelación de su suscripción 'Prime' como un laberinto confuso diseñado para evitar que la gente se diera de baja.",
    tec: "Se implementaron 'Patrones Oscuros' (Dark Patterns) en la interfaz de usuario: múltiples pantallas de advertencia, botones de cancelación ocultos, lenguaje confuso ('No me rindo') y distracciones visuales.",
    eti: "La interfaz manipulaba psicológicamente al usuario, quitándole la libertad de decisión directa. Era un acto de diseño engañoso para seguir cobrando mensualidades a usuarios que querían salir.",
    con: "La FTC de EE.UU. y la Unión Europea demandaron y obligaron a Amazon a implementar un botón de cancelación simple en dos clics. Esto sentó un precedente legal contra el diseño manipulador.",
    lec: "El Diseño de Experiencia de Usuario (UX) debe ser honesto. Darse de baja de un servicio debe ser tan fácil y rápido como suscribirse."
  },
  {
    title: "Brecha de Yahoo! (3 mil millones de cuentas)",
    ctx: "Ocurrió entre 2013 y 2014 a nivel global. Yahoo! era uno de los proveedores de correo electrónico más importantes del mundo.",
    inc: "Se robaron los datos personales de absolutamente todas las cuentas de Yahoo, es decir, 3.000 millones de usuarios. Se expusieron nombres, fechas de nacimiento, teléfonos y contraseñas.",
    tec: "Los atacantes falsificaron cookies de sesión para acceder a las cuentas sin necesidad de contraseñas, explotando sistemas de autenticación anticuados y cifrado débil (MD5) en la base de datos.",
    eti: "Yahoo ocultó el hackeo masivo durante casi tres años a sus usuarios e inversores. Priorizaron la venta de la empresa a Verizon sobre la seguridad y alerta temprana de sus usuarios.",
    con: "El valor de compra de Yahoo cayó en 350 millones de dólares. Pagaron cientos de millones en multas. Esto destruyó lo poco que quedaba de la reputación de la compañía.",
    lec: "Ocultar una brecha de seguridad multiplica el daño. El cifrado robusto de contraseñas y la invalidación de cookies son pilares técnicos obligatorios."
  },
  {
    title: "WannaCry Ransomware",
    ctx: "Mayo de 2017 a nivel global. Involucró a la agencia de espionaje NSA de EE.UU., hackers norcoreanos y empresas en 150 países, incluyendo el sistema de salud británico (NHS).",
    inc: "Un virus de secuestro de datos (ransomware) bloqueó los ordenadores de cientos de hospitales, fábricas y ministerios en todo el mundo, pidiendo pagos en Bitcoin para recuperar los datos. Se cancelaron cirugías de emergencia y fábricas se detuvieron.",
    tec: "El virus usó un exploit llamado 'EternalBlue', que aprovechaba una vulnerabilidad en Windows. Este exploit fue creado originalmente por la NSA, pero se lo robaron y fue filtrado en internet.",
    eti: "El dilema fue de seguridad nacional: La NSA descubrió la falla de Windows pero no le avisó a Microsoft para poder usarla como arma de espionaje. Al filtrarse, afectó a ciudadanos civiles en todo el mundo.",
    con: "Microsoft tuvo que lanzar un parche de emergencia incluso para sistemas obsoletos como Windows XP. Causó miles de millones en pérdidas económicas a nivel global.",
    lec: "Las agencias gubernamentales que acumulan vulnerabilidades secretas ponen en riesgo a toda la infraestructura civil. Además, las organizaciones deben actualizar (parchear) sus sistemas constantemente."
  },
  {
    title: "Stuxnet y la Guerra Cibernética",
    ctx: "Descubierto en 2010 en Irán. Fue el primer ciberataque conocido creado explícitamente para destruir infraestructura física en el mundo real.",
    inc: "Un virus informático infectó y destruyó en secreto cientos de centrifugadoras nucleares de Irán, retrasando su programa nuclear durante años.",
    tec: "El gusano utilizaba hasta cuatro vulnerabilidades 'día cero' de Windows no conocidas. Estaba programado específicamente para buscar y alterar los controladores lógicos programables (PLC) industriales de la marca Siemens que controlaban las válvulas de gas.",
    eti: "Abrió la caja de Pandora de la guerra cibernética estatal. Legitimó el uso de malware como arma militar, creando el riesgo de que este tipo de código caiga en manos de terroristas.",
    con: "Irán respondió creando su propio ejército cibernético y atacando bancos estadounidenses. Se inició una carrera armamentista de ciberseguridad a nivel global que continúa hoy.",
    lec: "La seguridad cibernética es ahora seguridad física. Aislar las redes críticas de internet (Air-Gapping) no es suficiente si los empleados pueden ingresar memorias USB infectadas."
  },
  {
    title: "FTX y el Fraude Algorítmico",
    ctx: "Ocurrió en 2022 en Las Bahamas y Estados Unidos. Sam Bankman-Fried fundó FTX, uno de los intercambios de criptomonedas más grandes del mundo.",
    inc: "FTX se declaró en bancarrota de la noche a la mañana. Se descubrió que habían robado más de 8.000 millones de dólares del dinero de los clientes para hacer apuestas financieras riesgosas a través de su otra empresa, Alameda Research.",
    tec: "Insertaron un código secreto en el software de FTX (una 'puerta trasera' o backdoor). Este código permitía que la cuenta de Alameda tuviera un saldo negativo ilimitado, usando el dinero de otros clientes sin activar las alarmas del sistema automático de liquidación.",
    eti: "Uso de habilidades de programación para ejecutar y encubrir uno de los fraudes financieros más grandes de la historia, mintiendo a clientes, inversores y reguladores sobre la seguridad de los fondos.",
    con: "Sam Bankman-Fried fue arrestado, condenado por fraude masivo y sentenciado a décadas en prisión. Los clientes perdieron los ahorros de su vida.",
    lec: "El código no miente, pero quienes lo escriben sí. Los sistemas financieros cerrados (CEX) requieren auditorías de código abiertas e independientes para garantizar que el dinero está realmente donde dicen."
  },
  {
    title: "Ashley Madison Data Breach",
    ctx: "Ocurrió en 2015 en Canadá. Ashley Madison era un sitio web de citas diseñado específicamente para personas casadas que buscaban cometer infidelidades.",
    inc: "Un grupo de hackers llamado 'The Impact Team' robó y publicó en internet los nombres, direcciones, tarjetas de crédito e historiales de búsqueda de 32 millones de usuarios del sitio web.",
    tec: "El sitio tenía contraseñas pobremente cifradas (BCrypt mal implementado en algunos casos) y mantenía registros de transacciones financieras incluso de usuarios que habían pagado 19 dólares por la función 'borrado completo', lo cual resultó ser una estafa.",
    eti: "La empresa mintió a sus usuarios prometiendo confidencialidad y anonimato total, cobrando por servicios falsos. El hackeo resultó en extorsiones masivas, divorcios y lamentablemente, suicidios confirmados.",
    con: "La empresa matriz de Ashley Madison enfrentó múltiples demandas colectivas y multas por no proteger los datos. El CEO tuvo que dimitir en medio del escándalo global.",
    lec: "Nunca almacenar datos altamente sensibles que no sean absolutamente necesarios. Cobrar por eliminar datos y no hacerlo es fraude. La seguridad debe ser directamente proporcional a la sensibilidad de la información."
  },
  {
    title: "Snowden y la Vigilancia Masiva (PRISM)",
    ctx: "Ocurrió en 2013 en Estados Unidos. Edward Snowden, un consultor de inteligencia trabajando para la CIA y la NSA, filtró documentos clasificados a la prensa mundial.",
    inc: "Reveló la existencia de PRISM y otros programas mediante los cuales el gobierno de EE.UU. interceptaba correos, llamadas, cámaras web y chats de ciudadanos comunes en todo el mundo, en complicidad con las grandes tecnológicas (Google, Microsoft, Apple).",
    tec: "La NSA instaló dispositivos de intercepción en los cables submarinos de fibra óptica que conectan internet y obligó a las empresas de tecnología, bajo órdenes judiciales secretas, a crear puertas traseras para extraer datos en tiempo real.",
    eti: "El dilema del 'Whistleblower' (denunciante). Snowden rompió su juramento de confidencialidad y violó la ley por considerar que el gobierno estaba violando éticamente los derechos humanos y constitucionales a escala global.",
    con: "Snowden tuvo que exiliarse en Rusia para evitar cadena perpetua por espionaje. El impacto hizo que la industria tecnológica implementara el cifrado de extremo a extremo (End-to-End Encryption) en WhatsApp y otras apps de mensajería.",
    lec: "La ética personal puede entrar en conflicto con la legalidad o el contrato laboral. El diseño de sistemas debe apuntar a la privacidad matemática (cifrado E2E) donde ni siquiera la empresa pueda leer los mensajes."
  },
  {
    title: "Pegasus Spyware (NSO Group)",
    ctx: "Salió a la luz en 2021, afectando a decenas de países en todo el mundo. La empresa israelí NSO Group desarrolló el software espía militar 'Pegasus' para venderlo a gobiernos.",
    inc: "Aunque NSO afirmaba que era solo para atrapar terroristas, se descubrió que los gobiernos lo usaban para hackear, espiar y rastrear ilegalmente a periodistas, defensores de derechos humanos, abogados y políticos opositores.",
    tec: "Pegasus usaba ataques 'zero-click' (cero clics) en WhatsApp y iMessage. El teléfono de la víctima se infectaba silenciosamente con solo recibir un mensaje o una llamada perdida, dándole al atacante control del micrófono, cámara y todos los archivos.",
    eti: "El desarrollo y la venta corporativa de armas cibernéticas a regímenes autoritarios, sabiendo que se usarían para la represión política e incluso el asesinato (como en el caso de Jamal Khashoggi).",
    con: "NSO Group fue demandada por Apple y WhatsApp. Estados Unidos bloqueó a la empresa incluyéndola en su lista negra comercial, dejándola al borde del colapso.",
    lec: "Desarrollar herramientas de explotación de software sin control de uso ético te hace cómplice de las violaciones a los derechos humanos. Los fallos en el software móvil son una amenaza de seguridad física."
  },
  {
    title: "Error en el Sistema de Alerta de Hawái",
    ctx: "Enero de 2018, en el estado de Hawái, EE.UU. El contexto global era de alta tensión y amenazas de guerra nuclear entre Estados Unidos y Corea del Norte.",
    inc: "A las 8:07 AM, todos los teléfonos de los ciudadanos en Hawái recibieron una alerta de emergencia oficial: 'AMENAZA DE MISIL BALÍSTICO HACIA HAWÁI. BUSQUE REFUGIO INMEDIATO. ESTO NO ES UN SIMULACRO'. Causó pánico masivo durante 38 minutos.",
    tec: "Un fallo crítico de UX (Experiencia de Usuario). La interfaz del software que usaban los operadores de emergencia era un menú confuso lleno de enlaces hipertextuales genéricos. El enlace de 'Prueba de Misil' estaba justo al lado del botón de 'Alerta Real de Misil'.",
    eti: "La falta de protocolos de verificación y la pésima usabilidad del sistema generaron terror en millones de personas. El operador afirmó que no fue un error de clic, sino que entendió mal las instrucciones por radio y creyó que el ataque era real.",
    con: "El administrador del sistema fue despedido, el jefe de emergencias renunció, y se implementaron sistemas de confirmación doble ('¿Está seguro?') en las alertas a nivel nacional.",
    lec: "Un mal diseño de interfaz en sistemas críticos puede ser tan peligroso como un fallo de código. Las acciones críticas destructivas siempre deben requerir validación explícita y no deben estar junto a botones de prueba."
  },
  {
    title: "Desastre del Knight Capital Group",
    ctx: "Ocurrió el 1 de agosto de 2012 en la bolsa de Wall Street, Nueva York. Knight Capital era la mayor firma estadounidense de operaciones bursátiles de alta frecuencia (High-Frequency Trading).",
    inc: "Al iniciar el mercado, las computadoras de la empresa enloquecieron, comprando y vendiendo millones de acciones a precios absurdos. En solo 45 minutos, perdieron 440 millones de dólares en efectivo.",
    tec: "El equipo olvidó instalar el nuevo código en 1 de los 8 servidores de la empresa. Además, reutilizaron un antiguo 'flag' (interruptor) de código que llevaba inactivo 8 años ('Power Peg'). El sistema confundió las instrucciones y activó el código muerto.",
    eti: "La falta total de protocolos de control de calidad, auditoría de despliegue y la inexistencia de un mecanismo de 'parada de emergencia' automatizado que monitoreara las pérdidas por segundo.",
    con: "La empresa estuvo a minutos de la bancarrota absoluta y tuvo que ser comprada de urgencia a precio de remate por un competidor para absorber la deuda masiva.",
    lec: "Elimina el código muerto o antiguo. Usa despliegues automatizados y herramientas de monitoreo (Circuit Breakers) que detengan las operaciones si los umbrales lógicos superan un riesgo aceptable."
  },
  {
    title: "Uber y el Software 'Greyball'",
    ctx: "Entre 2014 y 2017 en ciudades de todo el mundo. Uber estaba expandiéndose agresivamente, operando ilegalmente en ciudades donde las leyes locales de taxis aún no lo permitían.",
    inc: "Para evitar ser multados, los ingenieros de Uber desarrollaron 'Greyball', una herramienta dentro de su app que identificaba a los policías y reguladores de la ciudad. A ellos se les mostraban autos falsos en el mapa, y los conductores nunca aceptaban sus viajes.",
    tec: "Usaban geolocalización (si la app se abría cerca de una comisaría), datos de tarjetas de crédito y cruce de datos de redes sociales para etiquetar en secreto las cuentas de los inspectores de transporte.",
    eti: "Fue una conspiración corporativa y tecnológica para obstruir a la justicia de manera sistemática y engañar a las autoridades públicas, utilizando el talento de los ingenieros de software para actividades ilegales.",
    con: "Cuando el New York Times descubrió esto, el Departamento de Justicia de EE.UU. abrió investigaciones penales. Fue uno de los múltiples escándalos que forzaron la renuncia del CEO de Uber, Travis Kalanick.",
    lec: "El talento técnico no debe ser utilizado para engañar o evadir a los gobiernos y reguladores. La ética corporativa debe basarse en la legalidad operativa, no en la evasión algorítmica."
  },
  {
    title: "Deepfakes y Desinformación Política",
    ctx: "Comenzó a tomar fuerza global a partir de 2018 hasta la actualidad. Con el avance de las redes neuronales generativas, se hizo fácil manipular videos de políticos (Obama, Zelensky).",
    inc: "Personas malintencionadas empezaron a usar inteligencia artificial para crear videos hiperrealistas falsos de líderes mundiales declarando guerras o diciendo cosas que nunca dijeron, viralizándose en redes sociales.",
    tec: "El uso de Redes Generativas Antagónicas (GANs) donde dos redes neuronales compiten: una trata de crear caras falsas y la otra trata de detectar si son falsas, hasta que el resultado es indistinguible de la realidad.",
    eti: "La democratización de esta tecnología destruye el concepto de 'ver para creer', amenazando la estabilidad democrática, arruinando reputaciones y fomentando campañas de desinformación masivas.",
    con: "Surgieron leyes globales para penalizar la distribución de deepfakes maliciosos y las grandes redes sociales implementaron detectores automáticos, aunque es una carrera armamentista constante.",
    lec: "Los desarrolladores de IA generativa deben implementar firmas digitales criptográficas (marcas de agua) en el contenido sintético para garantizar la trazabilidad de la verdad."
  },
  {
    title: "Patriot Missile Failure (Dhahran)",
    ctx: "Ocurrió el 25 de febrero de 1991 en Dhahran, Arabia Saudita, durante la Guerra del Golfo. El ejército de EE.UU. utilizaba misiles Patriot para interceptar ataques.",
    inc: "Un misil iraquí impactó contra una base militar de Estados Unidos porque el sistema defensivo Patriot falló en interceptarlo. Murieron 28 soldados estadounidenses y 100 resultaron heridos.",
    tec: "El problema fue un error de precisión matemática. El reloj del sistema contaba el tiempo en décimas de segundo, pero el software lo calculaba usando un registro de solo 24 bits. Después de 100 horas encendido, la imprecisión del redondeo acumuló un retraso de 0.34 segundos, desviando el radar más de 600 metros.",
    eti: "La negligencia militar: los mandos sabían del problema porque los ingenieros israelíes se lo advirtieron, pero creyeron que reiniciar el sistema periódicamente sería suficiente, y nunca les llegó la orden clara a las tropas en el terreno.",
    con: "Las muertes empujaron a una investigación militar profunda. El software fue parcheado mediante un disquete que llegó a la base justo al día siguiente de la tragedia.",
    lec: "El cálculo en coma flotante y los errores de redondeo pueden tener consecuencias mortales. Los sistemas críticos deben reiniciarse periódicamente o manejar la precisión temporal con librerías exactas."
  },
  {
    title: "Marriott Data Breach",
    ctx: "Se descubrió en 2018 a nivel mundial. Marriott es una de las cadenas hoteleras multinacionales más grandes, y había comprado la cadena de hoteles Starwood en 2016.",
    inc: "Hackers robaron los datos personales, números de pasaporte y tarjetas de crédito de más de 500 millones de huéspedes que se alojaron en sus hoteles entre 2014 y 2018.",
    tec: "El ataque ocurrió en la red de Starwood. Cuando Marriott compró Starwood, no auditaron correctamente la seguridad de su red antes de integrarla con los sistemas globales de Marriott, heredando silenciosamente un sistema que ya estaba hackeado desde hace años.",
    eti: "El dilema corporativo: minimizar la diligencia debida en ciberseguridad durante una fusión empresarial millonaria para acelerar la compra, exponiendo a cientos de millones de clientes.",
    con: "El Reino Unido los multó con 18 millones de libras, enfrentaron decenas de demandas colectivas y sufrieron un daño reputacional severo al perder la confianza de los viajeros frecuentes.",
    lec: "En cualquier fusión o adquisición tecnológica, la seguridad y las auditorías de red deben ser la máxima prioridad. Heredar sistemas es heredar sus vulnerabilidades."
  },
  {
    title: "Apple y la Ralentización de iPhones",
    ctx: "Finales de 2017 a nivel global. Los usuarios notaron que sus iPhones antiguos se volvían notablemente más lentos con cada nueva actualización del sistema operativo iOS.",
    inc: "Apple admitió que estaba reduciendo intencionalmente (haciendo 'throttling') el rendimiento de los procesadores en iPhones antiguos sin avisarle a los usuarios.",
    tec: "Se implementó un algoritmo en el software del sistema operativo que detectaba cuando la batería de iones de litio estaba envejecida. Para evitar que el celular se apagara de golpe por picos de consumo, el software bajaba la velocidad del procesador.",
    eti: "Falta total de transparencia (Obsolescencia programada percibida). Al no avisar, engañaron a los usuarios haciéndoles creer que sus teléfonos ya no servían y debían comprar el modelo nuevo (más caro) en lugar de simplemente cambiar la batería por 30 dólares.",
    con: "Múltiples demandas por fraude y multas millonarias en Europa y Estados Unidos. Apple tuvo que pedir perdón públicamente, ofrecer descuentos masivos para cambiar las baterías y añadir un panel de 'Salud de Batería' en iOS.",
    lec: "Las decisiones técnicas que afectan el rendimiento deben ser informadas al usuario. La falta de transparencia puede convertir una 'solución técnica de ingeniería' en un escándalo de fraude corporativo."
  },
  {
    title: "Target y la Predicción de Embarazos",
    ctx: "Sucedió en 2012 en Estados Unidos. La cadena de supermercados Target contrató analistas de datos para encontrar formas de enviar cupones de descuentos altamente precisos a sus clientes.",
    inc: "La empresa le envió cupones de artículos para bebé a una adolescente de preparatoria. El padre de la chica se enfureció y demandó a Target por incitar a su hija a embarazarse. Días después, el padre se disculpó: la adolescente sí estaba embarazada, pero Target lo supo antes que su propia familia.",
    tec: "Usaron algoritmos de minería de datos. Si una clienta compraba repentinamente loción sin perfume, vitaminas de calcio y algodón, el algoritmo le asignaba un 'Puntaje de predicción de embarazo' y predecía incluso su fecha de parto.",
    eti: "La hiper-vigilancia corporativa cruza la línea de lo espeluznante. Deducir información médica altamente privada sin el permiso explícito del cliente es una violación brutal de la privacidad íntima.",
    con: "El caso se hizo mundialmente famoso. Target tuvo que cambiar su política y empezar a mezclar los cupones de pañales con cupones aleatorios (como cortadoras de césped) para que la predicción fuera menos evidente y perturbadora.",
    lec: "El hecho de que puedas predecir algo mediante el Big Data no significa que éticamente debas usarlo. El Big Data corporativo requiere límites éticos estrictos sobre las inferencias personales."
  },
  {
    title: "Aadhaar: Base de Datos Biométrica India",
    ctx: "Lanzado en 2009 en India, Aadhaar se convirtió en la base de datos biométrica más grande del mundo, con huellas y escaners de iris de más de 1.300 millones de ciudadanos indios.",
    inc: "Surgieron fallos de seguridad graves, robos de identidad y exclusión social. Personas perdieron el acceso a subsidios de alimentos porque sus huellas digitales (gastadas por el trabajo manual) no eran reconocidas por las máquinas gubernamentales, causando muertes por inanición.",
    tec: "Dependencia absoluta en endpoints de validación biométrica que carecían de planes de contingencia (fallbacks). Además, múltiples fallas de seguridad en las APIs gubernamentales permitieron que los datos se vendieran por menos de 8 dólares en foros de hackers.",
    eti: "Forzar a una población entera a entregar sus datos biométricos para poder comer, sin garantizar la seguridad ni la disponibilidad del sistema, creando exclusión sistemática por fallas tecnológicas.",
    con: "El Tribunal Supremo de India tuvo que intervenir, dictaminando que la privacidad es un derecho fundamental y limitando legalmente a las empresas privadas a exigir el Aadhaar para sus servicios.",
    lec: "La biometría es inmutable: si te roban tu contraseña la cambias, si te roban tu huella digital, la perdiste para siempre. Ningún sistema tecnológico debe ser el único intermediario entre un ciudadano y sus derechos básicos."
  },
  {
    title: "SolarWinds Supply Chain Attack",
    ctx: "Descubierto en diciembre de 2020 en Estados Unidos. Involucró al software de gestión de TI 'Orion', fabricado por la empresa SolarWinds, que era usado por las empresas más grandes del mundo y el gobierno de EE.UU.",
    inc: "Hackers rusos respaldados por el Estado lograron infiltrarse en más de 18.000 organizaciones, incluyendo los departamentos de Tesoro y Defensa de EE.UU., Microsoft y Cisco, durante más de nueve meses.",
    tec: "Fue el ataque de cadena de suministro (Supply Chain) más sofisticado de la historia. Los hackers penetraron los servidores de desarrollo de SolarWinds e insertaron código malicioso en las actualizaciones oficiales del software. Los clientes lo descargaron creyendo que era una actualización segura y firmada.",
    eti: "La empresa tenía prácticas de seguridad deplorables (como usar la contraseña 'solarwinds123' en un servidor FTP de actualizaciones). Sacrificaron la ciberseguridad básica de sus propios entornos de desarrollo.",
    con: "Provocó una crisis de seguridad nacional sin precedentes, forzando a reestructurar por completo cómo el gobierno federal maneja el software de terceros y provocó la orden ejecutiva sobre ciberseguridad del presidente Biden.",
    lec: "La seguridad del código no solo abarca tu producto, sino también tu infraestructura de construcción (Build Pipeline). Una cadena es tan fuerte como su eslabón más débil."
  },
  {
    title: "El Colapso de Mt. Gox",
    ctx: "Sucedió a principios de 2014 en Japón. Mt. Gox manejaba más del 70% de todas las transacciones de Bitcoin del mundo en ese momento.",
    inc: "La empresa se declaró en bancarrota tras anunciar que había 'perdido' 850.000 Bitcoins (cientos de millones de dólares en su momento, hoy decenas de miles de millones) de sus clientes, acusando a hackers.",
    tec: "El sistema estaba mal programado en PHP y era vulnerable a la 'maleabilidad de las transacciones', un error donde los hackers alteraban el ID de la transacción para hacerle creer a Mt. Gox que un retiro había fallado, haciendo que la empresa enviara los fondos doblemente de forma automática.",
    eti: "El CEO, Mark Karpelès, operó con un descontrol administrativo absoluto, sin auditorías de seguridad externas, mintiendo sobre la solvencia del intercambio mientras vaciaban lentamente sus carteras (wallets) frías.",
    con: "Karpelès fue arrestado en Japón. El ecosistema Bitcoin sufrió una caída masiva y un daño reputacional inmenso, dejando a miles de personas sin sus ahorros durante años de juicios de liquidación.",
    lec: "Manejar criptoactivos requiere una seguridad a nivel bancario militar. Las firmas múltiples (Multisig) y las auditorías de código abierto (Open Source Security) son imprescindibles para plataformas financieras."
  }
];
