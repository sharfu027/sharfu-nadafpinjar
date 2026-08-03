/**
 * Admin Gallery Management Script
 * Handles CRUD operations for Gallery Albums & Articles stored in localStorage('sangha_gallery_albums')
 */

(function() {
    const STORAGE_KEY = 'sangha_gallery_albums';

    // Default Seed Data if empty
    const DEFAULT_ALBUMS = [
        {
            id: 'alb_1',
            title: 'ರಾಜ್ಯ ಮಟ್ಟದ ಸಭೆ (State Level Meeting)',
            date: '2026-07-15',
            location: 'ಚಿತ್ರದುರ್ಗ (Chitradurga)',
            description: 'ರಾಜ್ಯ ಪದಾಧಿಕಾರಿಗಳ ಹಾಗೂ ಪ್ರಮುಖ ಗಣ್ಯರ ಉಪಸ್ಥಿತಿಯಲ್ಲಿ ನಡೆದ ಮಹತ್ವದ ರಾಜ್ಯ ಮಟ್ಟದ ಸಭೆ ಮತ್ತು ಸಮಾಲೋಚನೆ ಕಾರ್ಯಕ್ರಮ. ಸಭಾಂಗಣದಲ್ಲಿ ಸಂಘಟನೆಯ ಏಳಿಗೆ ಹಾಗೂ ಭವಿಷ್ಯದ ಯೋಜನೆಗಳ ಕುರಿತು ಸುದೀರ್ಘ ಚರ್ಚೆ ನಡೆಸಲಾಯಿತು.',
            coverImage: 'images/banner-bg.jpg',
            photos: [
                'images/banner-bg.jpg',
                'images/president.jpeg',
                'images/logo-786.png'
            ]
        },
        {
            id: 'alb_2',
            title: 'ಶಿಕ್ಷಣ ಪ್ರಶಸ್ತಿ ವಿತರಣೆ (Education Awards Ceremony)',
            date: '2026-06-20',
            location: 'ಬೆಂಗಳೂರು (Bengaluru)',
            description: 'ಪ್ರತಿಭಾವಂತ ಸಮುದಾಯದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಾಜ್ಯ ಮಟ್ಟದ ಪ್ರತಿಭಾ ಪುರಸ್ಕಾರ ಹಾಗೂ ಉಚಿತ ಶಿಕ್ಷಣ ನೆರವು ವಿತರಣಾ ಸಮಾರಂಭ. ಸಾಧನೆ ಮಾಡಿದ ಶ್ರೇಷ್ಠ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನಗದು ಬಹುಮಾನ ಹಾಗೂ ಮೆಡಲ್ ನೀಡಲಾಯಿತು.',
            coverImage: 'images/section-rural-bg.jpg',
            photos: [
                'images/section-rural-bg.jpg',
                'images/president.png'
            ]
        },
        {
            id: 'alb_3',
            title: 'ಜಿಲ್ಲಾ ಪದಾಧಿಕಾರಿಗಳ ಸಭೆ (District Committee Meeting)',
            date: '2026-05-10',
            location: 'ವಿಜಯಪುರ (Vijayapura)',
            description: 'ವಿವಿಧ ಜಿಲ್ಲೆಗಳ ಪದಾಧಿಕಾರಿಗಳೊಂದಿಗೆ ನಡೆದ ಜಿಲ್ಲಾ ಮಟ್ಟದ ಪ್ರಗತಿ ಪರಿಶೀಲನಾ ಸಭೆ ಮತ್ತು ಸನ್ಮಾನ ಕಾರ್ಯಕ್ರಮ.',
            coverImage: '',
            photos: []
        },
        {
            id: 'alb_4',
            title: 'ಸಮುದಾಯ ಜಾಗೃತಿ ಅಭಿಯಾನ (Community Awareness Campaign)',
            date: '2026-04-05',
            location: 'ಹುಬ್ಬಳ್ಳಿ (Hubballi)',
            description: 'ಸಮುದಾಯದ ಅಭಿವೃದ್ಧಿ, ಶೈಕ್ಷಣಿಕ ಸೌಲಭ್ಯಗಳು ಹಾಗೂ ಸಂಘಟನಾತ್ಮಕ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ವ್ಯಾಪಕ ಜಾಗೃತಿ ಮೂಡಿಸುವ ಬೃಹತ್ ಸಭಾವಳಿ.',
            coverImage: '',
            photos: []
        }
    ];

    function getAlbums() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ALBUMS));
                return DEFAULT_ALBUMS;
            }
            return JSON.parse(raw);
        } catch (e) {
            return DEFAULT_ALBUMS;
        }
    }

    function saveAlbums(albums) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
        renderAdminGrid();
    }

    let currentCoverBase64 = '';
    let currentGalleryPhotos = [];

    document.addEventListener('DOMContentLoaded', function() {
        renderAdminGrid();
        setupEventListeners();
    });

    function renderAdminGrid() {
        const grid = document.getElementById('albumsAdminGrid');
        if (!grid) return;

        const albums = getAlbums();
        if (albums.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">ಯಾವುದೇ ಆಲ್ಬಂಗಳಿಲ್ಲ. ಹೊಸ ಆಲ್ಬಂ ಸೇರಿಸಿ! (No albums found. Add one above!)</div>';
            return;
        }

        grid.innerHTML = albums.map(alb => {
            const photosCount = (alb.photos || []).length;
            const coverSrc = alb.coverImage || (alb.photos && alb.photos[0]) || '';
            const coverHTML = coverSrc 
                ? `<img src="${coverSrc}" class="album-cover-img" onerror="this.onerror=null; this.src='images/banner-bg.jpg';">`
                : `<div class="album-cover-placeholder"><i class="fa fa-picture-o"></i></div>`;

            return `
                <div class="album-card-admin">
                    ${coverHTML}
                    <div class="album-card-body">
                        <div class="album-title-admin">${escapeHTML(alb.title)}</div>
                        <div class="album-meta-admin">
                            <span><i class="fa fa-calendar"></i> ${alb.date || 'N/A'}</span>
                            <span><i class="fa fa-map-marker"></i> ${escapeHTML(alb.location || 'N/A')}</span>
                            <span><i class="fa fa-camera"></i> ${photosCount} Photos</span>
                        </div>
                        <div class="album-desc-admin">${escapeHTML(alb.description)}</div>
                        <div class="album-actions-admin">
                            <button class="btn-sm-edit" onclick="openEditAlbumModal('${alb.id}')"><i class="fa fa-pencil"></i> Edit</button>
                            <button class="btn-sm-delete" onclick="deleteAlbumModal('${alb.id}')"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function setupEventListeners() {
        const btnOpenAdd = document.getElementById('btnOpenAddModal');
        const btnClose = document.getElementById('btnCloseModal');
        const btnCancel = document.getElementById('btnCancelModal');
        const albumModal = document.getElementById('albumModal');
        const albumForm = document.getElementById('albumForm');

        if (btnOpenAdd) {
            btnOpenAdd.addEventListener('click', function() {
                openAddAlbumModal();
            });
        }
        if (btnClose) btnClose.addEventListener('click', closeModal);
        if (btnCancel) btnCancel.addEventListener('click', closeModal);

        const coverFileInput = document.getElementById('coverFileInput');
        if (coverFileInput) {
            coverFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        currentCoverBase64 = evt.target.result;
                        updateCoverPreview(currentCoverBase64);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const coverUrlInput = document.getElementById('coverUrlInput');
        if (coverUrlInput) {
            coverUrlInput.addEventListener('input', function(e) {
                if (e.target.value.trim()) {
                    currentCoverBase64 = e.target.value.trim();
                    updateCoverPreview(currentCoverBase64);
                }
            });
        }

        const galleryFileInput = document.getElementById('galleryFileInput');
        if (galleryFileInput) {
            galleryFileInput.addEventListener('change', function(e) {
                const files = Array.from(e.target.files);
                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        currentGalleryPhotos.push(evt.target.result);
                        renderGalleryPhotosPreview();
                    };
                    reader.readAsDataURL(file);
                });
            });
        }

        const galleryUrlsInput = document.getElementById('galleryUrlsInput');
        if (galleryUrlsInput) {
            galleryUrlsInput.addEventListener('change', function(e) {
                const val = e.target.value;
                if (val.trim()) {
                    const urls = val.split(/[\n,]+/).map(u => u.trim()).filter(Boolean);
                    currentGalleryPhotos = currentGalleryPhotos.concat(urls);
                    renderGalleryPhotosPreview();
                    e.target.value = '';
                }
            });
        }

        if (albumForm) {
            albumForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const id = document.getElementById('albumId').value || ('alb_' + Date.now());
                const title = document.getElementById('albumTitle').value.trim();
                const date = document.getElementById('albumDate').value;
                const location = document.getElementById('albumLocation').value.trim();
                const description = document.getElementById('albumDescription').value.trim();
                const coverImage = currentCoverBase64 || document.getElementById('coverUrlInput').value.trim();

                let albums = getAlbums();
                const existingIdx = albums.findIndex(a => a.id === id);

                const newAlbum = {
                    id: id,
                    title: title,
                    date: date,
                    location: location,
                    description: description,
                    coverImage: coverImage,
                    photos: currentGalleryPhotos.slice()
                };

                if (existingIdx > -1) {
                    albums[existingIdx] = newAlbum;
                } else {
                    albums.unshift(newAlbum);
                }

                saveAlbums(albums);
                closeModal();
                alert('Album saved successfully!');
            });
        }
    }

    function openAddAlbumModal() {
        document.getElementById('modalTitle').textContent = 'ಹೊಸ ಚಿತ್ರಸಂಪುಟ ಸೇರಿಸಿ (Add New Album)';
        document.getElementById('albumForm').reset();
        document.getElementById('albumId').value = '';
        currentCoverBase64 = '';
        currentGalleryPhotos = [];
        updateCoverPreview('');
        renderGalleryPhotosPreview();
        document.getElementById('albumModal').style.display = 'flex';
    }

    window.openEditAlbumModal = function(id) {
        const albums = getAlbums();
        const found = albums.find(a => a.id === id);
        if (!found) return;

        document.getElementById('modalTitle').textContent = 'ಆಲ್ಬಂ ತಿದ್ದುಪಡಿ (Edit Album)';
        document.getElementById('albumId').value = found.id;
        document.getElementById('albumTitle').value = found.title || '';
        document.getElementById('albumDate').value = found.date || '';
        document.getElementById('albumLocation').value = found.location || '';
        document.getElementById('albumDescription').value = found.description || '';
        document.getElementById('coverUrlInput').value = found.coverImage && !found.coverImage.startsWith('data:') ? found.coverImage : '';
        
        currentCoverBase64 = found.coverImage || '';
        currentGalleryPhotos = Array.isArray(found.photos) ? found.photos.slice() : [];

        updateCoverPreview(currentCoverBase64);
        renderGalleryPhotosPreview();

        document.getElementById('albumModal').style.display = 'flex';
    };

    window.deleteAlbumModal = function(id) {
        if (!confirm('Are you sure you want to delete this album?')) return;
        let albums = getAlbums();
        albums = albums.filter(a => a.id !== id);
        saveAlbums(albums);
    };

    function closeModal() {
        document.getElementById('albumModal').style.display = 'none';
    }

    function updateCoverPreview(src) {
        const box = document.getElementById('coverPreviewBox');
        if (!box) return;
        if (!src) {
            box.innerHTML = '';
            return;
        }
        box.innerHTML = `<img src="${src}" style="height: 90px; border-radius: 6px; border: 1px solid #cbd5e1; object-fit: cover;">`;
    }

    function renderGalleryPhotosPreview() {
        const container = document.getElementById('galleryPhotosPreviewStrip');
        if (!container) return;
        container.innerHTML = currentGalleryPhotos.map((src, idx) => `
            <div class="preview-thumb-wrapper">
                <img src="${src}" class="preview-thumb">
                <button type="button" class="remove-thumb-btn" onclick="removeGalleryPhoto(${idx})">&times;</button>
            </div>
        `).join('');
    }

    window.removeGalleryPhoto = function(idx) {
        currentGalleryPhotos.splice(idx, 1);
        renderGalleryPhotosPreview();
    };

    function escapeHTML(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // Expose for external access
    window.getAlbumsData = getAlbums;
})();
