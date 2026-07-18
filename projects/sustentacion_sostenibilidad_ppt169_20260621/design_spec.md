# Sustentación Sostenibilidad - Design Spec

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | sustentacion_sostenibilidad |
| **Canvas Format** | PPT 16:9 (1280x720) |
| **Page Count** | 6 |
| **Design Style** | swiss-minimal |
| **Target Audience** | Docente universitario y compañeros de clase |
| **Use Case** | Sustentación académica |
| **Content Strategy** | Equilibrado (mantener la estructura proporcionada pero optimizar para la presentación) |
| **Created Date** | 2026-06-21 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280x720 |
| **viewBox** | `0 0 1280 720` |
| **Margins** | 60px izquierda/derecha, 50px arriba/abajo |
| **Content Area** | 1160x620 |

---

## III. Visual Theme

### Theme Style

- **Mode**: briefing
- **Visual style**: swiss-minimal
- **Theme**: Light theme
- **Tone**: Profesional, ecológico, tecnológico, limpio

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Background** | `#ffffff` | Page background |
| **Secondary bg** | `#f4f4f5` | Card background, section background |
| **Primary** | `#10b981` | Title decorations, key sections, icons |
| **Accent** | `#047857` | Data highlights, key information, links |
| **Secondary accent** | `#0ea5e9` | Secondary emphasis |
| **Body text** | `#27272a` | Main body text |
| **Secondary text** | `#52525b` | Captions, annotations |
| **Tertiary text** | `#a1a1aa` | Supplementary info, footers |
| **Border/divider** | `#e4e4e7` | Card borders, divider lines |
| **Success** | `#22c55e` | Positive indicators |
| **Warning** | `#ef4444` | Issue markers |

### AI Image Strategy

- **Image Rendering**: flat
- **Image Palette**: cool-corporate

---

## IV. Typography System

### Font Plan

**Typography direction**: Tecnológico Moderno

| Role | Chinese | English | Fallback tail |
| ---- | ------- | ------- | ------------- |
| **Title** | `SimHei` | `"Arial Black"` | `sans-serif` |
| **Body** | `"Microsoft YaHei"` | `"Segoe UI"` | `sans-serif` |
| **Emphasis** | `"Microsoft YaHei"` | `"Segoe UI"` | `sans-serif` |
| **Code** | — | `Consolas` | `monospace` |

**Per-role font stacks**:

- Title: `"Arial Black", SimHei, sans-serif`
- Body: `"Segoe UI", "Microsoft YaHei", sans-serif`
- Emphasis: `"Segoe UI", "Microsoft YaHei", sans-serif`
- Code: `Consolas, "Courier New", monospace`

### Font Size Hierarchy

**Baseline**: Body font size = 24px

| Purpose | Ratio to body | Example @ body=24 (relaxed) | Weight |
| ------- | ------------- | --------------------------- | ------ |
| Cover title (hero headline) | 3.5x | 84px | Heavy |
| Chapter / section opener | 2x | 48px | Bold |
| Page title | 1.8x | 43px | Bold |
| Hero number (consulting KPIs) | 2x | 48px | Bold |
| Subtitle | 1.4x | 34px | SemiBold |
| **Body content** | **1x** | **24px** | Regular |
| Annotation / caption | 0.8x | 19px | Regular |
| Page number / footnote | 0.6x | 14px | Regular |

---

## V. Layout Principles

### Page Structure

- **Header area**: 100px (Title and subtle divider)
- **Content area**: 520px
- **Footer area**: 100px (Page number, subtle footer text)

### Layout Pattern Library

| Pattern | Suitable Scenarios |
| ------- | ----------------- |
| **Single column centered** | Covers, conclusions |
| **Three/four column cards** | Feature lists, parallel points |
| **Asymmetric split (3:7)** | Image vs. text |

### Spacing Specification

**Universal**:

| Element | Recommended Range | Current Project |
| ------- | ---------------- | --------------- |
| Safe margin from canvas edge | 40-60px | 60px |
| Content block gap | 24-40px | 32px |
| Icon-text gap | 8-16px | 12px |

**Card-based layouts**:

| Element | Recommended Range | Current Project |
| ------- | ---------------- | --------------- |
| Card gap | 20-32px | 24px |
| Card padding | 20-32px | 24px |
| Card border radius | 8-16px | 8px |
| Single-row card height | 530-600px | 450px |
| Double-row card height | 265-295px each | 220px |
| Three-column card width | 360-380px each | 360px |

---

## VI. Icon Usage Specification

### Source
*No se usarán iconos de la librería en esta presentación debido a disponibilidad técnica. Se usarán elementos de diseño tipográfico y color para estructurar la información.*

---

## VII. Visualization Reference List

| Page | Template | Path | Summary-quote | Usage |
| ---- | -------- | ---- | ------------------------------------------------- | ----- |
| P03 | grid_cards | `templates/charts/grid_cards.svg` | "Use for presenting 3-6 distinct concepts, features, or metrics in parallel cards." | Impacto ambiental |
| P04 | grid_cards | `templates/charts/grid_cards.svg` | "Use for presenting 3-6 distinct concepts, features, or metrics in parallel cards." | Prácticas de software sostenible |

---

## VIII. Image Resource List

| Filename | Dimensions | Ratio | Purpose | Type | Layout pattern | Acquire Via | Status | Reference | text_policy | page_role |
| -------- | --------- | ----- | ------- | ---- | -------------- | ----------- | ------ | --------- | ----------- | --------- |
| intro_bg.png | 1280x720 | 16:9 | Imagen de apoyo introducción | Illustration | #3 right side content + native scene | ai | Pending | abstract clean flat vector representing green technology and sustainability | none | local |

---

## IX. Content Outline

### Part 1: Sostenibilidad

#### P01 - Cover

- **Cover impact**: Typographic poster with a bold green core claim.
- **Layout**: Single column centered
- **Title**: TIC, IMPACTO AMBIENTAL Y SOSTENIBILIDAD
- **Subtitle**: Enfoque en la Ética y Práctica Profesional
- **Info**: Sustentación Sesión 10

#### P02 - Introducción

- **Layout**: Asymmetric split (3:7)
- **Title**: Introducción
- **Core message**: Las TIC tienen un impacto significativo en el ambiente y requieren gestión ética y sostenible.
- **Content**: 
  - Las Tecnologías de la Información y Comunicación (TIC) han transformado nuestro mundo.
  - Generan un impacto ambiental que debe ser gestionado.
  - La ética y práctica profesional exigen responsabilidad sostenible.

#### P03 - TIC y Medio Ambiente

- **Layout**: Three column cards
- **Title**: TIC y Medio Ambiente
- **Core message**: El desarrollo y uso de TIC genera consumo energético, residuos y huella de carbono.
- **Content**: 
  - Consumo Energético: Cantidad de electricidad requerida para alimentar y refrigerar centros de datos y redes.
  - Residuos Electrónicos: Dispositivos que han llegado al final de su vida útil.
  - Huella de Carbono Digital: Impacto derivado del uso de internet y dispositivos.

#### P04 - Desarrollo de Software Sostenible

- **Layout**: Four column cards
- **Title**: Desarrollo de Software Sostenible
- **Core message**: El Green Coding busca reducir la huella ambiental desde la ingeniería de software.
- **Content**: 
  - Código Eficiente: Algoritmos con menor complejidad temporal.
  - Optimización de recursos: Minimizar memoria y ciclos de CPU.
  - Green coding: Prácticas de programación ecológica.
  - Ciclo de vida: Gestión sostenible del software desde el diseño.

#### P05 - Aplicación al Proyecto (EthiCode)

- **Layout**: Single column centered
- **Title**: Aplicación a EthiCode
- **Core message**: Nuestro foro tecnológico aplica sostenibilidad mediante decisiones de diseño como el Modo Oscuro.
- **Content**: 
  - Modo Oscuro nativo para reducir el consumo energético en pantallas OLED/AMOLED.
  - Optimización de consultas a la base de datos (Firestore) para reducir procesamiento.
  - Carga eficiente de imágenes, reduciendo el peso de la red.

#### P06 - Closing

- **Closing impact**: A distilled takeaway on ethical responsibility.
- **Layout**: Single column centered
- **Content**: La tecnología será verdaderamente avanzada cuando sea completamente sostenible.

---

## X. Speaker Notes Requirements

One speaker note file per page, saved to `notes/`.

---

## XI. Technical Constraints Reminder

- viewBox: `0 0 1280 720`
- Use `<rect>` for backgrounds
- `<foreignObject>` FORBIDDEN.
