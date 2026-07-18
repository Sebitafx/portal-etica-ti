## canvas
- viewBox: 0 0 1280 720
- format: PPT 16:9

## mode
- mode: briefing

## visual_style
- visual_style: swiss-minimal

## colors
- bg: #FFFFFF
- secondary_bg: #F4F4F5
- primary: #10B981
- accent: #047857
- secondary_accent: #0EA5E9
- text: #27272A
- text_secondary: #52525B
- border: #E4E4E7
- image_rendering: flat
- image_palette: cool-corporate

## typography
- font_family: "Segoe UI", "Microsoft YaHei", sans-serif
- title_family: "Arial Black", SimHei, sans-serif
- body_family: "Segoe UI", "Microsoft YaHei", sans-serif
- emphasis_family: "Segoe UI", "Microsoft YaHei", sans-serif
- code_family: Consolas, "Courier New", monospace
- body: 24
- title: 43
- subtitle: 34
- annotation: 19

## images
- intro_bg.png: images/intro_bg.png | slice

## page_rhythm
- P01: anchor
- P02: breathing
- P03: dense
- P04: dense
- P05: dense
- P06: anchor

## page_layouts

## page_charts
- P03: grid_cards
- P04: grid_cards

## forbidden
- Mixing icon libraries
- rgba()
- `<style>`, `class`, `<foreignObject>`, `textPath`, `@font-face`, `<animate*>`, `<script>`, `<iframe>`, `<symbol>`+`<use>`
- `<g opacity>` (set opacity on each child element individually)
- HTML named entities in text (`&nbsp;`, `&mdash;`, `&copy;`, `&ndash;`, `&reg;`, `&hellip;`, `&bull;` …) — write as raw Unicode (`—`, `©`, `→`, NBSP, etc.); XML reserved chars `& < > " '` must be escaped as `&amp; &lt; &gt; &quot; &apos;`. See shared-standards.md §1.0
