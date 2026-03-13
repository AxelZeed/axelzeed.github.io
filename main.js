const SUPABASE_URL = 'https://yvfqgagqyacoblooilgq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZnFnYWdxeWFjb2Jsb29pbGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNzkwNzksImV4cCI6MjA4ODk1NTA3OX0.Fzdo7cfXzSIX6lX62gdbDwT0hS98HTdyKkl1RZtGt9M';

const supabaseClient = typeof supabase !== 'undefined' ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

class AxelNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src="Assets/Logo.png" alt="Axel Zeed Logo" width="50" height="50"></a>
                <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto text-center">
                        <li class="nav-item"><a class="nav-link" href="index.html">HOME</a></li>
                        <li class="nav-item"><a class="nav-link" href="porto.html">PORTFOLIO</a></li>
                        <li class="nav-item"><a class="nav-link" href="price.html">PRICE</a></li>
                        <li class="nav-item"><a class="nav-link" href="terms.html">TERMS</a></li>
                    </ul>
                </div>
            </div>
        </nav>`;
    }
}
customElements.define('axel-navbar', AxelNavbar);

class AxelFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer mt-auto py-5">
            <div class="container">
                <div class="row text-center text-md-start">
                    <div class="col-md-6 mb-4">
                        <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                            <img src="Assets/Footer-PP.png" alt="Profile" class="rounded-circle" width="80">
                            <div>
                                <h3 class="mb-0">Axel Zeed</h3>
                                <p class="mb-0 text-secondary small">Lead Researcher & Scientist @ Zeryuz Corp</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <h4 class="text-cyan mb-3">System Access</h4>
                        <div class="footer-links d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
                            <a href="https://www.youtube.com/live/cQinAv1I4to?si=qJamCfGLKZ_5kAHb" target="_blank">Debut</a>
                            <a href="https://youtu.be/fBEN56Y2MHg" target="_blank">Model Showcase</a>
                            <a href="price.html" target="_blank">Commission</a>
                            <a href="https://youtube.com/playlist?list=PLvagROOJB7HeKy-GltBRrF5l5mw0ufhbl&si=8F1QetzwW475jlF3" target="_blank">Shorts</a>
                        </div>
                    </div>
                </div>
                <hr class="border-secondary my-4">
                <div class="social-icons d-flex flex-wrap justify-content-center gap-3 gap-md-4">
                    <a href="https://youtube.com/@axelzeed" target="_blank"><img src="Assets/Youtube.png" alt="Youtube" class="link-image" width="30"></a>
                    <a href="https://www.instagram.com/axel_zeed/" target="_blank"><img src="Assets/Instagram.png" alt="Instagram" class="link-image" width="30"></a>
                    <a href="https://twitter.com/axel_zeed" target="_blank"><img src="Assets/X.png" alt="X" class="link-image" width="30"></a>
                    <a href="https://discord.gg/TQPCCM22pV" target="_blank"><img src="Assets/Discord.png" alt="Discord" class="link-image" width="30"></a>
                    <a href="https://www.tiktok.com/@axelzeedd" target="_blank"><img src="Assets/Tiktok.png" alt="Tiktok" class="link-image" width="30"></a>
                    <a href="https://www.threads.net/@axel_zeed" target="_blank"><img src="Assets/Threads.png" alt="Threads" class="link-image" width="30"></a>
                    <a href="https://www.twitch.tv/axel_zeed" target="_blank"><img src="Assets/Twitch.png" alt="Twitch" class="link-image" width="30"></a>
                    <a href="https://trello.com/b/AipZ6l9k/axel-zeed-commission-waiting-list" target="_blank"><img src="Assets/Trello.png" alt="Trello" class="link-image" width="30"></a>
                    <a href="https://trakteer.id/axel-zeed" target="_blank"><img src="Assets/Trakteer.png" alt="Trakteer" class="link-image" width="30"></a>
                    <a href="https://vgen.co/axel_zeed" target="_blank"><img src="Assets/VGen.png" alt="VGen" class="link-image" width="30"></a>
                </div>
                <p class="text-center mt-4 small">©2022-2026 Axel Zeed. All rights reserved.</p>
            </div>
        </footer>`;
    }
}
customElements.define('axel-footer', AxelFooter);

document.addEventListener('DOMContentLoaded', () => {

    // --- A. SCROLL ANIMATION OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.main-content-box, .fade-in, .content-section, .focusable-chunk').forEach(el => observer.observe(el));


    // --- B. SUPABASE LOGIC (Fetch & Upload) ---
    async function loadWishes() {
        const container = document.getElementById('wishes-container');
        if (!container || !supabaseClient) return;

        const { data, error } = await supabaseClient
            .from('wishes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch Error:', error);
            return;
        }

        container.innerHTML = data.length > 0 ? '' : '<p class="small text-muted">// No transmissions found.</p>';
        data.forEach(item => {
            const date = new Date(item.created_at).toLocaleDateString();
            const imgHTML = item.image_url ? `<img src="${item.image_url}" class="img-fluid border-cyan mt-2" style="max-height: 200px;">` : '';
            container.innerHTML += `
                <div class="p-3 mb-3 border-cyan bg-dark-teal" style="border-left: 3px solid var(--neon-cyan)">
                    <div class="d-flex justify-content-between">
                        <span class="text-green small fw-bold">> ${item.name}</span>
                        <span class="text-muted small">${date}</span>
                    </div>
                    <p class="small mt-2 mb-0">${item.message}</p>
                    ${imgHTML}
                </div>
            `;
        });
    }

    // Attach function to global window so the HTML button can trigger it
    window.loadWishes = loadWishes;

    // Initial fetch
    loadWishes();

    // Form Submission Logic
    const wishForm = document.getElementById('supabase-wish-form');
    if (wishForm && supabaseClient) {
        wishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const status = document.getElementById('status-msg');
            const name = document.getElementById('wish-name').value;
            const message = document.getElementById('wish-message').value;
            const imageFile = document.getElementById('wish-image').files[0];

            // --- SIZE LIMIT CHECK (5MB) ---
            if (imageFile && imageFile.size > 5 * 1024 * 1024) {
                status.style.display = 'block';
                status.textContent = '!! ERROR: VISUAL_DATA_EXCEEDS_5MB_LIMIT';
                status.className = 'small mt-2 text-red';
                return; // Kill the process
            }

            btn.disabled = true;
            btn.textContent = 'UPLOADING...';
            status.style.display = 'block';
            status.textContent = '>> ESTABLISHING_UPLINK...';
            status.className = 'small mt-2 text-cyan';

            let imageUrl = null;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`; // Using timestamp for unique files
                const filePath = `uploads/${fileName}`;

                let { error: uploadError } = await supabaseClient.storage
                    .from('wish-images')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    status.textContent = '!! UPLOAD_REJECTED: STORAGE_FAILURE';
                    status.className = 'small mt-2 text-red';
                    btn.disabled = false;
                    btn.textContent = 'UPLOAD_TO_MAINFRAME';
                    return;
                } else {
                    const { data } = supabaseClient.storage.from('wish-images').getPublicUrl(filePath);
                    imageUrl = data.publicUrl;
                }
            }

            const { error } = await supabaseClient
                .from('wishes')
                .insert([{ name, message, image_url: imageUrl }]);

            if (error) {
                status.textContent = '!! SYNC_FAILED';
                status.className = 'small mt-2 text-red';
            } else {
                status.textContent = '>> DATA_ARCHIVED_SUCCESSFULLY';
                status.className = 'small mt-2 text-green';
                wishForm.reset();
                if (typeof loadWishes === "function") loadWishes();
            }

            btn.disabled = false;
            btn.textContent = 'UPLOAD_TO_MAINFRAME';
        });
    }
    
    // --- C. TERMINAL LOGIN SYSTEM (The part that broke) ---
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {
        const mainContent = document.getElementById('main-content');
        const loginButton = document.getElementById('login-button');
        const guestLogin = document.getElementById('guest-login');
        const passcode_input = document.getElementById('passcode-input');
        const thankYouSection = document.querySelector('.main-thank'); // Container for thank you
        const thankYouBody = document.getElementById('thank-you-body'); // Inside container

        const sidebar = document.getElementById('main-sidebar');

        const users = {
            'default': { name: 'Guest', img: 'Assets/Guest_Banner.jpg' },
            'prototype018': { name: 'Axel', img: 'Assets/Axel_Banner.jpg' },
            'goddess': { name: 'Hiera', img: 'Assets/Photocard_Hiera.jpg' },
            'dragon': { name: 'Vikra', img: 'Assets/Photocard_Vikra.jpg' },
            'space': { name: 'Zack', img: 'Assets/Photocard_Zack.jpg' },
            'doll': { name: 'Sato', img: 'Assets/Photocard_Sato.jpg' },
            'lavender': { name: 'Ay', img: 'Assets/Chibi_Ay.jpg' },
            'assassin': { name: 'Keyla', img: 'Assets/FN_Keyla.jpg' },
            'toilet': { name: 'Hanny', img: 'Assets/Placeholder.png' }
        };

        const executeLogin = (userKey) => {
            try {
                const isGuest = !users[userKey] || userKey === 'default';
                const effectiveKey = isGuest ? 'default' : userKey;
                const userData = users[effectiveKey];

                localStorage.setItem('axelDebutPasscode', effectiveKey);

                // Update names and images
                document.querySelectorAll('.main-login-user').forEach(el => el.textContent = userData.name);
                const welcomeBg = document.querySelector('.main-welcome-bg');
                if (welcomeBg) welcomeBg.src = userData.img;

                // Handle the Thank You section Safely
                if (thankYouSection && thankYouBody) {
                    if (effectiveKey === 'prototype018') {
                        thankYouSection.style.display = 'none'; // Axel doesn't need a thank you
                    } else if (isGuest) {
                        thankYouSection.style.display = 'block';
                        thankYouBody.innerHTML = `
                            <h4 class="mt-3 thank-you">Also you can take a selfie with me! Just save this template and use it however you like! You can post it, don't forget to tag me :3</h4>
                            <img class="main-thank-you-img" src="Assets/Photocard_Debut.png" alt="Guest Photocard Template">
                            <h4 class="mt-4 thank-you">Oh btw if you want my background you can download this too!</h4>
                            <img class="main-thank-you-img" src="Assets/Photocard_Debut_BG.png" alt="Photocard Background">
                        `;
                    } else {
                        thankYouSection.style.display = 'block';
                        thankYouBody.innerHTML = `
                            <h4 class="mt-3">Anyway, take this photocard. It's a souvenir! You can post it, don't forget to tag me :3</h4>
                            <img class="main-thank-you-img" src="${userData.img}" alt="User Photocard">
                        `;
                    }
                }

                // Show Focus Mode Controls
                const focusWrapper = document.getElementById('focus-mode-wrapper');
                if (focusWrapper) focusWrapper.style.display = 'flex';

                // Hide Login, Show Main
                loginOverlay.style.display = 'none';
                if (mainContent) mainContent.style.display = 'flex';

                // Build Sidebar TOC
                generateSidebar();

                // Retrigger animations now that content is visible
                document.querySelectorAll('.fade-in, .focusable-chunk').forEach(el => observer.observe(el));

            } catch (error) {
                console.error("Login Execution Failed:", error);
                localStorage.removeItem('axelDebutPasscode');
                location.reload();
            }
        };

        const generateSidebar = () => {
            if (!sidebar) return;
            const headers = document.querySelectorAll('.section-header');
            let sidebarHTML = '<h3>Table of Contents</h3><ul class="sidebar-list">';
            headers.forEach(header => {
                const section = header.closest('section');
                if (section && section.id) {
                    sidebarHTML += `<li><a href="#${section.id}">${header.textContent}</a></li>`;
                }
            });
            sidebarHTML += '</ul>';
            sidebar.innerHTML = sidebarHTML;

            const logoutBtn = document.createElement('button');
            logoutBtn.textContent = 'Logout / End Session';
            logoutBtn.className = 'logout-button';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('axelDebutPasscode');
                location.reload();
            });
            sidebar.appendChild(logoutBtn);
        };

        // Event Listeners for Login Triggers
        loginButton.addEventListener('click', () => executeLogin(passcode_input.value.trim().toLowerCase()));
        passcode_input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeLogin(passcode_input.value.trim().toLowerCase());
        });
        if (guestLogin) {
            guestLogin.addEventListener('click', (e) => {
                e.preventDefault();
                executeLogin('default');
            });
        }

        // Auto-login if previously verified
        const savedPass = localStorage.getItem('axelDebutPasscode');
        if (savedPass) {
            executeLogin(savedPass);
        } else {
            loginOverlay.style.display = 'flex';
        }
    }

    // --- D. IFRAME TOGGLE LOGIC ---
    const iframeToggleButtons = document.querySelectorAll('.toggle-iframe-btn');
    iframeToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Ignore if this is the form submit button
            if (button.id === 'submit-btn') return;

            const targetId = button.getAttribute('data-target');
            if (!targetId) return;

            const iframe = document.getElementById(targetId);
            if (!iframe) return;

            const wrapper = iframe.parentElement;

            if (wrapper.classList.contains('active')) {
                wrapper.classList.remove('active');
                button.textContent = `Open ${targetId.includes('valorant') ? 'StatsFetch' : 'Audio Node'}`;
                iframe.removeAttribute('src'); // Stop rendering to save memory
            } else {
                if (!iframe.getAttribute('src')) {
                    iframe.setAttribute('src', iframe.getAttribute('data-src'));
                }
                wrapper.classList.add('active');
                button.textContent = `Close ${targetId.includes('valorant') ? 'StatsFetch' : 'Audio Node'}`;
            }
        });
    });

    // --- E. FOCUS MODE / HUD CONTROLS ---
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
        const focusWrapper = document.getElementById('focus-mode-wrapper');
        const hudToggle = document.getElementById('focus-hud-toggle');
        const hudControls = document.getElementById('focus-mode-controls');

        const toggleBtn = document.getElementById('toggle-focus-btn');
        const nextBtn = document.getElementById('next-section-btn');
        const prevBtn = document.getElementById('prev-section-btn');
        const dropdown = document.getElementById('focus-nav-dropdown');

        if (hudToggle && hudControls) {
            hudToggle.addEventListener('click', () => {
                hudControls.classList.toggle('minimized');
                hudToggle.textContent = hudControls.classList.contains('minimized') ? '_HUD [OFF]' : '_HUD [ON]';
            });
        }

        if (focusWrapper && toggleBtn && nextBtn && prevBtn && dropdown) {
            const allChunks = Array.from(document.querySelectorAll('.focusable-chunk'));
            let currentIndex = -1;
            let isFocusMode = false;

            dropdown.innerHTML = '';
            allChunks.forEach((chunk, index) => {
                const header = chunk.querySelector('.section-header, .sub-section-header, h1, h2, h3');
                const option = document.createElement('option');
                option.value = index;
                option.textContent = header ? header.textContent.trim() : `Section ${index + 1}`;
                dropdown.appendChild(option);
            });

            const updateFocus = (newIndex) => {
                if (currentIndex > -1 && allChunks[currentIndex]) {
                    allChunks[currentIndex].classList.remove('focused');
                }
                if (newIndex >= allChunks.length) newIndex = 0;
                if (newIndex < 0) newIndex = allChunks.length - 1;

                currentIndex = newIndex;
                const newChunk = allChunks[currentIndex];

                if (newChunk) {
                    newChunk.classList.add('focused');
                    newChunk.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    dropdown.value = currentIndex;
                }
            };

            const toggleFocusMode = () => {
                isFocusMode = !isFocusMode;
                document.body.classList.toggle('focus-mode-active', isFocusMode);

                if (isFocusMode) {
                    toggleBtn.textContent = 'Disengage Focus';
                    toggleBtn.style.backgroundColor = '#c94a4a';
                    updateFocus(0);
                } else {
                    toggleBtn.textContent = 'Engage Focus';
                    toggleBtn.style.backgroundColor = '#00f2ff';
                    if (currentIndex > -1 && allChunks[currentIndex]) {
                        allChunks[currentIndex].classList.remove('focused');
                    }
                    currentIndex = -1;
                }
            };

            toggleBtn.addEventListener('click', toggleFocusMode);
            nextBtn.addEventListener('click', () => { if (isFocusMode) updateFocus(currentIndex + 1) });
            prevBtn.addEventListener('click', () => { if (isFocusMode) updateFocus(currentIndex - 1) });
            dropdown.addEventListener('change', (e) => { if (isFocusMode) updateFocus(parseInt(e.target.value)) });
        }
    }
});