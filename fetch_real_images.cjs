const fs = require('fs');
const path = require('path');
const google = require('googlethis');

const casesPath = path.join(__dirname, 'src', 'data', 'cases.json');
let cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));

async function updateImages() {
  console.log("Iniciando búsqueda de imágenes reales en Google Images para 60 casos...");
  
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    try {
      // Hacer la búsqueda más específica para obtener fotos reales
      const query = `${c.title} scandal OR news OR accident OR hack photo`;
      const images = await google.image(query, { safe: false });
      
      let selectedImage = null;
      // Filtrar imágenes para evitar iconos, logos pequeños o base64
      for (const img of images) {
        if (img.url && img.url.startsWith('http') && !img.url.includes('base64')) {
          selectedImage = img.url;
          break;
        }
      }
      
      if (selectedImage) {
        cases[i].image = selectedImage;
        console.log(`[${i+1}/60] OK: ${c.title} -> ${selectedImage.substring(0, 50)}...`);
      } else {
        console.log(`[${i+1}/60] FAIL: No se encontró imagen para ${c.title}`);
      }
    } catch (e) {
      console.log(`[${i+1}/60] ERROR: ${c.title} - ${e.message}`);
    }
    
    // Delay para evitar ban de Google
    await new Promise(r => setTimeout(r, 1500));
  }
  
  fs.writeFileSync(casesPath, JSON.stringify(cases, null, 2));
  console.log("✅ ¡Proceso completado! Archivo cases.json actualizado con URLs de diferentes fuentes.");
}

updateImages();
