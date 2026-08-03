/**
 * Shared Receipt Printer for Karnataka State Nadaf / Pinjar Sangha
 * Uses IFRAME approach (matching admin-dashboard.js) so CSS renders in isolated document context.
 * This fixes Kannada text overlapping caused by style tags being stripped when using div.innerHTML.
 */
function generateDonationPDF(data, paymentId, formTitle, formPrefix, subheaderTitle, themeColor) {
    data = data || {};
    formPrefix = formPrefix || 'S';

    let type = 'direct';
    const sub = (subheaderTitle || formTitle || '').toLowerCase();
    if (formPrefix === 'T' || sub.includes('taluk') || sub.includes('ತಾಲೂಕು')) {
        type = 'taluk';
    } else if (formPrefix === 'D' || sub.includes('district') || sub.includes('ಜಿಲ್ಲೆ')) {
        type = 'district';
    }

    if (type === 'taluk') {
        themeColor = '#006600';
        subheaderTitle = 'ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ';
    } else if (type === 'district') {
        themeColor = '#0033cc';
        subheaderTitle = 'ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ';
    } else {
        themeColor = '#990000';
        subheaderTitle = 'ನೇರವಾಗಿ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ';
    }

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

    const amountVal = formatCurrencyRaw(data.amount);
    const modeVal = data.paymentMode || 'Online';
    const accountVal = data.account || 'ವಾರ್ಷಿಕ ವಂತಿಗೆ';
    const purposeVal = data.purposeDetails || 'ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹಕ್ಕಾಗಿ';

    const presidentImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.president) ? RECEIPT_ASSETS.president : 'images/president.jpeg';
    const logoImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.logo) ? RECEIPT_ASSETS.logo : 'images/logo-786.png';
    const sealImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.seal) ? RECEIPT_ASSETS.seal : 'images/seal.jpg';
    const sigImg = (typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.sig) ? RECEIPT_ASSETS.sig : 'images/sig.jpg';

    // Resolve relative image paths to absolute URLs for iframe context
    const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    function resolveUrl(src) {
        if (!src) return '';
        if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
        return baseUrl + src;
    }

    const absPresidentImg = resolveUrl(presidentImg);
    const absLogoImg = resolveUrl(logoImg);
    const absSealImg = resolveUrl(sealImg);
    const absSigImg = resolveUrl(sigImg);

    // Build middle rows based on receipt type
    let middleRowsHTML = '';

    if (type === 'direct') {
        const fullName = data.donorName || data.fullName || '-';
        const village = data.village || data.donorVillage || '-';
        const address = data.address || data.donorAddress || '-';
        const mobile = data.mobile || data.donorMobile || '-';
        const taluk = data.taluk || data.donorTaluk || '-';
        const district = data.district || data.donorDistrict || '-';

        middleRowsHTML = '<tr>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div><span class="field-label">ಹೆಸರು:</span> <span class="field-value" style="font-weight: 600;">' + fullName + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span> <span class="field-value">' + village + '</span></div>' +
                '<div><span class="field-label">ವಿಳಾಸ:</span> <span class="field-value">' + address + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 30%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಮೊಬೈಲ್:</span> <span class="field-value">' + mobile + '</span></div>' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ತಾಲೂಕು:</span> <span class="field-value">' + taluk + '</span></div>' +
                '<div><span class="field-label">ಜಿಲ್ಲೆ:</span> <span class="field-value">' + district + '</span></div>' +
            '</td>' +
        '</tr>';
    } else {
        const sec1Title = (type === 'taluk') ? 'ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ' : 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರ';
        const sec1Name = data.presidentName || (type === 'taluk' ? 'ತಾಲೂಕು ಅಧ್ಯಕ್ಷರು' : 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು');
        const sec1Village = data.presidentVillage || '-';
        const sec1Address = data.presidentAddress || '-';
        const sec1Mobile = data.presidentMobile || '-';
        const sec1Taluk = data.presidentTaluk || '-';
        const sec1District = data.presidentDistrict || '-';

        const donorName = data.donorName || data.fullName || '-';
        const donorVillage = data.village || data.donorVillage || '-';
        const donorAddress = data.address || data.donorAddress || '-';
        const donorMobile = data.mobile || data.donorMobile || '-';
        const donorTaluk = data.taluk || data.donorTaluk || '-';
        const donorDistrict = data.district || data.donorDistrict || '-';

        middleRowsHTML = '<tr>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div style="margin-bottom: 3px;"><u style="color: ' + themeColor + '; font-weight: bold;">' + sec1Title + ':</u></div>' +
                '<div><span class="field-label">ಹೆಸರು:</span> <span class="field-value">' + sec1Name + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span> <span class="field-value">' + sec1Village + '</span></div>' +
                '<div><span class="field-label">ವಿಳಾಸ:</span> <span class="field-value">' + sec1Address + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 30%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಮೊಬೈಲ್:</span> <span class="field-value">' + sec1Mobile + '</span></div>' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ತಾಲೂಕು:</span> <span class="field-value">' + sec1Taluk + '</span></div>' +
                '<div><span class="field-label">ಜಿಲ್ಲೆ:</span> <span class="field-value">' + sec1District + '</span></div>' +
            '</td>' +
        '</tr>' +
        '<tr>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div style="margin-bottom: 3px;"><u style="color: ' + themeColor + '; font-weight: bold;">ಯಾರ ಪರವಾಗಿ:</u></div>' +
                '<div><span class="field-label">ಹೆಸರು:</span> <span class="field-value" style="font-weight: 600;">' + donorName + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 35%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span> <span class="field-value">' + donorVillage + '</span></div>' +
                '<div><span class="field-label">ವಿಳಾಸ:</span> <span class="field-value">' + donorAddress + '</span></div>' +
            '</td>' +
            '<td class="grid-cell" style="width: 30%;">' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ಮೊಬೈಲ್:</span> <span class="field-value">' + donorMobile + '</span></div>' +
                '<div style="margin-bottom: 4px;"><span class="field-label">ತಾಲೂಕು:</span> <span class="field-value">' + donorTaluk + '</span></div>' +
                '<div><span class="field-label">ಜಿಲ್ಲೆ:</span> <span class="field-value">' + donorDistrict + '</span></div>' +
            '</td>' +
        '</tr>';
    }

    // Build the FULL HTML document string — this will be rendered inside an iframe
    const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=794">
    <title>Donation Receipt</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap">
    <style>
        * {
            box-sizing: border-box;
            letter-spacing: normal !important;
            word-spacing: normal !important;
            text-shadow: none !important;
        }
        html, body {
            height: auto;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #ffffff;
        }
        body {
            font-family: "Noto Sans Kannada", "Open Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: #111;
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 auto !important;
        }
        .receipt-container {
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 !important;
            border: none;
            padding: 4px 6px;
            background: #fff;
        }
        .header-box {
            width: 100%;
            border-collapse: collapse;
            border: 2.5px solid #a00000;
            border-radius: 8px;
            background-color: #ffedc2;
            margin-bottom: 4px;
        }
        .header-photo-cell {
            width: 115px;
            text-align: center;
            padding: 2px 4px 4px 6px;
            vertical-align: middle;
        }
        .patron-photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #a00000;
            object-fit: cover;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .header-logo-cell {
            width: 115px;
            text-align: center;
            padding: 2px 6px 4px 4px;
            vertical-align: middle;
        }
        .header-logo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #a00000;
            object-fit: cover;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .header-text-cell {
            text-align: center;
            vertical-align: middle;
            padding: 2px 0;
            color: #990000;
        }
        .kannada-title {
            font-size: 25px;
            font-weight: bold;
            color: #990000;
            margin-bottom: 2px;
            white-space: nowrap;
        }
        .reg-no {
            font-size: 13.5px;
            font-weight: bold;
            margin-bottom: 2px;
            color: #990000;
        }
        .english-title {
            font-size: 15.5px;
            font-weight: bold;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
            color: #990000;
        }
        .office-address, .office-location {
            font-size: 12.5px;
            font-weight: bold;
            color: #990000;
        }
        .receipt-grid {
            width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            border: 2.5px solid ${themeColor} !important;
        }
        .grid-cell {
            border: none;
            border-bottom: 1.5px solid ${themeColor};
            padding: 5px 8px !important;
            font-size: 13.5px !important;
            vertical-align: top !important;
            color: #1e293b;
            line-height: 1.6 !important;
            word-break: break-word !important;
            overflow-wrap: anywhere !important;
            white-space: normal !important;
            overflow: hidden !important;
        }
        .center-align { text-align: center; }
        .right-align { text-align: right; }
        .subheader-row { color: ${themeColor}; font-weight: bold; }
        .field-label {
            font-weight: bold;
            color: ${themeColor};
            margin-right: 4px;
        }
        .field-value {
            color: #000;
            font-weight: 500;
            word-break: break-word !important;
            overflow-wrap: anywhere !important;
            white-space: normal !important;
        }
        .seal-img { height: 60px; width: auto; }
        .sig-img { height: 46px; width: auto; margin-bottom: 1px; }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-box">
            <tr>
                <td colspan="3" style="text-align: center; padding: 4px 8px 1px 8px;">
                    <div class="kannada-title">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಡಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                </td>
            </tr>
            <tr>
                <td class="header-photo-cell">
                    <img src="${absPresidentImg}" class="patron-photo" onerror="this.src='${resolveUrl('images/president.png')}'">
                </td>
                <td class="header-text-cell">
                    <div class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div>
                    <div class="english-title">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                    <div class="office-address">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                    <div class="office-location">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div>
                </td>
                <td class="header-logo-cell">
                    <img src="${absLogoImg}" class="header-logo">
                </td>
            </tr>
        </table>
        <table class="receipt-grid">
            <tr class="subheader-row">
                <td class="grid-cell" style="width: 35%;">
                    <span class="field-label">ರಶೀದಿ ಸಂಖ್ಯೆ:</span><span class="field-value" style="white-space: nowrap;">${recId}</span>
                </td>
                <td class="grid-cell center-align" style="width: 35%;">
                    <div style="font-size: 15px; font-weight: bold; color: ${themeColor};">ಪಾವತಿಸಿದ ರಶೀದಿ</div>
                    <div style="font-size: 13.5px; font-weight: bold; margin-top: 2px; color: ${themeColor};">${subheaderTitle}</div>
                </td>
                <td class="grid-cell right-align" style="width: 30%;">
                    <span class="field-label">ದಿನಾಂಕ :</span><span class="field-value" style="white-space: nowrap;">${formattedDate}</span>
                </td>
            </tr>
            ${middleRowsHTML}
            <tr>
                <td class="grid-cell" style="width: 35%; border-bottom: none !important; padding: 6px 8px;">
                    <div><span class="field-label">ಪಾವತಿ ರಕಮು ರೂ:</span> <span class="field-value" style="font-size: 15px; font-weight: bold;">${amountVal}</span></div>
                    <div style="margin-top: 4px;"><span class="field-label">ರಶೀದಿ ದಿನಾಂಕ:</span> <span class="field-value">${formattedDate}</span></div>
                    <div style="margin-top: 4px;"><span class="field-label">ಯಾವ ಖಾತೆಗೆ:</span> <span class="field-value">${accountVal}</span></div>
                    <div style="margin-top: 4px;"><span class="field-label">ಯೋಜನೆ ಉದ್ದೇಶ:</span> <span class="field-value">${purposeVal}</span></div>
                </td>
                <td class="grid-cell center-align" style="width: 35%; border-bottom: none !important; padding: 6px 8px;">
                    <div><span class="field-label">ಪಾವತಿ ಮೋಡ್:</span> <span class="field-value" style="font-weight: bold;">${modeVal}</span></div>
                    <div style="margin-top: 6px; text-align: center;"><img src="${absSealImg}" class="seal-img"></div>
                </td>
                <td class="grid-cell" style="width: 30%; border-bottom: none !important; padding: 6px 8px;">
                    <div style="text-align: center; width: 100%; margin: 0 auto;">
                        <div style="font-size: 13.5px; font-weight: bold; color: ${themeColor}; margin-bottom: 2px; white-space: nowrap;">ಅದಾಬ್ ಗಳೊಂದಿಗೆ ಸ್ವೀಕರಿಸಿದೆ</div>
                        <img src="${absSigImg}" class="sig-img" style="margin-bottom: 2px;">
                        <div style="font-size: 14px; font-weight: bold; color: #4f1971; margin-top: 1px; line-height: 1.2; white-space: nowrap;">ಶಹಾಬುದ್ದೀನ್ ಸಾಬ್ ನೂರಭಾಷ</div>
                        <div style="font-size: 12.5px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ರಾಜ್ಯ ಕೋಶಾಧಿಕಾರಿ</div>
                        <div style="font-size: 11px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಡಾಫ್ ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                    </div>
                </td>
            </tr>
            <tr class="bottom-serial-row">
                <td class="grid-cell" colspan="2" style="width: 70%; border-top: none !important; border-bottom: none !important; padding: 4px 8px 6px 8px;">
                    <div><span class="field-label" style="font-size: 13.5px;">ರಶೀದಿಗಳ ಕ್ರಮ ಸಂಖ್ಯೆಗಳು :</span><span class="field-value" style="font-size: 13.5px; color: #000; white-space: nowrap;">KRNPS-${serialNoVal}</span></div>
                </td>
                <td class="grid-cell right-align" style="width: 30%; border-top: none !important; border-bottom: none !important; padding: 4px 8px 6px 8px; font-weight: bold; color: ${themeColor}; font-size: 13.5px; white-space: nowrap;">
                    <div>ಅಧಿಕೃತ ಸಹಿ</div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

    // ==========================================
    // IFRAME APPROACH (matching admin-dashboard.js)
    // This renders the HTML as a full document inside an iframe,
    // so ALL CSS styles are properly applied (unlike div.innerHTML which strips <style> tags)
    // ==========================================
    let iframe = document.getElementById('receiptPrintIframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'receiptPrintIframe';
        iframe.style.position = 'fixed';
        iframe.style.position = 'absolute';
        iframe.style.left = '0';
        iframe.style.top = '0';
        iframe.style.zIndex = '-9999';
        iframe.style.opacity = '1';
        iframe.style.pointerEvents = 'none';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
    }
    iframe.style.width = '210mm';
    iframe.style.height = '800px';
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(printHTML);
    doc.close();

    // Wait for iframe content to render, then capture as PDF
    setTimeout(() => {
        iframe.style.width = '794px';
        iframe.style.height = '100px';

        setTimeout(() => {
            const container = doc.querySelector('.receipt-container');
            if (container) {
                container.style.margin = '0';
            }
            const rect = container ? container.getBoundingClientRect() : { width: 750, height: 450 };
            const contentH = Math.ceil(rect.height || (container ? container.offsetHeight : 450));
            const contentW = Math.ceil(rect.width || (container ? container.offsetWidth : 750));
            const pageHmm = Math.ceil(contentH * 0.264583) + 1;
            let pageWmm = Math.ceil(contentW * 0.264583) + 1;
            if (pageWmm < 210) pageWmm = 210;

            const script = doc.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                const win = iframe.contentWindow;
                const h2c = win.html2canvas || window.html2canvas;
                const jsPdfClass = win.jsPDF || (win.jspdf && win.jspdf.jsPDF) || window.jsPDF || (window.jspdf && window.jspdf.jsPDF);

                const pdfWmm = contentW * 0.264583;
                const pdfHmm = contentH * 0.264583;
                const isLandscape = pdfWmm >= pdfHmm;

                if (h2c && jsPdfClass) {
                    // Use html2canvas directly (same as admin-dashboard.js)
                    h2c(container, {
                        scale: 2,
                        useCORS: true,
                        letterRendering: false,
                        scrollX: 0,
                        scrollY: 0,
                        width: contentW,
                        height: contentH,
                        windowWidth: contentW,
                        windowHeight: contentH
                    }).then(canvas => {
                        const imgData = canvas.toDataURL('image/jpeg', 0.98);
                        const pdf = new jsPdfClass({
                            orientation: isLandscape ? 'landscape' : 'portrait',
                            unit: 'mm',
                            format: [Math.min(pdfWmm, pdfHmm), Math.max(pdfWmm, pdfHmm)]
                        });
                        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWmm, pdfHmm);
                        pdf.save('Receipt-' + recId + '.pdf');
                    }).catch(err => {
                        console.error('html2canvas error:', err);
                        // Fallback to html2pdf
                        if (win.html2pdf) {
                            const opt = {
                                margin: 0,
                                filename: 'Receipt-' + recId + '.pdf',
                                image: { type: 'jpeg', quality: 0.98 },
                                html2canvas: { scale: 2, useCORS: true, letterRendering: false, scrollX: 0, scrollY: 0, width: contentW, height: contentH, windowWidth: contentW, windowHeight: contentH },
                                jsPDF: { unit: 'mm', format: [Math.min(pdfWmm, pdfHmm), Math.max(pdfWmm, pdfHmm)], orientation: isLandscape ? 'landscape' : 'portrait' }
                            };
                            win.html2pdf().from(container).set(opt).save();
                        } else {
                            iframe.contentWindow.focus();
                            iframe.contentWindow.print();
                        }
                    });
                } else if (win.html2pdf) {
                    // Fallback to html2pdf bundle
                    const opt = {
                        margin: 0,
                        filename: 'Receipt-' + recId + '.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, letterRendering: false, scrollX: 0, scrollY: 0, width: contentW, height: contentH, windowWidth: contentW, windowHeight: contentH },
                        jsPDF: { unit: 'mm', format: [Math.min(pdfWmm, pdfHmm), Math.max(pdfWmm, pdfHmm)], orientation: isLandscape ? 'landscape' : 'portrait' }
                    };
                    win.html2pdf().from(container).set(opt).save();
                } else {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                }
            };
            script.onerror = () => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            };
            doc.head.appendChild(script);
        }, 200);
    }, 300);
}
