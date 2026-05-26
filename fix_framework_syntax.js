const fs = require('fs');
const file = 'd:/Clone website/nadafpinjar/js/framework.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace("}\\n\r\n// date 24-2-2016", "}\r\n// date 24-2-2016");
content = content.replace("}\\n\n// date 24-2-2016", "}\n// date 24-2-2016");
content = content.replace(/\\n\r?\n/g, '\n'); 
fs.writeFileSync(file, content, 'utf8');
