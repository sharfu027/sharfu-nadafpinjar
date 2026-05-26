const fs = require('fs');
const files = ['donationdirectstate.html', 'donationtaluktostate.html', 'donationdistricttostate.html', 'freeedu.html', 'Census.html'];
files.forEach(f => {
    const c = fs.readFileSync('d:/Clone website/nadafpinjar/' + f, 'utf8');
    const m = c.match(/style=\"[^\"]*\"/g);
    if(m) {
        console.log(f, m);
    }
});
