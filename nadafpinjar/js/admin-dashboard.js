
function maskAadhar(val) {
    if (!val || val === '-') return '-';
    const digits = val.toString().replace(/\D/g, '');
    if (digits.length >= 4) {
        return 'XXXX XXXX ' + digits.slice(-4);
    }
    return val;
}

function toggleAdminMemberDisability(selectEl) {
    const container = selectEl.nextElementSibling;
    if (container && container.classList.contains('mem-disability-details-container')) {
        if (selectEl.value === 'ಹೌದು' || selectEl.value === '__OTHER__') {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
            const input = container.querySelector('input');
            if (input) input.value = '';
        }
    }
}

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
            presidentDistrict: "ಹಾವೇರಿ",
            presidentTaluk: "ಶಿಗಾವಿ",
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
            presidentDistrict: "ಚಿತ್ರದುರ್ಗ",
            presidentTaluk: "ಚಳ್ಳಕೆರೆ",
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

const defaultFreeeduSubmissions = [
    {
        id: "HEH-2026-27-88",
        date: new Date().toLocaleDateString('en-GB'),
        formData: {
            studentName: "ಆಫ್ರಿನ್ ನದಾಫ್",
            fatherName: "ಇಬ್ರಾಹಿಂ",
            motherName: "ಫಾತಿಮಾ",
            address: "ಗಾಂಧಿ ನಗರ",
            village: "ಚಿತ್ರದುರ್ಗ",
            district: "ಚಿತ್ರದುರ್ಗ",
            occupation: "ಕೂಲಿ",
            taluk: "ಚಿತ್ರದುರ್ಗ",
            aadhar: "123456789012",
            membership: "ಹೌದು",
            rationType: "BPL",
            housingInfo: "ಸ್ವಂತ",
            houseType: "ಪಕ್ಕಾ",
            landInfo: "0",
            gunte: "0",
            income: "50000",
            mobile: "9876543210",
            currentSchool: "ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ",
            previousMarks: "85%",
            joiningClass: "10 ನೇ ತರಗತಿ",
            classSubjects: "ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಗಣಿತ, ವಿಜ್ಞಾನ",
            coaching: "ಗಣಿತ ಮತ್ತು ವಿಜ್ಞಾನ",
            bankName: "SBI",
            branchName: "ಚಿತ್ರದುರ್ಗ",
            ifsc: "SBIN0001234",
            bankAccount: "10020030040"
        }
    }
];

const defaultCensusSubmissions = [
    {
        id: "CEN-2026-27-55",
        date: new Date().toLocaleDateString('en-GB'),
        formData: {
            headName: "ಇಸ್ಮಾಯಿಲ್ ಸಾಬ್ ನದಾಫ್",
            address: "ನೆಹರು ರಸ್ತೆ",
            village: "ಹಾವೇರಿ",
            district: "ಹಾವೇರಿ",
            taluk: "ಶಿಗಾವಿ",
            headAadhar: "888877776666",
            ward: "5",
            religion: "ಮುಸ್ಲಿಂ",
            caste: "ನದಾಫ್",
            houseType: "ಸ್ವಂತ ಮನೆ",
            landAcres: "2",
            landGunta: "15",
            formingType: "ಸ್ವಂತ ಕೃಷಿ",
            members: [
                { name: "ರಜಿಯಾ ನದಾಫ್", relation: "ಪತ್ನಿ", mobile: "9988776655", aadhar: "111122223333", dob: "12/05/1985", literate: "ಶಿಕ್ಷಿತರು: BA", occupation: "ವ್ಯವಸಾಯ" },
                { name: "ಸಲೀಮ್ ನದಾಫ್", relation: "ಮಗ", mobile: "9988776654", aadhar: "444455556666", dob: "05/09/2010", literate: "ವಿದ್ಯಾರ್ಥಿ: 10ನೇ ತರಗತಿ", occupation: "ವಿದ್ಯಾರ್ಥಿ" }
            ]
        }
    }
];

const defaultEmployeesSubmissions = [
    {
        id: "KRNPS-2026-27-33",
        date: new Date().toLocaleDateString('en-GB'),
        formData: {
            employeeType: "ಸರ್ಕಾರಿ ನೌಕರರ ಮಾಹಿತಿ",
            employeeName: "ರಫೀಕ್ ಪಿಂಜಾರ್",
            fatherName: "ಹುಸೇನ್ ಸಾಬ್ ನದಾಫ್",
            contactNumber: "9448011223",
            qualification: "BA, BEd",
            dob: "1980-04-15",
            age: "46",
            departmentName: "ಶಿಕ್ಷಣ ಇಲಾಖೆ (ಶಿಕ್ಷಕರು)",
            designation: "ಸಹ ಶಿಕ್ಷಕರು",
            isRetired: "ಇಲ್ಲ",
            retirementDate: "",
            permanentAddress: "ಶಿವಮೊಗ್ಗ ರಸ್ತೆ, ಭದ್ರಾವತಿ"
        }
    }
];

// Initialize Database Storage
if (!localStorage.getItem('adminBalance')) {
    localStorage.setItem('adminBalance', '27565929.00');
}
if (!localStorage.getItem('beneficiaries')) {
    localStorage.setItem('beneficiaries', JSON.stringify(defaultBeneficiaries));
}

// Force migrate/reset database schemas for receipts and security to newer schema version
if (localStorage.getItem('receipts_version') !== 'v77') {
    localStorage.setItem('receipts', JSON.stringify(defaultReceipts));
    localStorage.setItem('receipts_version', 'v77');
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

if (!localStorage.getItem('admin_freeedu_submissions')) {
    localStorage.setItem('admin_freeedu_submissions', JSON.stringify(defaultFreeeduSubmissions));
}
if (!localStorage.getItem('admin_census_submissions')) {
    localStorage.setItem('admin_census_submissions', JSON.stringify(defaultCensusSubmissions));
}
if (!localStorage.getItem('admin_employees_submissions')) {
    localStorage.setItem('admin_employees_submissions', JSON.stringify(defaultEmployeesSubmissions));
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

    // Background Database Sync
    syncSubmissionsFromDatabase().then(updated => {
        if (updated) {
            initPageModules();
        }
    });
});

function trackDeletedId(id) {
    let deletedIds = JSON.parse(localStorage.getItem('admin_deleted_ids')) || [];
    if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('admin_deleted_ids', JSON.stringify(deletedIds));
    }
}

async function syncSubmissionsFromDatabase() {
    try {
        let response = await fetch('/api/donations?_=' + Date.now()).catch(() => null);
        if (!response || !response.ok) {
            response = await fetch('/api/donations?_=' + Date.now()).catch(() => null);
        }
        if (!response || !response.ok) return false;
        
        const data = await response.json();
        const donationItems = Array.isArray(data) ? data : (data && data.donations ? data.donations : []);
        if (!Array.isArray(donationItems)) return false;
        
        let hasChanges = false;
        let deletedIds = JSON.parse(localStorage.getItem('admin_deleted_ids')) || [];
        
        // Load existing lists safely
        let freeeduList = JSON.parse(localStorage.getItem('admin_freeedu_submissions')) || [];
        let censusList = JSON.parse(localStorage.getItem('admin_census_submissions')) || [];
        let employeesList = JSON.parse(localStorage.getItem('admin_employees_submissions')) || [];
        let pratibhaList = JSON.parse(localStorage.getItem('admin_pratibha_submissions')) || [];
        let sadhakaList = JSON.parse(localStorage.getItem('admin_sadhaka_submissions')) || [];
        let receiptsList = JSON.parse(localStorage.getItem('receipts')) || [];
        
        donationItems.forEach(doc => {
            try {
                const formType = doc.formType;
                if (!formType) return;
                
                // Map by formType
                if (formType === "ಸಾಧಕ ಪ್ರಶಸ್ತಿ") {
                    const appNum = doc.paymentId || `SADHAKA-2025-26-${parseInt((doc._id || '').slice(-4), 16) % 1000 || 555}`;
                    if (deletedIds.includes(appNum)) {
                        const q = (doc._id ? `dbId=${encodeURIComponent(doc._id)}&` : '') + `paymentId=${encodeURIComponent(appNum)}`;
                        fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                        return;
                    }
                    
                    const exists = sadhakaList.some(item => item.id === appNum);
                    if (!exists) {
                        sadhakaList.unshift({
                            id: appNum,
                            dbId: doc._id,
                            date: doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
                            formData: doc.formData || {}
                        });
                        hasChanges = true;
                    } else {
                        const existingItem = sadhakaList.find(item => item.id === appNum);
                        if (existingItem) {
                            if (!existingItem.dbId) {
                                existingItem.dbId = doc._id;
                                hasChanges = true;
                            }
                            if (doc.formData && existingItem.formData) {
                                let localUpdated = false;
                                if (existingItem.formData.status !== doc.formData.status) {
                                    existingItem.formData.status = doc.formData.status;
                                    localUpdated = true;
                                }
                                if (existingItem.formData.remarks !== doc.formData.remarks) {
                                    existingItem.formData.remarks = doc.formData.remarks;
                                    localUpdated = true;
                                }
                                if (localUpdated) {
                                    hasChanges = true;
                                }
                            }
                        }
                    }
                } else if (formType === "ಪ್ರತಿಭಾ ಪುರಸ್ಕಾರ") {
                    const appNum = doc.paymentId || `PRATIBHA-2025-26-${parseInt((doc._id || '').slice(-4), 16) % 1000 || 555}`;
                    if (deletedIds.includes(appNum)) {
                        const q = (doc._id ? `dbId=${encodeURIComponent(doc._id)}&` : '') + `paymentId=${encodeURIComponent(appNum)}`;
                        fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                        return;
                    }
                    
                    const exists = pratibhaList.some(item => item.id === appNum);
                    if (!exists) {
                        pratibhaList.unshift({
                            id: appNum,
                            dbId: doc._id,
                            date: doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
                            formData: doc.formData || {}
                        });
                        hasChanges = true;
                    } else {
                        const existingItem = pratibhaList.find(item => item.id === appNum);
                        if (existingItem) {
                            if (!existingItem.dbId) {
                                existingItem.dbId = doc._id;
                                hasChanges = true;
                            }
                            if (doc.formData && existingItem.formData) {
                                let localUpdated = false;
                                if (existingItem.formData.status !== doc.formData.status) {
                                    existingItem.formData.status = doc.formData.status;
                                    localUpdated = true;
                                }
                                if (existingItem.formData.remarks !== doc.formData.remarks) {
                                    existingItem.formData.remarks = doc.formData.remarks;
                                    localUpdated = true;
                                }
                                if (localUpdated) {
                                    hasChanges = true;
                                }
                            }
                        }
                    }
                } else if (formType === "ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ") {
                    let appNum = doc.paymentId || `HEH-2026-27-${parseInt((doc._id || '').slice(-4), 16) % 100 || 55}`;
                    if (appNum.startsWith('KRNPS-')) appNum = appNum.replace('KRNPS-', 'HEH-');
                    if (deletedIds.includes(appNum)) return;
                    
                    const exists = freeeduList.some(item => item.id === appNum);
                    if (!exists) {
                        freeeduList.unshift({
                            id: appNum,
                            date: doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
                            formData: doc.formData || {}
                        });
                        hasChanges = true;
                    }
                } else if (formType === "ಜನಗಣತಿ" || formType === "ಜನಗಣತಿ (CENSUS)") {
                    let appNum = doc.paymentId || `CEN-2026-27-${parseInt((doc._id || '').slice(-4), 16) % 100 || 55}`;
                    if (appNum.startsWith('KRNPS-')) appNum = appNum.replace('KRNPS-', 'CEN-');
                    if (deletedIds.includes(appNum)) return;
                    
                    const exists = censusList.some(item => item.id === appNum);
                    if (!exists) {
                        censusList.unshift({
                            id: appNum,
                            date: doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
                            formData: doc.formData || {}
                        });
                        hasChanges = true;
                    }
                } else if (formType === "ನೌಕರರ ವಿವರ") {
                    const appNum = doc.paymentId || `KRNPS-EMP-2026-27-${parseInt((doc._id || '').slice(-4), 16) % 100 || 55}`;
                    if (deletedIds.includes(appNum)) return;
                    
                    const exists = employeesList.some(item => item.id === appNum);
                    if (!exists) {
                        employeesList.unshift({
                            id: appNum,
                            date: doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
                            formData: doc.formData || {}
                        });
                        hasChanges = true;
                    }
                }
            } catch (err) {
                console.error("Error processing sync doc:", doc, err);
            }
        });
        
        if (hasChanges) {
            try {
                localStorage.setItem('admin_freeedu_submissions', JSON.stringify(freeeduList));
                localStorage.setItem('admin_census_submissions', JSON.stringify(censusList));
                localStorage.setItem('admin_employees_submissions', JSON.stringify(employeesList));
                localStorage.setItem('admin_pratibha_submissions', JSON.stringify(pratibhaList));
                localStorage.setItem('admin_sadhaka_submissions', JSON.stringify(sadhakaList));
                localStorage.setItem('receipts', JSON.stringify(receiptsList));
            } catch (e) {
                console.error("LocalStorage write failed:", e);
            }
        }
        
        return hasChanges;
    } catch (e) {
        console.error('Error syncing submissions:', e);
        return false;
    }
}

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
    } else if (currentPath.includes("admin-freeedu")) {
        loadAdminFreeEdu();
    } else if (currentPath.includes("admin-pratibha")) {
        loadAdminPratibha();
    } else if (currentPath.includes("admin-sadhaka")) {
        loadAdminSadhaka();
    } else if (currentPath.includes("admin-census")) {
        loadAdminCensus();
    } else if (currentPath.includes("admin-employees")) {
        loadAdminEmployees();
    } else if (currentPath.includes("admin-highereducation")) {
        if (window.loadHigherEducationApplications) window.loadHigherEducationApplications();
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
            const isGenerated = r.id && r.id.startsWith("2026");
            const statusText = (r.status && r.status !== 'undefined') ? r.status : '';
            const narrationText = (r.narration && r.narration !== 'undefined') ? r.narration : '';
            row.innerHTML = `
                <td>${list.length - index}</td>
                <td>
                    ${isGenerated ? 
                      `<span style="font-weight: 600; color: #4f1971;">${r.id}</span>` : 
                      `<button class="btn-view" onclick="generateReceiptId('${r.id}')" style="background:#0ea5e9; padding: 4px 8px; font-size:11px;">Generate Receipt</button>`}
                </td>
                <td>${formatDate(r.date)}</td>
                <td><strong>${formatCurrency(r.amount)}</strong></td>
                <td>${r.from || ''}</td>
                <td><span style="color: green; font-weight: bold;">${statusText}</span></td>
                <td>${r.mode || ''}</td>
                <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${narrationText}</td>
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

// Ensure formatted Receipt ID is generated dynamically when viewing or downloading
function ensureReceiptIdGenerated(rId) {
    if (!rId || rId.startsWith("2026")) return rId;
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    const index = receipts.findIndex(r => r.id === rId);
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

        // Assign next bottom serial number dynamically
        let maxSerial = 0;
        receipts.forEach(r => {
            if (r.serialNo && !isNaN(r.serialNo)) {
                if (r.serialNo > maxSerial) {
                    maxSerial = r.serialNo;
                }
            }
        });
        
        item.id = newId;
        item.status = "Completed";
        item.serialNo = maxSerial + 1;

        if (item.details) {
            item.details.receiptId = newId;
        }

        receipts[index] = item;
        localStorage.setItem('receipts', JSON.stringify(receipts));
        if (typeof loadReceipts === 'function') {
            loadReceipts();
        }
        return newId;
    }
    return rId;
}

// Generate Receipt ID dynamically with correct prefixes: D for district, S for state direct, T for taluk
window.generateReceiptId = function(oldId) {
    ensureReceiptIdGenerated(oldId);
    loadReceipts();
    alert("Receipt number generated successfully!");
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
    if (!receiptId || !receiptId.startsWith("2026")) {
        alert("Please click 'Generate Receipt' first to generate the receipt number before downloading.");
        return;
    }
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

    const fromStr = (found.from || "").toLowerCase();
    let isDistrict = fromStr.includes("district");
    let isTaluk = fromStr.includes("taluk");

    if (isDistrict) {
        themeColor = "#0033cc"; // Blue for District
        subheaderTitle = "ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
    } else if (isTaluk) {
        themeColor = "#006600"; // Green for Taluk
        subheaderTitle = "ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆ";
    }

    let fieldsHTML = "";
    if (isDistrict || isTaluk) {
        const presTitle = isDistrict ? "ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರ" : "ತಾಲೂಕು ಅಧ್ಯಕ್ಷರ";
        fieldsHTML = `
            <!-- SECTION 1: PRESIDENT DETAILS -->
            <tr>
                <td class="grid-cell" style="width: 35%; vertical-align: top;">
                    <div style="margin-bottom: 3px;"><u style="color: ${themeColor}; font-weight: bold;">${presTitle}</u></div>
                    <div>
                        <span class="field-label">ಹೆಸರು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentName || details.districtPresidentName || details.talukPresidentName || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 33%; vertical-align: top;">
                    <div style="margin-bottom: 3px; margin-top: 18px;">
                        <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentVillage || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ವಿಳಾಸ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentAddress || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 32%; vertical-align: top;">
                    <div style="margin-bottom: 3px; margin-top: 18px;">
                        <span class="field-label">ಮೊಬೈಲ್:</span>
                        <span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">${details.presidentMobile || ""}</span>
                    </div>
                    <div style="margin-bottom: 3px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentTaluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentDistrict || ""}</span>
                    </div>
                </td>
            </tr>

            <!-- SECTION 2: DONOR DETAILS (YARA PARAVAGI) -->
            <tr>
                <td class="grid-cell" style="width: 35%; vertical-align: top;">
                    <div style="margin-bottom: 3px;"><u style="color: ${themeColor}; font-weight: bold;">ಯಾರ ಪರವಾಗಿ:</u></div>
                    <div>
                        <span class="field-label">ಹೆಸರು:</span>
                        <span class="field-value" style="font-weight: 600; color: #000;">${details.fullName || details.donorName || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 33%; vertical-align: top;">
                    <div style="margin-bottom: 3px; margin-top: 18px;">
                        <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.village || details.donorVillage || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ವಿಳಾಸ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.address || details.donorAddress || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 32%; vertical-align: top;">
                    <div style="margin-bottom: 3px; margin-top: 18px;">
                        <span class="field-label">ಮೊಬೈಲ್:</span>
                        <span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">${details.mobile || details.donorMobile || ""}</span>
                    </div>
                    <div style="margin-bottom: 3px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.taluk || details.donorTaluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.district || details.donorDistrict || ""}</span>
                    </div>
                </td>
            </tr>
        `;
    } else {
        fieldsHTML = `
            <!-- SECTION 1: PRESIDENT DETAILS -->
            <tr>
                <td class="grid-cell" style="width: 35%; vertical-align: top;">
                    <div style="margin-bottom: 2px;"><u style="color: ${themeColor}; font-weight: bold;">ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರ:</u></div>
                    <div>
                        <span class="field-label">ಹೆಸರು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentName || "ರಾಜ್ಯ ಸಮಿತಿ"}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 33%; vertical-align: top;">
                    <div style="margin-bottom: 2px; margin-top: 14px;">
                        <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentVillage || "ಚಿತ್ರದುರ್ಗ"}</span>
                    </div>
                    <div>
                        <span class="field-label">ವಿಳಾಸ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentAddress || "ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ"}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 32%; vertical-align: top;">
                    <div style="margin-bottom: 2px; margin-top: 14px;">
                        <span class="field-label">ಮೊಬೈಲ್:</span>
                        <span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">${details.presidentMobile || "-"}</span>
                    </div>
                    <div style="margin-bottom: 2px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentTaluk || "ಚಿತ್ರದುರ್ಗ"}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.presidentDistrict || "ಚಿತ್ರದುರ್ಗ"}</span>
                    </div>
                </td>
            </tr>

            <!-- SECTION 2: DONOR DETAILS (YARA PARAVAGI) -->
            <tr>
                <td class="grid-cell" style="width: 35%; vertical-align: top;">
                    <div style="margin-bottom: 2px;"><u style="color: ${themeColor}; font-weight: bold;">ಯಾರ ಪರವಾಗಿ:</u></div>
                    <div>
                        <span class="field-label">ಹೆಸರು:</span>
                        <span class="field-value" style="font-weight: 600; color: #000;">${details.fullName || details.donorName || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 33%; vertical-align: top;">
                    <div style="margin-bottom: 2px; margin-top: 14px;">
                        <span class="field-label">ಗ್ರಾಮ/ಪಟ್ಟಣ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.village || details.donorVillage || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ವಿಳಾಸ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.address || details.donorAddress || ""}</span>
                    </div>
                </td>
                <td class="grid-cell" style="width: 32%; vertical-align: top;">
                    <div style="margin-bottom: 2px; margin-top: 14px;">
                        <span class="field-label">ಮೊಬೈಲ್:</span>
                        <span class="field-value" style="font-weight: 500; color: #000; white-space: nowrap;">${details.mobile || details.donorMobile || ""}</span>
                    </div>
                    <div style="margin-bottom: 2px;">
                        <span class="field-label">ತಾಲೂಕು:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.taluk || details.donorTaluk || ""}</span>
                    </div>
                    <div>
                        <span class="field-label">ಜಿಲ್ಲೆ:</span>
                        <span class="field-value" style="font-weight: 500; color: #000;">${details.district || details.donorDistrict || ""}</span>
                    </div>
                </td>
            </tr>
        `;
    }

    const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=794">
    <base href="${window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)}">
    <title>Donation Receipt - ${found.id}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap">
    <style>
        html, body {
            height: auto;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        body {
            font-family: 'Noto Sans Kannada', 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 auto !important;
            box-sizing: border-box;
        }
        .receipt-container {
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 !important;
            border: none;
            padding: 4px 6px;
            background: #fff;
            box-sizing: border-box;
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
            width: 100%;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            border: 2.5px solid ${themeColor} !important;
            box-sizing: border-box;
        }
        .grid-cell {
            border: none;
            border-bottom: 1.5px solid ${themeColor};
            padding: 1.5px 5px;
            font-size: 13px;
            vertical-align: middle;
            color: #1e293b;
            line-height: 1.2;
            box-sizing: border-box;
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
            margin-right: 4px;
        }
        .field-value {
            color: #000;
            font-weight: 500;
        }
        .payment-line {
            font-size: 13px;
        }
        .seal-img {
            height: 68px;
            width: auto;
        }
        .sig-img {
            height: 52px;
            width: auto;
            margin-bottom: 1px;
        }

        @media print {
            @page {
                size: A5 landscape;
                margin: 0;
            }
            html, body {
                width: 210mm !important;
                height: 148mm !important;
                max-height: 148mm !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }
            body {
                padding: 0 !important;
                min-width: unset !important;
            }
            .receipt-container {
                width: 198mm !important;
                height: 144mm !important;
                max-height: 144mm !important;
                margin: 0 auto !important;
                padding: 2px 4px !important;
                border: none !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
                background: #fff !important;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-box">
            <tr>
                <td colspan="3" style="text-align: center; padding: 4px 8px 1px 8px;">
                    <div class="kannada-title" style="font-size: 24px; font-weight: bold; color: #990000; margin: 0; line-height: 1.1;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಡಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                </td>
            </tr>
            <tr>
                <td class="header-photo-cell" style="width: 115px; text-align: center; vertical-align: middle; padding: 0 4px 4px 6px;">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.president) ? RECEIPT_ASSETS.president : 'images/president.jpeg'}" class="patron-photo" onerror="this.src='images/president.png'">
                </td>
                <td class="header-text-cell" style="text-align: center; vertical-align: middle; padding: 0 0 4px 0;">
                    <div class="reg-no" style="color: #990000;">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div>
                    <div class="english-title" style="color: #990000;">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                    <div class="office-address" style="color: #990000;">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                    <div class="office-location" style="color: #990000;">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div>
                </td>
                <td class="header-logo-cell" style="width: 115px; text-align: center; vertical-align: middle; padding: 0 6px 4px 4px;">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.logo) ? RECEIPT_ASSETS.logo : 'images/logo-786.png'}" class="header-logo">
                </td>
            </tr>
        </table>

        <table class="receipt-grid">
            <tr class="subheader-row">
                <td class="grid-cell" style="width: 35%;">
                    <span class="field-label">ರಶೀದಿ ಸಂಖ್ಯೆ:</span>
                    <span class="field-value" style="color: #000; white-space: nowrap;">${found.id}</span>
                </td>
                <td class="grid-cell center-align" style="width: 33%;">
                    <div style="font-size: 15px; font-weight: bold; color: ${themeColor};">ಪಾವತಿಸಿದ ರಶೀದಿ</div>
                    <div style="font-size: 13px; font-weight: bold; margin-top: 2px; color: ${themeColor};">${subheaderTitle}</div>
                </td>
                <td class="grid-cell right-align" style="width: 32%;">
                    <span class="field-label">ದಿನಾಂಕ :</span>
                    <span class="field-value" style="color: #000; white-space: nowrap;">${formatDateDashes(found.date)}</span>
                </td>
            </tr>

            ${fieldsHTML}

            <tr>
                <td class="grid-cell" style="width: 35%; border-bottom: none !important; vertical-align: top; padding: 6px 8px;">
                    <div class="payment-line" style="margin-top: 2px;">
                        <span class="field-label">ಪಾವತಿ ರಕಮು ರೂ:</span>
                        <span class="field-value" style="font-size: 14px; font-weight: bold; color: #000; white-space: nowrap;">${formatCurrencyRaw(found.amount)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 6px;">
                        <span class="field-label">ರಶೀದಿ ದಿನಾಂಕ:</span>
                        <span class="field-value" style="color: #000; white-space: nowrap;">${formatDateDashes(found.date)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 6px;">
                        <span class="field-label">ಯಾವ ಖಾತೆಗೆ:</span>
                        <span class="field-value" style="color: #000;">${details.purpose || found.from}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 6px;">
                        <span class="field-label">ಯೋಜನೆ ಉದ್ದೇಶ:</span>
                        <span class="field-value" style="color: #000;">${details.purposeDetails || details.notes || ""}</span>
                    </div>
                </td>
                <td class="grid-cell center-align" style="width: 30%; border-bottom: none !important; vertical-align: top; padding: 6px 8px;">
                    <div class="payment-line" style="margin-top: 2px;">
                        <span class="field-label">ಪಾವತಿ ಮೋಡ್:</span>
                        <span class="field-value" style="color: #000;">${details.paymentMode || found.paymentMode || "Cash"}</span>
                    </div>
                    <div style="margin-top: 12px; text-align: center;">
                        <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.seal) ? RECEIPT_ASSETS.seal : 'images/seal.jpg'}" class="seal-img">
                    </div>
                </td>
                <td class="grid-cell" style="width: 35%; border-bottom: none !important; vertical-align: top; padding: 6px 8px;">
                    <div style="text-align: center; width: 230px; margin: 2px auto 0 auto;">
                        <div style="font-size: 14px; font-weight: bold; color: ${themeColor}; margin-bottom: 2px;">ಅದಾಬ್ ಗಳೊಂದಿಗೆ ಸ್ವೀಕರಿಸಿದೆ</div>
                        <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.sig) ? RECEIPT_ASSETS.sig : 'images/sig.jpg'}" class="sig-img" style="margin-bottom: 2px;">
                        <div style="font-size: 15px; font-weight: bold; color: #4f1971; margin-top: 2px; line-height: 1.2; white-space: nowrap;">ಶಹಾಬುದ್ದೀನ್ ಸಾಬ್ ನೂರಭಾಷ</div>
                        <div style="font-size: 13.5px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ರಾಜ್ಯ ಕೋಶಾಧಿಕಾರಿ</div>
                        <div style="font-size: 12px; font-weight: bold; color: #4f1971; line-height: 1.2; white-space: nowrap;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್ ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                    </div>
                </td>
            </tr>

            <tr class="bottom-serial-row">
                <td class="grid-cell" colspan="2" style="border-top: none !important; border-bottom: none !important; padding: 4px 8px 6px 8px;">
                    <div>
                        <span class="field-label" style="font-size: 14px;">ರಶೀದಿಗಳ ಕ್ರಮ ಸಂಖ್ಯೆಗಳು :</span>
                        <span class="field-value" style="font-size: 14px; color: #000; white-space: nowrap;">KRNPS-2026-27-${serialNoVal}</span>
                    </div>
                </td>
                <td class="grid-cell right-align" style="border-top: none !important; border-bottom: none !important; padding: 4px 12px 6px 8px; font-weight: bold; color: ${themeColor}; font-size: 14px; white-space: nowrap;">
                    <div>
                        ಅಧಿಕೃತ ಸಹಿ
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

    // Create invisible iframe off-screen
    let iframe = document.getElementById('receiptPrintIframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'receiptPrintIframe';
        iframe.style.position = 'fixed';
        iframe.style.left = '-9999px';
        iframe.style.top = '-9999px';
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
    
    setTimeout(() => {
        iframe.style.width = '794px';
        iframe.style.height = '100px';
        
        setTimeout(() => {
            const container = doc.querySelector('.receipt-container');
            const isMobile = true;
            if (container) {
                container.style.margin = isMobile ? '0' : '0 auto';
            }
            const rect = container ? container.getBoundingClientRect() : { width: 750, height: 450 };
            const contentH = Math.ceil(rect.height || (container ? container.offsetHeight : 450));
            const contentW = Math.ceil(rect.width || (container ? container.offsetWidth : 750));
            const pageHmm = Math.ceil(contentH * 0.264583) + 1;
            let pageWmm = Math.ceil(contentW * 0.264583) + 1;
            if (pageWmm < 210) pageWmm = 210;

            if (isMobile) {
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
                            pdf.save('Receipt-' + (receiptId || 'Download') + '.pdf');
                        });
                    } else {
                        const opt = {
                            margin: 0,
                            filename: 'Receipt-' + (receiptId || 'Download') + '.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2, useCORS: true, letterRendering: false, scrollX: 0, scrollY: 0, width: contentW, height: contentH, windowWidth: contentW, windowHeight: contentH },
                            jsPDF: { unit: 'mm', format: [Math.min(pdfWmm, pdfHmm), Math.max(pdfWmm, pdfHmm)], orientation: isLandscape ? 'landscape' : 'portrait' }
                        };
                        win.html2pdf().from(container).set(opt).save();
                    }
                };
                doc.head.appendChild(script);
            } else {
                const dynStyle = doc.createElement('style');
                dynStyle.textContent = `@media print { @page { size: A5 landscape; margin: 0; } body { margin: 0; padding: 0; } .receipt-container { margin: 5mm auto !important; width: 200mm !important; height: 138mm !important; box-sizing: border-box !important; } }`;
                doc.head.appendChild(dynStyle);

                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }
        }, 200);
    }, 300);
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

function formatDateDashes(dateStr) {
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

// -------------------------------------------------------------
// 8. Admin Free Education Module
// -------------------------------------------------------------
function loadAdminFreeEdu() {
    const tableBody = document.getElementById("freeeduTableBody");
    if (!tableBody) return;

    function render(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999;">No applications found.</td></tr>`;
            return;
        }

        list.forEach((app, index) => {
            const row = document.createElement("tr");
            const fd = app.formData || {};
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span style="font-weight: 600; color: #4f1971;">${app.id}</span></td>
                <td>${app.date}</td>
                <td><strong>${fd.studentName || '-'}</strong></td>
                <td>${fd.fatherName || '-'}</td>
                <td>${fd.mobile || '-'}</td>
                <td>${fd.joiningClass || '-'}</td>
                <td>${fd.district || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editFreeedu('${app.id}')" title="Edit"><i class="fa fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteFreeedu('${app.id}')" title="Delete"><i class="fa fa-trash"></i></button>
                    <button class="btn-download" onclick="downloadFreeeduPdf('${app.id}')" title="Download PDF"><i class="fa fa-download"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    let submissions = JSON.parse(localStorage.getItem('admin_freeedu_submissions')) || [];
    render(submissions);

    // Filter
    const form = document.getElementById("freeeduFilterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = document.getElementById("filterSearch").value.toLowerCase();
            const filterClass = document.getElementById("filterClass").value.toLowerCase();

            let filtered = submissions.filter(app => {
                const fd = app.formData || {};
                const nameMatch = (fd.studentName || '').toLowerCase().includes(search) || 
                                  (fd.fatherName || '').toLowerCase().includes(search) ||
                                  (fd.motherName || '').toLowerCase().includes(search) ||
                                  (fd.aadhar || '').toLowerCase().includes(search) ||
                                  (fd.mobile || '').toLowerCase().includes(search);
                const classMatch = !filterClass || (fd.joiningClass || '').toLowerCase().includes(filterClass);
                return nameMatch && classMatch;
            });
            render(filtered);
        });
    }

    const clearBtn = document.getElementById("btnClearFilter");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("freeeduFilterForm").reset();
            render(submissions);
        });
    }

    // Modal Edit handler
    window.editFreeedu = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const fd = found.formData || {};
        document.getElementById('editIndex').value = id;
        document.getElementById('editStudentName').value = fd.studentName || '';
        document.getElementById('editFatherName').value = fd.fatherName || '';
        document.getElementById('editMotherName').value = fd.motherName || '';
        document.getElementById('editMobile').value = fd.mobile || '';
        document.getElementById('editAadhar').value = fd.aadhar || '';
        document.getElementById('editIncome').value = fd.income || '';
        document.getElementById('editCurrentSchool').value = fd.currentSchool || '';
        document.getElementById('editPreviousMarks').value = fd.previousMarks || '';
        document.getElementById('editJoiningClass').value = fd.joiningClass || '';
        document.getElementById('editClassSubjects').value = fd.classSubjects || '';
        document.getElementById('editCoaching').value = fd.coaching || '';
        document.getElementById('editMembership').value = fd.membership || 'ಹೌದು';
        document.getElementById('editRationType').value = fd.rationType || 'BPL';
        document.getElementById('editAddress').value = fd.address || '';
        document.getElementById('editVillage').value = fd.village || '';
        document.getElementById('editTaluk').value = fd.taluk || '';
        document.getElementById('editDistrict').value = fd.district || '';
        document.getElementById('editHousingInfo').value = fd.housingInfo || '';
        document.getElementById('editHouseType').value = fd.houseType || '';
        document.getElementById('editLandInfo').value = fd.landInfo || '';
        document.getElementById('editGunte').value = fd.gunte || '';
        document.getElementById('editOccupation').value = fd.occupation || '';
        document.getElementById('editBankName').value = fd.bankName || '';
        document.getElementById('editBranchName').value = fd.branchName || '';
        document.getElementById('editIfsc').value = fd.ifsc || '';
        document.getElementById('editBankAccount').value = fd.bankAccount || '';

        document.getElementById('editFreeeduModal').style.display = 'flex';
    };

    // Modal Save
    const editForm = document.getElementById("editFreeeduForm");
    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById('editIndex').value;
            const index = submissions.findIndex(app => app.id === id);
            if (index === -1) return;

            submissions[index].formData = {
                studentName: document.getElementById('editStudentName').value,
                fatherName: document.getElementById('editFatherName').value,
                motherName: document.getElementById('editMotherName').value,
                mobile: document.getElementById('editMobile').value,
                aadhar: document.getElementById('editAadhar').value,
                income: document.getElementById('editIncome').value,
                currentSchool: document.getElementById('editCurrentSchool').value,
                previousMarks: document.getElementById('editPreviousMarks').value,
                joiningClass: document.getElementById('editJoiningClass').value,
                classSubjects: document.getElementById('editClassSubjects').value,
                coaching: document.getElementById('editCoaching').value,
                membership: document.getElementById('editMembership').value,
                rationType: document.getElementById('editRationType').value,
                address: document.getElementById('editAddress').value,
                village: document.getElementById('editVillage').value,
                taluk: document.getElementById('editTaluk').value,
                district: document.getElementById('editDistrict').value,
                housingInfo: document.getElementById('editHousingInfo').value,
                houseType: document.getElementById('editHouseType').value,
                landInfo: document.getElementById('editLandInfo').value,
                gunte: document.getElementById('editGunte').value,
                occupation: document.getElementById('editOccupation').value,
                bankName: document.getElementById('editBankName').value,
                branchName: document.getElementById('editBranchName').value,
                ifsc: document.getElementById('editIfsc').value,
                bankAccount: document.getElementById('editBankAccount').value
            };

            localStorage.setItem('admin_freeedu_submissions', JSON.stringify(submissions));
            alert("Application updated successfully!");
            document.getElementById('editFreeeduModal').style.display = 'none';
            render(submissions);
        });
    }

    // Delete handler
    window.deleteFreeedu = function(id) {
        if (confirm("Are you sure you want to delete this application?")) {
            trackDeletedId(id);
            submissions = submissions.filter(app => app.id !== id);
            localStorage.setItem('admin_freeedu_submissions', JSON.stringify(submissions));
            render(submissions);
        }
    };

    // Download PDF handler
    window.downloadFreeeduPdf = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const data = found.formData || {};
        const appNumber = found.id;

        const formatIncome = (val) => {
            if (!val) return '-';
            const cleanVal = val.toString().replace(/,/g, '').trim();
            const num = Number(cleanVal);
            return !isNaN(num) ? num.toLocaleString('en-IN') : val;
        };

        const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=794">
    <base href="${window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)}">
    <title>ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ - ಅರ್ಜಿ ರಶೀದಿ</title>
    <style>
        html, body {
            height: auto;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        body {
            font-family: 'Noto Sans Kannada', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 auto !important;
            box-sizing: border-box;
        }
        .receipt-container {
            width: 794px !important;
            max-width: 794px !important;
            height: auto;
            margin: 0 !important;
            border: 2px solid #b30000; border-bottom: none;
            padding: 5px;
            background: #ffffff;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
            background: #fff;
        }
        .grid-table td {
            border: 1px solid #b30000;
            padding: 5px 8px;
            font-size: 15.5px;
            vertical-align: middle;
            line-height: 1.35;
        }
        .grid-label {
            color: #b30000;
            font-weight: bold;
            width: 25%;
            font-size: 15.5px;
        }
        .grid-value {
            color: #000;
            width: 25%;
            font-weight: bold;
            font-size: 15.5px;
        }
        @page {
            margin: 0;
        }

        @media print {
            html, body {
                height: auto;
                margin: 0;
                padding: 0;
            }
            body {
                min-width: unset !important;
            }
            .receipt-container {
                border: 2px solid #b30000 !important;
                max-width: 100%;
                height: auto !important;
                box-sizing: border-box;
                padding: 5px;
                background-color: #ffffff !important;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-box">
            <tr>
                <td class="header-photo-cell">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.president) ? RECEIPT_ASSETS.president : 'images/president.jpeg'}" class="patron-photo" onerror="this.src='images/president.png'">
                </td>
                <td class="header-text-cell">
                    <div class="kannada-title">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                    <div class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div>
                    <div class="english-title">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                    <div class="office-address">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                    <div class="office-location">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div>
                </td>
                <td class="header-logo-cell">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.logo) ? RECEIPT_ASSETS.logo : 'images/logo-786.png'}" class="header-logo">
                </td>
            </tr>
        </table>
        
        <div style="text-align: center; color: #b30000; font-weight: bold; font-size: 21px; margin: 4px 0; text-decoration: underline;">
            ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯಕ್ಕಾಗಿ ಅರ್ಜಿ 2026-27
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 14.5px; font-weight: bold; color: #b30000; line-height: 1.4;">
            <tr>
                <td style="width: 33%; text-align: left; white-space: nowrap;">ಅರ್ಜಿ ಸಂಖ್ಯೆ : <span style="color: #000;">${appNumber}</span></td>
                <td style="width: 34%; text-align: center;"></td>
                <td style="width: 33%; text-align: right; white-space: nowrap;">ಅರ್ಜಿ ದಿನಾಂಕ : <span style="color: #000;">${found.date}</span></td>
            </tr>
            <tr>
                <td style="width: 33%; text-align: left; white-space: nowrap;">ನಗರಿ/ಗ್ರಾಮ : <span style="color: #000;">${data.village || '-'}</span></td>
                <td style="width: 34%; text-align: center; white-space: nowrap;">ತಾಲೂಕು : <span style="color: #000;">${data.taluk || '-'}</span></td>
                <td style="width: 33%; text-align: right; white-space: nowrap;">ಜಿಲ್ಲೆ : <span style="color: #000;">${data.district || '-'}</span></td>
            </tr>
        </table>

        <table class="grid-table">
            <tr>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</td>
                <td class="grid-value">${data.studentName || '-'}</td>
                <td class="grid-label">ತಂದೆಯ/ ಪಾಲಕರ ಹೆಸರು</td>
                <td class="grid-value">${data.fatherName || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ತಾಯಿಯ ಹೆಸರು</td>
                <td class="grid-value">${data.motherName || '-'}</td>
                <td class="grid-label">ವಿಳಾಸ</td>
                <td class="grid-value">${data.address || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಉದ್ಯೋಗ</td>
                <td class="grid-value">${data.occupation || '-'}</td>
                <td class="grid-label">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ :</td>
                <td class="grid-value">${data.mobile || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಅಂದಾಜು ಆದಾಯ</td>
                <td class="grid-value">${formatIncome(data.income)}</td>
                <td class="grid-label">ಸಂಘದ ಸದಸ್ಯತ್ವ</td>
                <td class="grid-value">${data.membership || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಮನೆಯ ವಿವರ</td>
                <td class="grid-value">${data.housingInfo || '-'}</td>
                <td class="grid-label">ಮನೆಯ ಆಕಾರ</td>
                <td class="grid-value">${data.houseType || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಜಮೀನು</td>
                <td class="grid-value">${data.landInfo || '0'} ಎಕರೆ ${data.gunte || '0'} ಗುಂಟೆ</td>
                <td class="grid-label">ಆಧಾರ್ ನಂ</td>
                <td class="grid-value" style="color: #b30000; font-weight: bold;">${maskAadhar(data.aadhar)}</td>
            </tr>
            <tr>
                <td class="grid-label">ಅಂತ್ಯೋದಯ/ಬಿಪಿಎಲ್</td>
                <td class="grid-value">${data.rationType || '-'}</td>
                <td class="grid-label">ವಿದ್ಯಾಭ್ಯಾಸ ಮಾಡುತ್ತಿರುವ ಶಾಲೆ/ಕಾಲೇಜು</td>
                <td class="grid-value">${data.currentSchool || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಪ್ರವೇಶ ಬಯಸುವ ತರಗತಿ</td>
                <td class="grid-value">${data.joiningClass || data.currentClass || '-'}</td>
                <td class="grid-label">ತರಗತಿಯ ವಿಷಯಗಳು</td>
                <td class="grid-value">${data.classSubjects || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಕೋಚಿಂಗ್ ವಿಷಯಗಳು</td>
                <td class="grid-value">${data.coaching || '-'}</td>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಹೆಸರು</td>
                <td class="grid-value">${data.bankName || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">IFSC ಕೋಡ್</td>
                <td class="grid-value" style="font-weight: bold; color: #b30000;">${data.ifsc || '-'}</td>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆ</td>
                <td class="grid-value">${data.bankAccount || '-'}</td>
            </tr>
        </table>
        <div style="text-align: center; font-size: 8.5px; color: #666; margin: 0 0 2px 0;">00000</div>

        <!-- Three Signature/Recommendation Boxes (Enlarged 140px height & centered text) -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 6px;">
            <tr>
                <td style="width: 25%; border: 1.5px solid #b30000; padding: 6px 8px; vertical-align: top; height: 140px; text-align: center;">
                    <div style="font-weight: bold; color: #b30000; font-size: 14px; text-align: center;">ವಿದ್ಯಾರ್ಥಿಯ ಸಹಿ</div>
                </td>
                <td style="width: 25%; border: 1.5px solid #b30000; padding: 6px 8px; vertical-align: top; height: 140px; text-align: center;">
                    <div style="font-weight: bold; color: #b30000; font-size: 14px; text-align: center;">ಪಾಲಕರ ಸಹಿ</div>
                </td>
                <td style="width: 50%; border: 1.5px solid #b30000; padding: 6px 8px; vertical-align: top; height: 140px; text-align: center;">
                    <div style="font-weight: bold; color: #b30000; font-size: 13.5px; white-space: nowrap; text-align: center;">ತಾಲೂಕು ಘಟಕದಿಂದ ಶಿಫಾರಸ್ಸು ಮಾಡಲಾಗಿದೆ</div>
                </td>
            </tr>
        </table>

        <!-- Report Lines -->
        <div style="font-weight: bold; color: #b30000; font-size: 15px; margin-top: 14px; padding: 2px 6px;">
            <div style="margin-bottom: 50px;">ರಾಜ್ಯ ಶಿಕ್ಷಣ ಸಮಿತಿಯ ವರದಿ :</div>
            <div style="margin-bottom: 30px;">ರಾಜ್ಯ ಸಮಿತಿ ಅನುಮೋದನೆ :</div>
        </div>

        <!-- Bottom Message (Font size 16px, line-height 1.5, bold, 2 clean lines, fits inside A4 page) -->
        <div style="font-weight: bold; color: #b30000; font-size: 16px; line-height: 1.5; padding: 2px 6px; margin-top: 25px; margin-bottom: 6px; text-align: left; box-sizing: border-box;">
            ರಾಜ್ಯದ ಅನುಮೋದನೆ ನಂತರ ಮಾಹಿತಿಗಾಗಿ ತಾಲೂಕ ಮತ್ತು ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು ಹಾಗೂ ವಿಭಾಗೀಯ ಉಪಾಧ್ಯಕ್ಷರಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.
        </div>
    </div>
</body>
</html>`;

        // Create invisible iframe off-screen
        let iframe = document.getElementById('receiptPrintIframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'receiptPrintIframe';
            iframe.style.position = 'fixed';
            iframe.style.left = '-9999px';
            iframe.style.top = '-9999px';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            document.body.appendChild(iframe);
        }
        iframe.style.width = '210mm';
        iframe.style.height = '297mm';
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(printHTML);
        doc.close();
        
        setTimeout(() => {
            iframe.style.width = '794px';
            iframe.style.height = '1123px';
            
            setTimeout(() => {
                const container = doc.querySelector('.receipt-container');
                const isMobile = true;
                if (container) {
                    container.style.margin = isMobile ? '0' : '0 auto';
                }
                const rect = container ? container.getBoundingClientRect() : { width: 794, height: 1123 };
                const contentH = Math.ceil(rect.height || (container ? container.offsetHeight : 1123));
                const contentW = Math.ceil(rect.width || (container ? container.offsetWidth : 794));
                
                const pdfWmm = 210;
                const pdfHmm = 297;

                if (isMobile) {
                    const script = doc.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                    script.onload = () => {
                        const win = iframe.contentWindow;
                        const h2c = win.html2canvas || window.html2canvas;
                        const jsPdfClass = win.jsPDF || (win.jspdf && win.jspdf.jsPDF) || window.jsPDF || (window.jspdf && window.jspdf.jsPDF);

                        if (h2c && jsPdfClass) {
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
                                    orientation: 'portrait',
                                    unit: 'mm',
                                    format: 'a4'
                                });
                                // Scale to fit exactly A4 width
                                const finalW = 210;
                                const finalH = (contentH * 210) / contentW;
                                pdf.addImage(imgData, 'JPEG', 0, 0, finalW, finalH > 297 ? 297 : finalH);
                                pdf.save('FreeEducation-' + (id || 'Receipt') + '.pdf');
                            });
                        } else {
                            const opt = {
                                margin: 0,
                                filename: 'FreeEducation-' + (id || 'Receipt') + '.pdf',
                                image: { type: 'jpeg', quality: 0.98 },
                                html2canvas: { scale: 2, useCORS: true, letterRendering: false, scrollX: 0, scrollY: 0, width: contentW, height: contentH, windowWidth: contentW, windowHeight: contentH },
                                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                            };
                            win.html2pdf().from(container).set(opt).save();
                        }
                    };
                    doc.head.appendChild(script);
                } else {
                    const dynStyle = doc.createElement('style');
                    dynStyle.textContent = `@media print { @page { size: a4 portrait; margin: 0; } body { margin: 0; padding: 0; } .receipt-container { margin: 0 auto !important; width: 210mm !important; height: 297mm !important; } }`;
                    doc.head.appendChild(dynStyle);

                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                    setTimeout(() => { iframe.style.width = '0'; iframe.style.height = '0'; }, 500);
                }
            }, 200);
        }, 300);
    };
}

// -------------------------------------------------------------
// 9. Admin Census Module
// -------------------------------------------------------------
function loadAdminCensus() {
    const tableBody = document.getElementById("censusTableBody");
    if (!tableBody) return;

    function render(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999;">No submissions found.</td></tr>`;
            return;
        }

        list.forEach((app, index) => {
            const row = document.createElement("tr");
            const fd = app.formData || {};
            const members = fd.members || [];
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span style="font-weight: 600; color: #4f1971;">${app.id}</span></td>
                <td>${app.date}</td>
                <td>
                    <a href="#" onclick="toggleCensusMembers(${index}); return false;" style="color: #4f1971; font-weight: bold; text-decoration: underline;">
                        <i class="fa fa-chevron-right" id="icon-${index}" style="margin-right: 5px; font-size: 10px;"></i> ${fd.headName || '-'}
                    </a>
                </td>
                <td>${fd.headAadhar ? fd.headAadhar : '-'}</td>
                <td>${fd.village || '-'}</td>
                <td>${fd.taluk || '-'}</td>
                <td>${fd.district || '-'}</td>
                <td>
                    <button class="btn-edit" onclick="editCensus('${app.id}')" title="Edit"><i class="fa fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteCensus('${app.id}')" title="Delete"><i class="fa fa-trash"></i></button>
                    <button class="btn-download" onclick="downloadCensusPdf('${app.id}')" title="Download PDF"><i class="fa fa-download"></i></button>
                </td>
            `;
            tableBody.appendChild(row);

            // Collapsible details row for remaining members
            const detailsRow = document.createElement("tr");
            detailsRow.id = `members-details-${index}`;
            detailsRow.style.display = "none";
            detailsRow.style.backgroundColor = "#f8fafc";
            
            let membersTableContent = "";
            if (members.length > 0) {
                members.forEach((m, mIdx) => {
                    membersTableContent += `
                        <tr>
                            <td>${mIdx + 1}</td>
                            <td><strong>${m.name || '-'}</strong></td>
                            <td>${m.relation || '-'}</td>
                            <td>${m.mobile || '-'}</td>
                            <td>${m.aadhar || '-'}</td>
                            <td>${m.dob || '-'}</td>
                            <td>${m.literate || '-'}</td>
                            <td>${m.occupation || '-'}</td>
                        </tr>
                    `;
                });
            } else {
                membersTableContent = `<tr><td colspan="8" style="text-align: center; color: #999;">No other family members.</td></tr>`;
            }

            detailsRow.innerHTML = `
                <td colspan="9" style="padding: 15px 25px;">
                    <div style="border-left: 4px solid #4f1971; padding-left: 15px;">
                        <h4 style="color: #4f1971; margin-bottom: 10px; font-size: 13px;"><i class="fa fa-users"></i> Other Family Members for ${fd.headName}</h4>
                        <table class="admin-table" style="background-color: white; border: 1px solid #cbd5e1; font-size: 12px;">
                            <thead>
                                <tr style="background-color: #f1f5f9;">
                                    <th style="padding: 8px 10px;">Sl No</th>
                                    <th style="padding: 8px 10px;">Name</th>
                                    <th style="padding: 8px 10px;">Relation</th>
                                    <th style="padding: 8px 10px;">Mobile</th>
                                    <th style="padding: 8px 10px;">Aadhar</th>
                                    <th style="padding: 8px 10px;">DOB</th>
                                    <th style="padding: 8px 10px;">Literate</th>
                                    <th style="padding: 8px 10px;">Profession</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${membersTableContent}
                            </tbody>
                        </table>
                    </div>
                </td>
            `;
            tableBody.appendChild(detailsRow);
        });
    }

    let submissions = JSON.parse(localStorage.getItem('admin_census_submissions')) || [];
    render(submissions);

    window.toggleCensusMembers = function(index) {
        const detailsRow = document.getElementById(`members-details-${index}`);
        const icon = document.getElementById(`icon-${index}`);
        if (detailsRow.style.display === "none") {
            detailsRow.style.display = "table-row";
            icon.className = "fa fa-chevron-down";
        } else {
            detailsRow.style.display = "none";
            icon.className = "fa fa-chevron-right";
        }
    };

    // Filter
    const form = document.getElementById("censusFilterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = document.getElementById("filterSearch").value.toLowerCase();

            let filtered = submissions.filter(app => {
                const fd = app.formData || {};
                return (fd.headName || '').toLowerCase().includes(search) || 
                       (fd.headAadhar || '').toLowerCase().includes(search) ||
                       (fd.district || '').toLowerCase().includes(search) ||
                       (fd.village || '').toLowerCase().includes(search);
            });
            render(filtered);
        });
    }

    const clearBtn = document.getElementById("btnClearFilter");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("censusFilterForm").reset();
            render(submissions);
        });
    }

    // Add member row helper
    window.toggleAdminMemberLiteracy = function(selectEl) {
        const row = selectEl.closest('.member-edit-row');
        if (!row) return;
        const container = row.querySelector('.mem-literacy-details-container');
        const input = row.querySelector('.mem-literate-details');
        if (!container || !input) return;

        const val = selectEl.value;
        if (val === 'ವಿದ್ಯಾರ್ಥಿ') {
            container.style.display = 'block';
            input.placeholder = 'ಓದುತ್ತಿರುವ ತರಗತಿ (Class studying)';
        } else if (val === 'ಶಿಕ್ಷಿತರು') {
            container.style.display = 'block';
            input.placeholder = 'ಓದಿರುವ ವ್ಯಾಸಂಗದ ಮಾಹಿತಿ (Education details)';
        } else {
            container.style.display = 'none';
            input.value = '';
        }
    };

    window.toggleAdminMemberOccupation = function(selectEl) {
        const row = selectEl.closest('.member-edit-row');
        if (!row) return;
        const container = row.querySelector('.mem-occupation-details-container');
        const input = row.querySelector('.mem-occupation-details');
        if (!container || !input) return;

        const val = selectEl.value;
        input.placeholder = `${val} ವಿವರಗಳು (Details for ${val})`;
    };

    window.toggleAdminMemberPolitical = function(selectEl) {
        const row = selectEl.closest('.member-edit-row');
        if (!row) return;
        const container = row.querySelector('.mem-political-details-container');
        const input = row.querySelector('.mem-political-details');
        if (!container || !input) return;

        const val = selectEl.value;
        if (val === 'ಇದೆ') {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
            input.value = '';
        }
    };

    window.addMemberRow = function(memberData = {}) {
        const container = document.getElementById("editMembersContainer");
        const div = document.createElement("div");
        div.className = "member-edit-row";
        const uniqueId = 'mem-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        div.id = uniqueId;
        
        div.dataset.gender = memberData.gender || '';
        div.dataset.handicapped = memberData.handicapped || '';

        let selectedLiteracy = 'ಅಶಿಕ್ಷಿತರು';
        let literacyDetails = '';
        if (memberData.literate) {
            if (memberData.literate.startsWith('ವಿದ್ಯಾರ್ಥಿ:')) {
                selectedLiteracy = 'ವಿದ್ಯಾರ್ಥಿ';
                literacyDetails = memberData.literate.substring('ವಿದ್ಯಾರ್ಥಿ:'.length).trim();
            } else if (memberData.literate.startsWith('ಶಿಕ್ಷಿತರು:')) {
                selectedLiteracy = 'ಶಿಕ್ಷಿತರು';
                literacyDetails = memberData.literate.substring('ಶಿಕ್ಷಿತರು:'.length).trim();
            } else if (memberData.literate === 'ವಿದ್ಯಾರ್ಥಿ' || memberData.literate === 'ಶಿಕ್ಷಿತರು' || memberData.literate === 'ಅಶಿಕ್ಷಿತರು') {
                selectedLiteracy = memberData.literate;
            } else if (memberData.literate === 'ಹೌದು') {
                selectedLiteracy = 'ಶಿಕ್ಷಿತರು';
            } else if (memberData.literate === 'ಇಲ್ಲ') {
                selectedLiteracy = 'ಅಶಿಕ್ಷಿತರು';
            } else {
                selectedLiteracy = 'ಶಿಕ್ಷಿತರು';
                literacyDetails = memberData.literate;
            }
        }

        let selectedOccupation = 'ಉದ್ಯೋಗ';
        let occupationDetails = '';
        if (memberData.occupation) {
            const occOptions = ['ಉದ್ಯೋಗ', 'ವ್ಯವಸಾಯ', 'ಖಾಸಗಿ ನೌಕರಿ', 'ಸರ್ಕಾರಿ ನೌಕರಿ', 'ಗಾದಿ ಕೆಲಸ', 'ಕೂಲಿ ಕಾರ್ಮಿಕ', 'ಗಾದಿ ಕಾರ್ಮಿಕ', 'ನಿರುದ್ಯೋಗಿ'];
            let matched = false;
            for (const opt of occOptions) {
                if (memberData.occupation.startsWith(opt + ':')) {
                    selectedOccupation = opt;
                    occupationDetails = memberData.occupation.substring(opt.length + 1).trim();
                    matched = true;
                    break;
                } else if (memberData.occupation === opt) {
                    selectedOccupation = opt;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                selectedOccupation = 'ಉದ್ಯೋಗ';
                occupationDetails = memberData.occupation;
            }
        }

        let selectedPolitical = 'ಇಲ್ಲ';
        let politicalDetails = '';
        if (memberData.political) {
            if (memberData.political.startsWith('ಇದೆ:')) {
                selectedPolitical = 'ಇದೆ';
                politicalDetails = memberData.political.substring('ಇದೆ:'.length).trim();
            } else if (memberData.political === 'ಇದೆ' || memberData.political === 'ಇಲ್ಲ') {
                selectedPolitical = memberData.political;
            } else if (memberData.political === 'ಹೌದು') {
                selectedPolitical = 'ಇದೆ';
            } else {
                selectedPolitical = 'ಇದೆ';
                politicalDetails = memberData.political;
            }
        }

        let marriedStatus = memberData.married || 'ಅವಿವಾಹಿತ';
        if (marriedStatus === 'ಅವಿವಾಹಿತರ') marriedStatus = 'ಅವಿವಾಹಿತ';
        if (marriedStatus === 'ವಿವಾಹಿತರ') marriedStatus = 'ವಿವಾಹಿತ';

        let guardianRelation = 'ತಂದೆ';
        let guardianName = memberData.guardian || '';
        if (memberData.guardian) {
            if (memberData.guardian.startsWith('ತಂದೆ:')) {
                guardianRelation = 'ತಂದೆ';
                guardianName = memberData.guardian.substring('ತಂದೆ:'.length).trim();
            } else if (memberData.guardian.startsWith('ಗಂಡ:')) {
                guardianRelation = 'ಗಂಡ';
                guardianName = memberData.guardian.substring('ಗಂಡ:'.length).trim();
            } else if (memberData.guardian.startsWith('ಇತರ:')) {
                guardianRelation = 'ಇತರ';
                guardianName = memberData.guardian.substring('ಇತರ:'.length).trim();
            } else if (memberData.guardian.includes(':')) {
                const parts = memberData.guardian.split(':');
                guardianRelation = parts[0].trim();
                guardianName = parts.slice(1).join(':').trim();
            }
        }
        
        div.innerHTML = `
            <div>
                <label>ಹೆಸರು (Name)</label>
                <input type="text" class="mem-name" value="${memberData.name || ''}" placeholder="Name">
            </div>
            <div>
                <label>ಪಾಲಕರ ಹೆಸರು (Guardian)</label>
                <div style="display: flex; gap: 8px;">
                    <select class="mem-guardian-relation" style="width: 35%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <option value="ತಂದೆ" ${guardianRelation === 'ತಂದೆ' ? 'selected' : ''}>ತಂದೆ (Father)</option>
                        <option value="ಗಂಡ" ${guardianRelation === 'ಗಂಡ' ? 'selected' : ''}>ಗಂಡ (Husband)</option>
                        <option value="ಇತರ" ${guardianRelation === 'ಇತರ' ? 'selected' : ''}>ಇತರ (Other)</option>
                    </select>
                    <input type="text" class="mem-guardian-name" value="${guardianName}" placeholder="Guardian Name" style="flex: 1;">
                </div>
            </div>
            <div>
                <label>ಸಂಬಂಧ (Relation)</label>
                <select class="mem-relation">
                    <option value="ಪತ್ನಿ" ${memberData.relation === 'ಪತ್ನಿ' ? 'selected' : ''}>ಪತ್ನಿ (Wife)</option>
                    <option value="ಮಗ" ${memberData.relation === 'ಮಗ' ? 'selected' : ''}>ಮಗ (Son)</option>
                    <option value="ಮಗಳು" ${memberData.relation === 'ಮಗಳು' ? 'selected' : ''}>ಮಗಳು (Daughter)</option>
                    <option value="ತಂದೆ" ${memberData.relation === 'ತಂದೆ' ? 'selected' : ''}>ತಂದೆ (Father)</option>
                    <option value="ತಾಯಿ" ${memberData.relation === 'ತಾಯಿ' ? 'selected' : ''}>ತಾಯಿ (Mother)</option>
                    <option value="ಸಹೋದರ" ${memberData.relation === 'ಸಹೋದರ' ? 'selected' : ''}>ಸಹೋದರ (Brother)</option>
                    <option value="ಸಹೋದರಿ" ${memberData.relation === 'ಸಹೋದರಿ' ? 'selected' : ''}>ಸಹೋದರಿ (Sister)</option>
                    <option value="ಇತರೆ" ${memberData.relation === 'ಇತರೆ' ? 'selected' : ''}>ಇತರೆ (Other)</option>
                </select>
            </div>
            <div>
                <label>ಮೊಬೈಲ್ (Mobile)</label>
                <input type="text" class="mem-mobile" value="${memberData.mobile || ''}" placeholder="Mobile">
            </div>
            <div>
                <label>ಆಧಾರ್ (Aadhar)</label>
                <input type="text" class="mem-aadhar" value="${memberData.aadhar || ''}" placeholder="Aadhar">
            </div>
            <div>
                <label>ಹುಟ್ಟಿದ ದಿನಾಂಕ (DOB)</label>
                <input type="text" class="mem-dob" value="${memberData.dob || ''}" placeholder="DD/MM/YYYY">
            </div>
            <div>
                <label>ವೈವಾಹಿಕ ಮಾಹಿತಿ (Marital Status)</label>
                <select class="mem-married">
                    <option value="ಅವಿವಾಹಿತ" ${marriedStatus === 'ಅವಿವಾಹಿತ' ? 'selected' : ''}>ಅವಿವಾಹಿತ</option>
                    <option value="ವಿವಾಹಿತ" ${marriedStatus === 'ವಿವಾಹಿತ' ? 'selected' : ''}>ವಿವಾಹಿತ</option>
                    <option value="ವಿಧವಾ" ${marriedStatus === 'ವಿಧವಾ' ? 'selected' : ''}>ವಿಧವಾ</option>
                    <option value="ವಿಧವೆ" ${marriedStatus === 'ವಿಧವೆ' ? 'selected' : ''}>ವಿಧವೆ</option>
                </select>
            </div>
            <div>
                <label>ಸಾಕ್ಷರತಾ (Literate?)</label>
                <select class="mem-literate-select" onchange="toggleAdminMemberLiteracy(this)">
                    <option value="ವಿದ್ಯಾರ್ಥಿ" ${selectedLiteracy === 'ವಿದ್ಯಾರ್ಥಿ' ? 'selected' : ''}>ವಿದ್ಯಾರ್ಥಿ (Student)</option>
                    <option value="ಶಿಕ್ಷಿತರು" ${selectedLiteracy === 'ಶಿಕ್ಷಿತರು' ? 'selected' : ''}>ಶಿಕ್ಷಿತರು (Educated)</option>
                    <option value="ಅಶಿಕ್ಷಿತರು" ${selectedLiteracy === 'ಅಶಿಕ್ಷಿತರು' ? 'selected' : ''}>ಅಶಿಕ್ಷಿತರು (Uneducated)</option>
                </select>
                <div class="mem-literacy-details-container" style="margin-top: 8px; display: ${selectedLiteracy === 'ಅಶಿಕ್ಷಿತರು' ? 'none' : 'block'};">
                    <input type="text" class="mem-literate-details" value="${literacyDetails}" placeholder="${selectedLiteracy === 'ವಿದ್ಯಾರ್ಥಿ' ? 'ಓದುತ್ತಿರುವ ತರಗತಿ (Class studying)' : 'ಓದಿರುವ ವ್ಯಾಸಂಗದ ಮಾಹಿತಿ (Education details)'}" style="width: 100%;">
                </div>
            </div>
            <div>
                <label>ವೃತ್ತಿ (Profession)</label>
                <select class="mem-occupation-select" onchange="toggleAdminMemberOccupation(this)">
                    <option value="ಉದ್ಯೋಗ" ${selectedOccupation === 'ಉದ್ಯೋಗ' ? 'selected' : ''}>ಉದ್ಯೋಗ (Job/Business)</option>
                    <option value="ವ್ಯವಸಾಯ" ${selectedOccupation === 'ವ್ಯವಸಾಯ' ? 'selected' : ''}>ವ್ಯವಸಾಯ (Agriculture)</option>
                    <option value="ಖಾಸಗಿ ನೌಕರಿ" ${selectedOccupation === 'ಖಾಸಗಿ ನೌಕರಿ' ? 'selected' : ''}>ಖಾಸಗಿ ನೌಕರಿ (Private Job)</option>
                    <option value="ಸರ್ಕಾರಿ ನೌಕರಿ" ${selectedOccupation === 'ಸರ್ಕಾರಿ ನೌಕರಿ' ? 'selected' : ''}>ಸರ್ಕಾರಿ ನೌಕರಿ (Government Job)</option>
                    <option value="ಗಾದಿ ಕೆಲಸ" ${selectedOccupation === 'ಗಾದಿ ಕೆಲಸ' ? 'selected' : ''}>ಗಾದಿ ಕೆಲಸ (Mattress Work)</option>
                    <option value="ಕೂಲಿ ಕಾರ್ಮಿಕ" ${selectedOccupation === 'ಕೂಲಿ ಕಾರ್ಮಿಕ' ? 'selected' : ''}>ಕೂಲಿ ಕಾರ್ಮಿಕ (Daily Wage Worker)</option>
                    <option value="ಗಾದಿ ಕಾರ್ಮಿಕ" ${selectedOccupation === 'ಗಾದಿ ಕಾರ್ಮಿಕ' ? 'selected' : ''}>ಗಾದಿ ಕಾರ್ಮಿಕ (Gadi Worker)</option>
                    <option value="ನಿರುದ್ಯೋಗಿ" ${selectedOccupation === 'ನಿರುದ್ಯೋಗಿ' ? 'selected' : ''}>ನಿರುದ್ಯೋಗಿ (Unemployed)</option>
                </select>
                <div class="mem-occupation-details-container" style="margin-top: 8px;">
                    <input type="text" class="mem-occupation-details" value="${occupationDetails}" placeholder="${selectedOccupation} ವಿವರಗಳು" style="width: 100%;">
                </div>
            </div>
            <div>
                <label>ರಾಜಕೀಯ ಹಿನ್ನೆಲೆ (Political Background)</label>
                <select class="mem-political-select" onchange="toggleAdminMemberPolitical(this)">
                    <option value="ಇಲ್ಲ" ${selectedPolitical === 'ಇಲ್ಲ' ? 'selected' : ''}>ಇಲ್ಲ (No)</option>
                    <option value="ಇದೆ" ${selectedPolitical === 'ಇದೆ' ? 'selected' : ''}>ಇದೆ (Yes)</option>
                </select>
                <div class="mem-political-details-container" style="margin-top: 8px; display: ${selectedPolitical === 'ಇಲ್ಲ' ? 'none' : 'block'};">
                    <input type="text" class="mem-political-details" value="${politicalDetails}" placeholder="ರಾಜಕೀಯ ಮಾಹಿತಿ ಬರೆಯಿರಿ" style="width: 100%;">
                </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
                <button type="button" class="btn-delete" style="padding: 6px; border-radius: 50%; width:30px; height:30px; display:inline-flex; align-items:center; justify-content:center;" onclick="document.getElementById('${uniqueId}').remove()"><i class="fa fa-times"></i></button>
            </div>
        `;
        container.appendChild(div);
    };

    // Modal Edit handler
    window.editCensus = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const fd = found.formData || {};
        document.getElementById('editIndex').value = id;
        document.getElementById('editHeadName').value = fd.headName || '';
        document.getElementById('editHeadAadhar').value = fd.headAadhar || '';
        document.getElementById('editAddress').value = fd.address || '';
        document.getElementById('editVillage').value = fd.village || '';
        document.getElementById('editTaluk').value = fd.taluk || '';
        document.getElementById('editDistrict').value = fd.district || '';
        document.getElementById('editWard').value = fd.ward || '';
        document.getElementById('editReligion').value = fd.religion || '';
        document.getElementById('editCaste').value = fd.caste || '';
        document.getElementById('editHouseType').value = fd.houseType || 'ಸ್ವಂತ ಮನೆ';
        document.getElementById('editLandAcres').value = fd.landAcres || '0';
        document.getElementById('editLandGunta').value = fd.landGunta || '0';
        document.getElementById('editFormingType').value = fd.formingType || '';

        // Load members list
        const container = document.getElementById("editMembersContainer");
        container.innerHTML = "";
        const members = fd.members || [];
        members.forEach(m => {
            window.addMemberRow(m);
        });

        document.getElementById('editCensusModal').style.display = 'flex';
    };

    // Modal Save
    const editForm = document.getElementById("editCensusForm");
    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById('editIndex').value;
            const index = submissions.findIndex(app => app.id === id);
            if (index === -1) return;

            // Extract members
            const memberRows = document.querySelectorAll(".member-edit-row");
            const membersList = [];
            memberRows.forEach(row => {
                const litSelect = row.querySelector(".mem-literate-select").value;
                const litDetails = row.querySelector(".mem-literate-details").value.trim();
                const litVal = (litSelect === 'ಅಶಿಕ್ಷಿತರು' || !litDetails) ? litSelect : `${litSelect}: ${litDetails}`;

                const occSelect = row.querySelector(".mem-occupation-select").value;
                const occDetails = row.querySelector(".mem-occupation-details").value.trim();
                const occVal = !occDetails ? occSelect : `${occSelect}: ${occDetails}`;

                const polSelect = row.querySelector(".mem-political-select").value;
                const polDetails = row.querySelector(".mem-political-details").value.trim();
                const polVal = (polSelect === 'ಇಲ್ಲ' || !polDetails) ? polSelect : `${polSelect}: ${polDetails}`;

                membersList.push({
                    name: row.querySelector(".mem-name").value,
                    relation: row.querySelector(".mem-relation").value,
                    guardian: (row.querySelector(".mem-guardian-name").value.trim() ? `${row.querySelector(".mem-guardian-relation").value}: ${row.querySelector(".mem-guardian-name").value.trim()}` : ''),
                    mobile: row.querySelector(".mem-mobile").value,
                    aadhar: row.querySelector(".mem-aadhar").value,
                    dob: row.querySelector(".mem-dob").value,
                    literate: litVal,
                    occupation: occVal,
                    political: polVal,
                    married: row.querySelector(".mem-married").value,
                    gender: row.dataset.gender || '',
                    handicapped: row.dataset.handicapped || ''
                });
            });

            submissions[index].formData = {
                headName: document.getElementById('editHeadName').value,
                headAadhar: document.getElementById('editHeadAadhar').value,
                address: document.getElementById('editAddress').value,
                village: document.getElementById('editVillage').value,
                taluk: document.getElementById('editTaluk').value,
                district: document.getElementById('editDistrict').value,
                ward: document.getElementById('editWard').value,
                religion: document.getElementById('editReligion').value,
                caste: document.getElementById('editCaste').value,
                houseType: document.getElementById('editHouseType').value,
                landAcres: document.getElementById('editLandAcres').value,
                landGunta: document.getElementById('editLandGunta').value,
                formingType: document.getElementById('editFormingType').value,
                members: membersList
            };

            localStorage.setItem('admin_census_submissions', JSON.stringify(submissions));
            alert("Census updated successfully!");
            document.getElementById('editCensusModal').style.display = 'none';
            render(submissions);
        });
    }

    // Delete handler
    window.deleteCensus = function(id) {
        if (confirm("Are you sure you want to delete this Census application?")) {
            trackDeletedId(id);
            submissions = submissions.filter(app => app.id !== id);
            localStorage.setItem('admin_census_submissions', JSON.stringify(submissions));
            render(submissions);
        }
    };

    window.downloadCensusPdf = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const data = found.formData || {};
        const appNumber = found.id;
        const formattedDate = formatDateDashes(found.date || new Date());

        let membersRows = '';
        if (data.members && data.members.length > 0) {
            data.members.forEach((m, idx) => {
                let genderDisplay = m.gender || '-';
                if (genderDisplay.includes('Male')) genderDisplay = 'ಗಂಡು<br><span style="font-size:8px; font-weight:600; color:#444;">(Male)</span>';
                else if (genderDisplay.includes('Female')) genderDisplay = 'ಹೆಣ್ಣು<br><span style="font-size:8px; font-weight:600; color:#444;">(Female)</span>';

                membersRows += `
                    <tr>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3;">${idx + 1}</td>
                        <td style="border: 1.2px solid #a00000; padding: 3px 2px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${(m.name || '-').replace(/ನಡಾ\s+ಫ್/g, 'ನಡಾಫ್').replace(/ವಿದ್ಯಾ\s+ರ್ಥಿ/g, 'ವಿದ್ಯಾರ್ಥಿ')}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${genderDisplay}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; white-space: nowrap;">${m.dob || '-'}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${(m.relation || '-').replace(/ನಡಾ\s+ಫ್/g, 'ನಡಾಫ್').replace(/ವಿದ್ಯಾ\s+ರ್ಥಿ/g, 'ವಿದ್ಯಾರ್ಥಿ')}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${(m.married || '-').replace(/ನಡಾ\s+ಫ್/g, 'ನಡಾಫ್')}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; white-space: nowrap;">${m.mobile || '-'}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; white-space: nowrap;">${maskAadhar(m.aadhar)}</td>
                        <td style="border: 1.2px solid #a00000; padding: 3px 2px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${(m.literate || '-').replace(/ನಡಾ\s+ಫ್/g, 'ನಡಾಫ್').replace(/ವಿದ್ಯಾ\s+ರ್ಥಿ/g, 'ವಿದ್ಯಾರ್ಥಿ')}</td>
                        <td style="border: 1.2px solid #a00000; padding: 3px 2px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${(m.occupation || '-').replace(/ನಡಾ\s+ಫ್/g, 'ನಡಾಫ್').replace(/ವಿದ್ಯಾ\s+ರ್ಥಿ/g, 'ವಿದ್ಯಾರ್ಥಿ')}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${m.political || '-'}</td>
                        <td style="text-align: center; border: 1.2px solid #a00000; padding: 3px 1px; font-size: 8.5px; line-height: 1.3; word-break: break-word; white-space: normal;">${m.handicapped || 'ಇಲ್ಲ'}</td>
                    </tr>
                `;
            });
        } else {
            membersRows = '<tr><td colspan="12" style="text-align: center; border: 1.2px solid #a00000; padding: 8px;">ಯಾವುದೇ ಸದಸ್ಯರ ವಿವರಗಳಿಲ್ಲ</td></tr>';
        }

        const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=794">
    <title>ಜನಗಣತಿ (Census) - ರಶೀದಿ</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap">
    <style>
        html, body {
            height: auto;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            -webkit-text-size-adjust: 100% !important;
            -moz-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
            text-size-adjust: 100% !important;
        }
        body {
            font-family: 'Noto Sans Kannada', 'Kannada MN', 'Kannada Sangam MN', 'Tunga', 'Lohit Kannada', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
            width: 794px !important;
            max-width: 794px !important;
            margin: 0 auto !important;
            box-sizing: border-box;
        }
        .receipt-container {
            width: 794px !important;
            max-width: 794px !important;
            height: auto;
            margin: 0 !important;
            border: 2px solid #a00000;
            padding: 4px 8px;
            background: #fff;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .grid-table td {
            border: 1.2px solid #a00000;
            padding: 2px 5px;
            font-size: 13.5px;
            vertical-align: middle;
            line-height: 1.2;
        }
        .grid-label {
            background: #fffcf5;
            color: #990000;
            font-weight: bold;
            width: 18%;
            font-size: 13.5px;
        }
        .grid-value {
            color: #000;
            width: 32%;
            font-weight: bold;
            font-size: 13.5px;
        }
        .members-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
            font-size: 12px;
            table-layout: fixed;
        }
        .members-table th {
            border: 1.2px solid #a00000;
            background: #ffedc2;
            color: #990000;
            padding: 4px 1px;
            font-weight: bold;
            font-size: 9.5px;
            line-height: 1.3;
            text-align: center;
            vertical-align: middle;
            white-space: normal;
            word-break: break-word;
        }
        .members-table td {
            border: 1.2px solid #a00000;
            padding: 3px 2px;
            font-weight: bold;
            font-size: 8.5px;
            line-height: 1.3;
            color: #000;
            vertical-align: middle;
            word-break: break-word;
            white-space: normal;
            font-family: 'Noto Sans Kannada', 'Kannada MN', 'Kannada Sangam MN', 'Tunga', 'Lohit Kannada', sans-serif;
        }

        @page {
            size: A4 portrait;
            margin: 0;
        }
        @media print {
            html, body {
                height: auto;
            }
            body {
                padding: 0;
                margin: 0;
                min-width: unset !important;
            }
            .receipt-container {
                border: 2.5px solid #a00000 !important;
                width: 196mm !important;
                margin: 0 auto !important;
                box-sizing: border-box;
                padding: 4px 8px;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-box">
            <tr>
                <td colspan="3" style="text-align: center; padding: 4px 8px 1px 8px;">
                    <div class="kannada-title" style="font-size: 25px; font-weight: bold; color: #990000; margin: 0; line-height: 1.1;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಡಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                </td>
            </tr>
            <tr>
                <td class="header-photo-cell" style="width: 115px; text-align: center; vertical-align: middle; padding: 0 4px 4px 6px;">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.president) ? RECEIPT_ASSETS.president : 'images/president.jpeg'}" class="patron-photo" onerror="this.src='images/president.png'">
                </td>
                <td class="header-text-cell" style="text-align: center; vertical-align: middle; padding: 0 0 4px 0;">
                    <div class="reg-no" style="font-size: 13.5px; color: #990000;">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div>
                    <div class="english-title" style="font-size: 15.5px; color: #990000;">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                    <div class="office-address" style="font-size: 12.5px; color: #990000;">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                    <div class="office-location" style="font-size: 12.5px; color: #990000;">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div>
                </td>
                <td class="header-logo-cell" style="width: 115px; text-align: center; vertical-align: middle; padding: 0 6px 4px 4px;">
                    <img src="${(typeof RECEIPT_ASSETS !== 'undefined' && RECEIPT_ASSETS.logo) ? RECEIPT_ASSETS.logo : 'images/logo-786.png'}" class="header-logo">
                </td>
            </tr>
        </table>
        
        <table style="width: 100%; border-collapse: collapse; margin: 4px 0; border-top: 1.5px solid #a00000; border-bottom: 1.5px solid #a00000; background: #fffcf5; font-size: 13px; font-weight: bold; color: #990000; table-layout: fixed;">
            <tr>
                <td style="width: 32%; text-align: left; padding: 3px 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ಅರ್ಜಿ ಸಂಖ್ಯೆ : <span style="color: #000;">${appNumber}</span>
                </td>
                <td style="width: 44%; text-align: center; padding: 3px 4px; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ನಡಾಫ್ / ಪಿಂಜಾರ್ ಜನಗಣತಿ (ಕರ್ನಾಟಕ) 2026-27
                </td>
                <td style="width: 24%; text-align: right; padding: 3px 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ಅರ್ಜಿ ದಿನಾಂಕ : <span style="color: #000;">${formattedDate}</span>
                </td>
            </tr>
        </table>

        <h3 style="color: #990000; font-size: 13.5px; margin: 4px 0 3px 0; border-bottom: 1px solid #a00000; padding-bottom: 1px;">I. ಕುಟುಂಬದ ವಿವರ (Family Details)</h3>
        <table class="grid-table">
            <tr>
                <td class="grid-label">ಮುಖ್ಯಸ್ಥರ ಹೆಸರು</td>
                <td class="grid-value">${data.headName || '-'}</td>
                <td class="grid-label">ವಿಳಾಸ :</td>
                <td class="grid-value">${data.address || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಗ್ರಾಮ / ನಗರ</td>
                <td class="grid-value">${data.village || '-'}</td>
                <td class="grid-label">ತಾಲೂಕು :</td>
                <td class="grid-value">${data.taluk || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಜಿಲ್ಲೆ</td>
                <td class="grid-value">${data.district || '-'}</td>
                <td class="grid-label">ರಾಜ್ಯ :</td>
                <td class="grid-value">ಕರ್ನಾಟಕ</td>
            </tr>
            <tr>
                <td class="grid-label">ವಾರ್ಡ್ ಸಂಖ್ಯೆ</td>
                <td class="grid-value">${data.ward || '-'}</td>
                <td class="grid-label">ಆಧಾರ್ ಸಂಖ್ಯೆ :</td>
                <td class="grid-value">${maskAadhar(data.headAadhar)}</td>
            </tr>
            <tr>
                <td class="grid-label">ಧರ್ಮ / ಜಾತಿ</td>
                <td class="grid-value">${data.religion || '-'} / ${data.caste || '-'}</td>
                <td class="grid-label">ಜಮೀನು :</td>
                <td class="grid-value">${data.landAcres || '0'} ಎಕರೆ - ${data.landGunta || '0'} ಗುಂಟೆ</td>
            </tr>
            <tr>
                <td class="grid-label">ಮನೆಯ ವಿವರ</td>
                <td class="grid-value">${data.houseType || '-'}</td>
                <td class="grid-label">ಮನೆಯ ಆಕಾರ :</td>
                <td class="grid-value">${data.formingType || '-'}</td>
            </tr>
        </table>

        <h3 style="color: #990000; font-size: 13.5px; margin: 4px 0 3px 0; border-bottom: 1px solid #a00000; padding-bottom: 1px;">II. ಕುಟುಂಬದ ಸದಸ್ಯರ ವಿವರಗಳು (Family Members)</h3>
        <table class="members-table">
            <thead>
                <tr>
                    <th style="width: 3%; text-align: center;">ಕ್ರ.ಸಂ</th>
                    <th style="width: 13%; text-align: left;">ಸದಸ್ಯರ ಹೆಸರು</th>
                    <th style="width: 7.5%; text-align: center;">ಲಿಂಗ</th>
                    <th style="width: 9%; text-align: center;">ಹುಟ್ಟಿದ ದಿನಾಂಕ</th>
                    <th style="width: 7.5%; text-align: center;">ಸಂಬಂಧ</th>
                    <th style="width: 7.5%; text-align: center;">ವೈವಾಹಿಕ</th>
                    <th style="width: 9.5%; text-align: center;">ಮೊಬೈಲ್</th>
                    <th style="width: 12.5%; text-align: center;">ಆಧಾರ್</th>
                    <th style="width: 9.5%; text-align: center;">ಸಾಕ್ಷರತಾ</th>
                    <th style="width: 10.5%; text-align: center;">ವೃತ್ತಿ</th>
                    <th style="width: 5.5%; text-align: center;">ರಾಜಕೀಯ</th>
                    <th style="width: 5.5%; text-align: center;">ಅಂಗವಿಕಲ</th>
                </tr>
            </thead>
            <tbody>
                ${membersRows}
            </tbody>
        </table>

    </div>
</body>
</html>`;

        // Create invisible iframe off-screen
        let iframe = document.getElementById('receiptPrintIframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'receiptPrintIframe';
            iframe.style.position = 'fixed';
            iframe.style.left = '-9999px';
            iframe.style.top = '-9999px';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            document.body.appendChild(iframe);
        }
        
        iframe.style.width = '210mm';
        iframe.style.height = '297mm';
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(printHTML);
        doc.close();
        
        setTimeout(() => {
            iframe.style.width = '794px';
            iframe.style.height = 'auto';
            
            const container = doc.querySelector('.receipt-container');
            const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (isMobile) {
                if (container) {
                    container.style.margin = '0';
                }
                const script = doc.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = () => {
                    const opt = {
                        margin: 0,
                        filename: 'Census_' + appNumber + '.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, letterRendering: false, scrollX: 0, scrollY: 0, width: 794, windowWidth: 794 },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                    };
                    iframe.contentWindow.html2pdf().from(container).set(opt).save();
                };
                doc.head.appendChild(script);
            } else {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }
        }, 500);
    };
}


function loadAdminEmployees() {
    const tableBody = document.getElementById("employeesTableBody");
    if (!tableBody) return;

    function render(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999;">No employee registrations found.</td></tr>`;
            return;
        }

        list.forEach((app, index) => {
            const row = document.createElement("tr");
            const fd = app.formData || {};
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span style="font-weight: 600; color: #4f1971;">${app.id}</span></td>
                <td>${app.date}</td>
                <td><strong>${fd.employeeName || '-'}</strong></td>
                <td>${fd.contactNumber || '-'}</td>
                <td>${fd.departmentName || '-'}</td>
                <td>${fd.designation || '-'}</td>
                <td>${fd.isRetired || 'ಇಲ್ಲ'}</td>
                <td>
                    <button class="btn-edit" onclick="editEmployee('${app.id}')" title="Edit"><i class="fa fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteEmployee('${app.id}')" title="Delete"><i class="fa fa-trash"></i></button>
                    <button class="btn-download" onclick="downloadEmployeePdf('${app.id}')" title="Download PDF"><i class="fa fa-download"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    let submissions = JSON.parse(localStorage.getItem('admin_employees_submissions')) || [];
    render(submissions);

    // Filter
    const form = document.getElementById("employeesFilterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = document.getElementById("filterSearch").value.toLowerCase();

            let filtered = submissions.filter(app => {
                const fd = app.formData || {};
                return (fd.employeeName || '').toLowerCase().includes(search) || 
                       (fd.departmentName || '').toLowerCase().includes(search) ||
                       (fd.contactNumber || '').toLowerCase().includes(search);
            });
            render(filtered);
        });
    }

    const clearBtn = document.getElementById("btnClearFilter");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("employeesFilterForm").reset();
            render(submissions);
        });
    }

    // Modal Edit handler
    window.editEmployee = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const fd = found.formData || {};
        document.getElementById('editIndex').value = id;
        document.getElementById('editEmployeeName').value = fd.employeeName || '';
        document.getElementById('editFatherName').value = fd.fatherName || '';
        document.getElementById('editContactNumber').value = fd.contactNumber || '';
        document.getElementById('editQualification').value = fd.qualification || '';
        document.getElementById('editDob').value = fd.dob || '';
        document.getElementById('editAge').value = fd.age || '';
        document.getElementById('editDepartmentName').value = fd.departmentName || '';
        document.getElementById('editDesignation').value = fd.designation || '';
        document.getElementById('editEmployeeType').value = fd.employeeType || 'ಸರ್ಕಾರಿ ನೌಕರರ ಮಾಹಿತಿ';
        document.getElementById('editRetirementDate').value = fd.retirementDate || '';
        document.getElementById('editPermanentAddress').value = fd.permanentAddress || '';

        // Toggle retirement date block
        const empType = fd.employeeType || 'ಸರ್ಕಾರಿ ನೌಕರರ ಮಾಹಿತಿ';
        const group = document.getElementById('retirementDateGroup');
        if (group) {
            group.style.display = (empType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ') ? 'flex' : 'none';
        }

        if (typeof toggleRetirementDateEdit === 'function') toggleRetirementDateEdit();
        document.getElementById('editEmployeeModal').style.display = 'flex';
    };

    // Modal Save
    const editForm = document.getElementById("editEmployeeForm");
    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById('editIndex').value;
            const index = submissions.findIndex(app => app.id === id);
            if (index === -1) return;

            const empType = document.getElementById('editEmployeeType').value;
            submissions[index].formData = {
                employeeType: empType,
                employeeName: document.getElementById('editEmployeeName').value,
                fatherName: document.getElementById('editFatherName').value,
                contactNumber: document.getElementById('editContactNumber').value,
                qualification: document.getElementById('editQualification').value,
                dob: document.getElementById('editDob').value,
                age: document.getElementById('editAge').value,
                departmentName: document.getElementById('editDepartmentName').value,
                designation: document.getElementById('editDesignation').value,
                isRetired: (empType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ') ? 'ಹೌದು' : 'ಇಲ್ಲ',
                retirementDate: document.getElementById('editRetirementDate').value,
                permanentAddress: document.getElementById('editPermanentAddress').value
            };

            localStorage.setItem('admin_employees_submissions', JSON.stringify(submissions));
            alert("Employee updated successfully!");
            document.getElementById('editEmployeeModal').style.display = 'none';
            render(submissions);
        });
    }

    // Delete handler
    window.deleteEmployee = function(id) {
        if (confirm("Are you sure you want to delete this employee registration?")) {
            trackDeletedId(id);
            submissions = submissions.filter(app => app.id !== id);
            localStorage.setItem('admin_employees_submissions', JSON.stringify(submissions));
            render(submissions);
        }
    };

    // Download PDF handler
    window.downloadEmployeePdf = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const data = found.formData || {};
        const appNumber = found.id;
        const dateStr = found.date || new Date().toLocaleDateString('en-GB');

        const formattedDob = data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : '-';
        const formattedRetirement = data.isRetired === 'ಹೌದು' && data.retirementDate ? new Date(data.retirementDate).toLocaleDateString('en-GB') : 'ಇಲ್ಲ (No)';

        let deptLabel = 'ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಇಲಾಖೆಯ ಹೆಸರು';
        let locLabel = 'ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಸ್ಥಳ';
        if (data.employeeType === 'ಖಾಸಗಿ ನೌಕರರ ಮಾಹಿತಿ') {
            deptLabel = 'ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಖಾಸಗಿ ಸಂಸ್ಥೆಯ ಹೆಸರು';
            locLabel = 'ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಸ್ಥಳ';
        } else if (data.employeeType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ') {
            deptLabel = 'ಸೇವೆ ಸಲ್ಲಿಸಿದ ಇಲಾಖೆಯ ಹೆಸರು';
            locLabel = 'ಸೇವೆ ಸಲ್ಲಿಸಿದ ಸ್ಥಳ';
        }

        const container = document.createElement('div');
        container.style.width = '148mm';
        container.style.height = '210mm';
        container.style.boxSizing = 'border-box';
        container.style.background = '#fff';

        container.innerHTML = `
            <div style="width:144mm; height:204mm; margin:2mm auto; border:1.5px double #b30000; padding:4px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; font-family:'Noto Sans Kannada', sans-serif;">
                <div>
                    <!-- HEADER BOX -->
                    <table style="width:100%; border-collapse:collapse; border:2px solid #a00000; border-radius:6px; background-color:#ffedc2!important; margin-bottom:3px;">
                        <tr>
                            <td style="width:65px; text-align:center; padding:2px 2px 2px 4px; vertical-align:middle;">
                                <img src="images/president.jpeg" style="width:55px; height:55px; border-radius:50%; border:1.5px solid #a00000; object-fit:cover;" onerror="this.src='images/president.png'">
                            </td>
                            <td style="text-align:center; vertical-align:middle; padding:2px 0; color:#990000;">
                                <div style="font-size:16px; font-weight:bold; color:#990000; margin:0; line-height:1.1; white-space:nowrap;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                                <div style="font-size:9px; font-weight:bold; margin-top:1px; color:#990000;">ನೋ. ಸಂ. : 151/ಎಸ್ ಒ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993−94</div>
                                <div style="font-size:10.5px; font-weight:bold; letter-spacing:0.3px; margin-top:1px; color:#990000;">KARNATAKA RAJYA NADAF/PINJAR SANGHA ®</div>
                                <div style="font-size:8.5px; font-weight:bold; color:#990000;">ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</div>
                                <div style="font-size:8.5px; font-weight:bold; color:#990000;">ಸಿಬಾರ−ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ−577502</div>
                            </td>
                            <td style="width:65px; text-align:center; padding:2px 4px 2px 2px; vertical-align:middle;">
                                <img src="images/logo-786.png" style="width:55px; height:55px; border-radius:50%; border:1.5px solid #a00000; object-fit:cover;">
                            </td>
                        </tr>
                    </table>

                    <!-- TITLE BANNER -->
                    <div style="border-top:1.2px solid #b30000; border-bottom:1.2px solid #b30000; padding:3px; margin:2px 0; background:#fffcf5; display:flex; justify-content:space-between; align-items:center; font-weight:bold; font-size:10.5px; color:#b30000;">
                        <div>ನೋಂದಣಿ ಸಂಖ್ಯೆ: ${appNumber}</div>
                        <div style="font-weight:bold; color:#b30000;">${data.employeeType || 'ನೌಕರರ ವಿವರ'}</div>
                        <div>ದಿನಾಂಕ : ${dateStr}</div>
                    </div>

                    <!-- GRID TABLE -->
                    <table style="width:100%; border-collapse:collapse; margin-bottom:2px;">
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold; width:28%;">ಅರ್ಜಿಯ ವಿಧ :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#b30000!important; font-weight:bold; width:72%;" colspan="3">${data.employeeType || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold; width:28%;">ನೌಕರರ ಹೆಸರು :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold; width:22%;">${data.employeeName || '-'}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold; width:28%;">ತಂದೆಯ ಹೆಸರು :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold; width:22%;">${data.fatherName || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ಕಾಯಂ ವಿಳಾಸ :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;" colspan="3">${data.permanentAddress || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.contactNumber || '-'}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ವಿದ್ಯಾರ್ಹತೆ :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.qualification || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ಹುಟ್ಟಿದ ದಿನಾಂಕ :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${formattedDob}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ವಯಸ್ಸು :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.age || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">${deptLabel} :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.departmentName || '-'}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">${locLabel} :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.workLocation || '-'}</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">ಹುದ್ದೆಯ ಹೆಸರು :</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.designation || '-'}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; background:#fffcf5; color:#b30000; font-weight:bold;">${data.employeeType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ' ? 'ನಿವೃತ್ತಿ ದಿನಾಂಕ :' : ''}</td>
                            <td style="border:1px solid #b30000; padding:2.5px 4px; font-size:10px; color:#000000!important; font-weight:bold;">${data.employeeType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ' ? formattedRetirement : ''}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align:center; font-size:9.5px; font-weight:bold; color:#b30000; border-top:1px dashed #b30000; padding-top:4px; margin-top:4px;">
                    ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್ / ಪಿಂಜಾರ ಸಂಘ (ರಿ) - ರಾಜ್ಯ ಆಡಳಿತ ನೋಂದಣಿ ಪತ್ರ (A5 Single Page)
                </div>
            </div>
        `;

        document.body.appendChild(container);

        const opt = {
            margin: 0,
            filename: `Employee_${appNumber || 'Details'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
        };

        if (window.html2pdf) {
            window.html2pdf().set(opt).from(container).save().then(() => {
                if (container.parentNode) container.parentNode.removeChild(container);
            }).catch(err => {
                console.error("PDF download error:", err);
                if (container.parentNode) container.parentNode.removeChild(container);
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                window.html2pdf().set(opt).from(container).save().then(() => {
                    if (container.parentNode) container.parentNode.removeChild(container);
                });
            };
            document.head.appendChild(script);
        }
    };
}


function loadAdminPratibha() {
    const tableBody = document.getElementById("pratibhaTableBody");
    if (!tableBody) return;

    function render(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999;">No applications found.</td></tr>`;
            return;
        }

        list.forEach((app, index) => {
            const row = document.createElement("tr");
            const fd = app.formData || {};
            const statusClass = fd.status === "Approved" ? "status-approved" : (fd.status === "Rejected" ? "status-rejected" : "status-pending");
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span style="font-weight: 600; color: #4f1971;">${app.id}</span></td>
                <td>${app.date}</td>
                <td><strong>${fd.studentName || '-'}</strong></td>
                <td>${fd.fatherName || fd.parentName || '-'}</td>
                <td>${fd.parentMobile || fd.mobile || '-'}</td>
                <td>${fd.category || '-'}</td>
                <td><span class="status-badge ${statusClass}">${fd.status || 'Pending'}</span></td>
                <td>
                    <button class="btn-edit" onclick="reviewPratibha('${app.id}')" title="Review"><i class="fa fa-eye"></i></button>
                    <button class="btn-view" onclick="downloadPratibhaPdfAdmin('${app.id}')" title="Download PDF" style="background-color: #007bff; color: white; margin-left: 3px;"><i class="fa fa-download"></i></button>
                    <button class="btn-delete" onclick="deletePratibha('${app.id}', '${app.dbId || ''}')" title="Delete"><i class="fa fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    let submissions = JSON.parse(localStorage.getItem('admin_pratibha_submissions')) || [];
    render(submissions);

    // Filter
    const form = document.getElementById("pratibhaFilterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = document.getElementById("filterSearch").value.toLowerCase();
            const status = document.getElementById("filterStatus").value;

            let filtered = submissions.filter(app => {
                const fd = app.formData || {};
                const keywordMatch = !search || 
                                     (fd.studentName || '').toLowerCase().includes(search) || 
                                     (fd.fatherName || '').toLowerCase().includes(search) ||
                                     (fd.parentMobile || '').toLowerCase().includes(search) ||
                                     (fd.aadhar || '').toLowerCase().includes(search);
                const statusMatch = !status || fd.status === status;
                return keywordMatch && statusMatch;
            });
            render(filtered);
        });
    }

    const clearBtn = document.getElementById("btnClearFilter");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("pratibhaFilterForm").reset();
            render(submissions);
        });
    }

    // Review Modal Open
    window.reviewPratibha = function(id) {
        const app = submissions.find(item => item.id === id);
        if (!app) return;

        const fd = app.formData || {};
        document.getElementById("reviewAppId").value = id;
        document.getElementById("viewStudentName").textContent = fd.studentName || '-';
        document.getElementById("viewFatherName").textContent = fd.fatherName || '-';
        document.getElementById("viewGuardianName").textContent = fd.guardianName || '-';
        document.getElementById("viewOccupationIncome").textContent = fd.parentOccupationIncome || '-';
        document.getElementById("viewAddress").textContent = fd.completeAddress || '-';
        document.getElementById("viewAadhar").textContent = fd.aadhar || '-';
        document.getElementById("viewMembership").textContent = fd.lifeMembership || '-';
        document.getElementById("viewMarksDetails").textContent = fd.marksDetails || '-';
        document.getElementById("viewMobile").textContent = fd.parentMobile || '-';
        document.getElementById("viewBankDetails").textContent = fd.bankDetails || '-';
        document.getElementById("viewCity").textContent = fd.city || '-';
        document.getElementById("viewYear").textContent = fd.year || '-';
        document.getElementById("viewCategory").textContent = fd.category || '-';
        document.getElementById("viewField").textContent = fd.field || '-';

        const photoImg = document.getElementById("viewPhoto");
        const placeholder = document.getElementById("photoPlaceholder");
        if (fd.photo) {
            photoImg.src = fd.photo;
            photoImg.style.display = "block";
            placeholder.style.display = "none";
        } else {
            photoImg.style.display = "none";
            placeholder.style.display = "block";
        }

        document.getElementById("reviewStatus").value = fd.status || 'Pending';
        document.getElementById("reviewRemarks").value = fd.remarks || '';

        document.getElementById("reviewPratibhaModal").style.display = "flex";
    };

    // Review Modal Close
    window.closeReviewModal = function() {
        document.getElementById("reviewPratibhaModal").style.display = "none";
    };

    // Review Form Save
    const reviewForm = document.getElementById("reviewPratibhaForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("reviewAppId").value;
            const status = document.getElementById("reviewStatus").value;
            const remarks = document.getElementById("reviewRemarks").value;

            const idx = submissions.findIndex(item => item.id === id);
            if (idx === -1) return;

            // Update local storage
            submissions[idx].formData.status = status;
            submissions[idx].formData.remarks = remarks;
            localStorage.setItem('admin_pratibha_submissions', JSON.stringify(submissions));

            // Sync update to Server Database
            try {
                let res = await fetch("/api/donations/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paymentId: id,
                        dbId: submissions[idx].dbId,
                        status: status,
                        remarks: remarks
                    })
                }).catch(() => null);

                if (!res || !res.ok) {
                    res = await fetch("/api/donations/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            paymentId: id,
                            dbId: submissions[idx].dbId,
                            status: status,
                            remarks: remarks
                        })
                    }).catch(() => null);
                }
                
                if (res && res.ok) {
                    alert("Evaluation saved successfully!");
                } else {
                    alert("Locally saved. Database sync failed.");
                }
            } catch (err) {
                console.error(err);
                alert("Locally saved. Network sync failed.");
            }

            closeReviewModal();
            render(submissions);
        });
    }

    // Delete Handler
    window.deletePratibha = async function(id, dbId) {
        if (confirm("Are you sure you want to delete this application? This will permanently remove it from the database.")) {
            try {
                // Delete from database
                const q = (dbId ? `dbId=${encodeURIComponent(dbId)}&` : '') + `paymentId=${encodeURIComponent(id)}`;
                let res = await fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                if (!res || !res.ok) {
                    res = await fetch('/api/donations/' + encodeURIComponent(id) + (dbId ? '?dbId=' + encodeURIComponent(dbId) : ''), { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    res = await fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    res = await fetch('/api/donations/' + encodeURIComponent(id) + (dbId ? '?dbId=' + encodeURIComponent(dbId) : ''), { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    // Try alternate method with body for Vercel
                    res = await fetch('/api/donations', { method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ paymentId: id, dbId: dbId }) }).catch(() => null);
                }
            } catch (err) {
                console.error('Error deleting from database:', err);
            }
            // Also remove from localStorage
            trackDeletedId(id);
            submissions = submissions.filter(app => app.id !== id);
            localStorage.setItem('admin_pratibha_submissions', JSON.stringify(submissions));
            render(submissions);
            alert('Application deleted successfully!');
        }
    };
}

// -------------------------------------------------------------
// 13. Admin Sadhaka Award Module
// -------------------------------------------------------------
function loadAdminSadhaka() {
    const tableBody = document.getElementById("sadhakaTableBody");
    if (!tableBody) return;

    function render(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999;">No applications found.</td></tr>`;
            return;
        }

        list.forEach((app, index) => {
            const row = document.createElement("tr");
            const fd = app.formData || {};
            const statusClass = fd.status === "Approved" ? "status-approved" : (fd.status === "Rejected" ? "status-rejected" : "status-pending");
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span style="font-weight: 600; color: #4f1971;">${app.id}</span></td>
                <td>${app.date}</td>
                <td><strong>${fd.studentName || '-'}</strong></td>
                <td>${fd.fatherName || fd.parentName || '-'}</td>
                <td>${fd.parentMobile || fd.mobile || '-'}</td>
                <td>${fd.category || '-'}</td>
                <td><span class="status-badge ${statusClass}">${fd.status || 'Pending'}</span></td>
                <td>
                    <button class="btn-edit" onclick="reviewSadhaka('${app.id}')" title="Review"><i class="fa fa-eye"></i></button>
                    <button class="btn-view" onclick="downloadSadhakaPdfAdmin('${app.id}')" title="Download PDF" style="background-color: #007bff; color: white; margin-left: 3px;"><i class="fa fa-download"></i></button>
                    <button class="btn-delete" onclick="deleteSadhaka('${app.id}', '${app.dbId || ''}')" title="Delete"><i class="fa fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    let submissions = JSON.parse(localStorage.getItem('admin_sadhaka_submissions')) || [];
    render(submissions);

    // Filter
    const form = document.getElementById("pratibhaFilterForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const search = document.getElementById("filterSearch").value.toLowerCase();
            const status = document.getElementById("filterStatus").value;

            let filtered = submissions.filter(app => {
                const fd = app.formData || {};
                const keywordMatch = !search || 
                                     (fd.studentName || '').toLowerCase().includes(search) || 
                                     (fd.fatherName || '').toLowerCase().includes(search) ||
                                     (fd.parentMobile || '').toLowerCase().includes(search) ||
                                     (fd.aadhar || '').toLowerCase().includes(search);
                const statusMatch = !status || fd.status === status;
                return keywordMatch && statusMatch;
            });
            render(filtered);
        });
    }

    const clearBtn = document.getElementById("btnClearFilter");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("pratibhaFilterForm").reset();
            render(submissions);
        });
    }

    // Review Modal Open
    window.reviewSadhaka = function(id) {
        const app = submissions.find(item => item.id === id);
        if (!app) return;

        const fd = app.formData || {};
        document.getElementById("reviewAppId").value = id;
        document.getElementById("viewStudentName").textContent = fd.studentName || '-';
        document.getElementById("viewFatherName").textContent = fd.fatherName || '-';
        document.getElementById("viewGuardianName").textContent = fd.guardianName || '-';
        document.getElementById("viewOccupationIncome").textContent = fd.parentOccupationIncome || '-';
        document.getElementById("viewAddress").textContent = fd.completeAddress || '-';
        document.getElementById("viewAadhar").textContent = fd.aadhar || '-';
        document.getElementById("viewMembership").textContent = fd.lifeMembership || '-';
        document.getElementById("viewMarksDetails").textContent = fd.marksDetails || '-';
        document.getElementById("viewMobile").textContent = fd.parentMobile || '-';
        document.getElementById("viewBankDetails").textContent = fd.bankDetails || '-';
        document.getElementById("viewCity").textContent = fd.city || '-';
        document.getElementById("viewYear").textContent = fd.year || '-';
        document.getElementById("viewCategory").textContent = fd.category || '-';
        document.getElementById("viewField").textContent = fd.field || '-';

        const photoImg = document.getElementById("viewPhoto");
        const placeholder = document.getElementById("photoPlaceholder");
        if (fd.photo) {
            photoImg.src = fd.photo;
            photoImg.style.display = "block";
            placeholder.style.display = "none";
        } else {
            photoImg.style.display = "none";
            placeholder.style.display = "block";
        }

        document.getElementById("reviewStatus").value = fd.status || 'Pending';
        document.getElementById("reviewRemarks").value = fd.remarks || '';

        document.getElementById("reviewSadhakaModal").style.display = "flex";
    };

    // Review Modal Close
    window.closeReviewModal = function() {
        document.getElementById("reviewSadhakaModal").style.display = "none";
    };

    // Review Form Save
    const reviewForm = document.getElementById("reviewSadhakaForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("reviewAppId").value;
            const status = document.getElementById("reviewStatus").value;
            const remarks = document.getElementById("reviewRemarks").value;

            const idx = submissions.findIndex(item => item.id === id);
            if (idx === -1) return;

            // Update local storage
            submissions[idx].formData.status = status;
            submissions[idx].formData.remarks = remarks;
            localStorage.setItem('admin_sadhaka_submissions', JSON.stringify(submissions));

            // Sync update to Server Database
            try {
                let res = await fetch("/api/donations/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paymentId: id,
                        dbId: submissions[idx].dbId,
                        status: status,
                        remarks: remarks
                    })
                }).catch(() => null);

                if (!res || !res.ok) {
                    res = await fetch("/api/donations/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            paymentId: id,
                            dbId: submissions[idx].dbId,
                            status: status,
                            remarks: remarks
                        })
                    }).catch(() => null);
                }
                
                if (res && res.ok) {
                    alert("Evaluation saved successfully!");
                } else {
                    alert("Locally saved. Database sync failed.");
                }
            } catch (err) {
                console.error(err);
                alert("Locally saved. Network sync failed.");
            }

            closeReviewModal();
            render(submissions);
        });
    }

    // Delete Handler
    window.deleteSadhaka = async function(id, dbId) {
        if (confirm("Are you sure you want to delete this application? This will permanently remove it from the database.")) {
            try {
                // Delete from database
                const q = (dbId ? `dbId=${encodeURIComponent(dbId)}&` : '') + `paymentId=${encodeURIComponent(id)}`;
                let res = await fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                if (!res || !res.ok) {
                    res = await fetch('/api/donations/' + encodeURIComponent(id) + (dbId ? '?dbId=' + encodeURIComponent(dbId) : ''), { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    res = await fetch('/api/donations?' + q, { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    res = await fetch('/api/donations/' + encodeURIComponent(id) + (dbId ? '?dbId=' + encodeURIComponent(dbId) : ''), { method: 'DELETE' }).catch(() => null);
                }
                if (!res || !res.ok) {
                    // Try alternate method with body for Vercel
                    res = await fetch('/api/donations', { method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ paymentId: id, dbId: dbId }) }).catch(() => null);
                }
            } catch (err) {
                console.error('Error deleting from database:', err);
            }
            // Also remove from localStorage
            trackDeletedId(id);
            submissions = submissions.filter(app => app.id !== id);
            localStorage.setItem('admin_sadhaka_submissions', JSON.stringify(submissions));
            render(submissions);
            alert('Application deleted successfully!');
        }
    };
}


// Download PDF for Pratibha Puraskar Admin
window.downloadPratibhaPdfAdmin = async function(id) {
    let list = JSON.parse(localStorage.getItem('admin_pratibha_submissions')) || [];
    let app = list.find(item => item.id === id || item.dbId === id || (item.formData && item.formData.paymentId === id));
    
    if (!app) {
        try {
            let res = await fetch("/api/donations?_=" + Date.now()).catch(() => null);
            if (res && res.ok) {
                let data = await res.json().catch(() => null);
                let apiList = Array.isArray(data) ? data : (data && Array.isArray(data.donations) ? data.donations : []);
                app = apiList.find(item => item.paymentId === id || item._id === id || (item.formData && item.formData.paymentId === id));
            }
        } catch(e) {}
    }

    if (!app) { 
        alert('Application not found'); 
        return; 
    }

    const fd = app.formData || app;
    const origin = window.location.origin;
    
    if (!window.html2pdf) {
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    const container = document.createElement('div');
    container.style.width = '700px';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#000000';
    container.style.padding = '12px 20px';
    container.style.boxSizing = 'border-box';

    const studentName = fd.studentName || '-';
    const fatherName = fd.fatherName || '-';
    const guardianName = fd.guardianName || '-';
    const parentOccupationIncome = fd.parentOccupationIncome || '-';
    const completeAddress = fd.completeAddress || '-';
    const aadhar = fd.aadhar || '-';
    const lifeMembership = (fd.lifeMembership === 'ಹೌದು' || fd.lifeMembership === 'Yes') ? 'ಹೌದು<br><span style="font-size: 13.5px; font-weight: normal; color: #000; display: inline-block; margin-top: 1px;">(ನಂತರ ಮಾಹಿತಿಯನ್ನು ರಾಜ್ಯ ಪರಿಶೀಲನಾ ಸಮಿತಿಗೆ ಸಲ್ಲಿಸಿ)</span>' : (fd.lifeMembership || '-');
    const marksDetails = fd.marksDetails || '-';
    const parentMobile = fd.parentMobile || '-';
    const bankName = fd.bankName || '-';
    const bankAccount = fd.bankAccount || '-';
    const ifsc = fd.ifsc || '-';
    const photo = fd.photo;

    container.innerHTML = `
        
                    
                    
                    
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;700&display=swap');
                        .pdf-container {
                            font-family: 'Noto Sans Kannada', 'Noto Serif Kannada', 'Segoe UI', Arial, sans-serif;
                            font-size: 14.5px;
                            line-height: 1.45 !important;
                            color: #000;
                            letter-spacing: normal !important;
                            word-spacing: normal !important;
                            page-break-inside: avoid !important;
                            width: 100%;
                            box-sizing: border-box;
                        }
                        .header-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 4px;
                        }
                        .header-table td {
                            border: none !important;
                            padding: 0 !important;
                            vertical-align: middle;
                        }
                        .header-logo-left {
                            width: 80px;
                            text-align: left;
                        }
                        .header-logo-left img {
                            width: 80px !important;
                            height: 80px !important;
                            min-width: 80px !important;
                            max-width: 80px !important;
                            min-height: 80px !important;
                            max-height: 80px !important;
                            border-radius: 50% !important;
                            object-fit: cover !important;
                            display: block;
                        }
                        .header-logo-right {
                            width: 80px;
                            text-align: right;
                        }
                        .header-logo-right img {
                            width: 80px !important;
                            height: 80px !important;
                            min-width: 80px !important;
                            max-width: 80px !important;
                            min-height: 80px !important;
                            max-height: 80px !important;
                            border-radius: 50% !important;
                            object-fit: cover !important;
                            display: block;
                            margin-left: auto;
                        }
                        .header-text {
                            text-align: center;
                            padding: 0 4px;
                        }
                        .header-text h1 {
                            margin: 0;
                            font-size: 18px;
                            white-space: nowrap !important;
                            font-weight: bold;
                            color: #000;
                        }
                        .header-text h2 {
                            margin: 2px 0 0 0;
                            font-size: 13.5px;
                            font-weight: bold;
                        }
                        .header-text h3 {
                            margin: 2px 0 0 0;
                            font-size: 14.5px;
                            font-weight: bold;
                        }
                        .details-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 4px;
                            table-layout: fixed;
                        }
                        .details-table th, .details-table td {
                            border: 1px solid #000 !important;
                            padding: 2.5px 5px !important;
                            text-align: left;
                            vertical-align: middle;
                            font-size: 14px;
                            line-height: 1.45 !important;
                            box-sizing: border-box;
                        }
                        .sl-col {
                            width: 28px;
                            text-align: center !important;
                            font-weight: bold;
                        }
                        .label-col {
                            width: 245px;
                            font-weight: bold;
                            line-height: 1.4 !important;
                            word-break: keep-all !important;
                        }
                        .value-col {
                            word-break: break-word !important;
                            overflow-wrap: break-word !important;
                            word-wrap: break-word !important;
                            white-space: normal !important;
                            line-height: 1.45 !important;
                        }
                        .value-col-split {
                            width: 220px;
                            word-break: break-word !important;
                            overflow-wrap: break-word !important;
                            word-wrap: break-word !important;
                            white-space: normal !important;
                            line-height: 1.45 !important;
                        }
                        .photo-cell {
                            width: 110px;
                            text-align: center !important;
                            vertical-align: middle !important;
                            padding: 2px !important;
                        }
                        .photo-cell img {
                            max-width: 105px;
                            max-height: 115px;
                            object-fit: contain;
                            display: block;
                            margin: 0 auto;
                        }
                        .photo-placeholder {
                            border: 1px dashed #666;
                            padding: 14px 4px;
                            font-size: 12px;
                            color: #555;
                            text-align: center;
                        }
                        .signature-section {
                            margin-top: 5px;
                            margin-bottom: 5px;
                        }
                        .signature-table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .signature-table td {
                            border: none !important;
                            padding: 0 !important;
                            font-size: 14.5px;
                            line-height: 1.4 !important;
                            word-break: keep-all !important;
                        }
                        .recommendation-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 4px;
                            margin-bottom: 6px !important;
                        }
                        .recommendation-table td {
                            width: 50%;
                            border: 1px solid #000 !important;
                            height: 160px !important;
                            vertical-align: top;
                            padding: 5px !important;
                            box-sizing: border-box;
                            word-break: keep-all !important;
                        }
                        .recommendation-title {
                            font-weight: bold;
                            font-size: 15.5px;
                            text-align: center;
                            line-height: 1.35 !important;
                        }
                        .recommendation-subtitle {
                            font-size: 11.5px;
                            text-align: center;
                            margin-top: 2px;
                            color: #333;
                            line-height: 1.3 !important;
                        }
                        .committee-section {
                            border-top: 1px dashed #000;
                            padding-top: 6px !important;
                            margin-top: 8px !important;
                        }
                        .committee-title {
                            font-weight: bold;
                            font-size: 16.5px;
                            text-align: center;
                            margin-bottom: 3px;
                            word-break: keep-all !important;
                        }
                        .committee-text {
                            font-size: 16px;
                            line-height: 1.45 !important;
                            word-break: keep-all !important;
                        }
                        .committee-bullet {
                            margin-top: 4px;
                            padding-left: 14px;
                            text-indent: -14px;
                            text-align: justify;
                            line-height: 1.45 !important;
                            font-size: 16px;
                            word-break: keep-all !important;
                        }
                    </style>
        <div class="pdf-container">
            <table class="header-table">
                <tr>
                    <td class="header-logo-left">
                        <img src="${origin}/images/president_circular.png" onerror="this.src='${origin}/images/president.jpeg'">
                    </td>
                    <td class="header-text">
                        <h1 style="font-size: 18px; white-space: nowrap; margin: 0;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ) ಶಿವಮೊಗ್ಗ</h1>
                        <h2>ಆಡಳಿತ ಕಚೇರಿ : ಸೀಬಾರಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ</h2>
                        <h3>ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಲ್ಲಿಸುವ ಅರ್ಜಿ 2025-26</h3>
                    </td>
                    <td class="header-logo-right">
                        <img src="${origin}/images/logo-786.png" onerror="this.src='images/logo-786.png'">
                    </td>
                </tr>
            </table>
            
            <table class="details-table">
                <tr>
                    <td class="sl-col">1</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಹೆಸರು</td>
                    <td class="value-col" colspan="2">${studentName}</td>
                </tr>
                <tr>
                    <td class="sl-col">2</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ತಂದೆಯ ಹೆಸರು</td>
                    <td class="value-col" colspan="2">${fatherName}</td>
                </tr>
                <tr>
                    <td class="sl-col">3</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಪೋಷಕರಿದ್ದಲ್ಲಿ ಹೆಸರು</td>
                    <td class="value-col" colspan="2">${guardianName}</td>
                </tr>
                <tr>
                    <td class="sl-col">4</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಪಾಲಕರ/ಪೋಷಕರ ಉದ್ಯೋಗ ಮತ್ತು ಆದಾಯ</td>
                    <td class="value-col" colspan="2">${parentOccupationIncome}</td>
                </tr>
                <tr>
                    <td class="sl-col">5</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಪಾಲಕರ/ಪೋಷಕರ ಸಂಪೂರ್ಣವಿಳಾಸ</td>
                    <td class="value-col" colspan="2">${completeAddress}</td>
                </tr>
                <tr>
                    <td class="sl-col">6</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಆಧಾರ ಸಂಖ್ಯೆ</td>
                    <td class="value-col" colspan="2">${aadhar}</td>
                </tr>
                <tr>
                    <td class="sl-col">7</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿಯ ಕುಟುಂಬದವರು ಸಂಘದ ಅಜೀವ ಸದಸ್ಯರೇ?</td>
                    <td class="value-col" colspan="2">${lifeMembership}</td>
                </tr>
                <tr>
                    <td class="sl-col">8</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯು 2025-26 ರಲ್ಲಿ ಪಡೆದ ಅಂಕಗಳ ವಿವರ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಲಗತ್ತಿಸುವುದು</td>
                    <td class="value-col" colspan="2">${marksDetails}</td>
                </tr>
                <tr>
                    <td class="sl-col">9</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಪಾಲಕರ ಮೊ. ನಂ.</td>
                    <td class="value-col-split">${parentMobile}</td>
                    <td class="photo-cell" rowspan="4">
                        ${photo ? '<img src="' + photo + '">' : '<div class="photo-placeholder">ಪಾಸ್ ಪೋರ್ಟ್<br>ಸೈಜ್ ಫೋಟೋ</div>'}
                    </td>
                </tr>
                <tr>
                    <td class="sl-col">10</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಹೆಸರು</td>
                    <td class="value-col-split">${bankName}</td>
                </tr>
                <tr>
                    <td class="sl-col">11</td>
                    <td class="label-col">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆ</td>
                    <td class="value-col-split">${bankAccount}</td>
                </tr>
                <tr>
                    <td class="sl-col">12</td>
                    <td class="label-col">IFSC ಕೋಡ್</td>
                    <td class="value-col-split">${ifsc}</td>
                </tr>
            </table>
            
            <div class="signature-section">
                <table class="signature-table">
                    <tr>
                        <td style="width: 33%; text-align: left; vertical-align: top;"><strong>ದಿನಾಂಕ :</strong> _________________</td>
                        <td style="width: 34%; text-align: center; height: 22px; vertical-align: bottom; font-weight: bold;">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ಪಾಲಕರ ರುಜು</td>
                        <td style="width: 33%; text-align: right; height: 22px; vertical-align: bottom; font-weight: bold;">ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯ ರುಜು</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; vertical-align: top; padding-top: 4px;"><strong>ಸ್ಥಳ :</strong> _________________</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            
            <table class="recommendation-table">
                <tr>
                    <td>
                        <div class="recommendation-title">ತಾಲ್ಲೂಕ ಅಧ್ಯಕ್ಷರ ಶಿಫಾರಸ್ಸು</div>
                        <div class="recommendation-subtitle">(ದಿನಾಂಕ 30-09-2026 ರ ಒಳಗಾಗಿ ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರಿಗೆ ನೀಡುವುದು)</div>
                    </td>
                    <td>
                        <div class="recommendation-title">ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರ ಶಿಫಾರಸ್ಸು</div>
                        <div class="recommendation-subtitle">(ದಿನಾಂಕ 05-10-2026 ರ ಒಳಗಾಗಿ ರಾಜ್ಯ ಸ್ಕ್ರೀನಿಂಗ್ ಸಮಿತಿಗೆ ನೀಡುವುದು)</div>
                    </td>
                </tr>
            </table>
            
            <div class="committee-section">
                <div class="committee-title">ರಾಜ್ಯ ಸ್ಕ್ರೀನಿಂಗ್ ಕಮಿಟಿ ಉಪಯೋಗಕ್ಕಾಗಿ</div>
                <div class="committee-text">
                    ವಿದ್ಯಾರ್ಥಿ/ನಿ ಯಾದ ಕುಮಾರ/ರಿ <strong>${studentName}</strong> ......................................................................................................
                    <div class="committee-bullet">
                        • ಇವರ ಮೂಲ ದಾಖಲೆಗಳ ಸಮೇತ ಸಲ್ಲಿಸಿರುವ ಅರ್ಜಿಯನ್ನು ಸಂಘದ ಮಾರ್ಗಸೂಚಿಗಳ ಅನ್ವಯ ಕೂಲಂಕುಷವಾಗಿ ಪರಿಶೀಲಿಸಿ, ಸೂಕ್ತ ಎಂದು ಕಂಡು ಬಂದುದರಿಂದ ಸಂಸ್ಥಾಪನಾ ದಿನಾಚರಣೆ ನಿಮಿತ್ತ ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿ ಜರುಗುವ ಗೌರವ ಸನ್ಮಾನ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ 'ಪುರಸ್ಕರಿಸಲು' ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ.
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(container);
    if (document.fonts) { await document.fonts.ready.catch(() => null); }
    const images = Array.from(container.querySelectorAll('img'));
    await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
    }));

    const opt = {
        margin: [3, 6, 3, 6],
        filename: `Pratibha_Puraskar_${studentName || id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' }
    };

    await window.html2pdf().from(container).set(opt).save();
    document.body.removeChild(container);
};

// Download PDF for Sadhaka Award Admin
window.downloadSadhakaPdfAdmin = async function(id) {
    const list = JSON.parse(localStorage.getItem('admin_sadhaka_submissions')) || [];
    const app = list.find(item => item.id === id);
    if (!app) { alert('Application not found'); return; }
    const fd = app.formData || {};
    
    if (!window.html2pdf) {
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    const container = document.createElement('div');
    container.style.width = '700px';
    container.style.padding = '20px';
    container.style.fontFamily = "'Noto Serif Kannada', Tunga, serif";
    container.style.fontSize = '14px';
    container.style.color = '#000';
    container.innerHTML = `
        <div style="text-align:center; border-bottom:2px solid #990000; padding-bottom:10px; margin-bottom:15px;">
            <h2 style="color:#990000; margin:0;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ ಸಂಘ (ರಿ)</h2>
            <h3 style="color:#333; margin:5px 0 0 0;">ಸಾಧಕ ಪ್ರಶಸ್ತಿ ಅರ್ಜಿ - 2025-26</h3>
            <p style="margin:5px 0 0 0; font-weight:bold; color:#28a745;">ಅರ್ಜಿ ಸಂಖ್ಯೆ: ${id}</p>
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:15px;">
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold; width:40%;">ಸಾಧಕರ ಹೆಸರು:</td><td style="padding:6px; border:1px solid #ccc;">${fd.studentName || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ತಂದೆಯ/ಗಂಡನ ಹೆಸರು:</td><td style="padding:6px; border:1px solid #ccc;">${fd.fatherName || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಪೋಷಕರ ಹೆಸರು:</td><td style="padding:6px; border:1px solid #ccc;">${fd.guardianName || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಉದ್ಯೋಗ ಮತ್ತು ಆದಾಯ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.parentOccupationIncome || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಸಂಪೂರ್ಣ ವಿಳಾಸ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.completeAddress || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಆಧಾರ ಸಂಖ್ಯೆ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.aadhar || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಅಜೀವ ಸದಸ್ಯತ್ವ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.lifeMembership || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಸಾಧನೆಗಳ ವಿವರ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.marksDetails || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.parentMobile || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಬ್ಯಾಂಕ್ ವಿವರ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.bankDetails || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಪಟ್ಟಣ/ನಗರ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.city || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ವರ್ಷ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.year || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ವರ್ಗ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.category || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಕ್ಷೇತ್ರ:</td><td style="padding:6px; border:1px solid #ccc;">${fd.field || '-'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಸ್ಥಿತಿ (Status):</td><td style="padding:6px; border:1px solid #ccc; font-weight:bold; color:#155724;">${fd.status || 'Pending'}</td></tr>
            <tr><td style="padding:6px; border:1px solid #ccc; font-weight:bold;">ಅಡ್ಮಿನ್ ಷರಾ (Remarks):</td><td style="padding:6px; border:1px solid #ccc;">${fd.remarks || '-'}</td></tr>
        </table>
    `;

    document.body.appendChild(container);
    const opt = {
        margin: 8,
        filename: `Sadhaka_Award_${fd.studentName || id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    await window.html2pdf().from(container).set(opt).save();
    document.body.removeChild(container);
};

window.syncAndRefreshData = async function(btn) {
    if (!btn) return;
    const oldHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Syncing...';
    btn.disabled = true;
    
    try {
        await syncSubmissionsFromDatabase();
        initPageModules();
        alert("Data synced successfully from live Database!");
    } catch(err) {
        console.error(err);
        alert("Sync failed: " + err.message);
    } finally {
        btn.innerHTML = oldHtml;
        btn.disabled = false;
    }
};
