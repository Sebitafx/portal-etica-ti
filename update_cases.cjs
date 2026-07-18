const fs = require('fs');
const path = require('path');

const casesPath = path.join(__dirname, 'src', 'data', 'cases.json');
let cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));

cases = cases.map((c, i) => {
  // Fix the content spacing by ensuring real double newlines
  let newContent = c.content.replace(/\\n\\n/g, '\n\n');
  
  return {
    ...c,
    // Use loremflickr for tech related images, lock parameter ensures consistency
    image: `https://loremflickr.com/800/600/technology,cybersecurity?lock=${i + 1}`
  };
});

fs.writeFileSync(casesPath, JSON.stringify(cases, null, 2));
console.log("Images and content updated!");
