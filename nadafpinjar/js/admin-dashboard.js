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
        id: "KRNPS-2026-27-55",
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
                { name: "ರಜಿಯಾ ನದಾಫ್", relation: "ಪತ್ನಿ", mobile: "9988776655", aadhar: "111122223333", dob: "12/05/1985", literate: "ಹೌದು" },
                { name: "ಸಲೀಮ್ ನದಾಫ್", relation: "ಮಗ", mobile: "9988776654", aadhar: "444455556666", dob: "05/09/2010", literate: "ಹೌದು" }
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
        const response = await fetch('/api/donations');
        if (!response.ok) return false;
        
        const data = await response.json();
        if (!data.success || !data.donations) return false;
        
        let hasChanges = false;
        let deletedIds = JSON.parse(localStorage.getItem('admin_deleted_ids')) || [];
        
        // Load existing lists
        let freeeduList = JSON.parse(localStorage.getItem('admin_freeedu_submissions')) || [];
        let censusList = JSON.parse(localStorage.getItem('admin_census_submissions')) || [];
        let employeesList = JSON.parse(localStorage.getItem('admin_employees_submissions')) || [];
        let receiptsList = JSON.parse(localStorage.getItem('receipts')) || [];
        
        data.donations.forEach(doc => {
            const formType = doc.formType;
            if (!formType) return;
            
            // Map by formType
            if (formType === "ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ") {
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
                const appNum = doc.paymentId || `KRNPS-2026-27-${parseInt((doc._id || '').slice(-4), 16) % 100 || 55}`;
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
            } else if (formType.includes("ವರ್ಗಾವಣೆ") || formType.includes("ವರ್ಗಾವಣೆಯಾದ")) {
                const receiptId = doc.paymentId || doc._id;
                const existingIdx = receiptsList.findIndex(item => item.id === receiptId);
                if (existingIdx === -1) {
                    const fd = doc.formData || {};
                    let source = "state";
                    if (formType.includes("ಜಿಲ್ಲೆ")) source = "district";
                    if (formType.includes("ತಾಲ್ಲೂಕು") || formType.includes("ತಾಲೂಕು")) source = "taluk";
                    
                    receiptsList.unshift({
                        id: receiptId,
                        date: doc.date ? doc.date.split('T')[0] : new Date().toISOString().split('T')[0],
                        from: source,
                        amount: doc.amount || 0,
                        status: "",
                        mode: fd.paymentMode || "Online",
                        narration: `Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :${fd.donorName || fd.fullName || fd.presidentName || 'Donor'}`,
                        details: {
                            fullName: fd.donorName || fd.fullName || "",
                            address: source === "state" ? (fd.address || fd.donorAddress || "") : (fd.donorAddress || fd.address || ""),
                            mobile: source === "state" ? (fd.mobile || fd.donorMobile || "") : (fd.donorMobile || fd.mobile || ""),
                            village: source === "state" ? (fd.village || fd.donorVillage || "") : (fd.donorVillage || fd.village || ""),
                            taluk: source === "state" ? (fd.taluk || fd.donorTaluk || "") : (fd.donorTaluk || fd.taluk || ""),
                            district: source === "state" ? (fd.district || fd.donorDistrict || "") : (fd.donorDistrict || fd.district || ""),
                            purpose: fd.account || fd.purpose || "ಸಾಮಾನ್ಯ ದೇಣಿಗೆ ಖಾತೆ",
                            purposeDetails: fd.purposeDetails || "",
                            mode: fd.paymentMode || "Online",
                            presidentName: source !== "state" ? (fd.presidentName || "") : "",
                            presidentAddress: source !== "state" ? (fd.presidentAddress || "") : "",
                            presidentMobile: source !== "state" ? (fd.presidentMobile || "") : "",
                            presidentVillage: source !== "state" ? (fd.presidentVillage || "") : "",
                            presidentTaluk: source !== "state" ? (fd.taluk || fd.presidentTaluk || "") : "",
                            presidentDistrict: source !== "state" ? (fd.district || fd.presidentDistrict || "") : ""
                        }
                    });
                    hasChanges = true;
                } else {
                    const existingItem = receiptsList[existingIdx];
                    const fd = doc.formData || {};
                    let source = "state";
                    if (formType.includes("ಜಿಲ್ಲೆ")) source = "district";
                    if (formType.includes("ತಾಲ್ಲೂಕು") || formType.includes("ತಾಲೂಕು")) source = "taluk";
                    
                    let needsHealing = false;
                    if (!existingItem.details) {
                        existingItem.details = {};
                        needsHealing = true;
                    }
                    
                    const targetFullName = fd.donorName || fd.fullName || "";
                    const targetAddress = source === "state" ? (fd.address || fd.donorAddress || "") : (fd.donorAddress || fd.address || "");
                    
                    if (!existingItem.details.fullName && targetFullName) {
                        existingItem.details.fullName = targetFullName;
                        needsHealing = true;
                    }
                    if (!existingItem.details.address && targetAddress) {
                        existingItem.details.address = targetAddress;
                        needsHealing = true;
                    }
                    
                    const targetMobile = source === "state" ? (fd.mobile || fd.donorMobile || "") : (fd.donorMobile || fd.mobile || "");
                    const targetVillage = source === "state" ? (fd.village || fd.donorVillage || "") : (fd.donorVillage || fd.village || "");
                    const targetTaluk = source === "state" ? (fd.taluk || fd.donorTaluk || "") : (fd.donorTaluk || fd.taluk || "");
                    const targetDistrict = source === "state" ? (fd.district || fd.donorDistrict || "") : (fd.donorDistrict || fd.district || "");
                    
                    if (!existingItem.details.mobile && targetMobile) {
                        existingItem.details.mobile = targetMobile;
                        needsHealing = true;
                    }
                    if (!existingItem.details.village && targetVillage) {
                        existingItem.details.village = targetVillage;
                        needsHealing = true;
                    }
                    if (!existingItem.details.taluk && targetTaluk) {
                        existingItem.details.taluk = targetTaluk;
                        needsHealing = true;
                    }
                    if (!existingItem.details.district && targetDistrict) {
                        existingItem.details.district = targetDistrict;
                        needsHealing = true;
                    }
                    
                    if (source !== "state") {
                        const targetPresName = fd.presidentName || "";
                        const targetPresAddress = fd.presidentAddress || "";
                        const targetPresMobile = fd.presidentMobile || "";
                        const targetPresVillage = fd.presidentVillage || "";
                        const targetPresTaluk = fd.taluk || fd.presidentTaluk || "";
                        const targetPresDistrict = fd.district || fd.presidentDistrict || "";
                        
                        if (!existingItem.details.presidentName && targetPresName) {
                            existingItem.details.presidentName = targetPresName;
                            needsHealing = true;
                        }
                        if (!existingItem.details.presidentAddress && targetPresAddress) {
                            existingItem.details.presidentAddress = targetPresAddress;
                            needsHealing = true;
                        }
                        if (!existingItem.details.presidentMobile && targetPresMobile) {
                            existingItem.details.presidentMobile = targetPresMobile;
                            needsHealing = true;
                        }
                        if (!existingItem.details.presidentVillage && targetPresVillage) {
                            existingItem.details.presidentVillage = targetPresVillage;
                            needsHealing = true;
                        }
                        if (!existingItem.details.presidentTaluk && targetPresTaluk) {
                            existingItem.details.presidentTaluk = targetPresTaluk;
                            needsHealing = true;
                        }
                        if (!existingItem.details.presidentDistrict && targetPresDistrict) {
                            existingItem.details.presidentDistrict = targetPresDistrict;
                            needsHealing = true;
                        }
                    }
                    
                    if (existingItem.narration && existingItem.narration.includes("FROM :Donor")) {
                        const targetName = fd.donorName || fd.fullName || fd.presidentName;
                        if (targetName) {
                            existingItem.narration = `Donated Amount Received in Account Number KRATNATAKA STATE PINJAR SANGHA FROM :${targetName}`;
                            needsHealing = true;
                        }
                    }
                    
                    if (needsHealing) {
                        hasChanges = true;
                    }
                }
            }
        });
        
        if (hasChanges) {
            localStorage.setItem('admin_freeedu_submissions', JSON.stringify(freeeduList));
            localStorage.setItem('admin_census_submissions', JSON.stringify(censusList));
            localStorage.setItem('admin_employees_submissions', JSON.stringify(employeesList));
            localStorage.setItem('receipts', JSON.stringify(receiptsList));
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
    } else if (currentPath.includes("admin-census")) {
        loadAdminCensus();
    } else if (currentPath.includes("admin-employees")) {
        loadAdminEmployees();
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
    <base href="${window.location.origin}/">
    <title>Donation Receipt - ${found.id}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
        html, body {
            height: auto;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        body {
            font-family: 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
        }
        .receipt-container {
            max-width: 100%;
            height: auto;
            margin: 0;
            border: 4px double ${themeColor};
            padding: 6px;
            background: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .header-box {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid #b30000;
            background-color: #fffdeb;
            margin-bottom: 4px;
        }
        .header-photo-cell {
            width: 90px;
            text-align: center;
            padding: 3px 3px 3px 20px;
            vertical-align: middle;
        }
        .patron-photo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
        }
        .header-logo-cell {
            width: 90px;
            text-align: center;
            padding: 3px 20px 3px 3px;
            vertical-align: middle;
        }
        .header-logo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
        }
        .header-text-cell {
            text-align: center;
            vertical-align: middle;
            padding: 3px 0;
            color: #b30000;
        }
        .kannada-title {
            font-size: 19px;
            font-weight: bold;
            margin-bottom: 1px;
        }
        .reg-no {
            font-size: 8.5px;
            font-weight: bold;
            margin-bottom: 2px;
            color: #444;
        }
        .english-title {
            font-size: 9px;
            font-weight: bold;
            letter-spacing: 0.2px;
            margin-bottom: 1px;
        }
        .office-address, .office-location {
            font-size: 8.5px;
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
            padding: 3px 5px;
            font-size: 9px;
            vertical-align: top;
            color: #1e293b;
            line-height: 1.2;
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
            font-weight: bold;
        }
        .payment-line {
            font-size: 9.5px;
        }
        .seal-sig-wrapper {
            margin-top: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4px;
        }
        .seal-img {
            height: 45px;
            width: auto;
            border-radius: 50%;
            border: 1px solid #5A1F75;
        }
        .sig-img {
            height: 25px;
            width: auto;
            margin-bottom: 2px;
        }
        @media print {
            @page {
                size: A5 landscape;
                margin: 1.5mm 4mm 1.5mm 4mm;
            }
            html, body {
                height: auto;
            }
            body {
                padding: 0;
            }
            .receipt-container {
                max-width: 100%;
                height: auto;
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
                <td class="grid-cell" colspan="2" style="border-right: none; border-bottom: none; vertical-align: top; padding-bottom: 10px;">
                    <div class="payment-line" style="margin-top: 3px;">
                        <span class="field-label">ಪಾವತಿ ರಕಮು ರೂ:</span>
                        <span class="field-value" style="font-size: 11px; font-weight: bold; color: ${themeColor};">${formatCurrencyRaw(found.amount)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 4px;">
                        <span class="field-label">ರಶೀದಿ ದಿನಾಂಕ:</span>
                        <span class="field-value">${formatDateDashes(found.date)}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 4px;">
                        <span class="field-label">ಯಾವ ಖಾತೆಗೆ:</span>
                        <span class="field-value">${details.purpose || found.from}</span>
                    </div>
                    <div class="payment-line" style="margin-top: 4px;">
                        <span class="field-label">ಯೋಜನೆ ಉದ್ದೇಶ:</span>
                        <span class="field-value">${details.purposeDetails || "N/A"}</span>
                    </div>
                    <div style="margin-top: 15px; text-align: left; padding-left: 10px;">
                        <img src="images/seal.jpg" class="seal-img">
                    </div>
                </td>
                <td class="grid-cell" style="border-left: none; border-bottom: none; vertical-align: top; padding-bottom: 10px;">
                    <div class="payment-line right-align" style="margin-top: 3px; margin-bottom: 15px;">
                        <span class="field-label">ಪಾವತಿ ಮೋಡ್:</span>
                        <span class="field-value">${details.mode || found.mode}</span>
                    </div>
                    <div style="text-align: center; width: 140px; margin-left: auto;">
                        <div style="font-size: 8px; font-weight: bold; color: ${themeColor}; margin-bottom: 2px;">ಅದಾಬ್ ಗಳೊಂದಿಗೆ ಸ್ವೀಕರಿಸಿದೆ</div>
                        <img src="images/sig.jpg" class="sig-img">
                        <div style="font-size: 8px; font-weight: bold; line-height: 1.2; color: #000;">ಶಹಾಬುದ್ದೀನ್ ಸಾಬ್ ನೂರಭಾಷ</div>
                        <div style="font-size: 7px; line-height: 1.2; color: #555;">ರಾಜ್ಯ ಕೋಶಾಧಿಕಾರಿ</div>
                        <div style="font-size: 7px; line-height: 1.2; color: #555;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್ ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</div>
                    </div>
                </td>
            </tr>

            <tr class="bottom-serial-row">
                <td class="grid-cell" colspan="2" style="border-top: 2px solid ${themeColor}; padding-top: 4px;">
                    <span class="field-label" style="font-size: 9.5px;">ರಶೀದಿಗಳ ಕ್ರಮ ಸಂಖ್ಯೆಗಳು :</span>
                    <span class="field-value" style="font-size: 9.5px; color: ${themeColor};">KRNPS-2026-27-${serialNoVal}</span>
                </td>
                <td class="grid-cell right-align" style="border-top: 2px solid ${themeColor}; padding-top: 4px; font-weight: bold; padding-right: 20px; color: ${themeColor}; font-size: 9.5px;">
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
    <base href="${window.location.origin}/">
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
        }
        .receipt-container {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
            border: 2px double #b30000;
            padding: 5px;
            background: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .header-table td {
            padding: 2px;
            vertical-align: middle;
        }
        .header-photo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-left: 20px;
        }
        .header-logo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-right: 20px;
        }
        .header-text {
            text-align: center;
        }
        .header-text h1 {
            color: #b30000;
            font-size: 19px;
            margin: 0 0 2px 0;
            font-weight: bold;
        }
        .header-text p {
            margin: 1px 0;
            font-size: 8px;
            color: #444;
            font-weight: bold;
        }
        .header-text .reg-no {
            font-size: 8.5px;
            color: #000;
        }
        .header-text .en-title {
            font-size: 9px;
            color: #b30000;
            margin-top: 1px;
        }
        .title-banner {
            border-top: 1.5px solid #b30000;
            border-bottom: 1.5px solid #b30000;
            padding: 3px;
            margin: 4px 0;
            background: #fffcf5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            font-size: 9px;
            color: #b30000;
        }
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .grid-table td {
            border: 1px solid #b30000;
            padding: 3px 5px;
            font-size: 11px;
            vertical-align: middle;
            line-height: 1.2;
        }
        .grid-label {
            background: #fffcf5;
            color: #b30000;
            font-weight: bold;
            width: 25%;
        }
        .grid-value {
            color: #000;
            width: 25%;
            font-weight: bold;
        }
        .recommend-text {
            text-align: right;
            font-size: 11px;
            font-weight: bold;
            color: #b30000;
            border-top: 1px dashed #b30000;
            padding: 4px 15px 4px 0;
            margin-top: 4px;
        }
        .approval-section {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            font-size: 11px;
        }
        .sig-col {
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .sig-item {
            border-bottom: 1px dashed #ccc;
            padding-bottom: 2px;
        }
        .sig-space {
            height: 20px;
        }
        .sig-label {
            font-weight: bold;
            color: #b30000;
        }
        .official-col {
            width: 55%;
            border-left: 1.5px solid #b30000;
            padding-left: 12px;
        }
        .official-table {
            width: 100%;
            border-collapse: collapse;
        }
        .official-row {
            height: 18px;
        }
        .official-title {
            width: 45%;
            font-weight: bold;
            color: #b30000;
            vertical-align: middle;
            font-size: 11px;
        }
        .official-check {
            width: 10%;
            text-align: left;
            vertical-align: middle;
        }
        .official-box {
            border: 1.5px solid #b30000;
            width: 11px;
            height: 11px;
            display: inline-block;
        }
        .official-empty-space {
            width: 45%;
        }
        @media print {
            @page {
                size: A5 landscape;
                margin: 1.5mm 4mm 1.5mm 4mm;
            }
            html, body {
                height: auto;
            }
            body {
                padding: 0;
                margin: 0;
            }
            .receipt-container {
                border: 2px double #b30000;
                max-width: 100%;
                height: auto;
                padding: 5px;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-table">
            <tr>
                <td style="width: 15%; text-align: left;">
                    <img src="images/president.png" class="header-photo" alt="President" onerror="this.src='images/president.jpeg'">
                </td>
                <td style="width: 70%;" class="header-text">
                    <h1>ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</h1>
                    <p class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಓ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993-94</p>
                    <p class="en-title">KARNATAKA RAJYA NADAF / PINJAR SANGHA &reg;</p>
                    <p>ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</p>
                    <p>ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ-577502</p>
                </td>
                <td style="width: 15%; text-align: right;">
                    <img src="images/logo-786.png" class="header-logo" alt="Logo">
                </td>
            </tr>
        </table>
        
        <div class="title-banner">
            <div>ಅರ್ಜಿ ಸಂಖ್ಯೆ: ${appNumber}</div>
            <div style="font-size: 15px;">ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯಕ್ಕಾಗಿ ಅರ್ಜಿ 2026-27</div>
            <div>ಅರ್ಜಿ ದಿನಾಂಕ : ${found.date}</div>
        </div>

        <table class="grid-table">
            <tr>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</td>
                <td class="grid-value">${data.studentName || '-'}</td>
                <td class="grid-label">ತಂದೆಯ/ಪಾಲಕರ ಹೆಸರು :</td>
                <td class="grid-value">${data.fatherName || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ತಾಯಿಯ ಹೆಸರು</td>
                <td class="grid-value">${data.motherName || '-'}</td>
                <td class="grid-label">ವಿಳಾಸ :</td>
                <td class="grid-value">${data.address || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ನಗರಿ/ಗ್ರಾಮ</td>
                <td class="grid-value">${data.village || '-'}</td>
                <td class="grid-label">ಜಿಲ್ಲೆ :</td>
                <td class="grid-value">${data.district || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಉದ್ಯೋಗ</td>
                <td class="grid-value">${data.occupation || '-'}</td>
                <td class="grid-label">ತಾಲೂಕು :</td>
                <td class="grid-value">${data.taluk || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಆಧಾರ್ ನಂ</td>
                <td class="grid-value">${data.aadhar || '-'}</td>
                <td class="grid-label">ಸಂಘದ ಸದಸ್ಯತ್ವ ಅಂತೋದಯ/ಬಿಪಿಎಲ್ :</td>
                <td class="grid-value">${data.membership || '-'} / ${data.rationType || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಮನೆ</td>
                <td class="grid-value">${data.housingInfo || '-'} / ${data.houseType || '-'}</td>
                <td class="grid-label">ಜಮೀನು :</td>
                <td class="grid-value">${data.landInfo || '0'} ಎಕರೆ - ${data.gunte || '0'} ಗುಂಟೆ</td>
            </tr>
            <tr>
                <td class="grid-label">ಅಂದಾಜು ಆದಾಯ</td>
                <td class="grid-value">${formatIncome(data.income)}</td>
                <td class="grid-label">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</td>
                <td class="grid-value">${data.mobile || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ವಿದ್ಯಾಭ್ಯಾಸ ಶಾಲೆ/ಕಾಲೇಜು ಮಾಡುತ್ತಿರುವ</td>
                <td class="grid-value">${data.currentSchool || '-'}</td>
                <td class="grid-label">ಹಿಂದಿನ ತರಗತಿಯಲ್ಲಿ ಪಡೆದ ಅಂಕಗಳು</td>
                <td class="grid-value">${data.previousMarks || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಪ್ರವೇಶ ಬಯಸುವ ತರಗತಿ</td>
                <td class="grid-value">${data.joiningClass || '-'}</td>
                <td class="grid-label">ತರಗತಿಯ ವಿಷಯಗಳು :</td>
                <td class="grid-value">${data.classSubjects || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಪ್ರವೇಶ ಬಯಸುವ ಕೋಚಿಂಗ್:</td>
                <td class="grid-value" colspan="3">${data.coaching || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಹೆಸರು</td>
                <td class="grid-value">${data.bankName || '-'}</td>
                <td class="grid-label">ಶಾಖೆಯ ಹೆಸರು</td>
                <td class="grid-value">${data.branchName || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">IFSC ಕೋಡ್</td>
                <td class="grid-value">${data.ifsc || '-'}</td>
                <td class="grid-label">ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆ :</td>
                <td class="grid-value">${data.bankAccount || '-'}</td>
            </tr>
        </table>

        <div class="recommend-text">
            ಶಿಫಾರಸ್ಸು ಮಾಡಲಾಗಿದೆ.
        </div>

        <div class="approval-section">
            <div class="sig-col">
                <div class="sig-item" style="margin-bottom: 25px;">
                    <div class="sig-space"></div>
                    <span class="sig-label">ವಿದ್ಯಾರ್ಥಿಯ ಸಹಿ</span>
                </div>
                <div class="sig-item">
                    <div class="sig-space"></div>
                    <span class="sig-label">ತಂದೆಯ/ ಪಾಲಕರ ಸಹಿ</span>
                </div>
            </div>

            <div class="official-col">
                <table class="official-table">
                    <tr class="official-row">
                        <td class="official-title">ತಾಲೂಕು ಅಧ್ಯಕ್ಷರು</td>
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-empty-space"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-title">ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು</td>
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-empty-space"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-title">ವಿಭಾಗೀಯ ಉಪಾಧ್ಯಕ್ಷರು</td>
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-empty-space"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-title">ರಾಜ್ಯ ಶಿಕ್ಷಣ ಸಮಿತಿ</td>
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-empty-space"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-title">ರಾಜ್ಯ ಘಟಕ</td>
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-empty-space"></td>
                    </tr>
                </table>
            </div>
        </div>
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
                        </tr>
                    `;
                });
            } else {
                membersTableContent = `<tr><td colspan="7" style="text-align: center; color: #999;">No other family members.</td></tr>`;
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
    window.addMemberRow = function(memberData = {}) {
        const container = document.getElementById("editMembersContainer");
        const div = document.createElement("div");
        div.className = "member-edit-row";
        const uniqueId = 'mem-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        div.id = uniqueId;
        
        div.innerHTML = `
            <div>
                <label>ಹೆಸರು (Name)</label>
                <input type="text" class="mem-name" value="${memberData.name || ''}" placeholder="Name">
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
                <label>ಸಾಕ್ಷರಹಾ (Literate?)</label>
                <select class="mem-literate">
                    <option value="ಹೌದು" ${memberData.literate === 'ಹೌದು' ? 'selected' : ''}>ಹೌದು (Yes)</option>
                    <option value="ಇಲ್ಲ" ${memberData.literate === 'ಇಲ್ಲ' ? 'selected' : ''}>ಇಲ್ಲ (No)</option>
                </select>
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
                membersList.push({
                    name: row.querySelector(".mem-name").value,
                    relation: row.querySelector(".mem-relation").value,
                    mobile: row.querySelector(".mem-mobile").value,
                    aadhar: row.querySelector(".mem-aadhar").value,
                    dob: row.querySelector(".mem-dob").value,
                    literate: row.querySelector(".mem-literate").value
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

    // Download PDF handler
    window.downloadCensusPdf = function(id) {
        const found = submissions.find(app => app.id === id);
        if (!found) return;

        const data = found.formData || {};
        const appNumber = found.id;

        let membersRows = '';
        if (data.members && data.members.length > 0) {
            data.members.forEach((m, idx) => {
                membersRows += `
                    <tr>
                        <td style="text-align: center; border: 1px solid #b30000; padding: 6px;">${idx + 1}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.name || '-'}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.relation || '-'}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.mobile || '-'}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.aadhar || '-'}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.dob || '-'}</td>
                        <td style="border: 1px solid #b30000; padding: 6px;">${m.literate || '-'}</td>
                    </tr>
                `;
            });
        } else {
            membersRows = '<tr><td colspan="7" style="text-align: center; border: 1px solid #b30000; padding: 10px;">ಯಾವುದೇ ಸದಸ್ಯರ ವಿವರಗಳಿಲ್ಲ</td></tr>';
        }

        const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <base href="${window.location.origin}/">
    <title>ಜನಗಣತಿ (Census) - ರಶೀದಿ</title>
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
        }
        .receipt-container {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
            border: 2px double #b30000;
            padding: 4px;
            background: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 3px;
        }
        .header-table td {
            padding: 1.5px;
            vertical-align: middle;
        }
        .header-photo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-left: 20px;
        }
        .header-logo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-right: 20px;
        }
        .header-text {
            text-align: center;
        }
        .header-text h1 {
            color: #b30000;
            font-size: 19px;
            margin: 0 0 1px 0;
            font-weight: bold;
        }
        .header-text p {
            margin: 0.5px 0;
            font-size: 8px;
            color: #444;
            font-weight: bold;
        }
        .header-text .reg-no {
            font-size: 8px;
            color: #000;
        }
        .header-text .en-title {
            font-size: 8.5px;
            color: #b30000;
            margin-top: 1px;
        }
        .title-banner {
            border-top: 1.5px solid #b30000;
            border-bottom: 1.5px solid #b30000;
            padding: 3px;
            margin: 4px 0;
            background: #fffcf5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            font-size: 8.5px;
            color: #b30000;
        }
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .grid-table td {
            border: 1px solid #b30000;
            padding: 2.5px 4px;
            font-size: 8px;
            vertical-align: middle;
            line-height: 1.2;
        }
        .grid-label {
            background: #fffcf5;
            color: #b30000;
            font-weight: bold;
            width: 25%;
        }
        .grid-value {
            color: #000;
            width: 25%;
            font-weight: bold;
        }
        .members-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
            font-size: 7.5px;
        }
        .members-table th {
            border: 1px solid #b30000;
            background: #fffcf5;
            color: #b30000;
            padding: 2px 3px;
            font-weight: bold;
        }
        .members-table td {
            border: 1px solid #b30000;
            padding: 2px 3px;
        }
        .recommend-text {
            text-align: center;
            font-size: 8px;
            font-weight: bold;
            color: #b30000;
            border-top: 1px dashed #b30000;
            padding: 2.5px 0;
            margin-top: 3px;
        }
        .approval-section {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            font-size: 8px;
        }
        .sig-col {
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .sig-item {
            border-bottom: 1px dashed #ccc;
            padding-bottom: 2px;
        }
        .sig-space {
            height: 10px;
        }
        .sig-label {
            font-weight: bold;
            color: #b30000;
        }
        .official-col {
            width: 55%;
            border-left: 1.5px solid #b30000;
            padding-left: 8px;
        }
        .official-table {
            width: 100%;
            border-collapse: collapse;
        }
        .official-row {
            height: 12px;
        }
        .official-check {
            width: 10%;
            text-align: center;
            vertical-align: middle;
        }
        .official-box {
            border: 1.5px solid #b30000;
            width: 8px;
            height: 8px;
            display: inline-block;
        }
        .official-title {
            width: 40%;
            font-weight: bold;
            color: #b30000;
            padding-left: 4px;
            vertical-align: middle;
            font-size: 8px;
        }
        .official-sig-line {
            width: 50%;
            border-bottom: 1px dashed #b30000;
        }
        @media print {
            @page {
                size: A5 landscape;
                margin: 1.5mm 4mm 1.5mm 4mm;
            }
            html, body {
                height: auto;
            }
            body {
                padding: 0;
                margin: 0;
            }
            .receipt-container {
                border: 2px double #b30000;
                max-width: 100%;
                height: auto;
                padding: 4px;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-table">
            <tr>
                <td style="width: 15%; text-align: left;">
                    <img src="images/president.png" class="header-photo" alt="President" onerror="this.src='images/president.jpeg'">
                </td>
                <td style="width: 70%;" class="header-text">
                    <h1>ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</h1>
                    <p class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಓ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993-94</p>
                    <p class="en-title">KARNATAKA RAJYA NADAF / PINJAR SANGHA &reg;</p>
                    <p>ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</p>
                    <p>ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ-577502</p>
                </td>
                <td style="width: 15%; text-align: right;">
                    <img src="images/logo-786.png" class="header-logo" alt="Logo">
                </td>
            </tr>
        </table>
        
        <div class="title-banner">
            <div>ಅರ್ಜಿ ಸಂಖ್ಯೆ: ${appNumber}</div>
            <div style="font-size: 15px;">ಜನಗಣತಿ (CENSUS) ಅರ್ಜಿ 2026-27</div>
            <div>ಅರ್ಜಿ ದಿನಾಂಕ : ${found.date}</div>
        </div>

        <h3 style="color: #b30000; font-size: 14px; margin: 10px 0 5px 0; border-bottom: 1px solid #b30000; padding-bottom: 3px;">I. कुटुंबದ ವಿವರ (Family Details)</h3>
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
                <td class="grid-label">ಜಿಲ್ಲೆ :</td>
                <td class="grid-value">${data.district || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ತಾಲೂಕು</td>
                <td class="grid-value">${data.taluk || '-'}</td>
                <td class="grid-label">ಆಧಾರ್ ಸಂಖ್ಯೆ :</td>
                <td class="grid-value">${data.headAadhar || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ವಾರ್ಡ್ ಸಂಖ್ಯೆ</td>
                <td class="grid-value">${data.ward || '-'}</td>
                <td class="grid-label">ಧರ್ಮ / ಜಾತಿ :</td>
                <td class="grid-value">${data.religion || '-'} / ${data.caste || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಮನೆಯ ಪ್ರಕಾರ</td>
                <td class="grid-value">${data.houseType || '-'}</td>
                <td class="grid-label">ಜಮೀನು :</td>
                <td class="grid-value">${data.landAcres || '0'} ಎಕರೆ - ${data.landGunta || '0'} ಗುಂಟೆ</td>
            </tr>
            <tr>
                <td class="grid-label">ರೂಪಿಸುವ ಪ್ರಕಾರ</td>
                <td class="grid-value" colspan="3">${data.formingType || '-'}</td>
            </tr>
        </table>

        <h3 style="color: #b30000; font-size: 14px; margin: 10px 0 5px 0; border-bottom: 1px solid #b30000; padding-bottom: 3px;">II. ಸದಸ್ಯರ ವಿವರಗಳು (Family Members)</h3>
        <table class="members-table">
            <thead>
                <tr>
                    <th style="width: 5%;">Sl No.</th>
                    <th style="width: 25%;">ಸದಸ್ಯರ ಹೆಸರು</th>
                    <th style="width: 15%;">ಸಂಬಂಧ</th>
                    <th style="width: 15%;">ಮೊಬೈಲ್</th>
                    <th style="width: 15%;">ಆಧಾರ್</th>
                    <th style="width: 13%;">ಹುಟ್ಟಿದ ದಿನಾಂಕ</th>
                    <th style="width: 12%;">ಸಾಕ್ಷರಹಾ</th>
                </tr>
            </thead>
            <tbody>
                ${membersRows}
            </tbody>
        </table>

        <div class="recommend-text">
            ಸಂಬಂಧಪಟ್ಟ ಪಾಲಕರು/ಘಟಕದಿಂದ ದಿನಾಂಕ:___________ ಮಾಹಿತಿಪಡೆದು ಅರ್ಜಿ ಪರಿಶೀಲಿಸಿ ಶಿಫಾರಸ್ಸು ಮಾಡಲಾಗಿದೆ.
        </div>

        <div class="approval-section">
            <div class="sig-col">
                <div class="sig-item" style="margin-bottom: 6px;">
                    <div class="sig-space"></div>
                    <span class="sig-label">ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಸಹಿ</span>
                </div>
                <div class="sig-item">
                    <div class="sig-space"></div>
                    <span class="sig-label">ಅರ್ಜಿ ಸ್ವೀಕರಿಸಿದವರ ಸಹಿ</span>
                </div>
            </div>

            <div class="official-col">
                <table class="official-table">
                    <tr class="official-row">
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-title">ತಾಲೂಕು ಅಧ್ಯಕ್ಷರು</td>
                        <td class="official-sig-line"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-title">ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು</td>
                        <td class="official-sig-line"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-title">ವಿಭಾಗೀಯ ಉಪಾಧ್ಯಕ್ಷರು</td>
                        <td class="official-sig-line"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-title">ರಾಜ್ಯ ಶಿಕ್ಷಣ ಸಮಿತಿ</td>
                        <td class="official-sig-line"></td>
                    </tr>
                    <tr class="official-row">
                        <td class="official-check"><span class="official-box"></span></td>
                        <td class="official-title">ರಾಜ್ಯ ಘಟಕ</td>
                        <td class="official-sig-line"></td>
                    </tr>
                </table>
            </div>
        </div>
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
}

// -------------------------------------------------------------
// 10. Admin Employees Module
// -------------------------------------------------------------
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

        const formattedDob = data.dob ? new Date(data.dob).toLocaleDateString('en-GB') : '-';
        const formattedRetirement = data.isRetired === 'ಹೌದು' && data.retirementDate ? new Date(data.retirementDate).toLocaleDateString('en-GB') : 'ಇಲ್ಲ (No)';

        const printHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <base href="${window.location.origin}/">
    <title>ನೌಕರರ ನೋಂದಣಿ ಪತ್ರ - ರಶೀದಿ</title>
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #fff;
            color: #333;
        }
        .receipt-container {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
            border: 2px double #b30000;
            padding: 5px;
            background: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .header-table td {
            padding: 2px;
            vertical-align: middle;
        }
        .header-photo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-left: 20px;
        }
        .header-logo {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1.5px solid #b30000;
            object-fit: cover;
            margin-right: 20px;
        }
        .header-text {
            text-align: center;
        }
        .header-text h1 {
            color: #b30000;
            font-size: 19px;
            margin: 0 0 2px 0;
            font-weight: bold;
        }
        .header-text p {
            margin: 1px 0;
            font-size: 8px;
            color: #444;
            font-weight: bold;
        }
        .header-text .reg-no {
            font-size: 8.5px;
            color: #000;
        }
        .header-text .en-title {
            font-size: 9px;
            color: #b30000;
            margin-top: 1px;
        }
        .title-banner {
            border-top: 1.5px solid #b30000;
            border-bottom: 1.5px solid #b30000;
            padding: 3px;
            margin: 4px 0;
            background: #fffcf5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            font-size: 9px;
            color: #b30000;
        }
        .grid-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
        }
        .grid-table td {
            border: 1px solid #b30000;
            padding: 2.5px 4px;
            font-size: 8px;
            vertical-align: middle;
            line-height: 1.2;
        }
        .grid-label {
            background: #fffcf5;
            color: #b30000;
            font-weight: bold;
            width: 25%;
        }
        .grid-value {
            color: #000;
            width: 25%;
            font-weight: bold;
        }
        .recommend-text {
            text-align: center;
            font-size: 8.5px;
            font-weight: bold;
            color: #b30000;
            border-top: 1px dashed #b30000;
            padding: 3px 0;
            margin-top: 4px;
        }
        .approval-section {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            font-size: 8.5px;
        }
        .sig-col {
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .sig-item {
            border-bottom: 1px dashed #ccc;
            padding-bottom: 2px;
        }
        .sig-space {
            height: 10px;
        }
        .sig-label {
            font-weight: bold;
            color: #b30000;
        }
        .official-col {
            width: 55%;
            border-left: 1.5px solid #b30000;
            padding-left: 8px;
        }
        .official-table {
            width: 100%;
            border-collapse: collapse;
        }
        .official-row {
            height: 13px;
        }
        .official-check {
            width: 10%;
            text-align: center;
            vertical-align: middle;
        }
        .official-box {
            border: 1.5px solid #b30000;
            width: 9px;
            height: 9px;
            display: inline-block;
        }
        .official-title {
            width: 40%;
            font-weight: bold;
            color: #b30000;
            padding-left: 4px;
            vertical-align: middle;
            font-size: 8px;
        }
        .official-sig-line {
            width: 50%;
            border-bottom: 1px dashed #b30000;
        }
        @media print {
            @page {
                size: A5 landscape;
                margin: 1.5mm 4mm 1.5mm 4mm;
            }
            html, body {
                height: auto;
            }
            body {
                padding: 0;
                margin: 0;
            }
            .receipt-container {
                border: 2px double #b30000;
                max-width: 100%;
                height: auto;
                padding: 10px;
                box-sizing: border-box;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <table class="header-table">
            <tr>
                <td style="width: 15%; text-align: left;">
                    <img src="images/president.png" class="header-photo" alt="President" onerror="this.src='images/president.jpeg'">
                </td>
                <td style="width: 70%;" class="header-text">
                    <h1>ಕರ್ನಾಟಕ ರಾಜ್ಯ ನದಾಫ್/ಪಿಂಜಾರ್ ಸಂಘ (ರಿ)</h1>
                    <p class="reg-no">ನೋ. ಸಂ. : 151/ಎಸ್ ಓ ಆರ್/ಎಸ್ ಎಂ ಜಿ/1993-94</p>
                    <p class="en-title">KARNATAKA RAJYA NADAF / PINJAR SANGHA &reg;</p>
                    <p>ಆಡಳಿತ ಕಚೇರಿ : ವಿಶ್ವಮಾನವ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ವಿದ್ಯಾ ಸಂಸ್ಥೆ ಆವರಣ</p>
                    <p>ಸಿಬಾರ-ಗುತ್ತಿನಾಡು, ಚಿತ್ರದುರ್ಗ-577502</p>
                </td>
                <td style="width: 15%; text-align: right;">
                    <img src="images/logo-786.png" class="header-logo" alt="Logo">
                </td>
            </tr>
        </table>
        
        <div class="title-banner">
            <div>ನೋಂದಣಿ ಸಂಖ್ಯೆ: ${appNumber}</div>
            <div style="font-size: 15px;">${data.employeeType || 'ನೌಕರರ ಮಾಹಿತಿ 2026'}</div>
            <div>ದಿನಾಂಕ : ${found.date}</div>
        </div>

        <table class="grid-table">
            <tr>
                <td class="grid-label">ನೌಕರರ ಹೆಸರು</td>
                <td class="grid-value">${data.employeeName || '-'}</td>
                <td class="grid-label">ತಂದೆಯ ಹೆಸರು :</td>
                <td class="grid-value">${data.fatherName || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</td>
                <td class="grid-value">${data.contactNumber || '-'}</td>
                <td class="grid-label">ವಿದ್ಯಾರ್ಹತೆ :</td>
                <td class="grid-value">${data.qualification || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಹುಟ್ಟಿದ ದಿನಾಂಕ</td>
                <td class="grid-value">${formattedDob}</td>
                <td class="grid-label">ವಯಸ್ಸು :</td>
                <td class="grid-value">${data.age || '-'}</td>
            </tr>
            <tr>
                <td class="grid-label">ಇಲಾಖೆಯ ಹೆಸರು</td>
                <td class="grid-value">${data.departmentName || '-'}</td>
                <td class="grid-label">ಹುದ್ದೆಯ ಹೆಸರು :</td>
                <td class="grid-value">${data.designation || '-'}</td>
            </tr>
            ${data.employeeType === 'ನಿವೃತ್ತ ನೌಕರರ ಮಾಹಿತಿ' ? `
            <tr>
                <td class="grid-label">ನಿವೃತ್ತಿ ದಿನಾಂಕ</td>
                <td class="grid-value" colspan="3">${formattedRetirement}</td>
            </tr>
            ` : ''}
            <tr>
                <td class="grid-label">ಕಾಯಂ ವಿಳಾಸ</td>
                <td class="grid-value" colspan="3">${data.permanentAddress || '-'}</td>
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
}
