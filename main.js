document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL SCRIPTS (Run on every page) ---

    // 1. Hamburger Menu Logic
    const hamb = document.querySelector('.hamb-menu');
    const rightMenu = document.querySelector('.right');

    if (hamb && rightMenu) {
        hamb.addEventListener('click', () => {
            rightMenu.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
            const isClickInsideNavbar = hamb.contains(event.target) || rightMenu.contains(event.target);
            if (!isClickInsideNavbar && rightMenu.classList.contains('active')) {
                rightMenu.classList.remove('active');
            }
        });
    }

    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(container => {
        const slider = container.querySelector('.slider');
        const prevBtn = container.querySelector('.pre-btn');
        const nextBtn = container.querySelector('.nxt-btn');

        if (slider && prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                const scrollAmount = slider.clientWidth;
                slider.scrollLeft += scrollAmount;
            });

            prevBtn.addEventListener('click', () => {
                const scrollAmount = slider.clientWidth;
                slider.scrollLeft -= scrollAmount;
            });
        }
    });

    // 2. Intersection Observer for Fade-in Animations
    // I've added all the classes from your other pages here so they animate properly!
    const elementsToObserve = document.querySelectorAll(
        '.section-title, .gallery-column, .review-placeholder, .table-container, .price-category, .payment-methods, .terms-section, .fade-in-left, .fade-in-right, .footer, .main-review, .price-category, .main-login, .main-container, .content-section'
    );

    if (elementsToObserve.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Triggers the animation a little sooner before it's fully on screen
            threshold: 0.0 // Makes it super sensitive, firing as soon as a tiny part is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When the element is intersecting (even a little bit)
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                    entry.target.classList.add('visible');
                    // We don't need to watch it anymore after it becomes visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }


    // --- PAGE-SPECIFIC SCRIPTS ---

    // 1. DEBUT PAGE LOGIC (Only runs if it finds the login overlay)
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {

        // Debut Page Elements
        const mainContent = document.getElementById('main-content');
        const loginButton = document.getElementById('login-button');
        const guestLogin = document.getElementById('guest-login');
        const passcode_input = document.getElementById('passcode-input');
        const thankYouSection = document.querySelector('.main-thank');
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
            const userData = users[userKey] || users['default'];
            localStorage.setItem('axelDebutPasscode', userKey);

            document.querySelectorAll('.main-login-user').forEach(el => el.textContent = userData.name);

            // I've added checks here to make sure these elements exist before trying to change them
            const welcomeBg = document.querySelector('.main-welcome-bg');
            const thankYouImg = document.querySelector('.main-thank-you-img');
            if (welcomeBg) welcomeBg.src = userData.img;
            if (thankYouImg) thankYouImg.src = userData.img;

            if (thankYouSection) {
                if (userKey === 'prototype018' || userKey === 'default') {
                    thankYouSection.style.display = 'none';
                } else {
                    thankYouSection.style.display = 'block';
                }
            }

            loginOverlay.style.display = 'none';
            mainContent.style.display = 'flex';
            generateSidebar();
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

        // Sidebar Toggle (Hamburger) Logic for Debut Page
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

        // Iframe Toggle Logic
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
    // END of Debut Page-specific logic
});
