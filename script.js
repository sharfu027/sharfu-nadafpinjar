const fs = require('fs');

function fixDirectState() {
    const file = 'd:/Clone website/nadafpinjar/donationdirectstate.html';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<form id="directStateForm"');
    const end = content.indexOf('<div class="btn-container">');
    const newForm = `<form id="directStateForm" method="post">
            <div class="form-group">
                <label for="donorName">ಕಳುಹಿಸುವವರ ಪೂರ್ಣ ಹೆಸರು</label>
                <input type="text" id="donorName" name="donorName">
            </div>

            <div class="form-group">
                <label for="address">ವಿಳಾಸ</label>
                <textarea id="address" name="address"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="village">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="village" name="village">
                </div>
                <div class="form-group">
                    <label for="mobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="district">ಜಿಲ್ಲೆ</label>
                    <select id="district" name="district">
                        <option value="">-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="taluk">ತಾಲೂಕು</label>
                    <select id="taluk" name="taluk">
                        <option value="">-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="account">ಖಾತೆ</label>
                    <select id="account" name="account">
                        <option value="">-- ಖಾತೆ ಆಯ್ಕೆಮಾಡಿ--</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="purposeDetails">ಉದ್ದೇಶದ ವಿವರಗಳು</label>
                <textarea id="purposeDetails" name="purposeDetails"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="paymentMode">ಪಾವತಿ ವಿಧಾನ</label>
                    <select id="paymentMode" name="paymentMode">
                        <option value="Online">Online</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="amount">ಮೊತ್ತ (ರೂ.)</label>
                    <input type="number" id="amount" name="amount" min="1">
                </div>
            </div>

            `;
    content = content.substring(0, start) + newForm + content.substring(end);
    fs.writeFileSync(file, content, 'utf8');
}

fixDirectState();
console.log('direct fixed');
