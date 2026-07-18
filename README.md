# 🛡️ EthiCode — Portal Web de Ética, Buenas Prácticas y Sostenibilidad en el Desarrollo de Software

<div align="center">
  <h3>Codifica con Responsabilidad: El código que escribimos hoy define la sociedad de mañana.</h3>
  <p><strong>Plataforma integral de formación deontológica, auditoría técnica (Security by Design), moderación comunitaria y sostenibilidad computacional (Green Coding).</strong></p>
</div>

---

## 📌 Descripción General

**EthiCode** es una aplicación web moderna e interactiva desarrollada por estudiantes de la **Escuela Profesional de Ingeniería en Informática y Sistemas** de la **Universidad Nacional Agraria de la Selva (UNAS)** para el curso de *Ética y Práctica Profesional*. 

Su objetivo principal es acortar la brecha existente entre la teoría de la ética profesional y la práctica cotidiana de la ingeniería de software, ofreciendo herramientas forenses, normativas y técnicas para prevenir desastres computacionales ocasionados por negligencia, sesgos algorítmicos o priorización ciega del tiempo de comercialización (*time-to-market*).

---

## 🌟 Características y Módulos Principales

El portal está estructurado en 5 pilares funcionales altamente interactivos:

### 1. 📖 Módulo de Guía Normativa (`/guia`)
* **Código de Ética y Conducta Profesional de la ACM:** Articulación práctica de los deberes de no causar daño (*avoid harm*), honradez, privacidad y justicia.
* **Código de Ética del IEEE:** Responsabilidad social, rechazo del soborno, seguridad de los sistemas e integridad técnica.
* **Marco Legal Peruano (Ley N° 29733):** Aplicación directa de la *Ley de Protección de Datos Personales*, consentimiento informado explícito, principio de finalidad y sanciones de la ANPD.

### 2. 🔬 Catálogo de Casos de Estudio (`/casos`)
Análisis forense estructurado en 6 dimensiones académicas (*Resumen, Contexto, Causa Técnica, Dilema Ético, Impacto y Lecciones / Recomendaciones*) de 7 catástrofes histórico-técnicas:
1. **Escándalo Cambridge Analytica:** Extracción masiva y manipulación psicológica de datos sin consentimiento real.
2. **Therac-25: Radiación Letal:** Condiciones de carrera (*race conditions*), exceso de confianza en software sin *hardware interlocks* y omisión de pruebas de integración.
3. **Boeing 737 MAX y el MCAS:** Ocultamiento intencional de dependencias de sensores de un solo punto de fallo ante pilotos por presiones comerciales.
4. **Sesgo Algorítmico en RRHH de Amazon:** Perpetuación de discriminación de género mediante modelos de Aprendizaje Automático entrenados con datos históricos sesgados.
5. **Clearview AI y el Reconocimiento Facial:** Raspado masivo (*web scraping*) no consentido de imágenes para vigilancia biométrica sin regulación.
6. **Desastre del Ariane 5:** Desbordamiento de entero de 64 a 16 bits (*integer overflow*) y reutilización ciega de software sin validación de requisitos ambientales.
7. **El Gusano Morris:** Primer ataque masivo de denegación de servicio por falta de controles de límites (*buffer overflow*) y ética en la experimentación en redes.

### 3. 📋 Herramienta de Auditoría y Checklist Interactivo (`/checklist`)
* Auditoría práctica de proyectos basada en los principios de **Security by Design** (OWASP) y **Privacy by Design**.
* **Cálculo de Progreso en Tiempo Real:** Barra visual indicadora de conformidad técnica y deontológica.
* **Exportación PDF (`ethicode-report.pdf`):** Generación automática de un informe formal de auditoría y descargo de responsabilidad para adjuntar a entregables de proyectos de software.

### 4. 💬 Foro Comunitario y Sistema de Moderación (`/foro`)
* Espacio de debate y consultoría sobre dilemas morales en la industria (ej. *¿Es ético mantener servidores inactivos 24/7?*, *Automatización vs Desempleo humano*).
* **Autorregulación Comunitaria contra Contenido Obsceno y Fuera de Lugar:** Cada publicación o comentario cuenta con un botón interactivo de **Reportar** (<Flag>). Al hacer clic, se abre una ventana modal donde cualquier desarrollador o usuario de la comunidad puede denunciar lenguaje ofensivo, obscenidades, ciberacoso o publicaciones spam justificando el motivo.
* Las denuncias se envían de forma segura y confidencial a la colección `reports` en Firestore con estado `pending`.

### 5. 🛡️ Panel de Administración y Control Deontológico (`/admin`)
* **Gestión de Reportes (`/admin/reportes`):** Los administradores pueden visualizar la tabla de reportes pendientes, evaluar la evidencia y ejecutar acciones inmediatas: **Resolver** (eliminar la publicación infractora o aplicar sanción) o **Desechar** (si el reporte no procede).
* **Control de Usuarios (`/admin/usuarios`):** Gestión integral de roles (`admin` / `user`) y aplicación de suspensiones disciplinares (`isBanned`), bloqueando el acceso de usuarios sancionados a la creación de contenido en toda la plataforma.

---

## 🌿 Sostenibilidad en TI: Paradigma *Green Coding* con Firebase

A diferencia de los enfoques tradicionales que despliegan servidores monólitos encendidos 24/7 en máquinas virtuales o servidores locales consumiendo energía continua incluso sin tráfico (*idle power waste*), **EthiCode** aplica el principio de **Green Coding** en su arquitectura de nube:

* **Arquitectura Serverless (Sin Servidores bajo demanda):** Integración nativa con **Google Cloud Firebase** (Authentication, Firestore, Storage).
* **Escalado a Cero (`Scale-to-Zero`):** La infraestructura computacional solo consume recursos del procesador y memoria durante los milisegundos exactos en que se procesa una solicitud de lectura/escritura. En periodos de inactividad, el consumo energético de procesamiento se reduce a **cero**.
* **Eficiencia de Carga:** El frontend compilado con Vite y Tailwind v4 produce un paquete ultra optimizado, minimizando la transferencia de bytes por red y reduciendo la huella de carbono digital en dispositivos del usuario final.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Core Frontend** | React 19 + TypeScript | Renderizado de componentes UI tipados y reactivos |
| **Empaquetador** | Vite | Compilación ultrarrápida y recarga en caliente (HMR) |
| **Estilos & Diseño** | Tailwind CSS v4 + Lucide Icons | Sistema de diseño moderno, modo oscuro y micro-animaciones |
| **Base de Datos & Auth** | Firebase v11 (Firestore + Auth) | Backend Serverless en tiempo real, autenticación segura y reglas cloud |
| **Exportación PDF** | `jspdf` + `jspdf-autotable` | Generación del informe de auditoría del Checklist en el navegador |

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* **Node.js** (v18 o superior)
* **npm** (v9 o superior)

### Pasos de Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Sebitafx/portal-etica-ti.git
   cd portal-etica-ti
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu_proyecto
   VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173`.

---

## 🔒 Reglas de Seguridad en Firestore (`firestore.rules`)

El proyecto cuenta con un archivo formal de gobernanza (`firestore.rules`) que aplica seguridad a nivel de motor de base de datos:
* **Anti-Sancionados:** Comprueba que el usuario no esté en la lista de suspendidos (`notBanned()`) antes de permitirle crear hilos, comentarios o reportes.
* **Privacidad de Denuncias:** Solo los usuarios con rol `admin` (`isAdmin()`) pueden leer o modificar la colección `reports`.
* **Integridad de Propietario:** Los usuarios comunes solo pueden modificar o eliminar sus propias publicaciones.

---

## 📄 Documentación Académica y Reporte LaTeX

El informe técnico final del proyecto, elaborado en estricto cumplimiento con las normativas de la **UNAS** y el formato **APA 7ma Edición**, se encuentra documentado en código fuente LaTeX en:
`C:\Users\Josué\Documents\DOCUMENTOS LATEX\ÉTICA\informe final.tex`

Dicho documento contiene la justificación formal, revisión literaria extensa, código de reglas de Firestore y especificaciones de capturas de sustentación.

---

## 👥 Equipo de Trabajo (UNAS - FIIS)

* **Oriundo Tafur, Josué Sebastián**
* **Valles Sevillano, Alan Samuel**
* **Vega Guillen, Luis Arhian**

**Docente / Asesor:** Mg. Jorge Luis Pozo Malpartida  
**Universidad Nacional Agraria de la Selva (UNAS) — Tingo María, Perú (Julio 2026)**
