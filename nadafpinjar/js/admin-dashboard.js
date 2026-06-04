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
    {id: "2026-27-D-2", date: "2026-06-01", amount: 121211.00, from: "Amount Transfer From District to State", status: "Completed", mode: "Cash", narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM andasandasad"},
    {id: "2026-27-T-3", date: "2026-06-03", amount: 1800.00, from: "Amount Transfer From Taluk to State", status: "Completed", mode: "Cash", narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM 232343"},
    {id: "2026-27-D-9", date: "2026-05-26", amount: 1.00, from: "Amount Transfer Direct to State", status: "Completed", mode: "Cash", narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM mcvbyu"},
    {id: "2026-27-D-8", date: "2026-05-25", amount: 1.00, from: "Amount Transfer Direct to State", status: "Completed", mode: "Cash", narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM Jdjs"},
    {id: "2026-27-D-7", date: "2026-05-05", amount: 1965000.00, from: "Amount Transfer Direct to State", status: "Completed", mode: "Cash", narration: "Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM Shabuddin Sab Noorabash"}
];

const defaultTransfers = [
    {id: "TR-001", date: "2026-06-02", amount: 5000.00, fromAccount: "74270100009490", toAccount: "879964432", beneficiary: "Sana Nadaf", particulars: "Education support"},
    {id: "TR-002", date: "2026-06-03", amount: 12000.00, fromAccount: "74270100009490", toAccount: "ACC-090988", beneficiary: "Sha Nawaz", particulars: "Books and stationery"}
];

const defaultStatements = [
    {date: "2026-06-03", particulars: "Transfer to Sha Nawaz [TR-002]", debit: 12000.00, credit: 0.00, balance: 27565929.00},
    {date: "2026-06-03", particulars: "Cash Donation received [2026-27-T-3]", debit: 0.00, credit: 1800.00, balance: 27577929.00},
    {date: "2026-06-02", particulars: "Transfer to Sana Nadaf [TR-001]", debit: 5000.00, credit: 0.00, balance: 27576129.00},
    {date: "2026-06-01", particulars: "Cash Donation received [2026-27-D-2]", debit: 0.00, credit: 121211.00, balance: 27581129.00}
];

const defaultSecurity = {
    username: "info@nadafpinjar.com",
    password: "password",
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
if (!localStorage.getItem('receipts')) {
    localStorage.setItem('receipts', JSON.stringify(defaultReceipts));
}
if (!localStorage.getItem('transfers')) {
    localStorage.setItem('transfers', JSON.stringify(defaultTransfers));
}
if (!localStorage.getItem('statements')) {
    localStorage.setItem('statements', JSON.stringify(defaultStatements));
}
if (!localStorage.getItem('security')) {
    localStorage.setItem('security', JSON.stringify(defaultSecurity));
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
                <td>${index + 1}</td>
                <td>
                    ${r.id.startsWith("2026") ? 
                      `<span style="font-weight: 600; color: #4f1971;">${r.id}</span>` : 
                      `<button class="btn-view" onclick="generateReceiptId('${r.id}')" style="background:#5A1F75; padding: 4px 8px; font-size:11px;">Generate Receipt</button>`}
                </td>
                <td>${formatDate(r.date)}</td>
                <td><strong>${formatCurrency(r.amount)}</strong></td>
                <td>${r.from}</td>
                <td><span style="color: green; font-weight: bold;">${r.status}</span></td>
                <td>${r.mode}</td>
                <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.narration}</td>
                <td>
                    <button class="btn-view" onclick="viewReceiptDetails('${r.id}')"><i class="fa fa-eye"></i> View</button>
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

// Generate Receipt ID dynamically
window.generateReceiptId = function(oldId) {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const index = receipts.findIndex(r => r.id === oldId);
    if (index > -1) {
        const randomNum = Math.floor(Math.random() * 10) + 1;
        receipts[index].id = `2026-27-D-${randomNum}`;
        localStorage.setItem('receipts', JSON.stringify(receipts));
        loadReceipts();
        alert("Receipt number generated successfully!");
    }
};

// Open View Receipt Details Modal
window.viewReceiptDetails = function(receiptId) {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const found = receipts.find(r => r.id === receiptId);
    if (!found) return;

    // Create Modal element if it doesn't exist
    let modal = document.getElementById("receiptModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "receiptModal";
        modal.className = "admin-modal";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span>Receipt Details - ${found.id}</span>
                <button class="modal-close" onclick="closeReceiptModal()">&times;</button>
            </div>
            <div class="modal-body" style="padding: 25px;">
                <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px;">
                    <h3 style="color:#4f1971;">KARNATAKA STATE NADAF PINJAR SANGHA</h3>
                    <p style="font-size:12px; color:#666;">Chitradurga, Karnataka</p>
                </div>
                <table style="width:100%; font-size:13px; border-collapse:collapse;">
                    <tr style="height:35px;"><td style="font-weight:600; width:150px;">Receipt ID:</td><td>${found.id}</td></tr>
                    <tr style="height:35px;"><td style="font-weight:600;">Transaction Date:</td><td>${formatDate(found.date)}</td></tr>
                    <tr style="height:35px;"><td style="font-weight:600;">Amount:</td><td style="font-size:15px; font-weight:bold; color:#4f1971;">${formatCurrency(found.amount)}</td></tr>
                    <tr style="height:35px;"><td style="font-weight:600;">Account Type:</td><td>${found.from}</td></tr>
                    <tr style="height:35px;"><td style="font-weight:600;">Payment Mode:</td><td>${found.mode}</td></tr>
                    <tr style="height:35px;"><td style="font-weight:600;">Payment Status:</td><td><span style="color:green; font-weight:bold;">${found.status}</span></td></tr>
                    <tr style="height:35px;"><td style="font-weight:600; vertical-align:top;">Narration:</td><td>${found.narration}</td></tr>
                </table>
                <div style="text-align:center; margin-top:25px;">
                    <button class="btn-download" onclick="downloadReceiptPdf('${found.id}')" style="padding:8px 20px;"><i class="fa fa-print"></i> Print Receipt</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = "flex";
};

window.closeReceiptModal = function() {
    const modal = document.getElementById("receiptModal");
    if (modal) modal.style.display = "none";
};

window.downloadReceiptPdf = function(receiptId) {
    alert(`Downloading Receipt PDF for receipt: ${receiptId}`);
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
