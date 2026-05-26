document.addEventListener("DOMContentLoaded", function() {
    const karnatakaData = {
        "ಬಾಗಲಕೋಟೆ": ["ಬಾಗಲಕೋಟೆ", "ಬಾದಾಮಿ", "ಬೀಳಗಿ", "ಹುನಗುಂದ", "ಇಳಕಲ್", "ಮುಧೋಳ", "ಜಮಖಂಡಿ", "ಗುಳೇದಗುಡ್ಡ"],
        "ಬಳ್ಳಾರಿ": ["ಬಳ್ಳಾರಿ", "ಕುರುಗೋಡು", "ಸಿರಗುಪ್ಪ", "ಕಂಪ್ಲಿ", "ಸಂಡೂರು"],
        "ಬೆಳಗಾವಿ": ["ಬೆಳಗಾವಿ", "ಅಥಣಿ", "ಬೈಲಹೊಂಗಲ", "ಚಿಕ್ಕೋಡಿ", "ಗೋಕಾಕ", "ಹುಕ್ಕೇರಿ", "ಖಾನಾಪುರ", "ರಾಯಬಾಗ", "ಸವದತ್ತಿ", "ರಾಮದುರ್ಗ", "ಕಿತ್ತೂರು", "ನಿಪ್ಪಾಣಿ", "ಕಾಗವಾಡ", "ಮೂಡಲಗಿ"],
        "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ": ["ದೇವನಹಳ್ಳಿ", "ದೊಡ್ಡಬಳ್ಳಾಪುರ", "ಹೊಸಕೋಟೆ", "ನೆಲಮಂಗಲ"],
        "ಬೆಂಗಳೂರು ನಗರ": ["ಬೆಂಗಳೂರು ಉತ್ತರ", "ಬೆಂಗಳೂರು ದಕ್ಷಿಣ", "ಬೆಂಗಳೂರು ಪೂರ್ವ", "ಆನೇಕಲ್", "ಯಲಹಂಕ"],
        "ಬೀದರ್": ["ಬೀದರ್", "ಬಸವಕಲ್ಯಾಣ", "ಭಾಲ್ಕಿ", "ಹುಮ್ನಾಬಾದ್", "ಔರಾದ್", "ಚಿಟಗುಪ್ಪ", "ಹುಲಸೂರು", "ಕಮಲನಗರ"],
        "ಚಾಮರಾಜನಗರ": ["ಚಾಮರಾಜನಗರ", "ಗುಂಡ್ಲುಪೇಟೆ", "ಕೊಳ್ಳೇಗಾಲ", "ಯಳಂದೂರು", "ಹನೂರು"],
        "ಚಿಕ್ಕಬಳ್ಳಾಪುರ": ["ಚಿಕ್ಕಬಳ್ಳಾಪುರ", "ಬಾಗೇಪಲ್ಲಿ", "ಚಿಂತಾಮಣಿ", "ಗೌರಿಬಿದನೂರು", "ಶಿಡ್ಲಘಟ್ಟ", "ಗುಡಿಬಂಡೆ"],
        "ಚಿಕ್ಕಮಗಳೂರು": ["ಚಿಕ್ಕಮಗಳೂರು", "ಕಡೂರು", "ಕೊಪ್ಪ", "ಮುದಿಗೆರೆ", "ನರಸಿಂಹರಾಜಪುರ", "ಶೃಂಗೇರಿ", "ತರೀಕೆರೆ", "ಅಜ್ಜಂಪುರ", "ಕಳಸ"],
        "ಚಿತ್ರದುರ್ಗ": ["ಚಿತ್ರದುರ್ಗ", "ಚಳ್ಳಕೆರೆ", "ಹಿರಿಯೂರು", "ಹೊಳಲ್ಕೆರೆ", "ಹೊಸದುರ್ಗ", "ಮೊಳಕಾಲ್ಮುರು"],
        "ದಕ್ಷಿಣ ಕನ್ನಡ": ["ಮಂಗಲೂರು", "ಬಂಟ್ವಾಳ", "ಪುತ್ತೂರು", "ಸುಳ್ಯ", "ಬೆಳ್ತಂಗಡಿ", "ಮೂಡುಬಿದಿರೆ", "ಕಡಬ"],
        "ದಾವಣಗೆರೆ": ["ದಾವಣಗೆರೆ", "ಹರಿಹರ", "ಚನ್ನಗಿರಿ", "ಹೊನ್ನಾಳಿ", "ಜಗಳೂರು", "ನ್ಯಾಮತಿ"],
        "ಧಾರವಾಡ": ["ಧಾರವಾಡ", "ಹುಬ್ಬಳ್ಳಿ", "ಕಲಘಟಗಿ", "ಕುಂದಗೋಳ", "ನವಲಗುಂದ", "ಆಳ್ನಾವರ", "ಅಣ್ಣಿಗೇರಿ", "ಹುಬ್ಬಳ್ಳಿ ನಗರ"],
        "ಗದಗ": ["ಗದಗ", "ರೋಣ", "ಶಿರಹಟ್ಟಿ", "ಮುಂಡರಗಿ", "ನರಗುಂದ", "ಗಜೇಂದ್ರಗಡ", "ಲಕ್ಷ್ಮೇಶ್ವರ"],
        "ಹಾಸನ": ["ಹಾಸನ", "ಆಲೂರು", "ಅರಸೀಕೆರೆ", "ಬೇಲೂರು", "ಚನ್ನರಾಯಪಟ್ಟಣ", "ಹೊಳೆನರಸೀಪುರ", "ಸಕಲೇಶಪುರ", "ಅರಕಲಗೂಡು"],
        "ಹಾವೇರಿ": ["ಹಾವೇರಿ", "ಬ್ಯಾಡಗಿ", "ಹಾನಗಲ್", "ಹಿರೇಕೆರೂರು", "ರಾಣೇಬೆನ್ನೂರು", "ಸವಣೂರು", "ಶಿಗ್ಗಾಂವಿ", "ರಟ್ಟಿಹಳ್ಳಿ"],
        "ಕಲಬುರಗಿ": ["ಕಲಬುರಗಿ", "ಅಫಜಲಪುರ", "ಆಳಂದ", "ಚಿಂಚೋಳಿ", "ಚಿತ್ತಾಪುರ", "ಜೇವರ್ಗಿ", "ಸೇಡಂ", "ಶಹಾಬಾದ್", "ಕಾಳಗಿ", "ಕಮಲಾಪುರ", "ಯಡ್ರಾಮಿ"],
        "ಕೊಡಗು": ["ಮಡಿಕೇರಿ", "ಸೋಮವಾರಪೇಟೆ", "ವೀರಾಜಪೇಟೆ", "ಕುಶಾಲನಗರ", "ಪೊನ್ನಂಪೇಟೆ"],
        "ಕೋಲಾರ": ["ಕೋಲಾರ", "ಬಂಗಾರಪೇಟೆ", "ಮಾಲೂರು", "ಮುಳಬಾಗಿಲು", "ಶ್ರೀನಿವಾಸಪುರ", "ಕೆ.ಜಿ.ಎಫ್"],
        "ಕೊಪ್ಪಳ": ["ಕೊಪ್ಪಳ", "ಗಂಗಾವತಿ", "ಕುಷ್ಟಗಿ", "ಯಲಬುರ್ಗಾ", "ಕನಕಗಿರಿ", "ಕುಕನೂರು", "ಕಾರಟಗಿ"],
        "ಮಂಡ್ಯ": ["ಮಂಡ್ಯ", "ಮದ್ದೂರು", "ಮಳವಳ್ಳಿ", "ಶ್ರೀರಂಗಪಟ್ಟಣ", "ಕೃಷ್ಣರಾಜಪೇಟೆ", "ಪಾಂಡವಪುರ", "ನಾಗಮಂಗಲ"],
        "ಮೈಸೂರು": ["ಮೈಸೂರು", "ಹಣಸೂರು", "ಕೃಷ್ಣರಾಜನಗರ", "ನಂಜನಗೂಡು", "ಪಿರಿಯಾಪಟ್ಟಣ", "ಟಿ.ನರಸೀಪುರ", "ಸರಗೂರು", "ಸಾಲಿಗ್ರಾಮ", "ಹೆಚ್.ಡಿ.ಕೋಟೆ"],
        "ರಾಯಚೂರು": ["ರಾಯಚೂರು", "ದೇವದುರ್ಗ", "ಲಿಂಗಸಗೂರು", "ಮಾನ್ವಿ", "ಸಿಂದನೂರು", "ಮಸ್ಕಿ", "ಸಿರವಾರ"],
        "ರಾಮನಗರ": ["ರಾಮನಗರ", "ಚನ್ನಪಟ್ಟಣ", "ಕನಕಪುರ", "ಮಾಗಡಿ"],
        "ಶಿವಮೊಗ್ಗ": ["ಶಿವಮೊಗ್ಗ", "ಭದ್ರಾವತಿ", "ಹೊಸನಗರ", "ಸಾಗರ", "ಶಿಕಾರಿಪುರ", "ಸೊರಬ", "ತೀರ್ಥಹಳ್ಳಿ"],
        "ತುಮಕೂರು": ["ತುಮಕೂರು", "ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ", "ಗುಬ್ಬಿ", "ಹುಳಿಯಾರು", "ಕೊರಟಗೆರೆ", "ಮಧುಗಿರಿ", "ಪಾವಗಡ", "ಸಿರ", "ತಿಪಟೂರು", "ತುರುವೇಕೆರೆ", "ಕುಣಿಗಲ್"],
        "ಉಡುಪಿ": ["ಉಡುಪಿ", "ಕಾರ್ಕಳ", "ಕುಂದಾಪುರ", "ಬ್ರಹ್ಮಾವರ", "ಬೈಂದೂರು", "ಕಾಪು", "ಹೆಬ್ರಿ"],
        "ಉತ್ತರ ಕನ್ನಡ": ["ಕಾರವಾರ", "ಅಂಕೋಲಾ", "ಭಟ್ಕಳ", "ಹಳಿಯಾಳ", "ಹೊನ್ನಾವರ", "ಕುಮಟಾ", "ಮುಂಡಗೋಡು", "ಸಿದ್ದಾಪುರ", "ಶಿರಸಿ", "ಜೋಯಿಡಾ", "ಯಲ್ಲಾಪುರ", "ದಾಂಡೇಲಿ"],
        "ವಿಜಯನಗರ": ["ಹೊಸಪೇಟೆ", "ಹರಪನಹಳ್ಳಿ", "ಹೂವಿನ ಹಡಗಲಿ", "ಹಗರಿಬೊಮ್ಮನಹಳ್ಳಿ", "ಕೊಟ್ಟೂರು", "ಕೂಡ್ಲಿಗಿ"],
        "ವಿಜಯಪುರ": ["ವಿಜಯಪುರ", "ಬಬಲೇಶ್ವರ", "ತಿಕೋಟಾ", "ಮುದ್ದೇಬಿಹಾಳ", "ಸಿಂದಗಿ", "ಬಸವನ ಬಾಗೇವಾಡಿ", "ಇಂಡಿ", "ಕೊಲ್ಹಾರ", "ದೇವರ ಹಿಪ್ಪರಗಿ", "ಚಡಚಣ", "ತಾಳಿಕೋಟೆ", "ಆಲಮೇಲ"],
        "ಯಾದಗಿರಿ": ["ಯಾದಗಿರಿ", "ಶಹಾಪುರ", "ಶೋರಾಪುರ", "ಹುಣಸಗಿ", "ಗುರುಮಿಠಕಲ್", "ವಡಗೇರಾ"]
    };

    const accountsData = [
        "ಸಾಮಾನ್ಯ ದೇಣಿಗೆ ಖಾತೆ (General Donation Account)",
        "ಶಿಕ್ಷಣ ಅಭಿವೃದ್ಧಿ ಖಾತೆ (Education Development Account)",
        "ಸದಸ್ಯತ್ವ ಖಾತೆ (Membership Account)",
        "ಕಟ್ಟಡ ನಿಧಿ ಖಾತೆ (Building Fund Account)",
        "ಸಮಾಜ ಕಲ್ಯಾಣ ಖಾತೆ (Social Welfare Account)",
        "ತುರ್ತು ಪರಿಹಾರ ಖಾತೆ (Emergency Relief Account)"
    ];

    // Function to populate a district select element
    function populateDistricts(districtSelect) {
        if (!districtSelect) return;
        
        // Preserve first option (placeholder)
        const firstOpt = districtSelect.options[0];
        districtSelect.innerHTML = "";
        if (firstOpt) {
            districtSelect.appendChild(firstOpt);
        } else {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-";
            districtSelect.appendChild(opt);
        }

        // Add districts
        for (const dist in karnatakaData) {
            const opt = document.createElement("option");
            opt.value = dist;
            opt.textContent = dist;
            districtSelect.appendChild(opt);
        }
    }

    // Function to populate taluk select based on selected district
    function populateTaluks(districtVal, talukSelect) {
        if (!talukSelect) return;
        
        const firstOpt = talukSelect.options[0];
        talukSelect.innerHTML = "";
        if (firstOpt) {
            talukSelect.appendChild(firstOpt);
        } else {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-";
            talukSelect.appendChild(opt);
        }

        if (districtVal && karnatakaData[districtVal]) {
            const taluks = karnatakaData[districtVal];
            taluks.forEach(function(taluk) {
                const opt = document.createElement("option");
                opt.value = taluk;
                opt.textContent = taluk;
                talukSelect.appendChild(opt);
            });
        }
    }

    // Function to populate account select element
    function populateAccounts(accountSelect) {
        if (!accountSelect) return;
        
        const firstOpt = accountSelect.options[0];
        accountSelect.innerHTML = "";
        if (firstOpt) {
            accountSelect.appendChild(firstOpt);
        } else {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "-- ಖಾತೆ ಆಯ್ಕೆಮಾಡಿ--";
            accountSelect.appendChild(opt);
        }

        accountsData.forEach(function(acc) {
            const opt = document.createElement("option");
            opt.value = acc;
            opt.textContent = acc;
            accountSelect.appendChild(opt);
        });
    }

    // Setup pairs of district and taluk selects
    const pairs = [
        { districtId: "district", talukId: "taluk" },
        { districtId: "donorDistrict", talukId: "donorTaluk" },
        // Fallback for names in Census.html
        { districtName: "district", talukName: "taluk" }
    ];

    pairs.forEach(function(pair) {
        let districtEl = null;
        let talukEl = null;

        if (pair.districtId) {
            districtEl = document.getElementById(pair.districtId);
            talukEl = document.getElementById(pair.talukId);
        }
        
        // Fallback to name search
        if (!districtEl && pair.districtName) {
            districtEl = document.querySelector('select[name="' + pair.districtName + '"]');
            talukEl = document.querySelector('select[name="' + pair.talukName + '"]');
        }

        if (districtEl && talukEl) {
            populateDistricts(districtEl);
            
            districtEl.addEventListener("change", function() {
                populateTaluks(this.value, talukEl);
            });
        }
    });

    // Setup accounts
    const accountSelect = document.getElementById("account");
    if (accountSelect) {
        populateAccounts(accountSelect);
    }
});
