// ==========================================
// ZERYUZ CORP - UNIFIED COMPONENT SCRIPT
// ==========================================

// 1. CORPORATE NAVBAR
class ZeryuzNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg z-navbar sticky-top">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-3" href="zeryuz.html">
                    <img src="Assets/Zeryuz_Logo.png" alt="Zeryuz Logo" height="40">
                    <span class="z-brand-text">ZERYUZ CORP</span>
                </a>
                <button class="navbar-toggler z-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#zeryuzNav">
                    <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
                </button>
                <div class="collapse navbar-collapse" id="zeryuzNav">
                    <ul class="navbar-nav ms-auto text-center">
                        <li class="nav-item"><a class="nav-link z-link" href="#about">ABOUT US</a></li>
                        <li class="nav-item"><a class="nav-link z-link" href="#technology">TECHNOLOGY</a></li>
                        <li class="nav-item"><a class="nav-link z-link" href="#team">LEADERSHIP</a></li>
                    </ul>
                </div>
            </div>
        </nav>`;
    }
}
customElements.define('zeryuz-navbar', ZeryuzNavbar);

// 2. CORPORATE FOOTER (With Hidden ARG Trigger)
class ZeryuzFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="z-footer mt-auto py-5">
            <div class="container text-center">
                <img src="Assets/Zeryuz_Logo.png" alt="Zeryuz Logo" height="60" class="mb-4 opacity-50">
                <p class="z-footer-text mb-2">Bridging the gap between the biological mind and the digital world.</p>
                <p class="z-footer-text small text-muted mb-0">
                    © 2020-2026 Zeryuz Corporation. All rights reserved. 
                    <span id="arg-trigger" style="opacity: 30; cursor: pointer; padding: 5px;">π</span>
                </p>
            </div>
        </footer>`;
    }
}
customElements.define('zeryuz-footer', ZeryuzFooter);

// 3. ARG LOGIC & DOM MANIPULATION
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('arg-trigger');
    const authModal = document.getElementById('arg-auth-modal');
    const authInput = document.getElementById('arg-password');
    const authBtn = document.getElementById('arg-submit');
    const authMsg = document.getElementById('arg-msg');
    
    const layer1 = document.getElementById('layer-1-public');
    const layer2 = document.getElementById('layer-2-underground');

    // Open Auth Modal
    if(trigger && authModal) {
        trigger.addEventListener('click', () => {
            authModal.style.display = 'flex';
            setTimeout(() => authInput.focus(), 100);
        });
    }

    // Close Auth Modal if clicking outside
    if(authModal) {
        authModal.addEventListener('click', (e) => {
            if(e.target === authModal) authModal.style.display = 'none';
        });
    }

    // Process Password
    const checkPassword = () => {
        const pass = authInput.value.trim().toUpperCase();
        if(pass === 'PROTOTYPE_018' || pass === 'XAPPHIRE') {
            authMsg.style.color = '#39ff14';
            authMsg.textContent = "ACCESS GRANTED. DECRYPTING MAINFRAME...";
            
            setTimeout(() => {
                authModal.style.display = 'none';
                layer1.style.display = 'none';
                layer2.style.display = 'block';
                document.body.classList.add('arg-unlocked'); // Changes background to red/black
                window.scrollTo(0,0);
            }, 1500);
        } else {
            authMsg.style.color = '#ff003c';
            authMsg.textContent = "ERR: INVALID CREDENTIALS. INCIDENT LOGGED.";
            authInput.value = '';
        }
    };

    if(authBtn) authBtn.addEventListener('click', checkPassword);
    if(authInput) authInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') checkPassword();
    });
});