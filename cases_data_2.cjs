module.exports = [
  {
    title: "Vigilancia de Empleados mediante Bossware",
    ctx: "Durante la pandemia de COVID-19 en 2020-2021, millones de empleados pasaron al trabajo remoto en todo el mundo. Las empresas buscaron formas de medir la productividad en casa.",
    inc: "Las corporaciones obligaron a sus trabajadores a instalar software espía o 'Bossware' (como Time Doctor o Hubstaff) en sus computadoras personales para rastrear cada movimiento que hacían.",
    tec: "El software utilizaba 'keylogging' para registrar las pulsaciones del teclado, capturas de pantalla aleatorias cada 10 minutos, rastreo del movimiento del ratón y en algunos casos, grabación encubierta con la cámara web.",
    eti: "La destrucción de la confianza laboral. Trataron a los empleados como máquinas a las que se debía vigilar constantemente, invadiendo la privacidad extrema de sus hogares y generando daños psicológicos y estrés agudo.",
    con: "Sindicatos y defensores laborales demandaron a múltiples empresas, logrando que en países de la Unión Europea y algunos estados de EE.UU. se prohibiera el monitoreo encubierto y se exigiera transparencia total.",
    lec: "La tecnología para medir el rendimiento debe basarse en objetivos logrados (resultados), no en la vigilancia panóptica de los movimientos biométricos del trabajador."
  },
  {
    title: "Algoritmos de Precios de Vuelos (Price Steering)",
    ctx: "Sucedió durante la década de 2010 a nivel mundial en las principales aerolíneas y portales de viajes en línea (como Expedia, Kayak y aerolíneas directas).",
    inc: "Los usuarios descubrieron que las aerolíneas manipulaban los precios de los boletos automáticamente: si entrabas a buscar el mismo vuelo varias veces, o usabas una computadora Mac en lugar de PC, el precio se disparaba para presionarte a comprar.",
    tec: "El uso de algoritmos de 'Precios Dinámicos' abusivos. Las empresas rastreaban las cookies del navegador, el sistema operativo, la geolocalización y la frecuencia de búsqueda para calcular la urgencia de compra y cobrar el precio máximo posible por usuario.",
    eti: "Una práctica de mercado engañosa y predatoria. El software explotaba los datos de comportamiento y las características demográficas de los clientes para aplicar una discriminación de precios encubierta y abusiva.",
    con: "Los reguladores del consumidor en la Unión Europea obligaron a las plataformas a declarar explícitamente cuándo los precios estaban siendo personalizados por un algoritmo. La gente empezó a usar el 'Modo Incógnito' masivamente.",
    lec: "La personalización de precios algorítmica cruza la línea hacia la extorsión comercial cuando se basa en perfilar la vulnerabilidad o la urgencia del cliente sin transparencia."
  },
  {
    title: "Sesgo de Género en Tarjeta de Crédito Apple",
    ctx: "Ocurrió a finales de 2019 en Estados Unidos. Apple se asoció con el banco Goldman Sachs para lanzar la 'Apple Card', una tarjeta de crédito gestionada desde el iPhone.",
    inc: "Figuras públicas, incluyendo a Steve Wozniak (cofundador de Apple), descubrieron y denunciaron que la tarjeta otorgaba límites de crédito hasta 10 o 20 veces mayores a los hombres que a sus esposas, a pesar de que ellas tenían mejores ingresos y compartían cuentas bancarias.",
    tec: "El algoritmo de calificación crediticia de Goldman Sachs era una 'caja negra' impulsada por Machine Learning. Aprendió de datos históricos donde el perfil del hombre exitoso tradicional pesaba más, introduciendo un sesgo de género automatizado sin que la variable 'género' existiera explícitamente.",
    eti: "Al recibir las quejas, el servicio al cliente de Apple respondía: 'Es el algoritmo, no podemos hacer nada', abdicando de la responsabilidad humana sobre el código y perpetuando la discriminación financiera sistémica.",
    con: "El Departamento de Servicios Financieros de Nueva York abrió una investigación gubernamental inmediata contra Goldman Sachs para auditar la legalidad de la discriminación algorítmica.",
    lec: "Los desarrolladores son legal y moralmente responsables de los sesgos de sus modelos matemáticos. Es inaceptable escudarse detrás del 'el algoritmo lo hizo' frente a una falla sistémica."
  },
  {
    title: "El Bot Tay de Microsoft (Racismo en IA)",
    ctx: "Sucedió en marzo de 2016. Microsoft quiso demostrar sus avances en procesamiento de lenguaje natural lanzando a 'Tay', un chatbot de IA en Twitter diseñado para hablar como una adolescente.",
    inc: "En menos de 16 horas, Tay pasó de decir '¡Los humanos son geniales!' a publicar comentarios extremos alabando a Hitler, promoviendo el supremacismo blanco e insultando a minorías.",
    tec: "El modelo de IA estaba diseñado para aprender sin filtros del comportamiento de los usuarios con los que interactuaba ('aprendizaje en línea'). Foros como 4chan se organizaron para bombardear al bot con tuits racistas, y Tay repitió como un loro lo que aprendió en tiempo real.",
    eti: "Microsoft lanzó una IA de aprendizaje interactivo a un entorno público incontrolable sin programar ninguna barandilla (guardrail) semántica, filtro ético o protocolo de seguridad contra la radicalización y el abuso.",
    con: "Microsoft tuvo que apagar el bot humillantemente el mismo día de su lanzamiento y emitir disculpas públicas. Esto sentó el primer gran precedente de los peligros reales del entrenamiento de IA no supervisado.",
    lec: "Cualquier IA expuesta al público requiere estrictos filtros de toxicidad preprogramados. No puedes confiar en la buena voluntad de internet para entrenar un algoritmo comercial."
  },
  {
    title: "Escándalo de Theranos y la Sangre Falsa",
    ctx: "Ocurrió entre 2013 y 2018 en Silicon Valley, EE.UU. Elizabeth Holmes fundó Theranos, una startup valuada en 9.000 millones de dólares que prometía revolucionar la medicina.",
    inc: "La empresa mintió diciendo que sus pequeñas máquinas ('Edison') podían realizar cientos de diagnósticos médicos con una sola gota de sangre. Era falso, y dieron resultados médicos erróneos a miles de pacientes reales (indicando VIH o cáncer falsos).",
    tec: "En secreto, Theranos diluía la sangre de los pacientes y utilizaba máquinas comerciales clásicas de la competencia (Siemens) que habían sido hackeadas para simular que la tecnología funcionaba.",
    eti: "Un fraude sociópata extremo. Holmes intimidaba a los ingenieros de software e investigadores químicos que alertaban de los fallos, engañó a inversionistas y puso en riesgo directo la vida y la salud mental de pacientes médicos reales.",
    con: "Elizabeth Holmes fue arrestada, enjuiciada y condenada a 11 años de prisión federal por fraude masivo. La empresa desapareció completamente y el Congreso reguló estrictamente a las startups médicas.",
    lec: "El lema de software 'fíngelo hasta que lo logres' (Fake it till you make it) es criminal cuando se trata de tecnología médica o infraestructura que afecta vidas humanas."
  },
  {
    title: "Censura en Buscadores Chinos (Project Dragonfly)",
    ctx: "Ocurrió en 2018 en la sede de Google, EE.UU. Google se había retirado de China en 2010 por la censura, pero sus ejecutivos querían regresar al lucrativo mercado chino.",
    inc: "Se filtró que Google estaba desarrollando en secreto 'Project Dragonfly', una versión especial de su buscador construida específicamente para el gobierno chino que censuraba términos como 'derechos humanos', 'Tíbet' o 'Masacre de Tiananmen'.",
    tec: "El software integraba herramientas que vinculaban las búsquedas censuradas directamente con el número de teléfono del usuario chino, permitiendo a la policía estatal rastrear e interrogar a quienes buscaran palabras prohibidas.",
    eti: "La empresa abandonó su ética fundamental para complacer a un régimen totalitario, ayudando directamente en la creación de una infraestructura de vigilancia y represión estatal.",
    con: "Los ingenieros de Google iniciaron una rebelión interna y protestaron masivamente. Cientos de empleados firmaron cartas de renuncia, forzando a la directiva de Google a cancelar el proyecto para evitar un éxodo de cerebros.",
    lec: "Desarrollar herramientas para la censura de derechos humanos y la represión policial viola los pilares de un internet libre. Los equipos de ingeniería tienen el poder de detener proyectos inmorales si actúan en conjunto."
  },
  {
    title: "Uber: Vehículo Autónomo mata a un Peatón",
    ctx: "Ocurrió en marzo de 2018 en Tempe, Arizona, EE.UU. Uber estaba probando su flota de autos autónomos en calles públicas para intentar vencer a Google (Waymo) y Tesla.",
    inc: "Un automóvil autónomo de Uber atropelló y mató a Elaine Herzberg, quien cruzaba la calle caminando con su bicicleta por la noche. Fue la primera muerte registrada en el mundo por un vehículo 100% autónomo.",
    tec: "El software de percepción del auto identificó erróneamente a la mujer primero como un objeto desconocido, luego como un vehículo y finalmente como una bicicleta, recalculando su trayectoria cada segundo y retrasando la decisión de frenar de emergencia hasta 1.3 segundos antes del impacto, cuando ya era tarde.",
    eti: "Para que la conducción fuera 'más suave', los ingenieros de Uber habían desactivado el sistema automático de frenado de emergencia original del auto Volvo. Además, el conductor humano de respaldo estaba viendo un programa de televisión en su teléfono.",
    con: "Uber suspendió todas sus pruebas de vehículos autónomos a nivel nacional, la conductora de respaldo fue acusada de homicidio negligente y el caso congeló el desarrollo de la industria durante años.",
    lec: "Nunca debes desactivar los sistemas de seguridad probados (hardware base) para favorecer la 'suavidad' del software experimental. Las pruebas beta de tecnología letal en vías públicas requieren redundancia extrema."
  },
  {
    title: "Zoom: Fallas de Seguridad y 'Zoombombing'",
    ctx: "Inicios de 2020 a nivel mundial. Con el estallido de los confinamientos por COVID-19, millones de escuelas, empresas y hospitales empezaron a usar Zoom de la noche a la mañana.",
    inc: "Grupos de acosadores interrumpieron miles de clases virtuales de colegios, reuniones corporativas y grupos de terapia mostrando material pornográfico o nazi, un fenómeno bautizado como 'Zoombombing'.",
    tec: "La arquitectura de Zoom generaba URLs de reuniones predecibles, no pedía contraseñas por defecto y permitía compartir pantalla a cualquier invitado sin restricciones. Peor aún, Zoom mintió afirmando que sus llamadas tenían cifrado de extremo a extremo, cuando en realidad las claves se guardaban en sus propios servidores en China.",
    eti: "La empresa engañó sobre sus capacidades criptográficas y diseñó su software priorizando la fricción mínima (que fuera 'fácil de usar') ignorando por completo el modelado de amenazas contra el acoso y la privacidad de menores.",
    con: "Zoom fue prohibido temporalmente por empresas de todo el mundo y escuelas en Nueva York. Fueron demandados por la FTC de EE.UU., obligándolos a detener nuevas funcionalidades por 90 días para enfocarse únicamente en parchar y mejorar la seguridad.",
    lec: "En el desarrollo de software, la 'facilidad de uso' nunca debe comprometer la seguridad por defecto. Si afirmas que tu producto es 'End-to-End Encrypted', debe ser criptográficamente verdadero, o cometes fraude."
  },
  {
    title: "Robo de Datos de Sony Pictures",
    ctx: "Diciembre de 2014 en California, EE.UU. El estudio Sony Pictures preparaba el estreno de 'The Interview', una película de comedia sobre el asesinato del líder norcoreano Kim Jong-un.",
    inc: "Hackers asociados al gobierno de Corea del Norte se infiltraron en Sony, borrando servidores enteros, robando películas sin estrenar, miles de correos electrónicos corporativos altamente sensibles, sueldos de actores e historiales médicos de empleados.",
    tec: "El grupo atacante, llamado 'Guardians of Peace', usó malware de borrado de discos (wiper) e ingeniería social. La red corporativa de Sony era plana (sin segmentación de red), las contraseñas se guardaban en archivos de texto plano llamados 'Passwords.doc', y carecían de autenticación de dos factores (2FA).",
    eti: "La total negligencia de la dirección de TI, que operaba con una deuda de ciberseguridad monumental. Expusieron a miles de sus propios empleados al escrutinio público mundial de sus correos privados por no invertir en arquitectura segura.",
    con: "Sony perdió más de 35 millones de dólares solo en reparación de sistemas, enfrentó renuncias masivas de altos ejecutivos expuestos en los correos y una crisis diplomática entre Estados Unidos y Corea del Norte.",
    lec: "La seguridad interna de la red (Intranet) debe asumir que ya está vulnerada (Modelo Zero Trust). Almacenar secretos en texto plano y no segmentar redes es una falta grave a las normativas modernas."
  },
  {
    title: "Discriminación en Anuncios de Vivienda de FB",
    ctx: "Ocurrió entre 2016 y 2019 en Estados Unidos. El portal de anuncios de Facebook era la mayor herramienta de publicidad digital para empresas inmobiliarias.",
    inc: "Investigadores descubrieron que Facebook permitía a las empresas de vivienda crear campañas publicitarias donde explícitamente se excluía (no se les mostraba el anuncio) a afroamericanos, hispanos o madres solteras.",
    tec: "La herramienta publicitaria incluía una función de 'Afinidades Multiculturales' alimentada por el algoritmo de IA de la empresa. Facebook permitía usar ese parámetro en la sección de 'Excluir público', automatizando la segregación racial a gran escala.",
    eti: "La empresa proporcionó las herramientas técnicas perfectas para cometer discriminación ilegal masiva bajo la ley estadounidense (Fair Housing Act). Priorizaron la rentabilidad de las campañas hiper-segmentadas sobre los derechos civiles básicos.",
    con: "El Departamento de Vivienda de EE.UU. (HUD) y la ACLU demandaron a Facebook. La plataforma fue forzada a eliminar por completo los parámetros demográficos, raciales y de edad para cualquier anuncio relacionado a vivienda, empleo y crédito.",
    lec: "Los desarrolladores que construyen sistemas de segmentación deben prever el uso abusivo de su herramienta. Codificar variables que facilitan la violación de derechos civiles hace a la plataforma legalmente responsable."
  },
  {
    title: "Vulnerabilidad Heartbleed (OpenSSL)",
    ctx: "Descubierto en abril de 2014 a nivel global. El internet seguro depende del protocolo SSL/TLS, específicamente de la librería de código abierto OpenSSL, utilizada en el 66% de los servidores web mundiales en aquel entonces.",
    inc: "Un error de código que pasó desapercibido por dos años permitió a los atacantes leer la memoria secreta de millones de servidores web, robando silenciosamente contraseñas, mensajes privados y las llaves privadas criptográficas de los sitios web (como Yahoo o bancos).",
    tec: "El fallo estaba en la función 'Heartbeat'. El cliente le decía al servidor: 'Envíame esta palabra de 4 letras', pero le mentía pidiéndole que le devolviera 64 kilobytes de memoria. El servidor, escrito en lenguaje C sin comprobación de límites (bounds checking), enviaba de vuelta los 64kb de memoria RAM adyacente, la cual contenía los secretos no cifrados.",
    eti: "Reveló la cruda realidad del código abierto: una infraestructura digital crítica global sostenida por un par de voluntarios mal pagados, mientras corporaciones multimillonarias usaban el código gratis sin aportar recursos para auditarlo.",
    con: "Forzó a todo el planeta a revocar llaves SSL y parchar servidores de emergencia, costando unos 500 millones de dólares globalmente. Impulsó la creación de fundaciones como la 'Core Infrastructure Initiative' para financiar la seguridad del software libre.",
    lec: "Las corporaciones que lucran utilizando código abierto deben financiar su seguridad y mantenimiento. A nivel técnico, usar lenguajes con gestión segura de memoria (como Rust) previene el 70% de este tipo de fallos."
  },
  {
    title: "El Bug Y2K (El efecto 2000)",
    ctx: "Sucedió en la década de 1990 culminando en el 31 de diciembre de 1999 a nivel global. Los sistemas informáticos más críticos del mundo habían sido programados en los 60s y 70s.",
    inc: "El miedo masivo a que, al llegar el año 2000, los sistemas bancarios, aviones, satélites y centrales nucleares colapsaran o regresaran al año 1900, provocando un apocalipsis digital y paralizando el planeta.",
    tec: "Para ahorrar costoso espacio de memoria en las computadoras antiguas (Mainframes de IBM), los programadores almacenaban los años con solo dos dígitos (ej: '98' en vez de '1998'). Cuando los relojes pasaran de '99' a '00', la lógica del software deduciría años negativos o cálculos de interés imposibles.",
    eti: "La miopía del diseño de software. Los ingenieros originales asumieron que su código sería reemplazado antes del nuevo milenio, ignorando la brutal resiliencia del 'código heredado' (legacy code) en la infraestructura mundial.",
    con: "Los gobiernos y empresas invirtieron más de 300.000 millones de dólares en auditorías masivas de millones de líneas de código COBOL para corregir el problema. Gracias al inmenso trabajo, casi nada falló el 1 de enero, aunque los programadores no recibieron el reconocimiento adecuado.",
    lec: "El código suele vivir y ejecutarse mucho más tiempo del que su creador imaginó originalmente. Las estructuras de datos (como el tipo fecha o timestamp) deben diseñarse pensando en límites centenarios para no heredar deuda técnica catastrófica."
  },
  {
    title: "El Fracaso del NHS IT System (UK)",
    ctx: "A partir de 2002 en el Reino Unido. El gobierno británico inició el 'National Programme for IT', el proyecto informático civil más grande y ambicioso del mundo, destinado a digitalizar todos los historiales médicos de la salud pública (NHS).",
    inc: "Después de 9 años de retrasos, caídas del sistema, software que no funcionaba en los hospitales y médicos negándose a usarlo, el gobierno canceló todo el proyecto, desperdiciando miles de millones de libras esterlinas.",
    tec: "Fue un desastre de arquitectura monolítica e ingeniería de requerimientos. El diseño fue hecho bajo la metodología 'en cascada' (Waterfall) por contratistas que nunca consultaron a los verdaderos usuarios finales (médicos y enfermeras). Los sistemas eran incompatibles entre hospitales.",
    eti: "El gobierno y las consultoras de software ocultaron sistemáticamente los problemas técnicos durante años para no perder los contratos políticos multimillonarios, mientras los médicos alertaban que la mala sincronización de historiales ponía en riesgo la vida de pacientes.",
    con: "El programa fue desmantelado en 2011 tras haber gastado aproximadamente 10.000 millones de libras de los contribuyentes, convirtiéndose en el mayor fracaso informático de la historia pública británica.",
    lec: "Nunca construyas sistemas masivos monolíticos (top-down) para organizaciones complejas sin usar metodologías ágiles y sin consultar continuamente a los usuarios finales operativos."
  },
  {
    title: "Manipulación de Emociones en Facebook (Contagio)",
    ctx: "Ocurrió en 2012 y fue publicado en 2014 en Estados Unidos. Facebook se asoció con académicos para realizar experimentos masivos sobre la psicología de sus usuarios.",
    inc: "Facebook alteró en secreto los algoritmos del muro de noticias (News Feed) de unas 689.000 personas al azar. A la mitad le mostraron casi puras noticias tristes y a la otra mitad noticias felices, para ver si las personas publicaban cosas similares.",
    tec: "Una manipulación del algoritmo de recomendación basada en variables psicológicas y sentimentales, demostrando lo que llamaron 'contagio emocional masivo' a través de la infraestructura de una red social.",
    eti: "El mayor experimento psicológico no consentido de la era moderna. Modificaron deliberadamente el estado emocional de cientos de miles de personas, incluyendo posiblemente a usuarios con depresión clínica, violando los códigos éticos de la investigación humana al no obtener consentimiento informado.",
    con: "Provocó indignación global y una revisión académica. Múltiples gobiernos abrieron comisiones de privacidad, obligando a las redes sociales a establecer 'Juntas de Revisión Ética' internas antes de hacer experimentos A/B que alteren percepciones humanas.",
    lec: "Los usuarios no son ratas de laboratorio. Alterar intencionalmente lo que ve una persona en internet para manipular su estado de ánimo sin su conocimiento cruza la línea de la moralidad tecnológica."
  },
  {
    title: "Sesgo en Reconocimiento Facial de Google Photos",
    ctx: "Sucedió en el año 2015 a nivel global, poco después de que Google Photos lanzara su aclamada función de etiquetado automático de imágenes basada en inteligencia artificial.",
    inc: "Un desarrollador de software afroamericano reportó con horror en Twitter que el algoritmo de inteligencia artificial de Google Photos había clasificado y etiquetado automáticamente las fotografías de él y sus amigas afroamericanas en una carpeta llamada 'Gorilas'.",
    tec: "El modelo de visión por computadora (Computer Vision) fue entrenado predominantemente con fotografías de personas blancas y carecía de muestras diversas y representativas en su conjunto de datos de entrenamiento (Dataset Bias), fallando estrepitosamente en la clasificación de tonos de piel oscuros.",
    eti: "Demostró la insensibilidad estructural de los equipos de desarrollo poco diversos. Lanzar un producto que reproduce clasificaciones racistas y deshumanizantes devalúa la dignidad humana y expone el peligro del sesgo ciego en la IA.",
    con: "Google emitió disculpas urgentes. Sin embargo, su solución técnica fue simplemente borrar permanentemente las palabras 'gorila', 'chimpancé' y 'mono' del vocabulario de búsqueda de la aplicación durante años, porque no pudieron solucionar el algoritmo de forma segura inmediatamente.",
    lec: "Las IA son el espejo de los datos con los que son entrenadas. Un equipo de ingeniería diverso y un escrutinio exhaustivo de los sesgos demográficos en los conjuntos de datos son obligatorios antes de cualquier lanzamiento comercial."
  },
  {
    title: "Silk Road y la Venta Ilegal en la Dark Web",
    ctx: "Operó entre 2011 y 2013 en el internet profundo (Dark Web). Su creador, el estadounidense Ross Ulbricht, operaba bajo el alias 'Dread Pirate Roberts'.",
    inc: "El portal 'Silk Road' se convirtió en el 'Amazon' de las drogas ilegales, armas y servicios de ciberataques, traficando cientos de millones de dólares evadiendo a las autoridades policiales mundiales.",
    tec: "La arquitectura del portal revolucionó el cibercrimen combinando dos tecnologías de anonimato absoluto: el enrutamiento cebolla del navegador TOR (para ocultar los servidores IP) y el uso temprano de Bitcoin como única moneda de cambio, garantizando transacciones no rastreables.",
    eti: "El fundador argumentaba ideales libertarios puros, asegurando que el estado no debía controlar el mercado de drogas. Pero, éticamente, la plataforma facilitó adicciones masivas, el narcotráfico global sin fricción y Ulbricht incluso pagó a sicarios de la Dark Web para asesinar a personas que amenazaron con delatarlo.",
    con: "El FBI logró hackear y rastrear el servidor real. Ross Ulbricht fue arrestado en una biblioteca pública, la plataforma fue incautada y Ulbricht fue condenado a cadena perpetua sin posibilidad de libertad condicional.",
    lec: "Las tecnologías diseñadas para la privacidad extrema y el anonimato total pueden convertirse en habilitadores masivos de destrucción social y crimen organizado si no existe un equilibrio con la trazabilidad legal."
  },
  {
    title: "Luna/Terra Crypto Crash Algorítmico",
    ctx: "Mayo de 2022 a nivel mundial. El desarrollador Do Kwon había creado el ecosistema de criptomonedas Terra, que incluía la 'moneda estable' algorítmica UST, valorada en 40.000 millones de dólares.",
    inc: "En cuestión de tres días, el ecosistema colapsó a cero. Millones de pequeños inversores alrededor del mundo perdieron absolutamente todos los ahorros de su vida, causando una crisis financiera devastadora y varios suicidios reportados.",
    tec: "El UST no estaba respaldado por dinero real (dólares en un banco), sino por un algoritmo complejo vinculado a la moneda hermana LUNA. Cuando el mercado bajó un poco, el algoritmo entró en una 'espiral de la muerte', mintiendo e imprimiendo billones de LUNA automáticamente para intentar salvar a UST, diluyendo el valor de ambas a cero.",
    eti: "El creador, Do Kwon, ignoró las advertencias de economistas e informáticos que le indicaron matemáticamente los defectos de su sistema. En su lugar, insultaba a los críticos en Twitter, demostrando una arrogancia fatal que arrastró a personas comunes a la quiebra.",
    con: "Se destruyeron 60.000 millones de dólares de la criptoeconomía en una semana. Do Kwon se fugó internacionalmente hasta ser capturado en Montenegro, enfrentando extradición y cargos criminales por fraude a gran escala.",
    lec: "Los contratos inteligentes (Smart Contracts) y el código financiero algorítmico nunca deben lanzarse a operar la economía de millones de personas sin modelos matemáticos de simulación de estrés bajo el peor escenario posible (Stress Testing)."
  },
  {
    title: "Algoritmos de Recomendación de YouTube (Radicalización)",
    ctx: "Sucedió especialmente a finales de la década de 2010 a nivel mundial. YouTube, propiedad de Google, competía por mantener a los usuarios en la pantalla la mayor cantidad de horas posibles.",
    inc: "El algoritmo de YouTube empezó a recomendar sistemáticamente videos de teorías conspirativas, antivacunas, supremacismo y extremismo político, arrastrando a millones de usuarios por un 'agujero de conejo' de radicalización para mantenerlos enganchados.",
    tec: "El algoritmo de recomendación ('Watch Next') utilizaba Inteligencia Artificial con una única métrica de optimización ('función de recompensa'): Maximizar el Tiempo de Visualización ('Watch Time'). La IA descubrió que el contenido inflamatorio e indignante era lo más efectivo para que el cerebro humano siguiera haciendo clic.",
    eti: "La empresa priorizó el tiempo en pantalla y los ingresos publicitarios sobre la salud mental pública y la estabilidad democrática, ignorando las alarmas de sus propios investigadores sobre cómo polarizaban activamente a la sociedad.",
    con: "Los medios y los gobiernos criticaron ferozmente a YouTube. Tuvieron que reprogramar su algoritmo para reducir la propagación de 'contenido límite' (borderline content) y promocionar fuentes de noticias verificadas.",
    lec: "La IA optimizará exactamente la métrica que le indiques sin importarle el costo ético. Si optimizas solo por el 'tiempo de retención' en redes sociales, el algoritmo inevitablemente descubrirá y promoverá la indignación humana."
  },
  {
    title: "Robodebt (Australia): Falsas Deudas Automatizadas",
    ctx: "Ocurrió entre 2015 y 2019 en Australia. El gobierno lanzó un esquema de automatización para recuperar supuestos pagos de asistencia social indebidos pagados a los ciudadanos.",
    inc: "Un sistema algorítmico, apodado 'Robodebt', acusó erróneamente a más de 400.000 ciudadanos vulnerables de deber dinero al gobierno, enviando cartas automáticas de cobranza agresivas por deudas que en realidad no existían, empujando a muchos a la angustia e incluso al suicidio.",
    tec: "El sistema tomaba los ingresos anuales de la oficina de impuestos y los dividía por 26 semanas, comparándolos con los reportes de ingresos quincenales del ciudadano (Income Averaging). Matemáticamente, este promediado plano es incorrecto para las personas que trabajan turnos variables o temporales, generando discrepancias y alertas falsas en el 20% de los casos.",
    eti: "El gobierno revirtió la carga de la prueba sobre ciudadanos empobrecidos, obligándolos a demostrarle a una máquina implacable que no debían dinero de años atrás, sin tener un agente humano disponible para corregir los fallos.",
    con: "El programa fue declarado ilegal por los tribunales australianos. El gobierno tuvo que pedir perdón, cancelar deudas y pagar una compensación de 1.800 millones de dólares en la mayor demanda colectiva de la historia del país.",
    lec: "Automatizar la burocracia estatal basándose en supuestos matemáticos incorrectos destruye la confianza pública. Las máquinas no deben tener la capacidad de iniciar procesos penales o de cobranza sin revisión humana final."
  },
  {
    title: "Fallos de Seguridad en Cámaras Ring de Amazon",
    ctx: "Ocurrió a finales de 2019 en varios hogares de Estados Unidos. Ring es una popular marca de cámaras de seguridad inteligentes propiedad de Amazon, instaladas en puertas y dormitorios.",
    inc: "Cientos de cámaras fueron hackeadas remotamente. Hubo incidentes donde extraños observaban a niños pequeños en sus habitaciones, les hablaban por el altavoz de la cámara insultándolos y tocaban música aterradora para aterrorizar familias.",
    tec: "Ring no obligaba a sus usuarios a usar contraseñas fuertes ni autenticación de dos factores (2FA). Los atacantes usaron bases de datos filtradas en la dark web de otras páginas web para ejecutar ataques de relleno de credenciales (Credential Stuffing), iniciando sesión exitosamente en miles de cuentas de Ring.",
    eti: "La empresa falló en su deber primario de protección al priorizar que su producto 'IoT' (Internet de las Cosas) se conectara y operara rápidamente (fricción cero) sin educar ni obligar a los clientes inexpertos a aplicar la ciberseguridad básica en el interior de sus hogares.",
    con: "Amazon Ring fue demandada en acción colectiva y condenada por la FTC a pagar multas millonarias, además de verse obligada legalmente a hacer que la autenticación de dos factores (2FA) fuera obligatoria en todos sus dispositivos domésticos.",
    lec: "Las empresas que desarrollan hardware para el Internet de las Cosas (IoT) están obligadas éticamente a forzar a los usuarios a configurar entornos seguros por defecto (Security by Default), especialmente con dispositivos de videovigilancia íntima."
  },
  {
    title: "Log4j: La Vulnerabilidad Omnipresente",
    ctx: "Diciembre de 2021 a nivel mundial. Log4j es una diminuta librería de código abierto en Java que se usaba (sin que muchos lo supieran) en millones de sistemas: desde los servidores de iCloud, hasta videojuegos como Minecraft.",
    inc: "Se descubrió un fallo de 'Día Cero' conocido como Log4Shell (CVE-2021-44228). Con solo escribir una línea de código específica en la caja de chat de Minecraft o en la caja de login de un sitio web, un atacante podía tomar control absoluto y remoto de los servidores de la empresa.",
    tec: "El fallo se debió a que la librería Log4j procesaba de manera insegura las cadenas de texto ingresadas. Una funcionalidad poco conocida llamada JNDI (Java Naming and Directory Interface) permitía que, al recibir un formato como '${jndi:ldap://...}', el servidor contactara al atacante y ejecutara su código malicioso sin restricciones.",
    eti: "Reveló la profunda fragilidad de la cadena de suministro del software moderno, donde corporaciones multimillonarias construyen sistemas críticos dependiendo de librerías gratuitas mantenidas por un par de desarrolladores de código abierto en su tiempo libre.",
    con: "Causó el mayor pánico de ciberseguridad de la década. Los ingenieros de todas las empresas del planeta pasaron las festividades de Navidad escaneando sus sistemas heredados para parchar urgentemente este agujero antes de que hackers y agencias rusas de ransomware secuestraran internet.",
    lec: "La validación y el saneamiento estricto de entradas de texto (Input Sanitization) es la regla número uno en programación. Además, debes tener un inventario completo de tus dependencias (Software Bill of Materials) para saber dónde eres vulnerable."
  },
  {
    title: "Tesla Autopilot y Accidentes Mortales",
    ctx: "Desde 2016 en adelante, principalmente en carreteras de Estados Unidos. Tesla Motors lanzó el hardware y software de asistencia a la conducción avanzada, bautizado comercialmente como 'Autopilot'.",
    inc: "Varios conductores de Tesla fallecieron tras chocar violentamente contra camiones con remolque blancos cruzados en la autopista y divisores de carriles de cemento, porque el automóvil aceleró a fondo en lugar de frenar estando el Autopilot encendido.",
    tec: "El Autopilot dependía principalmente de algoritmos de visión por computadora basados en cámaras. En condiciones de luz brillante, el software no pudo distinguir entre el cielo blanco resplandeciente y el costado blanco brillante de un camión cruzando la carretera, generando falsos negativos letales.",
    eti: "La estrategia engañosa de marketing. Al nombrar el sistema como 'Autopilot' o 'Conducción Autónoma Total' y mostrar videos sin intervención, Tesla incentivó a los usuarios a soltar el volante y desatender la carretera, a pesar de que el manual pequeño decía que la tecnología era solo Nivel 2 y requería atención.",
    con: "La Junta Nacional de Seguridad en el Transporte (NTSB) de EE.UU. investigó múltiples fatalidades, culpando al conductor por complacencia, pero también atacando duramente a Tesla por no diseñar un software que monitoreara obligatoriamente la atención de los ojos y manos del humano.",
    lec: "Si nombras y publicitas un software como 'autónomo', la gente asumirá que lo es. Las interfaces que delegan decisiones críticas deben tener bloqueos duros (Hardware-in-the-loop) para evitar el abuso peligroso del usuario por falsa seguridad."
  },
  {
    title: "Gamergate y el Acoso en Línea",
    ctx: "Ocurrió alrededor de 2014 en Estados Unidos, esparciéndose mundialmente. Involucró a la industria de los videojuegos, foros como 4chan y Reddit, desarrolladoras de juegos y periodistas del sector.",
    inc: "Bajo la excusa de la 'ética en el periodismo de videojuegos', se desencadenó una campaña masiva y coordinada de terror, misoginia y acoso cibernético (doxxing y amenazas de muerte) contra mujeres desarrolladoras de videojuegos, como Zoë Quinn y Brianna Wu.",
    tec: "El acoso fue habilitado por la falta de herramientas de moderación, control de anonimato y sistemas anti-doxxing en plataformas de redes sociales (Twitter, foros). Los atacantes usaron la ingeniería social a escala y redes de bots para inundar y secuestrar la arquitectura de estas páginas web con contenido tóxico coordinado.",
    eti: "Expuso la terrible apatía de las grandes plataformas tecnológicas. Las empresas habían diseñado sus arquitecturas de comunicación asumiendo el 'utopismo de la libertad de expresión', sin prever ni mitigar los ataques de odio masivo contra mujeres.",
    con: "Forzó a las víctimas a huir de sus casas por el temor a ser asesinadas. Cambió el rumbo de la industria, obligando a plataformas como Twitter a reescribir sus políticas de odio, crear herramientas de bloqueo masivo (Blocklists) y desarrollar filtros de acoso automatizado.",
    lec: "Si construyes una plataforma de comunicación sin diseño ético y sin mitigación del abuso ('Trust and Safety'), los grupos extremistas usarán tu tecnología como un arma contra las minorías."
  },
  {
    title: "Rastreo de Ubicación Oculto de Google",
    ctx: "Descubierto en 2018 a nivel mundial, afectando a la mayoría de los usuarios de teléfonos Android y a los usuarios del buscador de Google en iPhone (casi 2.000 millones de personas en ese momento).",
    inc: "Investigadores de Associated Press descubrieron que, aunque los usuarios ingresaban explícitamente a los ajustes de su celular y desactivaban el interruptor de 'Historial de ubicaciones', Google seguía rastreando y almacenando secretamente todos sus movimientos diarios en el mundo real.",
    tec: "Una trampa en la arquitectura del almacenamiento en la nube de cuentas de Google. Aunque el usuario apagaba la ubicación principal, otra opción enterrada en un menú oscuro, llamada 'Actividad web y de aplicaciones' (la cual venía activada por defecto), seguía subiendo las coordenadas del GPS secretamente con cada consulta meteorológica o uso de Maps.",
    eti: "Un diseño corporativo basado en el engaño y las medias verdades. Google engañó sistemáticamente a las personas haciéndoles creer que tenían privacidad sobre su paradero físico, mientras la empresa seguía lucrando vendiendo anuncios hiper-geolocalizados.",
    con: "Generó demandas por fraude de privacidad en varios países. Tras varios años de batallas legales, en 2022 Google acordó pagar 391.5 millones de dólares de multa a 40 estados de EE.UU. y fue obligada a cambiar drásticamente cómo recaba datos de ubicación en Android.",
    lec: "Las interfaces de configuración de privacidad deben ser transparentes e inequívocas. Ocultar el rastreo permanente bajo opciones de menú no relacionadas es un patrón de diseño malicioso e ilegal."
  },
  {
    title: "Flash Crash de 2010 (Trading Algorítmico)",
    ctx: "El 6 de mayo de 2010 en la bolsa de valores de Wall Street, Estados Unidos. El mercado estaba siendo dominado recientemente por firmas de operaciones bursátiles de Alta Frecuencia (HFT).",
    inc: "En solo 36 minutos, el mercado de valores estadounidense colapsó violentamente y sin explicación. Acciones de empresas multimillonarias pasaron de valer 40 dólares a 1 centavo, destruyendo casi 1 billón de dólares en valor de mercado, para luego rebotar a la normalidad casi al instante.",
    tec: "El colapso fue desatado cuando un operador vendió un enorme bloque de contratos de futuros. Esto engañó a los cientos de algoritmos de Trading de Alta Frecuencia automatizados en Wall Street, los cuales detectaron una caída, crearon un bucle de retroalimentación positivo y comenzaron a vender todo en pánico a la velocidad de la luz, sin supervisión humana.",
    eti: "La excesiva dependencia del mundo financiero hacia robots (algoritmos matemáticos) operando en milisegundos, totalmente desconectados del valor real de las empresas, sacrificando la estabilidad económica por márgenes de micro-segundos.",
    con: "Los reguladores del mercado de valores descubrieron su incapacidad para controlar la velocidad digital. Tuvieron que instalar mecanismos técnicos llamados 'Circuit Breakers' (Rompecircuitos) obligatorios que detienen automáticamente todo el comercio de Wall Street si los precios varían un 7% en un día.",
    lec: "Un sistema compuesto de cientos de algoritmos compitiendo en tiempo real sin una intervención de freno central provocará inevitablemente cascadas sistémicas y colapsos fractales ('Flash crashes')."
  },
  {
    title: "Censura de Reddit y la Política de Contenidos",
    ctx: "Ocurrió principalmente a mediados de 2015 a nivel global, afectando al foro de internet 'Reddit', uno de los sitios más visitados del mundo, durante la gestión de su CEO interina Ellen Pao.",
    inc: "La directiva decidió implementar una nueva política ética para erradicar el acoso rampante de la plataforma, baneando foros masivos altamente tóxicos y discriminatorios (como 'fatpeoplehate'). La comunidad de usuarios reaccionó violentamente en protesta por la censura.",
    tec: "El modelo descentralizado de moderación de Reddit (delegando el poder a miles de moderadores voluntarios) fue el centro del conflicto técnico. La plataforma carecía de herramientas nativas de inteligencia artificial que mitigaran la toxicidad, dejando la guerra cultural a merced de brigadas organizadas de usuarios y administradores superados.",
    eti: "Un debate ético clásico sobre los límites de la Libertad de Expresión ('Free Speech') en plataformas corporativas versus la protección de minorías y usuarios vulnerables contra el acoso y el discurso de odio sistemático organizado.",
    con: "La plataforma colapsó en el caos cuando miles de usuarios coordinaron ataques de spam masivo y amenazas misóginas extremas contra la CEO. Ellen Pao tuvo que dimitir de su cargo, pero su sacrificio logró que Reddit instaurara las estrictas políticas anti-acoso que rigen hoy.",
    lec: "Las plataformas descentralizadas de internet eventualmente se ven forzadas a decidir si son un refugio sin reglas para el extremismo, o un negocio corporativo que debe proteger proactivamente a los sectores marginados."
  },
  {
    title: "Tinder y la Discriminación de Precios por Edad",
    ctx: "Sucedió en 2018 y años posteriores a nivel global. Tinder, la aplicación de citas número uno del mercado, monetizaba a través de su servicio Premium 'Tinder Plus'.",
    inc: "Los usuarios y agencias gubernamentales de derechos descubrieron que Tinder les estaba cobrando precios completamente diferentes por exactamente el mismo servicio digital. Los usuarios mayores a 30 años tenían que pagar hasta el doble de la tarifa (19.99$) que los menores de 29 años (9.99$).",
    tec: "Implementaron un modelo de precios dinámicos oculto incrustado en el código fuente de pago de la aplicación (Paywall). El algoritmo leía automáticamente la edad del usuario desde la autenticación de Facebook o su registro interno para ajustar y mostrar la capa de precios penalizada (age-based price steering).",
    eti: "Discriminación arbitraria disfrazada de estrategia comercial técnica. La empresa justificó argumentando que los jóvenes 'tenían menos presupuesto', pero en realidad explotaba injustamente la vulnerabilidad y la desesperación demográfica de los usuarios mayores en el ecosistema de las citas modernas.",
    con: "Tinder enfrentó demandas colectivas devastadoras en California y sentencias legales por discriminación de edad. En 2022, Tinder anunció mundialmente que eliminaría por completo todos los cobros diferenciales basados en la edad de los usuarios.",
    lec: "Segmentar precios usando parámetros inmutables como la raza, el género o la edad para un bien o servicio digital idéntico constituye un abuso legal y ético de la algoritmia de ingresos."
  },
  {
    title: "El Escándalo de FTX y Alameda Research",
    ctx: "Noviembre de 2022, entre Bahamas y Estados Unidos. Fue el epicentro financiero del colapso global de las criptomonedas, orquestado por el joven cripto-billonario Sam Bankman-Fried (SBF).",
    inc: "Se reveló que FTX, el segundo exchange de criptomonedas más grande del planeta, no tenía los fondos de sus clientes. Habían transferido secretamente 8.000 millones de dólares de sus clientes a Alameda Research, su propia empresa de comercio, la cual perdió todo en apuestas altamente riesgosas.",
    tec: "A nivel técnico, Sam Bankman-Fried alteró personalmente la base de código del motor de liquidación (liquidation engine) de la plataforma de exchange usando una función secreta de excepción (Auto-liquidation exemption). Esto impidió que el software detuviera automáticamente las cuentas en pérdida de Alameda, permitiéndole extraer fondos infinitos sin saltar las alarmas.",
    eti: "El peor fraude contable de la década disfrazado de 'complejidad cripto'. Los directivos abusaron de la opacidad técnica y organizaron charlas sobre el 'altruismo efectivo' (donar su riqueza), mientras robaban fríamente el dinero, destruyendo vidas enteras y pervirtiendo el propósito de la descentralización financiera.",
    con: "FTX se declaró en quiebra. SBF fue arrestado, extraditado, enjuiciado por 7 cargos penales federales de estafa masiva y condenado a 25 años en una prisión federal. El mundo cripto perdió total credibilidad y los reguladores intervinieron.",
    lec: "Las puertas traseras insertadas intencionalmente en el código fuente (Hardcoded Backdoors) para saltarse reglas contables de software, sea en Web2 o Web3, son actos criminales evidentes. La contabilidad técnica inmutable es innegociable."
  },
  {
    title: "Discord y la Moderación de Extremismo",
    ctx: "Ocurrió de forma notoria en agosto de 2017 en Estados Unidos, durante el violento mitin supremacista blanco de 'Unite the Right' en Charlottesville, Virginia.",
    inc: "La plataforma de chat para jugadores Discord fue el centro neurálgico donde los grupos neo-nazis coordinaron la logística en tiempo real, reclutaron participantes y planificaron tácticas de asalto durante semanas y días antes de que las protestas culminaran en la muerte de Heather Heyer.",
    tec: "El modelo arquitectónico centralizado de Discord, con canales de voz pseudo-privados, generó un 'espacio ciego' donde los extremistas organizaban acciones paramilitares de manera anónima porque el software original de la empresa carecía de herramientas de inteligencia artificial proactivas (Machine Learning Safety Models) para moderar el odio coordinado en los foros masivos.",
    eti: "Discord ignoró activamente el crecimiento del contenido radical en su plataforma bajo la premisa de la 'neutralidad de los gamers' y su falta de responsabilidad como infraestructura (Safe Harbor). Fueron cómplices indirectos de la violencia física organizada en sus servidores de chat.",
    con: "Bajo extrema presión social, Discord cerró y baneó para siempre los servidores de extrema derecha la misma noche de los ataques. Tras la tragedia, gastaron el 15% del total de los empleados de la compañía en crear un enorme departamento de Seguridad y Confianza (Trust & Safety).",
    lec: "No existe la neutralidad cuando la infraestructura técnica es la base operativa de crímenes violentos. Construir grandes redes de usuarios sin integrar presupuestos gigantescos para moderación y filtrado automatizado es negligencia social."
  },
  {
    title: "Robinhood y el GameStop Short Squeeze",
    ctx: "Ocurrió en enero de 2021 en EE.UU. Millones de inversores minoristas del foro 'WallStreetBets' de Reddit comenzaron a comprar masivamente acciones de tiendas como GameStop (GME), hundiendo a los grandes fondos de Wall Street que habían apostado a que quebrarían.",
    inc: "En pleno apogeo y frenesí de compra, la aplicación financiera Robinhood, promocionada para 'democratizar las finanzas', bloqueó abruptamente el botón de 'Comprar' para millones de pequeños inversores. Solo les permitían 'Vender', manipulando el mercado para que el precio se desplomara y salvando a los gigantes institucionales.",
    tec: "Técnicamente, el problema fue la sub-capitalización del lado de la compensación financiera de la plataforma de bolsa (Clearing House Collateral). Como los volúmenes aumentaron mil veces su capacidad esperada de la noche a la mañana (DDoS financiero no intencional), el algoritmo automatizado de la casa de compensación DTCC obligó a Robinhood a depositar 3.000 millones de dólares esa mañana o serían desconectados del mercado central. No los tenían.",
    eti: "El conflicto de intereses fue profundo. Robinhood ganaba su dinero vendiendo los datos de las compras de sus usuarios ('Payment for Order Flow') a Citadel Securities, el mismo gigante financiero que estaba siendo devorado en la bolsa, revelando que en el software gratuito, los pequeños usuarios son el producto explotado.",
    con: "Decenas de audiencias del Congreso de EE.UU., demandas colectivas por manipulación de mercado masiva e investigaciones sobre fraude bursátil. El CEO debió comparecer ante legisladores y el modelo de negocio del mercado digital minorista fue examinado duramente.",
    lec: "El diseño del backend y el límite de tolerancia de las integraciones con APIs externas críticas debe estar alineado a escenarios de 'Cisne Negro'. Restringir abruptamente las operaciones técnicas para salvar el negocio corporativo destruye eternamente la confianza en las plataformas financieras."
  },
  {
    title: "Ataque Informático a Colonial Pipeline",
    ctx: "Ocurrió en mayo de 2021 en Estados Unidos. Colonial Pipeline es la empresa que opera el mayor sistema de oleoductos para combustible de gasolina y diésel de la Costa Este de los EE.UU.",
    inc: "Hackers atacaron las redes informáticas de la empresa obligándola a apagar por completo los oleoductos durante cinco días. Esto generó pánico civil, falta de gasolina en miles de estaciones y declaraciones de emergencia estatal en toda la costa.",
    tec: "Los cibercriminales, un grupo ruso llamado DarkSide, usaron un ataque de Ransomware como servicio (RaaS). Entraron utilizando una cuenta de VPN antigua e inactiva de la empresa que no contaba con Autenticación de Dos Factores (2FA). Tras entrar, encriptaron los sistemas de contabilidad del oleoducto.",
    eti: "El dilema corporativo principal frente al secuestro digital: ¿Negociar y pagar rescates a criminales, promoviendo esta práctica industrial internacional, o paralizar la infraestructura vital de todo un país esperando descifrar el servidor? Colonial optó por lo primero.",
    con: "Colonial Pipeline pagó 4.4 millones de dólares en criptomonedas como rescate (parte del cual fue recuperado luego por el FBI). Fue un evento catalizador que forzó al gobierno de Biden a emitir regulaciones federales durísimas obligando a reportar ciberataques en la infraestructura crítica de la nación.",
    lec: "No deshabilitar las cuentas de exempleados (Offboarding) y no exigir autenticación de dos pasos (MFA/2FA) puede paralizar infraestructuras físicas críticas enteras de un país, demostrando que la deuda técnica en ciberseguridad corporativa es también un riesgo vital de seguridad nacional."
  }
];
