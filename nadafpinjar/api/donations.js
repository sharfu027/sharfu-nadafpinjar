// Vercel Serverless Function to handle /api/donations and /api/settings with persistent cloud storage
const STORE_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019fcbd989926f78';

// In-memory cache for ultra-fast responses
let memoryStore = {
    submissions: [],
    settings: {
        pratibhaEnabled: true,
        sadhakaEnabled: true,
        lifemembershipMarqueeEnabled: true,
        highereduMarqueeEnabled: true,
        freeeduMarqueeEnabled: true,
        censusMarqueeEnabled: true
    }
};
let lastSyncTime = 0;

async function syncFromCloud() {
    const now = Date.now();
    // Cache for 3 seconds to optimize performance
    if (memoryStore.submissions.length > 0 && (now - lastSyncTime) < 3000) {
        return memoryStore;
    }
    try {
        const res = await fetch(STORE_URL);
        if (res.ok) {
            const json = await res.json();
            if (json && json.data) {
                memoryStore.submissions = json.data.submissions || [];
                memoryStore.settings = Object.assign({
                    pratibhaEnabled: true,
                    sadhakaEnabled: true,
                    lifemembershipMarqueeEnabled: true,
                    highereduMarqueeEnabled: true,
                    freeeduMarqueeEnabled: true,
                    censusMarqueeEnabled: true
                }, json.data.settings || {});
                lastSyncTime = now;
            }
        }
    } catch (e) {
        console.error('Cloud sync read error:', e);
    }
    return memoryStore;
}

async function saveToCloud() {
    try {
        await fetch(STORE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'nadafpinjar_master_store',
                data: memoryStore
            })
        });
        lastSyncTime = Date.now();
    } catch (e) {
        console.error('Cloud sync write error:', e);
    }
}

export default async function handler(req, res) {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';
    const method = req.method;

    await syncFromCloud();

    // 1. Settings Endpoints (/api/settings)
    if (url.includes('/api/settings') || url.includes('/settings')) {
        if (method === 'GET') {
            return res.status(200).json({
                success: true,
                enabled: memoryStore.settings.pratibhaEnabled !== false,
                sadhakaMarqueeEnabled: memoryStore.settings.sadhakaEnabled !== false,
                lifemembershipMarqueeEnabled: memoryStore.settings.lifemembershipMarqueeEnabled !== false,
                highereduMarqueeEnabled: memoryStore.settings.highereduMarqueeEnabled !== false,
                freeeduMarqueeEnabled: memoryStore.settings.freeeduMarqueeEnabled !== false,
                censusMarqueeEnabled: memoryStore.settings.censusMarqueeEnabled !== false
            });
        }
        if (method === 'POST') {
            const body = req.body || {};
            if (typeof body.enabled !== 'undefined') {
                memoryStore.settings.pratibhaEnabled = !!body.enabled;
            }
            if (typeof body.sadhakaMarqueeEnabled !== 'undefined') {
                memoryStore.settings.sadhakaEnabled = !!body.sadhakaMarqueeEnabled;
            }
            if (typeof body.lifemembershipMarqueeEnabled !== 'undefined') {
                memoryStore.settings.lifemembershipMarqueeEnabled = !!body.lifemembershipMarqueeEnabled;
            }
            if (typeof body.highereduMarqueeEnabled !== 'undefined') {
                memoryStore.settings.highereduMarqueeEnabled = !!body.highereduMarqueeEnabled;
            }
            if (typeof body.freeeduMarqueeEnabled !== 'undefined') {
                memoryStore.settings.freeeduMarqueeEnabled = !!body.freeeduMarqueeEnabled;
            }
            if (typeof body.censusMarqueeEnabled !== 'undefined') {
                memoryStore.settings.censusMarqueeEnabled = !!body.censusMarqueeEnabled;
            }
            await saveToCloud();
            return res.status(200).json({
                success: true,
                enabled: memoryStore.settings.pratibhaEnabled !== false,
                sadhakaMarqueeEnabled: memoryStore.settings.sadhakaEnabled !== false,
                lifemembershipMarqueeEnabled: memoryStore.settings.lifemembershipMarqueeEnabled !== false,
                highereduMarqueeEnabled: memoryStore.settings.highereduMarqueeEnabled !== false,
                freeeduMarqueeEnabled: memoryStore.settings.freeeduMarqueeEnabled !== false,
                censusMarqueeEnabled: memoryStore.settings.censusMarqueeEnabled !== false
            });
        }
    }

    // 2. Status Update Endpoint (/api/donations/update)
    if (url.includes('/update') && method === 'POST') {
        const body = req.body || {};
        const targetId = body.id || body.paymentId || body.dbId;
        if (targetId) {
            let found = false;
            memoryStore.submissions = memoryStore.submissions.map(item => {
                const itemId = item._id || item.paymentId || item.id || (item.formData && item.formData.id);
                if (itemId === targetId || item.paymentId === targetId || item._id === targetId) {
                    found = true;
                    if (item.formData) {
                        item.formData.status = body.status || item.formData.status;
                        item.formData.remarks = body.remarks || item.formData.remarks;
                    }
                    item.status = body.status || item.status;
                    item.remarks = body.remarks || item.remarks;
                }
                return item;
            });
            if (found) {
                await saveToCloud();
            }
        }
        return res.status(200).json({ success: true });
    }

    // 3. DELETE Submissions (/api/donations?dbId=... or DELETE method)
    if (method === 'DELETE') {
        const query = req.query || {};
        const targetId = query.dbId || query.paymentId || query.id;
        if (targetId) {
            memoryStore.submissions = memoryStore.submissions.filter(item => {
                const itemId = item._id || item.paymentId || item.id;
                return itemId !== targetId && item.paymentId !== targetId && item._id !== targetId;
            });
            await saveToCloud();
        }
        return res.status(200).json({ success: true });
    }

    // 4. POST Submission (/api/donations)
    if (method === 'POST') {
        const body = req.body || {};
        if (body && Object.keys(body).length > 0) {
            const newItem = {
                _id: body.paymentId || ('SUB-' + Date.now() + '-' + Math.floor(Math.random()*1000)),
                paymentId: body.paymentId || ('SUB-' + Date.now()),
                formType: body.formType || 'ಸಾಮಾನ್ಯ',
                amount: body.amount || 0,
                date: new Date().toLocaleDateString('en-IN'),
                submittedAt: new Date().toISOString(),
                formData: body.formData || body
            };
            
            // Check for duplicates
            const existingIdx = memoryStore.submissions.findIndex(s => s.paymentId === newItem.paymentId || s._id === newItem._id);
            if (existingIdx >= 0) {
                memoryStore.submissions[existingIdx] = newItem;
            } else {
                memoryStore.submissions.unshift(newItem);
            }
            
            await saveToCloud();
        }
        return res.status(200).json({
            success: true,
            message: 'Submission saved successfully',
            donations: memoryStore.submissions,
            data: memoryStore.submissions
        });
    }

    // 5. GET Submissions (/api/donations)
    return res.status(200).json({
        success: true,
        donations: memoryStore.submissions,
        data: memoryStore.submissions
    });
}
