/* admin-dashboard.js */

// Enforce Session Authentication
(function checkAuth() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
})();

// Helper to Format Currency in Indian Style (INR)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(amount);
}

// Initial Data Setup in LocalStorage
const defaultBeneficiaries = [
    {id: 1, name: "Sana Nadaf", account: "879964432", ifsc: "HDFC002255", swift: "HDFC002255", purpose: "1", status: "Active"},
    {id: 2, name: "Sha Nawaz", account: "ACC-090988", ifsc: "HDFC-098", swift: "HDFC-098", purpose: "EDUCATION", status: "Active"},
    {id: 3, name: "XYZ", account: "234233", ifsc: "wef", swift: "wer", purpose: "Education", status: "Active"}
];

const defaultReceipts = [
    {
        id: "2026-27-D-2",
        date: "2026-06-03",
        amount: 123211.00,
        from: "Amount Transfer from District to State",
        status: "Completed",
        mode: "Cash",
        narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :asdasasdaasd",
        serialNo: 14,
        details: {
            transactionDate: "03-06-2026 00:00:00",
            fullName: "asdasasdaasd",
            address: "asdasda",
            mobile: "4353",
            village: "aswqeqweqw",
            district: "ಹಾವೇರಿ",
            taluk: "ಶಿಗಾವಿ",
            presidentName: "asdas",
            presidentAddress: "asdas",
            presidentMobile: "23423",
            presidentVillage: "asdas",
            presidentDistrict: "",
            presidentTaluk: "",
            purpose: "ಕಾರ್ಯಕ್ರಮ ದೇಣಿಗೆ",
            purposeDetails: "asdasa",
            amount: "123211.00",
            mode: "Cash"
        }
    },
    {
        id: "2026-27-T-3",
        date: "2026-06-03",
        amount: 1000.00,
        from: "Amount Transfer from Taluk to State",
        status: "Completed",
        mode: "Cash",
        narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :232343",
        serialNo: 13,
        details: {
            transactionDate: "03-06-2026 00:00:00",
            fullName: "232343",
            address: "234234",
            mobile: "34543453",
            village: "234234",
            district: "ಚಿತ್ರದುರ್ಗ",
            taluk: "ಚಳ್ಳಕೆರೆ",
            presidentName: "dsaas",
            presidentAddress: "asdas",
            presidentMobile: "242343",
            presidentVillage: "asdas",
            presidentDistrict: "",
            presidentTaluk: "",
            purpose: "ರುಕಾತ್",
            purposeDetails: "retee",
            amount: "1000.00",
            mode: "Cash"
        }
    },
    {
        id: "2026-27-S-9",
        date: "2026-05-26",
        amount: 1.00,
        from: "Amount Transfer Direct to State",
        status: "Completed",
        mode: "Cash",
        narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :wcvtyu",
        serialNo: 12,
        details: {
            transactionDate: "26-05-2026 00:00:00",
            fullName: "wcvtyu",
            address: "wsedrcvghnjimo",
            mobile: "7896542231",
            village: "zsxdcfvghj",
            district: "ವಿಜಯಪುರ",
            taluk: "ಇಂಡಿ",
            purpose: "ಇತರೆ",
            purposeDetails: "zsxrctgbujmok",
            amount: "1.00",
            mode: "Cash"
        }
    },
    {
        id: "2026-27-S-10",
        date: "2026-05-25",
        amount: 1.00,
        from: "Amount Transfer Direct to State",
        status: "Completed",
        mode: "Cash",
        narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :fdfs",
        serialNo: 11,
        details: {
            transactionDate: "25-05-2026 00:00:00",
            fullName: "fdfs",
            address: "State Address Info 2",
            mobile: "9876543213",
            village: "State Village 2",
            district: "State District 2",
            taluk: "State Taluk 2",
            purpose: "ಸಾಮಾನ್ಯ ದೇಣಿಗೆ ಖಾತೆ",
            purposeDetails: "State Help 2",
            amount: "1.00",
            mode: "Cash"
        }
    },
    {
        id: "GENERATE-1",
        date: "2026-05-05",
        amount: 1065000.00,
        from: "Amount Transfer Direct to State",
        status: "",
        mode: "Cash",
        narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :Shabuddin Sab Noorabash",
        serialNo: 10,
        details: {
            transactionDate: "05-05-2026 00:00:00",
            fullName: "Shabuddin Sab Noorabash",
            address: "M G Cicle Devaraj Aras Colony",
            mobile: "9620071066",
            village: "Koppal",
            district: "ಕೊಪ್ಪಳ",
            taluk: "ಕುಕನೂರು",
            purpose: "ಕಾರ್ಯಕ್ರಮ ದೇಣಿಗೆ",
            purposeDetails: "Education Help",
            amount: "1065000.00",
            mode: "Cash"
        }
    }
];

const defaultTransfers = [
    {id: "TR-001", date: "2026-06-02", amount: 5000.00, fromAccount: "74270100009490", toAccount: "879964432", beneficiary: "Sana Nadaf", particulars: "Education support"},
    {id: "TR-002", date: "2026-06-03", amount: 12000.00, fromAccount: "74270100009490", toAccount: "ACC-090988", beneficiary: "Sha Nawaz", particulars: "Books and stationery"}
];

const defaultStatements = [
    {date: "2026-06-03", particulars: "Transfer to Sha Nawaz [TR-002]", debit: 12000.00, credit: 0.00, balance: 27565929.00},
    {date: "2026-06-03", particulars: "Cash Donation received [2026-27-T-3]", debit: 0.00, credit: 1800.00, balance: 27577929.00},
    {date: "2026-06-02", particulars: "Transfer to Sana Nadaf [TR-001]", debit: 5000.00, credit: 0.00, balance: 27576129.00},
    {date: "2026-06-01", particulars: "Cash Donation received [2026-27-D-2]", debit: 0.00, credit: 123211.00, balance: 27581129.00}
];

const defaultSecurity = {
    username: "info@nadafpinjar.com",
    password: "123456",
    email: "info@nadafpinjar.com",
    mobile: "+91 9480077666"
};

// Initialize Database Storage
if (!localStorage.getItem('adminBalance')) {
    localStorage.setItem('adminBalance', '27565929.00');
}
if (!localStorage.getItem('beneficiaries')) {
    localStorage.setItem('beneficiaries', JSON.stringify(defaultBeneficiaries));
}

// Force migrate/reset database schemas for receipts and security to newer schema version
if (localStorage.getItem('receipts_version') !== 'v7') {
    localStorage.setItem('receipts', JSON.stringify(defaultReceipts));
    localStorage.setItem('receipts_version', 'v7');
}
if (localStorage.getItem('security_version') !== 'v3') {
    localStorage.setItem('security', JSON.stringify(defaultSecurity));
    localStorage.setItem('security_version', 'v3');
}

if (!localStorage.getItem('transfers')) {
    localStorage.setItem('transfers', JSON.stringify(defaultTransfers));
}
if (!localStorage.getItem('statements')) {
    localStorage.setItem('statements', JSON.stringify(defaultStatements));
}

// Common Dashboard Setup after DOM Load
document.addEventListener("DOMContentLoaded", () => {
    // Sidebar active state highlight
    const currentPath = window.location.pathname.toLowerCase();
    const menuLinks = document.querySelectorAll(".sidebar-menu li a");
    menuLinks.forEach(link => {
        const href = link.getAttribute("href").toLowerCase();
        if (currentPath.includes(href) && href !== "#") {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });

    // Mobile Sidebar Toggle
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".admin-sidebar");
    const content = document.querySelector(".admin-content");
    
    if (toggleBtn && sidebar && content) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            sidebar.classList.toggle("active");
            content.classList.toggle("expanded");
        });
    }

    // Logout Click Binding
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // Page-specific initializers
    initPageModules();
});

function initPageModules() {
    const currentPath = window.location.pathname.toLowerCase();
    
    if (currentPath.includes("accountsummary")) {
        loadAccountSummary();
    } else if (currentPath.includes("beneficiaries")) {
        loadBeneficiaries();
    } else if (currentPath.includes("paymentsandtransfers")) {
        loadPaymentsAndTransfers();
    } else if (currentPath.includes("receipts")) {
        loadReceipts();
    } else if (currentPath.includes("associatedtransfers")) {
        loadAssociatedTransfers();
    } else if (currentPath.includes("statements")) {
        loadStatements();
    } else if (currentPath.includes("security")) {
        loadSecurity();
    } else if (currentPath.includes("viewreceipt")) {
        loadViewReceipt();
    }
}

// -------------------------------------------------------------
// 1. Account Summary
// -------------------------------------------------------------
function loadAccountSummary() {
    const balance = parseFloat(localStorage.getItem('adminBalance'));
    const balanceCells = document.querySelectorAll(".balance-cell");
    balanceCells.forEach(cell => {
        cell.textContent = formatCurrency(balance);
    });

    const secData = JSON.parse(localStorage.getItem('security'));
    const customerIdEl = document.getElementById("summaryCustomerId");
    if (customerIdEl) {
        customerIdEl.textContent = secData.email || 'info@nadafpinjar.com';
    }
}

// -------------------------------------------------------------
// 2. Beneficiaries
// -------------------------------------------------------------
function loadBeneficiaries() {
    const beneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
    const tableBody = document.getElementById("beneficiaryTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    beneficiaries.forEach((b, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${b.name}</strong></td>
            <td>${b.account}</td>
            <td>${b.ifsc}</td>
            <td>${b.swift}</td>
            <td>${b.purpose}</td>
            <td><span style="color: green; font-weight: bold;">${b.status}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // Form Submission
    const form = document.getElementById("beneficiaryForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const agree = document.getElementById("agreeCheck");
            if (agree && !agree.checked) {
                alert("Please agree to the terms and conditions.");
                return;
            }

            const name = document.getElementById("bName").value;
            const account = document.getElementById("bAccount").value;
            const ifsc = document.getElementById("bIfsc").value;
            const swift = document.getElementById("bSwift").value;
            const bankName = document.getElementById("bBankName").value;
            const branch = document.getElementById("bBranch").value;
            const purpose = document.getElementById("bPurpose").value;

            const newB = {
                id: Date.now(),
                name,
                account,
                ifsc,
                swift,
                purpose: purpose || "General",
                status: "Active",
                bankName,
                branch
            };

            beneficiaries.push(newB);
            localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
            form.reset();
            loadBeneficiaries();
            alert("Beneficiary added successfully!");
        });
    }
}

// -------------------------------------------------------------
// 3. Make Payments / Payments and Transfers
// -------------------------------------------------------------
function loadPaymentsAndTransfers() {
    const beneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
    const tableBody = document.getElementById("paymentsTableBody");
    if (!tableBody) return;

    // Display list
    tableBody.innerHTML = "";
    beneficiaries.forEach((b, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <input type="radio" name="selectBeneficiary" value="${b.id}" class="select-b-radio" style="width:16px; height:16px; cursor:pointer;">
            </td>
            <td>${index + 1}</td>
            <td><strong>${b.name}</strong></td>
            <td>${b.account}</td>
            <td>${b.ifsc}</td>
            <td>${b.swift}</td>
            <td>${b.purpose}</td>
            <td><span style="color: green; font-weight: bold;">${b.status}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // Bind selection event to radios
    const radios = document.querySelectorAll(".select-b-radio");
    radios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const bId = parseInt(e.target.value);
            const found = beneficiaries.find(b => b.id === bId);
            if (found) {
                document.getElementById("pName").value = found.name;
                document.getElementById("pAccount").value = found.account;
                document.getElementById("pBankName").value = found.bankName || "HDFC Bank";
                document.getElementById("pBranch").value = found.branch || "Bengaluru Branch";
                document.getElementById("pIfsc").value = found.ifsc;
                document.getElementById("pSwift").value = found.swift;
            }
        });
    });

    // Handle Payment Submission
    const form = document.getElementById("paymentForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("pName").value;
            const account = document.getElementById("pAccount").value;
            const amount = parseFloat(document.getElementById("pAmount").value);
            const particulars = document.getElementById("pParticulars").value;
            const agree = document.getElementById("pAgreeCheck");

            if (!name || !account || isNaN(amount) || amount <= 0) {
                alert("Please fill in valid beneficiary and amount details.");
                return;
            }

            if (agree && !agree.checked) {
                alert("Please agree to the terms and conditions.");
                return;
            }

            const currentBalance = parseFloat(localStorage.getItem('adminBalance'));
            if (amount > currentBalance) {
                alert("Insufficient funds in account.");
                return;
            }

            // Deduct Balance
            const newBalance = currentBalance - amount;
            localStorage.setItem('adminBalance', newBalance.toFixed(2));

            // Log statement
            const statements = JSON.parse(localStorage.getItem('statements')) || [];
            const newStatement = {
                date: new Date().toISOString().split('T')[0],
                particulars: `Transfer to ${name} [TR-${Date.now().toString().slice(-4)}]`,
                debit: amount,
                credit: 0.00,
                balance: newBalance
            };
            statements.unshift(newStatement);
            localStorage.setItem('statements', JSON.stringify(statements));

            // Log transfer
            const transfers = JSON.parse(localStorage.getItem('transfers')) || [];
            const newTransfer = {
                id: `TR-${Date.now().toString().slice(-4)}`,
                date: new Date().toISOString().split('T')[0],
                amount,
                fromAccount: "74270100009490",
                toAccount: account,
                beneficiary: name,
                particulars
            };
            transfers.unshift(newTransfer);
            localStorage.setItem('transfers', JSON.stringify(transfers));

            form.reset();
            alert(`Payment of ${formatCurrency(amount)} to ${name} completed successfully!`);
            window.location.href = "accountsummary";
        });
    }
}

// -------------------------------------------------------------
// 4. Receipts Page
// -------------------------------------------------------------
function loadReceipts() {
    const tableBody = document.getElementById("receiptsTableBody");
    if (!tableBody) return;

    function renderReceipts(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:#999;">No receipts found.</td></tr>`;
            return;
        }

        list.forEach((r, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${list.length - index}</td>
                <td>
                    ${r.id.startsWith("2026") ? 
                      `<span style="font-weight: 600; color: #4f1971;">${r.id}</span>` : 
                      `<button class="btn-view" onclick="generateReceiptId('${r.id}')" style="background:#0ea5e9; padding: 4px 8px; font-size:11px;">Generate Receipt</button>`}
                </td>
                <td>${formatDate(r.date)}</td>
                <td><strong>${formatCurrency(r.amount)}</strong></td>
                <td>${r.from}</td>
                <td><span style="color: green; font-weight: bold;">${r.status}</span></td>
                <td>${r.mode}</td>
                <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.narration}</td>
                <td>
                    <button class="btn-view" onclick="window.location.href='viewReceipt?id=' + encodeURIComponent('${r.id}')"><i class="fa fa-eye"></i> View</button>
                </td>
                <td>
                    <button class="btn-download" onclick="downloadReceiptPdf('${r.id}')"><i class="fa fa-download"></i> Download</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    renderReceipts(receipts);

    // Filters
    const filterForm = document.getElementById("receiptFilterForm");
    if (filterForm) {
        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const txType = document.getElementById("filterTxType").value;
            const startDate = document.getElementById("filterStartDate").value;
            const endDate = document.getElementById("filterEndDate").value;
            const mode = document.getElementById("filterMode").value;
            const status = document.getElementById("filterStatus").value;

            let filtered = [...receipts];

            if (txType && txType !== "All") {
                filtered = filtered.filter(r => r.from.toLowerCase().includes(txType.toLowerCase()));
            }
            if (startDate) {
                filtered = filtered.filter(r => r.date >= startDate);
            }
            if (endDate) {
                filtered = filtered.filter(r => r.date <= endDate);
            }
            if (mode && mode !== "All") {
                filtered = filtered.filter(r => r.mode.toLowerCase() === mode.toLowerCase());
            }
            if (status && status !== "All") {
                filtered = filtered.filter(r => r.status.toLowerCase() === status.toLowerCase());
            }

            renderReceipts(filtered);
        });
    }
}

// Generate Receipt ID dynamically with correct prefixes: D for district, S for state direct, T for taluk
window.generateReceiptId = function(oldId) {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const index = receipts.findIndex(r => r.id === oldId);
    if (index > -1) {
        const item = receipts[index];
        let prefix = 'S';
        const fromStr = (item.from || "").toLowerCase();
        if (fromStr.includes("district")) {
            prefix = 'D';
        } else if (fromStr.includes("taluk")) {
            prefix = 'T';
        } else if (fromStr.includes("direct") || fromStr.includes("state")) {
            prefix = 'S';
        }

        // Find highest index number for prefix
        let maxNum = 0;
        receipts.forEach(r => {
            if (r.id && r.id.startsWith("2026-27-")) {
                const parts = r.id.split('-');
                if (parts.length >= 4) {
                    const rPrefix = parts[2];
                    const rNum = parseInt(parts[3], 10);
                    if (rPrefix === prefix && !isNaN(rNum)) {
                        if (rNum > maxNum) {
                            maxNum = rNum;
                        }
                    }
                }
            }
        });

        const newNum = maxNum + 1;
        const newId = `2026-27-${prefix}-${newNum}`;

        receipts[index].id = newId;
        receipts[index].status = "Completed";

        // Assign next bottom serial number dynamically
        let maxSerial = 0;
        receipts.forEach(r => {
            if (r.serialNo && !isNaN(r.serialNo)) {
                if (r.serialNo > maxSerial) {
                    maxSerial = r.serialNo;
                }
            }
        });
        receipts[index].serialNo = maxSerial + 1;

        if (receipts[index].details) {
            receipts[index].details.receiptId = newId;
        }

        localStorage.setItem('receipts', JSON.stringify(receipts));
        loadReceipts();
        alert("Receipt number generated successfully!");
    }
};

// Populate the View Receipt Details fields on the viewReceipt.html page
window.loadViewReceipt = function() {
    const params = new URLSearchParams(window.location.search);
    const receiptId = params.get('id');
    if (!receiptId) return;

    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const found = receipts.find(r => r.id === receiptId);
    if (!found) return;

    const details = found.details || {};

    const viewTxDate = document.getElementById("viewTxDate");
    const viewFullName = document.getElementById("viewFullName");
    const viewAddress = document.getElementById("viewAddress");
    const viewMobile = document.getElementById("viewMobile");
    const viewVillage = document.getElementById("viewVillage");
    const viewDistrict = document.getElementById("viewDistrict");
    const viewTaluk = document.getElementById("viewTaluk");
    const viewPurpose = document.getElementById("viewPurpose");
    const viewPurposeDetails = document.getElementById("viewPurposeDetails");
    const viewAmount = document.getElementById("viewAmount");
    const viewMode = document.getElementById("viewMode");

    if (viewTxDate) viewTxDate.value = details.transactionDate || formatDate(found.date);
    if (viewFullName) viewFullName.value = details.fullName || "";
    if (viewAddress) viewAddress.value = details.address || "";
    if (viewMobile) viewMobile.value = details.mobile || "";
    if (viewVillage) viewVillage.value = details.village || "";
    if (viewDistrict) viewDistrict.value = details.district || "";
    if (viewTaluk) viewTaluk.value = details.taluk || "";
    if (viewPurpose) viewPurpose.value = details.purpose || found.from;
    if (viewPurposeDetails) viewPurposeDetails.value = details.purposeDetails || found.narration;
    if (viewAmount) viewAmount.value = details.amount || found.amount;
    if (viewMode) viewMode.value = details.mode || found.mode;

    const rejectBtn = document.getElementById("rejectReceiptBtn");
    if (rejectBtn) {
        rejectBtn.addEventListener("click", () => {
            const updatedReceipts = receipts.filter(r => r.id !== receiptId);
            localStorage.setItem('receipts', JSON.stringify(updatedReceipts));
            alert("The Receipt Has Been Rejected Successfully");
            window.location.href = "Receipts";
        });
    }

    const backBtn = document.getElementById("backReceiptBtn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "Receipts";
        });
    }
};

// Print/Download high-fidelity Donation Receipt PDF via hidden Iframe
window.downloadReceiptPdf = function(receiptId) {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const found = receipts.find(r => r.id === receiptId);
    if (!found) {
        alert("Receipt not found.");
        return;
    }
    const details = found.details || {};

    // Helper functions for Kannada styling
    const formatDateDashes = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatCurrencyRaw = (amount) => {
        return Number(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Calculate/Assign bottom serial number dynamically if missing
    let serialNoVal = found.serialNo;
    if (!serialNoVal) {
        let maxSerial = 0;
        receipts.forEach(r => {
            if (r.serialNo && !isNaN(r.serialNo)) {
                if (r.serialNo > maxSerial) {
                    maxSerial = r.serialNo;
                }
            }
        });
        serialNoVal = maxSerial + 1;
        // Save back to database
        const index = receipts.findIndex(r => r.id === receiptId);
        if (index > -1) {
            receipts[index].serialNo = serialNoVal;
            localStorage.setItem('receipts', JSON.stringify(receipts));
        }
    }

    // Determine colors, subheader titles and layout fields based on the source category
    let themeColor = "#b30000"; // Red for State Direct
    let subheaderTitle = "ನೇರವಾಗಿ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
    let fieldsHTML = "";

    const fromStr = (found.from || "").toLowerCase();
    if (fromStr.includes("district")) {
        themeColor = "#0033cc"; // Blue for District
        subheaderTitle = "ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
        fieldsHTML = `
            <!-- District President Info Row -->
            <tr style="background-color: #f8fafc;">
                <td class="grid-cell" colspan="3" style="font-weight: bold; border-bottom: none; text-decoration: underline; color: ${themeColor}; font-size: 13px;">
                    ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರ
                </td>
            </tr>
            <tr>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 33%;">
                    <span class="field-label">ಹೆಸರು:</span>
                    <span class="field-value">${details.presidentName || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 33%;">
                    <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                    <span class="field-value">${details.presidentVillage || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 34%;">
                    <span class="field-label">ಮೊಬೈಲ್:</span>
                    <span class="field-value">${details.presidentMobile || ""}</span>
                </td>
            </tr>
            <tr style="border-bottom: 2px solid ${themeColor};">
                <td class="grid-cell" colspan="2" style="border-top: none;">
                    <span class="field-label">ವಿಳಾಸ:</span>
                    <span class="field-value">${details.presidentAddress || ""}</span>
                </td>
                <td class="grid-cell" style="border-top: none;">
                    <div style="margin-bottom: 4px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value">${details.presidentTaluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value">${details.presidentDistrict || ""}</span>
                    </div>
                </td>
            </tr>

            <!-- On Behalf Of Info Row -->
            <tr style="background-color: #f8fafc;">
                <td class="grid-cell" colspan="3" style="font-weight: bold; border-bottom: none; text-decoration: underline; color: ${themeColor}; font-size: 13px;">
                    ಯಾರ ಪರವಾಗಿ:
                </td>
            </tr>
            <tr>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಹೆಸರು:</span>
                    <span class="field-value" style="font-weight: bold; color: ${themeColor};">${details.fullName || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                    <span class="field-value">${details.village || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಮೊಬೈಲ್:</span>
                    <span class="field-value">${details.mobile || ""}</span>
                </td>
            </tr>
            <tr>
                <td class="grid-cell" colspan="2" style="border-top: none;">
                    <span class="field-label">ವಿಳಾಸ:</span>
                    <span class="field-value">${details.address || ""}</span>
                </td>
                <td class="grid-cell" style="border-top: none;">
                    <div style="margin-bottom: 4px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value">${details.taluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value">${details.district || ""}</span>
                    </div>
                </td>
            </tr>
        `;
    } else if (fromStr.includes("taluk")) {
        themeColor = "#006600"; // Green for Taluk
        subheaderTitle = "ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
        fieldsHTML = `
            <!-- Taluk President Info Row -->
            <tr style="background-color: #f8fafc;">
                <td class="grid-cell" colspan="3" style="font-weight: bold; border-bottom: none; text-decoration: underline; color: ${themeColor}; font-size: 13px;">
                    ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ
                </td>
            </tr>
            <tr>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 33%;">
                    <span class="field-label">ಹೆಸರು:</span>
                    <span class="field-value">${details.presidentName || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 33%;">
                    <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                    <span class="field-value">${details.presidentVillage || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none; width: 34%;">
                    <span class="field-label">ಮೊಬೈಲ್:</span>
                    <span class="field-value">${details.presidentMobile || ""}</span>
                </td>
            </tr>
            <tr style="border-bottom: 2px solid ${themeColor};">
                <td class="grid-cell" colspan="2" style="border-top: none;">
                    <span class="field-label">ವಿಳಾಸ:</span>
                    <span class="field-value">${details.presidentAddress || ""}</span>
                </td>
                <td class="grid-cell" style="border-top: none;">
                    <div style="margin-bottom: 4px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value">${details.presidentTaluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value">${details.presidentDistrict || ""}</span>
                    </div>
                </td>
            </tr>

            <!-- On Behalf Of Info Row -->
            <tr style="background-color: #f8fafc;">
                <td class="grid-cell" colspan="3" style="font-weight: bold; border-bottom: none; text-decoration: underline; color: ${themeColor}; font-size: 13px;">
                    ಯಾರ ಪರವಾಗಿ:
                </td>
            </tr>
            <tr>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಹೆಸರು:</span>
                    <span class="field-value" style="font-weight: bold; color: ${themeColor};">${details.fullName || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                    <span class="field-value">${details.village || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; border-top: none;">
                    <span class="field-label">ಮೊಬೈಲ್:</span>
                    <span class="field-value">${details.mobile || ""}</span>
                </td>
            </tr>
            <tr>
                <td class="grid-cell" colspan="2" style="border-top: none;">
                    <span class="field-label">ವಿಳಾಸ:</span>
                    <span class="field-value">${details.address || ""}</span>
                </td>
                <td class="grid-cell" style="border-top: none;">
                    <div style="margin-bottom: 4px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value">${details.taluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value">${details.district || ""}</span>
                    </div>
                </td>
            </tr>
        `;
    } else {
        themeColor = "#b30000"; // Red for State Direct
        subheaderTitle = "ನೇರವಾಗಿ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
        fieldsHTML = `
            <tr>
                <td class="grid-cell" style="border-bottom: none; width: 33%;">
                    <span class="field-label">ಹೆಸರು:</span>
                    <span class="field-value" style="font-weight: bold; color: ${themeColor};">${details.fullName || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; width: 33%;">
                    <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                    <span class="field-value">${details.village || ""}</span>
                </td>
                <td class="grid-cell" style="border-bottom: none; width: 34%;">
                    <span class="field-label">ಮೊಬೈಲ್:</span>
                    <span class="field-value">${details.mobile || ""}</span>
                </td>
            </tr>
            <tr>
                <td class="grid-cell" colspan="2" style="border-top: none;">
                    <span class="field-label">ವಿಳಾಸ:</span>
                    <span class="field-value">${details.address || ""}</span>
                </td>
                <td class="grid-cell" style="border-top: none;">
                    <div style="margin-bottom: 4px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value">${details.taluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value">${details.district || ""}</span>
                    </div>
                </td>
            </tr>
        `;
    }

    const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Donation Receipt - ${found.id}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
        body {
            font-family: 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            margin: 0;
            padding: 10px;
            color: #333;
        }
        .receipt-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid ${themeColor};
            padding: 15px;
            background: #fff;
            box-sizing: border-box;
        }
        .header-box {
            width: 100%;
            border-collapse: collapse;
            border: 3px solid #b30000;
            background-color: #fffdeb;
            margin-bottom: 12px;
        }
        .header-photo-cell {
            width: 110px;
            text-align: center;
            padding: 10px;
            vertical-align: middle;
        }
        .patron-photo {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            border: 2px solid #b30000;
            object-fit: cover;
        }
        .header-logo-cell {
            width: 110px;
            text-align: center;
            padding: 10px;
            vertical-align: middle;
        }
        .header-logo {
            width: 90px;
            height: 90px;
            object-fit: contain;
        }
        .header-text-cell {
            text-align: center;
            vertical-align: middle;
            padding: 10px 0;
            color: #b30000;
        }
        .kannada-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 2px;
        }
        .reg-no {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 4px;
            color: #444;
        }
        .english-title {
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 0.5px;
            margin-bottom: 3px;
        }
        .office-address, .office-location {
            font-size: 11px;
            font-weight: bold;
            color: #333;
        }
        .receipt-grid {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid ${themeColor};
        }
        .grid-cell {
            border: 1px solid ${themeColor};
            padding: 8px 10px;
            font-size: 12.5px;
            vertical-align: top;
            color: #1e293b;
        }
        .center-align {
            text-align: center;
        }
        .right-align {
            text-align: right;
        }
        .subheader-row {
            color: ${themeColor};
            font-weight: bold;
        }
        .field-label {
            font-weight: 600;
            color: ${themeColor};
            margin-right: 5px;
        }
        .field-value {
            color: #000;
            font-weight: bold;
        }
        .payment-line {
            font-size: 13px;
        }
        .seal-sig-wrapper {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
        }
        .seal-img {
            height: 70px;
            width: auto;
            border-radius: 50%;
            border: 1.5px solid #5A1F75;
        }
        .sig-img {
            height: 40px;
            width: auto;
            margin-bottom: 4px;
        }
        @media print {
            @page {
                size: A4 portrait;
                margin: 10mm;
            }
            body {
                padding: 0;
            }
            .receipt-container {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-box">
            <tr>
                <td class="header-photo-cell">
                    <img src="images/president.png" class="patron-photo" onerror="this.src='images/president.jpeg'">
                </td>
                <td class="header-text-cell">
                    <div class="kannada-title">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                    <div class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ 23/1993-94</div>
                    <div class="english-title">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                    <div class="office-address">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                    <div class="office-location">ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ-577502</div>
                </td>
                <td class="header-logo-cell">
                    <img src="images/logo-786.png" class="header-logo">
                </td>
            </tr>
        </table>

        <table class="receipt-grid">
            <tr class="subheader-row">
                <td class="grid-cell" style="width: 33%; border-bottom: 2px solid ${themeColor};">
                    <span class="field-label">ರಶೀದಿ ಸಂಖ್ಯೆ:</span>
                    <span class="field-value">${found.id}</span>
                </td>
                <td class="grid-cell center-align" style="width: 34%; border-bottom: 2px solid ${themeColor};">
                    <div style="font-size: 13px; font-weight: bold;">ಪಾವತಿಸಿದ ರಶೀದಿ</div>
                    <div style="font-size: 12px; font-weight: bold; margin-top: 2px;">${subheaderTitle}</div>
                </td>
                <td class="grid-cell right-align" style="width: 33%; border-bottom: 2px solid ${themeColor};">
                    <span class="field-label">ದಿನಾಂಕ:</span>
                    <span class="field-value">${formatDateDashes(found.date)}</span>
                </td>
            </tr>

            ${fieldsHTML}

            <tr style="border-top: 2px solid ${themeColor};">
                <td class="grid-cell" colspan="2" style="border-right: none; border-bottom: none;">
                    <div class="payment-line" style="margin-top: 5px;">
                        <span class="field-label">ಪಾವತಿ ರಕಮು ರೂ:</span>
                        <span class="field-value" style="font-size: 14px; font-weight: bold; color: ${themeColor};">${formatCurrencyRaw(found.amount)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 12px;">
                        <span class="field-label">ರಶೀದಿ ದಿನಾಂಕ:</span>
                        <span class="field-value">${formatDateDashes(found.date)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 12px;">
                        <span class="field-label">ಯಾವ ಖಾತೆಗೆ:</span>
                        <span class="field-value">${details.purpose || found.from}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 12px;">
                        <span class="field-label">ಯೋಜನೆ ಉದ್ದೇಶ:</span>
                        <span class="field-value">${details.purposeDetails || "N/A"}</span>
                    </div>
                </td>
                <td class="grid-cell" style="border-left: none; border-bottom: none;">
                    <div class="payment-line right-align">
                        <span class="field-label">ಪಾವತಿ ಮೋಡ್:</span>
                        <span class="field-value">${details.mode || found.mode}</span>
                    </div>
                    <div class="seal-sig-wrapper" style="margin-top: 15px;">
                        <img src="images/seal.jpg" class="seal-img">
                        <div style="text-align: center; width: 140px;">
                            <div style="font-size: 10px; font-weight: bold; color: ${themeColor}; margin-bottom: 2px;">ಅದಾಬ್ ಗಳೊಂದಿಗೆ ಸ್ವೀಕರಿಸಿದೆ</div>
                            <img src="images/sig.jpg" class="sig-img">
                            <div style="font-size: 10.5px; font-weight: bold; line-height: 1.2; color: #000;">ಶಹಾಬುದ್ದೀನ್ ಸಾಬ್ ನೂರಭಾಷ</div>
                            <div style="font-size: 8.5px; line-height: 1.2; color: #555;">ರಾಜ್ಯ ಕೋಶಾಧಿಕಾರಿ</div>
                            <div style="font-size: 8.5px; line-height: 1.2; color: #555;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್ ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                        </div>
                    </div>
                </td>
            </tr>

            <tr class="bottom-serial-row">
                <td class="grid-cell" colspan="2" style="border-top: 2px solid ${themeColor}; padding-top: 10px;">
                    <span class="field-label" style="font-size: 13px;">ರಶೀದಿಗಳ ಕ್ರಮ ಸಂಖ್ಯೆಗಳು :</span>
                    <span class="field-value" style="font-size: 13px; color: ${themeColor};">KRNPS-2026-27-${serialNoVal}</span>
                </td>
                <td class="grid-cell right-align" style="border-top: 2px solid ${themeColor}; padding-top: 10px; font-weight: bold; padding-right: 40px; color: ${themeColor}; font-size: 13px;">
                    ಅಧಿಕೃತ ಸಹಿ
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

    let iframe = document.getElementById('receiptPrintIframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'receiptPrintIframe';
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
    }
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(printHTML);
    doc.close();
    
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
};

// Format Dates to DD/MM/YYYY
function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// -------------------------------------------------------------
// 5. Associated Transfers
// -------------------------------------------------------------
function loadAssociatedTransfers() {
    const tableBody = document.getElementById("transfersTableBody");
    if (!tableBody) return;

    const transfers = JSON.parse(localStorage.getItem('transfers')) || [];

    function renderTransfers(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#999;">No associated transfers found.</td></tr>`;
            return;
        }

        list.forEach((t, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${t.id}</strong></td>
                <td>${formatDate(t.date)}</td>
                <td><strong>${formatCurrency(t.amount)}</strong></td>
                <td>${t.toAccount}</td>
                <td>${t.beneficiary}</td>
                <td>${t.particulars}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTransfers(transfers);

    const filterForm = document.getElementById("transferFilterForm");
    if (filterForm) {
        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const start = document.getElementById("tStartDate").value;
            const end = document.getElementById("tEndDate").value;

            let filtered = [...transfers];
            if (start) filtered = filtered.filter(t => t.date >= start);
            if (end) filtered = filtered.filter(t => t.date <= end);

            renderTransfers(filtered);
        });
    }
}

// -------------------------------------------------------------
// 6. Statements Page
// -------------------------------------------------------------
function loadStatements() {
    const tableBody = document.getElementById("statementTableBody");
    if (!tableBody) return;

    const statements = JSON.parse(localStorage.getItem('statements')) || [];

    function renderStatements(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#999;">No transaction statements found.</td></tr>`;
            return;
        }

        list.forEach(s => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formatDate(s.date)}</td>
                <td>${s.particulars}</td>
                <td style="color:#b30000; font-weight:600;">${s.debit > 0 ? formatCurrency(s.debit) : "-"}</td>
                <td style="color:green; font-weight:600;">${s.credit > 0 ? formatCurrency(s.credit) : "-"}</td>
                <td><strong>${formatCurrency(s.balance)}</strong></td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderStatements(statements);

    const filterForm = document.getElementById("statementFilterForm");
    if (filterForm) {
        filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const start = document.getElementById("sStartDate").value;
            const end = document.getElementById("sEndDate").value;

            let filtered = [...statements];
            if (start) filtered = filtered.filter(s => s.date >= start);
            if (end) filtered = filtered.filter(s => s.date <= end);

            renderStatements(filtered);
        });
    }
}

// -------------------------------------------------------------
// 7. Security Page
// -------------------------------------------------------------
function loadSecurity() {
    const secData = JSON.parse(localStorage.getItem('security'));
    if (!secData) return;

    const form = document.getElementById("securityForm");
    if (!form) return;

    // Load values
    document.getElementById("secCustomerId").value = secData.username;
    document.getElementById("secAccountNum").value = "74270100009490";
    document.getElementById("secEmail").value = secData.email;
    document.getElementById("secMobile").value = secData.mobile;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPass = document.getElementById("secNewPassword").value;
        const confirmPass = document.getElementById("secConfirmPassword").value;
        const email = document.getElementById("secEmail").value;
        const mobile = document.getElementById("secMobile").value;
        const agree = document.getElementById("secAgreeCheck");

        if (newPass && newPass !== confirmPass) {
            alert("New Password and Confirm Password do not match.");
            return;
        }

        if (agree && !agree.checked) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        // Save
        const updatedSec = {
            username: secData.username,
            password: newPass ? newPass : secData.password,
            email,
            mobile
        };

        localStorage.setItem('security', JSON.stringify(updatedSec));
        alert("Security credentials updated successfully!");
        window.location.reload();
    });
}
