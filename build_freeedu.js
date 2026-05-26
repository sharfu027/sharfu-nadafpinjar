const fs = require('fs');

const census = fs.readFileSync('d:/Clone website/nadafpinjar/Census.html', 'utf8');
const freeedu = fs.readFileSync('d:/Clone website/nadafpinjar/freeedu.html', 'utf8');

// The header of Census up to <div class="breadcrumb">
const headEnd = census.indexOf('<div class="breadcrumb">');
let header = census.substring(0, headEnd);

// Modify title
header = header.replace('<title>ಜನಗಣತಿ (CENSUS)', '<title>ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ');

const breadcrumb = `    <div class="breadcrumb">
        <div class="container">
            <a href="default.html">Home</a> » <span>ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ</span>
        </div>
    </div>

    <!-- Banner Image -->
    <div class="container" class="banner-container">
        <img src="images/slider-1.jpg" alt="Donation Banner" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;">
    </div>

    <div class="form-container" id="formContainer">
        <h1 class="form-title">ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ</h1>
        
`;

// Extract freeedu form
const formStart = freeedu.indexOf('<form id="registrationForm"');
const scriptIndex = freeedu.indexOf('<script src="js/jquery-3.4.1.min.js"></script>');
let formContent = freeedu;
if (formStart !== -1) {
    if (scriptIndex !== -1) {
        formContent = freeedu.substring(formStart, scriptIndex);
    } else {
        formContent = freeedu.substring(formStart);
    }
} else {
    console.log('Form not found in freeedu.html, using fallback.');
}

const scripts = `    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/jquery-accessibleMegaMenu.js"></script>
    <script src="js/framework.js"></script>
    <script src="js/megamenu.js"></script>
`;

const footerEnd = census.indexOf('<script src="js/jquery-3.4.1.min.js">');
const footer = census.substring(census.indexOf('</div>', census.indexOf('</form>')), footerEnd);

// Assemble
const reconstructed = header + breadcrumb + formContent + footer + scripts + `    <script>
        let formData = {};

        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formObj = new FormData(this);
            formData = Object.fromEntries(formObj.entries());
            showPreview();
        });

        function showPreview() {
            document.getElementById('formContainer').style.display = 'none';
            if(!document.getElementById('previewContainer')) return submitToMongoDB();
            document.getElementById('previewContainer').style.display = 'block';

            let previewHTML = '';
            const form = document.getElementById('registrationForm');
            
            for (let key in formData) {
                if (key !== 'amount') {
                    let input = form.querySelector('[name="' + key + '"]');
                    let label = '';
                    if (input) {
                        let id = input.id;
                        if(id) {
                            let l = form.querySelector('label[for="' + id + '"]');
                            if(l) label = l.textContent;
                        }
                        if(!label) {
                            let p = input.closest('.form-group');
                            if(p) {
                                let l = p.querySelector('label');
                                if(l) label = l.textContent;
                            }
                        }
                    }
                    if(!label) label = key;

                    previewHTML += \`<div class="preview-row"><div class="preview-label">\${label}:</div><div class="preview-value">\${formData[key] || '-'}</div></div>\`;
                }
            }

            document.getElementById('previewContent').innerHTML = previewHTML;
            window.scrollTo(0, 0);
        }

        function editForm() {
            document.getElementById('formContainer').style.display = 'block';
            document.getElementById('previewContainer').style.display = 'none';
            window.scrollTo(0, 0);
        }

        function initiatePayment() {
            submitToMongoDB();
        }

        function submitToMongoDB(paymentId = null) {
            const dataToSave = {
                formType: "ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ",
                amount: parseInt(formData.amount || 0),
                paymentId: paymentId,
                formData: formData
            };

            fetch('/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    alert('Data saved successfully!');
                    window.location.href = 'default.html';
                } else {
                    alert('Error saving data.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error saving data.');
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync('d:/Clone website/nadafpinjar/freeedu.html', reconstructed, 'utf8');
console.log('Reconstructed freeedu.html successfully.');
