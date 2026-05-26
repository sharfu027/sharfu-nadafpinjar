const fs = require('fs');

function fixTalukToState() {
    const file = 'd:/Clone website/nadafpinjar/donationtaluktostate.html';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<form id="talukToStateForm"');
    const end = content.indexOf('<div class="btn-container">');
    const newForm = `<form id="talukToStateForm" method="post">
            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ ವಿವರ</h3>
            <div class="form-group">
                <label for="presidentName">ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ ಪೂರ್ಣ ಹೆಸರು</label>
                <input type="text" id="presidentName" name="presidentName">
            </div>

            <div class="form-group">
                <label for="presidentAddress">ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ ವಿಳಾಸ</label>
                <textarea id="presidentAddress" name="presidentAddress"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="presidentMobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="presidentMobile" name="presidentMobile" pattern="[0-9]{10}">
                </div>
                <div class="form-group">
                    <label for="presidentVillage">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="presidentVillage" name="presidentVillage">
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

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಯಾರ ಪರವಾಗಿ</h3>
            <div class="form-group">
                <label for="donorName">ಪೂರ್ಣ ಹೆಸರು / ಘಟಕದ ಹೆಸರು</label>
                <input type="text" id="donorName" name="donorName">
            </div>

            <div class="form-group">
                <label for="donorAddress">ವಿಳಾಸ</label>
                <textarea id="donorAddress" name="donorAddress"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="donorVillage">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="donorVillage" name="donorVillage">
                </div>
                <div class="form-group">
                    <label for="donorDistrict">ಜಿಲ್ಲೆ</label>
                    <select id="donorDistrict" name="donorDistrict">
                        <option value="">-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="donorTaluk">ತಾಲೂಕು</label>
                    <select id="donorTaluk" name="donorTaluk">
                        <option value="">-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="donorMobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="donorMobile" name="donorMobile" pattern="[0-9]{10}">
                </div>
            </div>

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಉದ್ದೇಶಗಳು</h3>
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

function fixDistrictToState() {
    const file = 'd:/Clone website/nadafpinjar/donationdistricttostate.html';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<form id="districtToStateForm"');
    const end = content.indexOf('<div class="btn-container">');
    const newForm = `<form id="districtToStateForm" method="post">
            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಜಿಲ್ಲಾಧ್ಯಕ್ಷರ ವಿವರ</h3>
            <div class="form-group">
                <label for="presidentName">ಜಿಲ್ಲಾಧ್ಯಕ್ಷರ ಪೂರ್ಣ ಹೆಸರು</label>
                <input type="text" id="presidentName" name="presidentName">
            </div>

            <div class="form-group">
                <label for="presidentAddress">ಜಿಲ್ಲಾಧ್ಯಕ್ಷರ ವಿಳಾಸ</label>
                <textarea id="presidentAddress" name="presidentAddress"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="presidentMobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="presidentMobile" name="presidentMobile" pattern="[0-9]{10}">
                </div>
                <div class="form-group">
                    <label for="presidentVillage">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="presidentVillage" name="presidentVillage">
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

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಯಾರ ಪರವಾಗಿ</h3>
            <div class="form-group">
                <label for="donorName">ಪೂರ್ಣ ಹೆಸರು</label>
                <input type="text" id="donorName" name="donorName">
            </div>

            <div class="form-group">
                <label for="donorAddress">ವಿಳಾಸ</label>
                <textarea id="donorAddress" name="donorAddress"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="donorVillage">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="donorVillage" name="donorVillage">
                </div>
                <div class="form-group">
                    <label for="donorDistrict">ಜಿಲ್ಲೆ</label>
                    <select id="donorDistrict" name="donorDistrict">
                        <option value="">-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="donorTaluk">ತಾಲೂಕು</label>
                    <select id="donorTaluk" name="donorTaluk">
                        <option value="">-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="donorMobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="donorMobile" name="donorMobile" pattern="[0-9]{10}">
                </div>
            </div>

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಉದ್ದೇಶಗಳು</h3>
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

function fixFreeEdu() {
    const file = 'd:/Clone website/nadafpinjar/freeedu.html';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<form id="registrationForm"');
    const end = content.indexOf('<div class="btn-container">');
    const newForm = `<form id="registrationForm" method="post">
            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ವಿದ್ಯಾರ್ಥಿಯ ವಿವರ</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="studentName">ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</label>
                    <input type="text" id="studentName" name="studentName">
                </div>
                <div class="form-group">
                    <label for="fatherName">ತಂದೆಯ / ಪಾಲಕರ ಹೆಸರು</label>
                    <input type="text" id="fatherName" name="fatherName">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="motherName">ತಾಯಿಯ ಹೆಸರು</label>
                    <input type="text" id="motherName" name="motherName">
                </div>
                <div class="form-group">
                    <label for="address">ವಿಳಾಸ</label>
                    <textarea id="address" name="address"></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="village">ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" id="village" name="village">
                </div>
                <div class="form-group">
                    <label for="district">ಜಿಲ್ಲೆ</label>
                    <select id="district" name="district">
                        <option value="">-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="taluk">ತಾಲೂಕು</label>
                    <select id="taluk" name="taluk">
                        <option value="">-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="occupation">ಉದ್ಯೋಗ</label>
                    <input type="text" id="occupation" name="occupation">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="membership">ಸಂಘದ ಸದಸ್ಯತ್ವ</label>
                    <input type="text" id="membership" name="membership">
                </div>
                <div class="form-group">
                    <label for="aadhar">ಆಧಾರ್ ನಂ</label>
                    <input type="text" id="aadhar" name="aadhar">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="housingInfo">ವಸತಿ ವಿವರ: ವಸತಿ ಪರಿಗಣನೆಗಳು</label>
                    <select id="housingInfo" name="housingInfo">
                        <option value="ಸ್ವಂತ ಮನೆ">ಸ್ವಂತ ಮನೆ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="landInfo">ಜಮೀನು ವಿವರ: (ಭೂಮಿ ಇಲ್ಲದಿದ್ದರೆ 0 ಎಂದು ನಮೂದಿಸಿ.) ಎಕರೆ</label>
                    <input type="text" id="landInfo" name="landInfo">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="houseType">ಮನೆ ನಿರ್ಮಾಣ</label>
                    <select id="houseType" name="houseType">
                        <option value="ಗುಡಿಸಲು ಮನೆ">ಗುಡಿಸಲು ಮನೆ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="gunte">ಗುಂಟೆ</label>
                    <input type="text" id="gunte" name="gunte">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="income">ಅಂದಾಜು ಆದಾಯ</label>
                    <input type="text" id="income" name="income">
                </div>
                <div class="form-group">
                    <label for="rationType">ಅಂತ್ಯೋದಯ/ಬಿಪಿಎಲ್</label>
                    <input type="text" id="rationType" name="rationType">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="mobile">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                    <input type="tel" id="mobile" name="mobile">
                </div>
                <div class="form-group">
                    <label for="currentSchool">ವಿದ್ಯಾಭ್ಯಾಸ ಮಾಡುತ್ತಿರುವ ಶಾಲೆ ಕಾಲೇಜು</label>
                    <input type="text" id="currentSchool" name="currentSchool">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="currentClass">ವಿದ್ಯಾಭ್ಯಾಸ ಮಾಡುತ್ತಿರುವ ತರಗತಿ</label>
                    <input type="text" id="currentClass" name="currentClass">
                </div>
                <div class="form-group">
                    <label for="previousMarks">ಹಿಂದಿನ ತರಗತಿಯಲ್ಲಿ ಪಡೆದ ಅಂಕಗಳು</label>
                    <input type="text" id="previousMarks" name="previousMarks">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="joiningClass">ಪ್ರವೇಶ ಬಯಸುವ ತರಗತಿ</label>
                    <input type="text" id="joiningClass" name="joiningClass">
                </div>
                <div class="form-group">
                    <label for="classSubjects">ತರಗತಿಯ ವಿಷಯಗಳು</label>
                    <input type="text" id="classSubjects" name="classSubjects">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="coaching">ಪ್ರವೇಶ ಬಯಸುವ ಕೋಚಿಂಗ್:</label>
                    <input type="text" id="coaching" name="coaching">
                </div>
            </div>

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಬ್ಯಾಂಕ್ ವಿವರ</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="bankName">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಹೆಸರು</label>
                    <input type="text" id="bankName" name="bankName">
                </div>
                <div class="form-group">
                    <label for="branchName">ಶಾಖೆಯ ಹೆಸರು</label>
                    <input type="text" id="branchName" name="branchName">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="ifsc">IFSC ಕೋಡ್</label>
                    <input type="text" id="ifsc" name="ifsc">
                </div>
                <div class="form-group">
                    <label for="bankAccount">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆ :</label>
                    <input type="text" id="bankAccount" name="bankAccount">
                </div>
            </div>

            `;
    content = content.substring(0, start) + newForm + content.substring(end);
    fs.writeFileSync(file, content, 'utf8');
}

fixTalukToState();
fixDistrictToState();
fixFreeEdu();
console.log('Fixed multiple forms');
