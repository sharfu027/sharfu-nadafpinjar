const fs = require('fs');
const content = fs.readFileSync('d:/Clone website/nadafpinjar/donationdistricttostate.html', 'utf8');
const styles = content.match(/style=\"[^\"]*\"/g) || [];
console.log(styles);
