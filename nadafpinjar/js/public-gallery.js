/**
 * Public Gallery Controller
 * Renders albums from localStorage('sangha_gallery_albums'), displays article popups, and handles Lightbox photo viewing.
 */

(function() {
    const STORAGE_KEY = 'sangha_gallery_albums';

    const DEFAULT_ALBUMS = [
        {
            id: 'alb_1',
            title: 'ರಾಜ್ಯ ಮಟ್ಟದ ಸಭೆ (State Level Meeting)',
            date: '2026-07-15',
            location: 'ಚಿತ್ರದುರ್ಗ (Chitradurga)',
            description: 'ರಾಜ್ಯ ಪದಾಧಿಕಾರಿಗಳ ಹಾಗೂ ಪ್ರಮುಖ ಗಣ್ಯರ ಉಪಸ್ಥಿತಿಯಲ್ಲಿ ನಡೆದ ಮಹತ್ವದ ರಾಜ್ಯ ಮಟ್ಟದ ಸಭೆ ಮತ್ತು ಸಮಾಲೋಚನೆ ಕಾರ್ಯಕ್ರಮ. ಸಭಾಂಗಣದಲ್ಲಿ ಸಂಘಟನೆಯ ಏಳಿಗೆ ಹಾಗೂ ಭವಿಷ್ಯದ ಯೋಜನೆಗಳ ಕುರಿತು ಸುದೀರ್ಘ ಚರ್ಚೆ ನಡೆಸಲಾಯಿತು.',
            coverImage: 'images/slider-1.jpg',
            photos: [
                'images/slider-1.jpg',
                'images/slider-2.jpg',
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
            coverImage: 'images/slider-2.jpg',
            photos: [
                'images/slider-2.jpg',
                'images/slider-3.jpg',
                'images/president.jpeg'
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
            let albums = raw ? JSON.parse(raw) : DEFAULT_ALBUMS;
            if (!Array.isArray(albums) || albums.length === 0) {
                albums = DEFAULT_ALBUMS;
            }

            // Automatically sanitize any old cached banner-bg.jpg / section-rural-bg.jpg references
            let cleaned = false;
            albums.forEach(alb => {
                if (alb.coverImage && (alb.coverImage.includes('banner-bg.jpg') || alb.coverImage.includes('section-rural-bg.jpg'))) {
                    alb.coverImage = alb.coverImage.includes('section-rural-bg.jpg') ? 'images/slider-2.jpg' : 'images/slider-1.jpg';
                    cleaned = true;
                }
                if (Array.isArray(alb.photos)) {
                    alb.photos = alb.photos.map(p => {
                        if (p.includes('banner-bg.jpg')) { cleaned = true; return 'images/slider-1.jpg'; }
                        if (p.includes('section-rural-bg.jpg')) { cleaned = true; return 'images/slider-2.jpg'; }
                        return p;
                    });
                }
            });

            if (cleaned || !raw) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
            }
            return albums;
        } catch (e) {
            return DEFAULT_ALBUMS;
        }
    }

    let activeAlbumPhotos = [];
    let currentLightboxIdx = 0;

    document.addEventListener('DOMContentLoaded', function() {
        renderPublicGrid();
        setupModalEvents();
    });

    function renderPublicGrid() {
        const grid = document.getElementById('publicGalleryGrid');
        if (!grid) return;

        const albums = getAlbums();

        if (albums.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 50px;">ಯಾವುದೇ ಚಿತ್ರಸಂಪುಟಗಳು ಲಭ್ಯವಿಲ್ಲ (No gallery albums published yet).</div>';
            return;
        }

        const icons = ['fa-users', 'fa-graduation-cap', 'fa-handshake-o', 'fa-bullhorn', 'fa-camera'];
        const gradients = [
            'linear-gradient(135deg, #3f51b5, #2196f3)',
            'linear-gradient(135deg, #e91e63, #ff4081)',
            'linear-gradient(135deg, #4caf50, #8bc34a)',
            'linear-gradient(135deg, #ff9800, #ffeb3b)',
            'linear-gradient(135deg, #673ab7, #9c27b0)'
        ];

        grid.innerHTML = albums.map((alb, index) => {
            const photosCount = (alb.photos || []).length;
            const coverSrc = alb.coverImage || (alb.photos && alb.photos[0]) || '';
            const icon = icons[index % icons.length];
            const grad = gradients[index % gradients.length];

            const headerVisual = coverSrc
                ? `<div style="position: relative; height: 220px; overflow: hidden; background: #000;">
                     <img src="${coverSrc}" class="gallery-card-img-real" onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'gallery-img-wrapper\\' style=\\'background:${grad}\\';><i class=\\'fa ${icon} gallery-img-placeholder\\'></i></div>';">
                     <span class="photo-count-badge"><i class="fa fa-camera"></i> ${photosCount} Photos</span>
                   </div>`
                : `<div class="gallery-img-wrapper" style="background: ${grad}; position: relative;">
                     <i class="fa ${icon} gallery-img-placeholder"></i>
                     <span class="photo-count-badge"><i class="fa fa-camera"></i> ${photosCount} Photos</span>
                   </div>`;

            return `
                <div class="gallery-card" onclick="openPublicAlbumModal('${alb.id}')">
                    ${headerVisual}
                    <div class="gallery-card-content">
                        <h3>${escapeHTML(alb.title)}</h3>
                        <p>${escapeHTML(alb.description)}</p>
                        <div style="margin-top: 12px; font-size: 13px; font-weight: bold; color: #0052cc; display: flex; align-items: center; gap: 5px;">
                            <span>ಮತ್ತಷ್ಟು ನೋಡಿ &amp; ಚಿತ್ರಗಳು / View Details</span> <i class="fa fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.openPublicAlbumModal = function(id) {
        const albums = getAlbums();
        const alb = albums.find(a => a.id === id);
        if (!alb) return;

        document.getElementById('viewAlbumTitle').textContent = alb.title || 'ಆಲ್ಬಂ';
        document.getElementById('viewAlbumDate').innerHTML = `<i class="fa fa-calendar"></i> ${alb.date || 'N/A'}`;
        document.getElementById('viewAlbumLocation').innerHTML = `<i class="fa fa-map-marker"></i> ${alb.location || 'N/A'}`;
        document.getElementById('viewAlbumDesc').textContent = alb.description || '';

        activeAlbumPhotos = Array.isArray(alb.photos) ? alb.photos.filter(Boolean) : [];
        if (alb.coverImage && !activeAlbumPhotos.includes(alb.coverImage)) {
            activeAlbumPhotos.unshift(alb.coverImage);
        }

        const photosGrid = document.getElementById('viewAlbumPhotosGrid');
        if (activeAlbumPhotos.length === 0) {
            photosGrid.innerHTML = '<div style="grid-column: 1/-1; color: #94a3b8; font-style: italic;">ಈ ಆಲ್ಬಂನಲ್ಲಿ ಚಿತ್ರಗಳಿಲ್ಲ (No photos uploaded for this event yet).</div>';
        } else {
            photosGrid.innerHTML = activeAlbumPhotos.map((src, idx) => `
                <img src="${src}" class="album-photo-thumb" onclick="openLightbox(${idx})" onerror="this.onerror=null; this.src='images/slider-1.jpg';">
            `).join('');
        }

        document.getElementById('publicAlbumModal').style.display = 'flex';
    };

    function setupModalEvents() {
        const btnClose = document.getElementById('btnClosePublicModal');
        const modal = document.getElementById('publicAlbumModal');
        if (btnClose) {
            btnClose.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        // Lightbox Navigation
        const lightbox = document.getElementById('lightboxModal');
        const btnLbClose = document.getElementById('btnLightboxClose');
        const btnLbPrev = document.getElementById('btnLightboxPrev');
        const btnLbNext = document.getElementById('btnLightboxNext');

        if (btnLbClose) btnLbClose.addEventListener('click', closeLightbox);
        if (btnLbPrev) {
            btnLbPrev.addEventListener('click', function() {
                if (activeAlbumPhotos.length === 0) return;
                currentLightboxIdx = (currentLightboxIdx - 1 + activeAlbumPhotos.length) % activeAlbumPhotos.length;
                updateLightboxImage();
            });
        }
        if (btnLbNext) {
            btnLbNext.addEventListener('click', function() {
                if (activeAlbumPhotos.length === 0) return;
                currentLightboxIdx = (currentLightboxIdx + 1) % activeAlbumPhotos.length;
                updateLightboxImage();
            });
        }

        document.addEventListener('keydown', function(e) {
            if (lightbox && lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') btnLbPrev.click();
                if (e.key === 'ArrowRight') btnLbNext.click();
            }
        });
    }

    window.openLightbox = function(idx) {
        if (!activeAlbumPhotos[idx]) return;
        currentLightboxIdx = idx;
        updateLightboxImage();
        document.getElementById('lightboxModal').style.display = 'flex';
    };

    function updateLightboxImage() {
        const img = document.getElementById('lightboxTargetImg');
        if (img && activeAlbumPhotos[currentLightboxIdx]) {
            img.src = activeAlbumPhotos[currentLightboxIdx];
        }
    }

    function closeLightbox() {
        document.getElementById('lightboxModal').style.display = 'none';
    }

    function escapeHTML(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }
})();
