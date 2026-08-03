/**
 * Admin Contact Inquiries Controller
 * Manages messages stored in localStorage('contact_messages')
 */

(function() {
    const STORAGE_KEY = 'contact_messages';

    // Default sample messages if empty
    const SAMPLE_MESSAGES = [
        {
            id: 'MSG_101',
            date: '2026-08-01, 11:30 AM',
            fullName: 'ಮಹಮ್ಮದ್ ಸಾಬ್ (Mohammad Saab)',
            email: 'mohammad.saab@gmail.com',
            mobile: '9876543210',
            message: 'ನಮಸ್ಕಾರ, ಉನ್ನತ ಶಿಕ್ಷಣ ಸಹಾಯಧನ ಕೋರಿಕೆಯ ಅರ್ಜಿಯ ಫಲಿತಾಂಶ ದಿನಾಂಕ ತಿಳಿದುಕೊಳ್ಳಲು ಇಚ್ಛಿಸುತ್ತೇನೆ. (Inquiring about higher education scholarship results).',
            status: 'Pending'
        },
        {
            id: 'MSG_102',
            date: '2026-07-28, 04:15 PM',
            fullName: 'ಅಬ್ದುಲ್ ರಹಿಮಾನ್ (Abdul Rahim)',
            email: 'abdul.rahim@gmail.com',
            mobile: '9123456789',
            message: 'ನಮ್ಮ ತಾಲೂಕು ಘಟಕದ ನೂತನ ಸದಸ್ಯರ ನೋಂದಣಿ ವಿವರಗಳನ್ನು ಕಳುಹಿಸುವುದು ಹೇಗೆ? ಮಾಹಿತಿ ನೀಡಿ. (How to submit new taluk unit member list?).',
            status: 'Resolved'
        }
    ];

    function getMessages() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MESSAGES));
                return SAMPLE_MESSAGES;
            }
            return JSON.parse(raw);
        } catch (e) {
            return SAMPLE_MESSAGES;
        }
    }

    function saveMessages(msgs) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
        renderTable();
    }

    let currentFilter = 'all';
    let activeModalMsgId = null;

    document.addEventListener('DOMContentLoaded', function() {
        renderTable();
    });

    function renderTable() {
        const tbody = document.getElementById('messagesTbody');
        if (!tbody) return;

        const messages = getMessages();
        
        // Update stats
        const total = messages.length;
        const pending = messages.filter(m => m.status === 'Pending').length;
        const resolved = messages.filter(m => m.status === 'Resolved').length;

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statPending').textContent = pending;
        document.getElementById('statResolved').textContent = resolved;

        let filtered = messages;
        if (currentFilter !== 'all') {
            filtered = messages.filter(m => m.status === currentFilter);
        }

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #94a3b8; padding: 30px;">ಯಾವುದೇ ವಿಚಾರಣೆಗಳು ಲಭ್ಯವಿಲ್ಲ (No contact messages found).</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map((msg, index) => {
            const isPending = (msg.status || 'Pending') === 'Pending';
            const badgeClass = isPending ? 'badge-pending' : 'badge-resolved';
            const statusText = isPending ? 'ಬಾಕಿ (Pending)' : 'ಪರಿಹರಿಸಲಾಗಿದೆ (Resolved)';
            const toggleText = isPending ? '<i class="fa fa-check"></i> Resolve' : '<i class="fa fa-undo"></i> Reopen';

            return `
                <tr>
                    <td style="text-align: center; font-weight: bold;">${index + 1}</td>
                    <td style="white-space: nowrap; font-size: 13px;">${escapeHTML(msg.date)}</td>
                    <td style="font-weight: 600; color: #1e293b;">${escapeHTML(msg.fullName)}</td>
                    <td><a href="mailto:${escapeHTML(msg.email)}" style="color: #3b82f6;">${escapeHTML(msg.email)}</a></td>
                    <td style="white-space: nowrap;"><a href="tel:${escapeHTML(msg.mobile)}" style="color: #3b82f6;">${escapeHTML(msg.mobile)}</a></td>
                    <td class="message-cell" title="${escapeHTML(msg.message)}">${escapeHTML(msg.message)}</td>
                    <td><span class="badge-status ${badgeClass}">${statusText}</span></td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-view-msg" onclick="viewMessageModal('${msg.id}')"><i class="fa fa-eye"></i> View</button>
                        <button class="btn-toggle-status" onclick="toggleMessageStatus('${msg.id}')">${toggleText}</button>
                        <button class="btn-delete-msg" onclick="deleteMessage('${msg.id}')"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    window.filterMessages = function(type, btn) {
        currentFilter = type;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        renderTable();
    };

    window.viewMessageModal = function(id) {
        const msgs = getMessages();
        const msg = msgs.find(m => m.id === id);
        if (!msg) return;

        activeModalMsgId = id;
        document.getElementById('modalName').textContent = msg.fullName || '';
        document.getElementById('modalDate').textContent = msg.date || '';
        document.getElementById('modalMobile').textContent = msg.mobile || '';
        document.getElementById('modalEmail').textContent = msg.email || '';
        document.getElementById('modalMessageText').textContent = msg.message || '';

        const toggleBtn = document.getElementById('modalToggleBtn');
        if (toggleBtn) {
            const isPending = (msg.status || 'Pending') === 'Pending';
            toggleBtn.innerHTML = isPending ? '<i class="fa fa-check"></i> Mark as Resolved' : '<i class="fa fa-undo"></i> Mark as Pending';
            toggleBtn.onclick = function() {
                toggleMessageStatus(id);
                closeMsgModal();
            };
        }

        document.getElementById('msgDetailModal').style.display = 'flex';
    };

    window.closeMsgModal = function() {
        document.getElementById('msgDetailModal').style.display = 'none';
    };

    window.toggleMessageStatus = function(id) {
        let msgs = getMessages();
        const idx = msgs.findIndex(m => m.id === id);
        if (idx > -1) {
            msgs[idx].status = (msgs[idx].status === 'Resolved') ? 'Pending' : 'Resolved';
            saveMessages(msgs);
        }
    };

    window.deleteMessage = function(id) {
        if (!confirm('Are you sure you want to delete this contact message?')) return;
        let msgs = getMessages();
        msgs = msgs.filter(m => m.id !== id);
        saveMessages(msgs);
    };

    function escapeHTML(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }
})();
