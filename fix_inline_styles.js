const fs = require('fs');
const path = require('path');

const dir = 'd:/Clone website/nadafpinjar/';
const files = ['donationdirectstate.html', 'donationtaluktostate.html', 'donationdistricttostate.html', 'freeedu.html', 'Census.html'];

files.forEach(f => {
    const filePath = path.join(dir, f);
    let original = fs.readFileSync(filePath, 'utf8');
    let fixed = original.replace(/ style=\"border-left: 4px solid #0056b3; padding-left: 10px;\"/g, '');
    if (original !== fixed) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        console.log(`Fixed ${f}`);
    }
});
