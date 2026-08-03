/**
 * Shared Receipt Printer for Karnataka State Nadaf / Pinjar Sangha
 * Fixed layout with strict 3-column widths (33%, 37%, 30%) and word-wrap to prevent text merging or clipping.
 */
function generateDonationPDF(data, paymentId, formTitle, formPrefix, subheaderTitle, themeColor) {
    themeColor = themeColor || '#0066cc';
    formPrefix = formPrefix || 'S';
    subheaderTitle = subheaderTitle || 'ನೇರವಾಗಿ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ';

    const formatDateDashes = function(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return day + '-' + month + '-' + year;
    };

    const formatCurrencyRaw = function(amount) {
        return Number(amount || 0).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formattedDate = formatDateDashes(new Date());
    const seqNo = Math.floor(1000 + Math.random() * 9000);
    const recId = paymentId || ('KRNPS-2026-' + formPrefix + '-' + seqNo);
    const serialNoVal = '2026-27-' + (paymentId ? paymentId.replace(/[^0-9]/g, '').slice(-4) : seqNo);

    const fullName = data.donorName || data.fullName || '-';
    const village = data.village || data.donorVillage || '-';
    const address = data.address || data.donorAddress || '-';
    const mobile = data.mobile || data.donorMobile || '-';
    const taluk = data.taluk || data.donorTaluk || '-';
    const district = data.district || data.donorDistrict || '-';
    const amountVal = formatCurrencyRaw(data.amount);
    const modeVal = data.paymentMode || 'Online';
    const accountVal = data.account || 'ವಾರ್ಷಿಕ ವಂತಿಗೆ';
    const purposeVal = data.purposeDetails || 'ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹಕ್ಕಾಗಿ';

    const presidentImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.president) ? RECEIPT_ASSETS.president : 'images/president.jpeg';
    const logoImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.logo) ? RECEIPT_ASSETS.logo : 'images/logo-786.png';
    const sealImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.seal) ? RECEIPT_ASSETS.seal : 'images/seal.jpg';
    const sigImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.sig) ? RECEIPT_ASSETS.sig : 'images/sig.jpg';

    const printHTML = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=794"><title>Donation Receipt</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap"><style>html, body { height: auto; margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; } body { font-family: "Noto Sans Kannada", "Open Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background: #fff; color: #333; width: 794px !important; max-width: 794px !important; margin: 0 auto !important; box-sizing: border-box; } .receipt-container { width: 794px !important; max-width: 794px !important; margin: 0 !important; border: none; padding: 4px 6px; background: #fff; box-sizing: border-box; } .header-box { width: 100%; border-collapse: collapse; border: 2.5px solid #a00000; border-radius: 8px; background-color: #ffedc2; margin-bottom: 4px; } .header-photo-cell { width: 115px; text-align: center; padding: 2px 4px 4px 6px; vertical-align: middle; } .patron-photo { width: 100px; height: 100px; border-radius: 50%; border: 2px solid #a00000; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.15); } .header-logo-cell { width: 115px; text-align: center; padding: 2px 6px 4px 4px; vertical-align: middle; } .header-logo { width: 100px; height: 100px; border-radius: 50%; border: 2px solid #a00000; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.15); } .header-text-cell { text-align: center; vertical-align: middle; padding: 2px 0; color: #990000; } .kannada-title { font-size: 25px; font-weight: bold; color: #990000; margin-bottom: 2px; white-space: nowrap; } .reg-no { font-size: 13.5px; font-weight: bold; margin-bottom: 2px; color: #990000; } .english-title { font-size: 15.5px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 2px; color: #990000; } .office-address, .office-location { font-size: 12.5px; font-weight: bold; color: #990000; } .receipt-grid { width: 100% !important; table-layout: fixed !important; border-collapse: collapse !important; border-spacing: 0 !important; border: 2.5px solid ' + themeColor + ' !important; box-sizing: border-box !important; } .grid-cell { border: none; border-bottom: 1.5px solid ' + themeColor + '; padding: 3px 6px !important; font-size: 13px !important; vertical-align: top !important; color: #1e293b; line-height: 1.35 !important; box-sizing: border-box !important; word-break: break-word !important; overflow-wrap: anywhere !important; } .center-align { text-align: center; } .right-align { text-align: right; } .subheader-row { color: ' + themeColor + '; font-weight: bold; } .field-label { font-weight: 600; color: ' + themeColor + '; margin-right: 4px; } .field-value { color: #000; font-weight: 500; } .seal-img { height: 62px; width: auto; } .sig-img { height: 48px; width: auto; margin-bottom: 1px; }</style></head><body><div class="receipt-container"><table class="header-box"><tr><td colspan="3" style="text-align: center; padding: 4px 8px 1px 8px;"><div class="kannada-title">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಡಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div></td></tr><tr><td class="header-photo-cell"><img src="' + presidentImg + '" class="patron-photo" onerror="this.src=\'images/president.png\'"></td><td class="header-text-cell"><div class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div><div class="english-title">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div><div class="office-address">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div><div class="office-location">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div></td><td class="header-logo-cell"><img src="' + logoImg + '" class="header-logo"></td></tr></table><table class="receipt-grid"><tr class="subheader-row"><td class="grid-cell" style="width: 33%;"><span class="field-label">ರಶೀದಿ ಸಂಖ್ಯೆ:</span><span class="field-value" style="white-space: nowrap;">' + recId + '</span></td><td class="grid-cell center-align" style="width: 37%;"><div style="font-size: 15px; font-weight: bold; color: ' + themeColor + ';">ಪಾವತಿಸಿದ ರಶೀದಿ</div><div style="font-size: 13px; font-weight: bold; margin-top: 2px; color: ' + themeColor + ';">' + subheaderTitle + '</div></td><td class="grid-cell right-align" style="width: 30%;"><span class="field-label">ದಿನಾಂಕ :</span><span class="field-value" style="white-space: nowrap;">' + formattedDate + '</span></td></tr><tr><td class="grid-cell" style="width: 33%;"><div style="margin-bottom: 2px;"><u style="color: ' + themeColor + '; font-weight: bold;">ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರ:</u></div><div><span class="field-label">ಹೆಸರು:</span><span class="field-value" style="font-weight: 500; color: #000;">ರಾಜ್ಯ ಸಮಿತಿ</span></div></td><td class="grid-cell" style="width: 37%;"><div style="margin-bottom: 2px;"><span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span><span class="field-value" style="font-weight: 500; color: #000;">ಚಿತ್ರದುರ್ಗ</span></div><div><span class="field-label">ವಿಳಾಸ:</span><span class="field-value" style="font-weight: 500; color: #000;">ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ</span></div></td><td class="grid-cell" style="width: 30%;"><div style="margin-bottom: 2px;"><span class="field-label">ಮೊಬೈಲ್:</span><span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">-</span></div><div style="margin-bottom: 2px;"><span class="field-label">ತಾಲೂಕು:</span><span class="field-value" style="font-weight: 500; color: #000;">ಚಿತ್ರದುರ್ಗ</span></div><div><span class="field-label">ಜಿಲ್ಲೆ:</span><span class="field-value" style="font-weight: 500; color: #000;">ಚಿತ್ರದುರ್ಗ</span></div></td></tr><tr><td class="grid-cell" style="width: 33%;"><div style="margin-bottom: 2px;"><u style="color: ' + themeColor + '; font-weight: bold;">ಯಾರ ಪರವಾಗಿ:</u></div><div><span class="field-label">ಹೆಸರು:</span><span class="field-value" style="font-weight: 600; color: #000;">' + fullName + '</span></div></td><td class="grid-cell" style="width: 37%;"><div style="margin-bottom: 2px;"><span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span><span class="field-value" style="font-weight: 500; color: #000;">' + village + '</span></div><div><span class="field-label">ವಿಳಾಸ:</span><span class="field-value" style="font-weight: 500; color: #000;">' + address + '</span></div></td><td class="grid-cell" style="width: 30%;"><div style="margin-bottom: 2px;"><span class="field-label">ಮೊಬೈಲ್:</span><span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">' + mobile + '</span></div><div style="margin-bottom: 2px;"><span class="field-label">ತಾಲೂಕು:</span><span class="field-value" style="font-weight: 500; color: #000;">' + taluk + '</span></div><div><span class="field-label">ಜಿಲ್ಲೆ:</span><span class="field-value" style="font-weight: 500; color: #000;">' + district + '</span></div></td></tr><tr><td class="grid-cell" style="width: 33%; border-bottom: none !important; padding: 4px 6px;"><div><span class="field-label">ಪಾವತಿ ರಕಮು ರೂ:</span><span class="field-value" style="font-size: 14.5px; font-weight: bold; color: #000;">' + amountVal + '</span></div><div style="margin-top: 4px;"><span class="field-label">ರಶೀದಿ ದಿನಾಂಕ:</span><span class="field-value" style="color: #000;">' + formattedDate + '</span></div><div style="margin-top: 4px;"><span class="field-label">ಯಾವ ಖಾತೆಗೆ:</span><span class="field-value" style="color: #000;">' + accountVal + '</span></div><div style="margin-top: 4px;"><span class="field-label">ಯೋಜನೆ ಉದ್ದೇಶ:</span><span class="field-value" style="color: #000;">' + purposeVal + '</span></div></td><td class="grid-cell center-align" style="width: 37%; border-bottom: none !important; padding: 4px 6px;"><div><span class="field-label">ಪಾವತಿ ಮೋಡ್:</span><span class="field-value" style="font-weight: bold; color: #000;">' + modeVal + '</span></div><div style="margin-top: 8px; text-align: center;"><img src="' + sealImg + '" class="seal-img"></div></td><td class="grid-cell" style="width: 30%; border-bottom: none !important; padding: 4px 6px;"><div style="text-align: center; width: 100%; margin: 0 auto;"><div style="font-size: 13px; font-weight: bold; color: ' + themeColor + '; margin-bottom: 2px; white-space: nowrap;">ಅದಾಬ್ ಗಳೊಂದಿಗೆ ಸ್ವೀಕರಿಸಿದೆ</div><img src="' + sigImg + '" class="sig-img" style="margin-bottom: 2px;"><div style="font-size: 14px; font-weight: bold; color: #4f1971; margin-top: 1px; line-height: 1.2; white-space: nowrap;">ಶಹಾಬುದ್ದೀನ್ ಸಾಬ್ ನೂರಭಾಷ</div><div style="font-size: 12.5px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ರಾಜ್ಯ ಕೋಶಾಧಿಕಾರಿ</div><div style="font-size: 11px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್ ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div></div></td></tr><tr class="bottom-serial-row"><td class="grid-cell" colspan="2" style="width: 70%; border-top: none !important; border-bottom: none !important; padding: 4px 8px 6px 8px;"><div><span class="field-label" style="font-size: 13.5px;">ರಶೀದಿಗಳ ಕ್ರಮ ಸಂಖ್ಯೆಗಳು :</span><span class="field-value" style="font-size: 13.5px; color: #000; white-space: nowrap;">KRNPS-' + serialNoVal + '</span></div></td><td class="grid-cell right-align" style="width: 30%; border-top: none !important; border-bottom: none !important; padding: 4px 8px 6px 8px; font-weight: bold; color: ' + themeColor + '; font-size: 13.5px; white-space: nowrap;"><div>ಅಧಿಕೃತ ಸಹಿ</div></td></tr></table></div></body></html>';

    const pdfContainer = document.createElement('div');
    pdfContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 794px; z-index: -9999; opacity: 1; pointer-events: none; background: #ffffff;';
    pdfContainer.innerHTML = printHTML;
    document.body.appendChild(pdfContainer);

    const opt = {
        margin: 0,
        filename: 'Receipt-' + recId + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794 },
        jsPDF: { unit: 'mm', format: 'a5', orientation: 'landscape' }
    };

    function triggerSave() {
        if (typeof html2pdf !== 'undefined') {
            html2pdf().from(pdfContainer).set(opt).save().then(function() {
                if (pdfContainer.parentNode) pdfContainer.parentNode.removeChild(pdfContainer);
            }).catch(function(err) {
                console.error('html2pdf save error:', err);
                window.print();
                if (pdfContainer.parentNode) pdfContainer.parentNode.removeChild(pdfContainer);
            });
        } else {
            window.print();
            if (pdfContainer.parentNode) pdfContainer.parentNode.removeChild(pdfContainer);
        }
    }

    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = triggerSave;
        script.onerror = triggerSave;
        document.head.appendChild(script);
    } else {
        triggerSave();
    }
}
