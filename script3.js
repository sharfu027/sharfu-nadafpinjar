const fs = require('fs');

function fixCensus() {
    const file = 'd:/Clone website/nadafpinjar/Census.html';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('<form id="censusForm"');
    const end = content.indexOf('<div class="btn-container">');
    const newForm = `<form id="censusForm" method="post">
            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಕುಟುಂಬದ ವಿವರ</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಹೆಸರು</label>
                    <input type="text" name="headName" placeholder="Head Name">
                </div>
                <div class="form-group">
                    <label>ವಿಳಾಸ</label>
                    <textarea name="address" rows="2"></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>ಗ್ರಾಮ / ನಗರ</label>
                    <input type="text" name="village" placeholder="Village">
                </div>
                <div class="form-group">
                    <label>ಜಿಲ್ಲೆ</label>
                    <select name="district">
                        <option value="">-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>ತಾಲೂಕು</label>
                    <select name="taluk">
                        <option value="">-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>ಆಧಾರ್ ಸಂಖ್ಯೆ</label>
                    <input type="text" name="headAadhar" placeholder="Aadhar">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>ವಾರ್ಡ್ ಸಂಖ್ಯೆ</label>
                    <input type="text" name="ward" placeholder="Ward">
                </div>
                <div class="form-group">
                    <label>ಧರ್ಮ</label>
                    <input type="text" name="religion" value="ISLAM">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>ಜಾತಿ</label>
                    <input type="text" name="caste" value="PINJAR/NADAF">
                </div>
                <div class="form-group">
                    <label>ಮನೆಯ ಪ್ರಕಾರ</label>
                    <select name="houseType">
                        <option value="ಸ್ವಂತ ಮನೆ">ಸ್ವಂತ ಮನೆ</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>ಜಮೀನು ವಿವರ: (ಭೂಮಿ ಇಲ್ಲದಿದ್ದರೆ 0 ಎಂದು ನಮೂದಿಸಿ.) ಎಕರೆ</label>
                    <input type="text" name="landAcres" placeholder="Land Acres">
                </div>
                <div class="form-group">
                    <label>ರೂಪಿಸುವ ಪ್ರಕಾರ</label>
                    <input type="text" name="formingType" placeholder="Forming Type">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group half">
                    <label>ಗುಂಟೆ</label>
                    <input type="text" name="landGunta" placeholder="Land Gunta">
                </div>
            </div>

            <h3 class="section-title" style="border-left: 4px solid #0056b3; padding-left: 10px;">ಸದಸ್ಯರ ವಿವರ</h3>
            <div id="membersContainer">
                <div class="form-row">
                    <div class="form-group">
                        <label>ಸದಸ್ಯರ ಹೆಸರು</label>
                        <input type="text" name="memberName[]" placeholder="Member Name">
                    </div>
                    <div class="form-group">
                        <label>ಪಾಲಕರ ಹೆಸರು</label>
                        <input type="text" name="memberGuardian[]" placeholder="Guardian Name">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>ಆಧಾರ್ ಸಂಖ್ಯೆ</label>
                        <input type="text" name="memberAadhar[]" placeholder="AdharNo">
                    </div>
                    <div class="form-group">
                        <label>ಮೊಬೈಲ್</label>
                        <input type="text" name="memberMobile[]" placeholder="Mobile">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>ಉದ್ಯೋಗ</label>
                        <input type="text" name="memberOccupation[]" placeholder="Occupation">
                    </div>
                    <div class="form-group">
                        <label>ಲಿಂಗ</label>
                        <input type="text" name="memberGender[]" placeholder="Gender">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>ಹುಟ್ಟಿದ ದಿನಾಂಕ</label>
                        <input type="date" name="memberDob[]" placeholder="Date Of Birth">
                    </div>
                    <div class="form-group">
                        <label>ಕುಟುಂಬದೊಂದಿಗಿನ ಸಂಬಂಧ</label>
                        <input type="text" name="memberRelation[]" placeholder="Relation">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>ವಿವಾಹಿತರ?</label>
                        <select name="memberMarried[]">
                            <option value="ಅವಿವಾಹಿತರ">ಅವಿವಾಹಿತರ</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>ಅಂಗವಿಕಲರೇ?</label>
                        <select name="memberHandicapped[]">
                            <option value="ಇಲ್ಲ">ಇಲ್ಲ</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>ಸಾಕ್ಷರಹಾ?</label>
                        <select name="memberLiterate[]">
                            <option value="ಶಿಕ್ಷಕರು">ಶಿಕ್ಷಕರು</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>ರಾಜಕೀಯ ಹಿನ್ನೆಲೆ</label>
                        <select name="memberPolitical[]">
                            <option value="ಇಲ್ಲ">ಇಲ್ಲ</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <button type="button" class="btn btn-secondary" onclick="addMember()" style="padding: 10px; width: 48%; margin-left: 0; background: #e9ecef; color: #333; border: 1px solid #ced4da;">ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ</button>
            </div>
            
            `;
    content = content.substring(0, start) + newForm + content.substring(end);
    
    // Also, the Census form seems to have Save and Delete buttons instead of Preview and Submit
    // Wait, the original screenshot shows Save & Delete
    // The current HTML might have Preview and Submit...
    fs.writeFileSync(file, content, 'utf8');
}

fixCensus();
console.log('Fixed Census');
