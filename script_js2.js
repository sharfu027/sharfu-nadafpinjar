const fs = require('fs');

const files = [
    { file: 'd:/Clone website/nadafpinjar/donationdirectstate.html', id: 'directStateForm', desc: 'ರಾಜ್ಯಕ್ಕೆ ನೇರ ಮೊತ್ತ ವರ್ಗಾವಣೆ' },
    { file: 'd:/Clone website/nadafpinjar/donationtaluktostate.html', id: 'talukToStateForm', desc: 'ತಾಲ್ಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆಯಾದ ಮೊತ್ತ' },
    { file: 'd:/Clone website/nadafpinjar/donationdistricttostate.html', id: 'districtToStateForm', desc: 'ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆಯಾದ ಮೊತ್ತ' },
    { file: 'd:/Clone website/nadafpinjar/freeedu.html', id: 'registrationForm', desc: 'ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ' }
];

for (let f of files) {
    if (!fs.existsSync(f.file)) continue;
    let content = fs.readFileSync(f.file, 'utf8');
    
    // Find the last script tag
    let rzpIdx = content.lastIndexOf('<script');
    if (rzpIdx !== -1) {
        let scriptStart = rzpIdx;
        let scriptEnd = content.indexOf('</script>', rzpIdx) + 9;
        
        let newScript = `<script>
        // Razorpay Configuration
        const RAZORPAY_KEY = "rzp_live_SISoxIvhIen2o1";
        
        let formData = {};

        document.getElementById('${f.id}').addEventListener('submit', function(e) {
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
            const form = document.getElementById('${f.id}');
            
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

                    previewHTML += \`
                        <div class="preview-row">
                            <div class="preview-label">\${label}:</div>
                            <div class="preview-value">\${formData[key] || '-'}</div>
                        </div>
                    \`;
                }
            }

            document.getElementById('previewContent').innerHTML = previewHTML;
            if(document.getElementById('displayAmount')) {
                document.getElementById('displayAmount').textContent = formData.amount || 0;
            }

            window.scrollTo(0, 0);
        }

        function editForm() {
            document.getElementById('formContainer').style.display = 'block';
            document.getElementById('previewContainer').style.display = 'none';
            window.scrollTo(0, 0);
        }

        function initiatePayment() {
            const amount = parseInt(formData.amount || 0) * 100;
            
            if (!amount) {
                submitToMongoDB();
                return;
            }

            const options = {
                key: RAZORPAY_KEY,
                amount: amount,
                currency: "INR",
                name: "Karnataka State Nadaf / Pinjar Sangha",
                description: "${f.desc}",
                image: "images/header-nadaf.png",
                handler: function (response) {
                    submitToMongoDB(response.razorpay_payment_id);
                },
                prefill: {
                    name: formData.donorName || formData.presidentName || formData.studentName || '',
                    contact: formData.mobile || formData.presidentMobile || ''
                },
                notes: Object.assign({}, formData),
                theme: {
                    color: "#0066cc"
                },
                modal: {
                    ondismiss: function() {
                        alert('Payment cancelled. You can try again.');
                    }
                }
            };

            const rzp = new Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                alert('Payment Failed!\\n\\nError: ' + response.error.description);
            });

            rzp.open();
        }

        function submitToMongoDB(paymentId = null) {
            const dataToSave = {
                formType: "${f.desc}",
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
    </script>`;
        
        content = content.substring(0, scriptStart) + newScript + content.substring(scriptEnd);
        fs.writeFileSync(f.file, content, 'utf8');
        console.log('Fixed JS for ' + f.file);
    }
}
