const fs = require('fs');
const path = require('path');

const casesPath = path.join(__dirname, 'src', 'data', 'cases.json');
let casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));

// Crear la carpeta donde el usuario pondrá las imágenes
const imagesDir = path.join(__dirname, 'public', 'images', 'cases');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Actualizar el JSON para que todas las imágenes apunten a los archivos locales
casesData = casesData.map(c => {
  // c.id es algo como "case-1", "case-2", etc.
  c.image = `/images/cases/${c.id}.jpg`;
  return c;
});

fs.writeFileSync(casesPath, JSON.stringify(casesData, null, 2));
console.log("JSON actualizado para usar imágenes locales y carpeta creada en public/images/cases");
