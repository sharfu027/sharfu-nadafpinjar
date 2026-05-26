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
        districtSelect.innerHTML = "";
        
        const optDefault = document.createElement("option");
        optDefault.value = "";
        optDefault.textContent = "-ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ-";
        districtSelect.appendChild(optDefault);

        // Add districts
        for (const dist in karnatakaData) {
            const opt = document.createElement("option");
            opt.value = dist;
            opt.textContent = dist;
            districtSelect.appendChild(opt);
        }

        // Add manual entry option
        const optOther = document.createElement("option");
        optOther.value = "__OTHER__";
        optOther.textContent = "ಇತರೇ (ಖುದ್ದಾಗಿ ನಮೂದಿಸಿ) / Other (Type Manually)";
        districtSelect.appendChild(optOther);
    }

    // Function to populate taluk select based on selected district
    function populateTaluks(districtVal, talukSelect) {
        if (!talukSelect) return;
        talukSelect.innerHTML = "";
        
        const optDefault = document.createElement("option");
        optDefault.value = "";
        optDefault.textContent = "-ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ-";
        talukSelect.appendChild(optDefault);

        if (districtVal && karnatakaData[districtVal]) {
            const taluks = karnatakaData[districtVal];
            taluks.forEach(function(taluk) {
                const opt = document.createElement("option");
                opt.value = taluk;
                opt.textContent = taluk;
                talukSelect.appendChild(opt);
            });
        }

        // Add manual entry option
        const optOther = document.createElement("option");
        optOther.value = "__OTHER__";
        optOther.textContent = "ಇತರೇ (ಖುದ್ದಾಗಿ ನಮೂದಿಸಿ) / Other (Type Manually)";
        talukSelect.appendChild(optOther);
    }

    // Function to populate account select element
    function populateAccounts(accountSelect) {
        if (!accountSelect) return;
        accountSelect.innerHTML = "";
        
        const optDefault = document.createElement("option");
        optDefault.value = "";
        optDefault.textContent = "-- ಖಾತೆ ಆಯ್ಕೆಮಾಡಿ--";
        accountSelect.appendChild(optDefault);

        accountsData.forEach(function(acc) {
            const opt = document.createElement("option");
            opt.value = acc;
            opt.textContent = acc;
            accountSelect.appendChild(opt);
        });

        // Add manual entry option
        const optOther = document.createElement("option");
        optOther.value = "__OTHER__";
        optOther.textContent = "ಇತರೇ (ಖುದ್ದಾಗಿ ನಮೂದಿಸಿ) / Other (Type Manually)";
        accountSelect.appendChild(optOther);
    }

    // Handle display and naming of custom input field when "__OTHER__" is selected
    function handleOtherSelection(select, placeholder) {
        const parent = select.parentNode;
        let input = select.nextElementSibling;
        
        if (input && input.classList.contains("custom-other-input")) {
            if (select.value !== "__OTHER__") {
                if (input.parentNode) {
                    input.parentNode.removeChild(input);
                } else {
                    input.remove();
                }
                const originalName = select.getAttribute("data-original-name");
                if (originalName) {
                    select.setAttribute("name", originalName);
                    select.removeAttribute("data-original-name");
                }
            }
        } else {
            if (select.value === "__OTHER__") {
                input = document.createElement("input");
                input.type = "text";
                input.className = "custom-other-input";
                input.placeholder = placeholder || "ನಮೂದಿಸಿ / Enter value";
                input.style.cssText = "width: 100% !important; padding: 10px !important; margin-top: 8px !important; border: 1px solid #0066cc !important; border-radius: 4px !important; font-size: 14px !important; box-sizing: border-box !important;";
                
                const originalName = select.getAttribute("name");
                if (originalName) {
                    select.setAttribute("data-original-name", originalName);
                    select.removeAttribute("name");
                    input.setAttribute("name", originalName);
                }
                
                input.required = true;
                if (select.nextSibling) {
                    parent.insertBefore(input, select.nextSibling);
                } else {
                    parent.appendChild(input);
                }
                input.focus();
            }
        }
    }

    // Master function to scan and initialize all dropdown pairs safely
    function initializeAllFormDropdowns() {
        const selects = document.querySelectorAll("select");
        selects.forEach(function(select) {
            // 1. Initialize District selects
            if ((select.id === "district" || select.id === "donorDistrict" || select.name === "district") && !select.dataset.dropdownInit) {
                select.dataset.dropdownInit = "true";
                populateDistricts(select);
                
                let talukSelect = null;
                if (select.id === "district") talukSelect = document.getElementById("taluk");
                else if (select.id === "donorDistrict") talukSelect = document.getElementById("donorTaluk");
                else if (select.name === "district") talukSelect = document.querySelector('select[name="taluk"]');

                select.addEventListener("change", function() {
                    if (this.value === "__OTHER__") {
                        handleOtherSelection(this, "ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸಿ / Enter District");
                        if (talukSelect) {
                            populateTaluks("", talukSelect);
                        }
                    } else {
                        handleOtherSelection(this);
                        if (talukSelect) {
                            populateTaluks(this.value, talukSelect);
                        }
                    }
                });
            }

            // 2. Initialize Taluk selects
            if ((select.id === "taluk" || select.id === "donorTaluk" || select.name === "taluk") && !select.dataset.dropdownInit) {
                select.dataset.dropdownInit = "true";
                populateTaluks("", select);
                select.addEventListener("change", function() {
                    handleOtherSelection(this, "ತಾಲೂಕನ್ನು ನಮೂದಿಸಿ / Enter Taluk");
                });
            }

            // 3. Initialize Account selects
            if ((select.id === "account" || select.name === "account") && !select.dataset.dropdownInit) {
                select.dataset.dropdownInit = "true";
                populateAccounts(select);
                select.addEventListener("change", function() {
                    handleOtherSelection(this, "ಖಾತೆಯನ್ನು ನಮೂದಿಸಿ / Enter Account");
                });
            }
        });
    }

    // Run scans immediately, on page loaded states, and continuously at 500ms intervals to be 100% fail-safe
    initializeAllFormDropdowns();
    window.addEventListener("load", initializeAllFormDropdowns);
    setInterval(initializeAllFormDropdowns, 500);
});
