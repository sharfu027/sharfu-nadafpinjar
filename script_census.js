const fs = require('fs');
const file = 'd:/Clone website/nadafpinjar/Census.html';
let content = fs.readFileSync(file, 'utf8');
let scriptStart = content.lastIndexOf('<script>');
let newScript = `<script>
        document.getElementById('censusForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formObj = new FormData(this);
            const formData = Object.fromEntries(formObj.entries());
            fetch('/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: 'ಜನಗಣತಿ (CENSUS)', amount: 0, formData: formData })
            }).then(res => res.json()).then(data => { alert('Census data saved successfully!'); window.location.href = 'default.html'; });
        });
        function addMember() { alert('Add member functionality goes here.'); }
    </script>
</body>
</html>`;
content = content.substring(0, scriptStart) + newScript;
fs.writeFileSync(file, content, 'utf8');
