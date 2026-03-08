// --- AXEL'S CUSTOM WEB COMPONENTS ---

// 1. NAVBAR COMPONENT
class AxelNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
       <nav class="navbar navbar-expand-lg sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="Assets/Logo.png" alt="Axel Zeed Logo" width="50" height="50">
                </a>
                <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto text-center">
                        <li class="nav-item"><a class="nav-link" href="index.html">HOME</a></li>
                        <li class="nav-item"><a class="nav-link" href="porto.html">PORTFOLIO</a></li>
                        <li class="nav-item"><a class="nav-link" href="price.html">PRICE</a></li>
                        <li class="nav-item"><a class="nav-link" href="terms.html">TERMS</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        `;
    }
}
customElements.define('axel-navbar', AxelNavbar);

// 2. FOOTER COMPONENT
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
                            <a href="https://youtube.com/playlist?list=PLvagROOJB7HcRekgGvNpmUSdctwBllQRx&si=2h8MWNaeYUzFxuhd"
                                target="_blank">Shorts</a>
                        </div>
                    </div>
                </div>
                <hr class="border-secondary my-4">
                <div class="social-icons d-flex flex-wrap justify-content-center gap-3 gap-md-4"> 
                    <a href="https://youtube.com/@axelzeed" target="_blank"><img src="Assets/Youtube.png" alt="Youtube"
                            class="link-image" width="30"></a>
                    <a href="https://www.instagram.com/axel_zeed/" target="_blank"><img src="Assets/Instagram.png"
                            alt="Instagram" class="link-image" width="30"></a>
                    <a href="https://twitter.com/axel_zeed" target="_blank"><img src="Assets/X.png" alt="X"
                            class="link-image" width="30"></a>
                    <a href="https://discord.gg/TQPCCM22pV" target="_blank"><img src="Assets/Discord.png" alt="Discord"
                            class="link-image" width="30"></a>
                    <a href="https://www.tiktok.com/@axelzeedd" target="_blank"><img src="Assets/Tiktok.png" alt="Tiktok"
                            class="link-image" width="30"></a>
                    <a href="https://www.threads.net/@axel_zeed" target="_blank"><img src="Assets/Threads.png" alt="Threads"
                            class="link-image" width="30"></a>
                    <a href="https://www.twitch.tv/axel_zeed" target="_blank"><img src="Assets/Twitch.png" alt="Twitch"
                            class="link-image" width="30"></a>
                    <a href="https://trello.com/b/AipZ6l9k/axel-zeed-commission-waiting-list" target="_blank"><img
                            src="Assets/Trello.png" alt="Trello" class="link-image" width="30"></a>
                    <a href="https://trakteer.id/axel-zeed" target="_blank"><img src="Assets/Trakteer.png" alt="Trakteer"
                            class="link-image" width="30"></a>
                    <a href="https://vgen.co/axel_zeed" target="_blank"><img src="Assets/VGen.png" alt="VGen"
                            class="link-image" width="30"></a>
                </div>
                <p class="text-center mt-4 small">©2022-2026 Axel Zeed. All rights reserved.</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('axel-footer', AxelFooter);

// 3. ANIMATION LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.main-content-box, .fade-in').forEach(el => observer.observe(el));

    // 1. DEBUT PAGE LOGIC
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {

        const mainContent = document.getElementById('main-content');
        const loginButton = document.getElementById('login-button');
        const guestLogin = document.getElementById('guest-login');
        const passcode_input = document.getElementById('passcode-input');
        const thankYouSection = document.querySelector('.main-thank');
        const thankYouBody = document.getElementById('thank-you-body');
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
            'toilet': { name: 'Hanny', img: 'Assets/Placeholder.png' },
        };

        const login = (userKey) => {
            try {
                const isGuest = !users[userKey] || userKey === 'default';
                const effectiveKey = isGuest ? 'default' : userKey;
                const userData = users[effectiveKey];

                localStorage.setItem('axelDebutPasscode', effectiveKey);

                document.querySelectorAll('.main-login-user').forEach(el => el.textContent = userData.name);

                const welcomeBg = document.querySelector('.main-welcome-bg');
                if (welcomeBg) welcomeBg.src = userData.img;

                if (thankYouSection) {
                    if (effectiveKey === 'prototype018') {
                        thankYouSection.style.display = 'none';
                    } else if (isGuest) {
                        thankYouSection.style.display = 'block';
                        thankYouBody.innerHTML = `
                            <h4>Also you can take a selfie with me! Just save this template and use it however you like! You can post it, don't forget to tag me :3</h4>
                            <img class="main-thank-you-img" src="Assets/Photocard_Debut.png" alt="Guest Photocard Template">
                            <h4>Oh btw if you want my background you can download this too!</h4>
                            <img class="main-thank-you-img" src="Assets/Photocard_Debut_BG.png" alt="Photocard Background">
                        `;
                    } else {
                        thankYouSection.style.display = 'block';
                        thankYouBody.innerHTML = `
                            <h4>Anyway, take this photocard. It's a souvenir! You can post it, don't forget to tag me :3</h4>
                            <img class="main-thank-you-img" src="${userData.img}" alt="User Photocard">
                        `;
                    }
                }

                const focusControls = document.getElementById('focus-mode-controls');
                if (focusControls) {
                    focusControls.style.display = 'flex';
                }

                loginOverlay.style.display = 'none';
                mainContent.style.display = 'flex';
                generateSidebar();
            } catch (error) {
                console.error("Failed to login. Clearing stored data and reloading.", error);
                localStorage.removeItem('axelDebutPasscode');
                location.reload();
            }
        };

        const logout = () => {
            localStorage.removeItem('axelDebutPasscode');
            location.reload();
        };

        const generateSidebar = () => {
            if (!sidebar) return;
            const headers = document.querySelectorAll('.section-header');
            let sidebarHTML = '<h3>Table of Contents</h3><ul>';
            headers.forEach(header => {
                const section = header.closest('section');
                if (section && section.id) {
                    sidebarHTML += `<li><a href="#${section.id}">${header.textContent}</a></li>`;
                }
            });
            sidebarHTML += '</ul>';
            sidebar.innerHTML = sidebarHTML;

            const logoutBtn = document.createElement('button');
            logoutBtn.textContent = 'Logout';
            logoutBtn.className = 'logout-button';
            logoutBtn.addEventListener('click', logout);
            sidebar.appendChild(logoutBtn);
        };

        loginButton.addEventListener('click', () => login(passcode_input.value.trim().toLowerCase()));
        passcode_input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') login(passcode_input.value.trim().toLowerCase());
        });
        guestLogin.addEventListener('click', (e) => {
            e.preventDefault();
            login('default');
        });

        const savedPass = localStorage.getItem('axelDebutPasscode');
        if (savedPass) {
            login(savedPass);
        } else {
            loginOverlay.style.display = 'flex';
        }

        if (sidebar) {
            let toggleBtn = document.getElementById('sidebar-toggle-btn');
            if (!toggleBtn) {
                toggleBtn = document.createElement('button');
                toggleBtn.id = 'sidebar-toggle-btn';
                toggleBtn.innerHTML = '<span></span><span></span><span></span>';
                document.body.appendChild(toggleBtn);
            }

            let overlay = document.getElementById('sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'sidebar-overlay';
                document.body.appendChild(overlay);
            }

            const toggleSidebar = () => {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                toggleBtn.classList.toggle('active');
            };

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSidebar();
            });
            overlay.addEventListener('click', toggleSidebar);
        }

        const iframeToggleButtons = document.querySelectorAll('.toggle-iframe-btn');
        iframeToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const iframe = document.getElementById(targetId);
                const wrapper = iframe.parentElement;

                if (wrapper.classList.contains('active')) {
                    wrapper.classList.remove('active');
                    button.textContent = `Show ${targetId.includes('valorant') ? 'Stats' : 'Playlist'}`;
                    iframe.removeAttribute('src');
                } else {
                    if (!iframe.getAttribute('src')) {
                        iframe.setAttribute('src', iframe.getAttribute('data-src'));
                    }
                    wrapper.classList.add('active');
                    button.textContent = `Hide ${targetId.includes('valorant') ? 'Stats' : 'Playlist'}`;
                }
            });
        });
    }

    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
        const focusControls = document.getElementById('focus-mode-controls');
        const toggleBtn = document.getElementById('toggle-focus-btn');
        const nextBtn = document.getElementById('next-section-btn');
        const prevBtn = document.getElementById('prev-section-btn');
        const dropdown = document.getElementById('focus-nav-dropdown');

        if (focusControls && toggleBtn && nextBtn && prevBtn && dropdown) {
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
                    newChunk.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    dropdown.value = currentIndex;
                }
            };

            const toggleFocusMode = () => {
                isFocusMode = !isFocusMode;
                document.body.classList.toggle('focus-mode-active', isFocusMode);

                if (isFocusMode) {
                    toggleBtn.textContent = 'Exit Focus';
                    toggleBtn.style.backgroundColor = '#c94a4a';
                    updateFocus(0);
                } else {
                    toggleBtn.textContent = 'Focus Mode';
                    toggleBtn.style.backgroundColor = '#3c5c77';
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

// Add this to the bottom of your existing main.js
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Target the new bootstrap grid wrappers
    document.querySelectorAll('.fade-in, .content-section, .focusable-chunk').forEach(el => observer.observe(el));
});