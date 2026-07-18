# Guión Oficial de Sustentación y Flujo de Demostración

**Equipo:**
- **Luis Arhian (Lucho):** Introducción y Contexto (Slides 1 a 3)
- **Alan Samuel (Gordo):** Solución Teórica y Modo Oscuro (Slides 4 a 6)
- **Josué Sebastián (Monito):** Arquitectura Backend, Serverless, Conclusión y **Demo Técnica** (Slides 7 a 9 + Demo)

---

## PARTE 1: EL PROBLEMA (A cargo de Lucho)

### Diapositiva 1: Carátula
**Lucho:** "Buenos días, ingeniero Jorge Luis y compañeros. Hoy nuestro equipo presentará cómo las Tecnologías de la Información impactan el medio ambiente y cómo, desde nuestra ética profesional, estamos aplicando la sostenibilidad directamente en nuestro proyecto: EthiCode."

### Diapositiva 2: El Impacto Oculto
**Lucho:** "Solemos pensar que lo digital está 'en la nube' y no contamina. Sin embargo, la realidad es que el ecosistema digital consume recursos gigantescos. Redes, servidores y dispositivos móviles demandan electricidad 24/7. Como futuros profesionales, la ética nos exige mitigar este impacto oculto."

### Diapositiva 3: ¿A qué nos enfrentamos?
**Lucho:** "Actualmente enfrentamos tres grandes problemas:
1. El inmenso **consumo energético** de los centros de datos.
2. Los **residuos electrónicos**, generados por el hardware desechado constantemente.
3. Y la **huella de carbono**, producida por el tráfico de millones de bytes por segundo.
¿Cómo combatimos esto desde el código? Los dejo con mi compañero Gordo."

---

## PARTE 2: LA SOLUCIÓN Y EL FRONTEND (A cargo de Gordo)

### Diapositiva 4: Green Coding
**Gordo:** "Gracias Lucho. La respuesta a este problema es el **'Green Coding'** (Software Sostenible). Esto significa escribir código pensando en minimizar el consumo de energía. Lo logramos haciendo algoritmos eficientes, optimizando la memoria RAM de los dispositivos, y haciendo que los archivos web sean lo más ligeros posible."

### Diapositiva 5: Nuestro Compromiso (EthiCode)
**Gordo:** "En nuestro proyecto, EthiCode, tomamos decisiones arquitectónicas pensando exactamente en esto. EthiCode no es solo un foro para hablar de ética; la plataforma en sí misma está programada éticamente para cuidar los recursos del usuario."

### Diapositiva 6: Modo Oscuro
**Gordo:** "Nuestra primera acción de sostenibilidad visual es el **Modo Oscuro**. En pantallas modernas como las OLED o AMOLED de los celulares, un píxel negro literalmente se apaga. Al tener un modo oscuro nativo, ahorramos batería directamente en el dispositivo del usuario, lo que a largo plazo extiende la vida útil del equipo y combate la basura electrónica. Ahora Monito les hablará de la ingeniería detrás del proyecto."

---

## PARTE 3: INGENIERÍA, SERVERLESS Y DEMO (A cargo de Monito)

### Diapositiva 7: Eficiencia en la Nube (Firestore)
**Monito:** "Gracias Gordo. Así como optimizamos lo visual, en el 'backend' usamos **Firebase Firestore**. Diseñamos una base de datos NoSQL donde las consultas están **indexadas**. Esto significa que cuando un usuario busca un caso de ética, el servidor no escanea toda la base de datos, va directo al documento exacto. Menos procesamiento en los servidores de Google equivale a menos consumo energético y menos datos gastados por el usuario."

### Diapositiva 8: Arquitectura Serverless (Firebase)
**Monito:** "Pero nuestro mayor logro sostenible es la arquitectura **Serverless (Sin Servidor)**. Históricamente, tú pagabas un servidor físico que estaba prendido y consumiendo electricidad las 24 horas, así no hubiera usuarios. Con Firebase y JavaScript, aplicamos **'Scale-to-Zero' (Escalar a Cero)**. Esto significa que si no hay tráfico en EthiCode, nuestra infraestructura se 'apaga' y el consumo eléctrico cae a cero. Solo gastamos energía en el instante exacto en que alguien hace una petición."

### Diapositiva 9: Conclusión
**Monito:** "En conclusión, la sostenibilidad ya no es opcional, es una obligación ética. Un código eficiente es un código ético. Para demostrarles cómo se ve esto en la práctica, les mostraré rápidamente cómo operan estas tecnologías en nuestro entorno real."

---

## 🛠️ PARTE 4: FLUJO DE LA DEMOSTRACIÓN EN VIVO (A cargo de Monito)

*(Terminas de hablar en la diapositiva 9, dejas de presentar el PPT y compartes pantalla con tu navegador).*

1. **Mostrar el Frontend (Modo Oscuro):**
   * **Acción:** Abre tu proyecto local o el link de EthiCode.
   * **Monito:** *"Aquí tenemos la interfaz de EthiCode. Si uso el botón para cambiar al Modo Oscuro, todo cambia a tonos profundos. Como les explicó Gordo, en un monitor moderno o en un celular OLED, todos estos píxeles oscuros están físicamente apagados o consumiendo el mínimo de miliamperios, ahorrando energía en tiempo real."*

2. **Mostrar Firebase Console (Firestore):**
   * **Acción:** Cambia de pestaña a la consola de Firebase (`console.firebase.google.com`) y entra a tu proyecto, sección **Firestore Database**.
   * **Monito:** *"Y aquí pueden ver nuestra base de datos en la nube. A diferencia de las bases de datos antiguas que son una gran tabla pesada, aquí usamos documentos ligeros.* (Haz clic en una colección, por ejemplo `cases` o `threads`). *Cuando la página carga, Google solo envía los kilobytes exactos de texto que necesitamos. Ni un byte más, ni un byte menos."*

3. **Mostrar Firebase Hosting o Panel de Uso (El concepto Serverless):**
   * **Acción:** Ve al menú izquierdo de Firebase y haz clic en la pestaña de la tuerca verde (Configuración) -> **"Uso y facturación" (Usage)** o directamente muestra la pestaña principal.
   * **Monito:** *"Finalmente, aquí en nuestro panel de uso, podemos comprobar el 'Scale-to-Zero'. Cuando nosotros o los usuarios no estamos interactuando con la página, el consumo de red, CPU y base de datos marca literalmente cero. Los servidores de Google descansan. Solo cuando damos un click, se despiertan fracciones de segundo. Así es como aplicamos la ética ambiental desde la ingeniería. Gracias."*
