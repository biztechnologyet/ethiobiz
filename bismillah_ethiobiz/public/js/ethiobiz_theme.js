
/**
 * EthioBizTheme - High-performance theme engine for EthioBiz platform
 * Heavily optimized implementation merging EthioBiz specific branding 
 * with dynamic CSS variable management.
 */
class EthioBizTheme {
    constructor() {
        this.themeData = null;
        this.cacheKey = 'ethiobiz_theme_cache';
        this.init();
    }

    async init() {
        try {
            // 1. Immediate apply from cache to eliminate flickering
            this.applyCachedTheme();

            // 2. Fetch fresh data if needed
            await this.loadTheme();

            // 3. Apply fresh theme
            if (this.themeData) {
                this.applyTheme();
            }
        } catch (error) {
            console.error("EthioBiz Theme Error:", error);
            this.revealLoginBox();
        }
    }

    applyCachedTheme() {
        const cached = localStorage.getItem(this.cacheKey);
        if (cached) {
            try {
                const bundle = JSON.parse(cached);
                if (bundle.data) {
                    this.themeData = bundle.data;
                    this.applyTheme();
                }
            } catch (e) { }
        }
        this.revealLoginBox();
    }

    async loadTheme() {
        try {
            const response = await fetch('/api/method/bismillah_ethiobiz.bismillah_ethiobiz.ethiobiz_theme.api.get_custom_theme');
            const data = await response.json();
            this.themeData = data.message;
            if (this.themeData) {
                localStorage.setItem(this.cacheKey, JSON.stringify({
                    data: this.themeData,
                    ts: Date.now()
                }));
            }
        } catch (e) {
            console.warn("Could not load EthioBiz theme data from server.");
        }
    }

    applyTheme() {
        if (!this.themeData) return;
        const root = document.documentElement;
        const t = this.themeData;

        // Branding
        if (t.primary_color) root.style.setProperty('--primary-color', t.primary_color);

        // Login Page
        if (t.login_page_background_color) root.style.setProperty('--login-bg-color', t.login_page_background_color);
        if (t.login_page_background_image) root.style.setProperty('--login-bg-image', `url("${t.login_page_background_image}")`);
        if (t.login_box_background_color) root.style.setProperty('--login-box-bg', t.login_box_background_color);
        if (t.login_button_background_color) root.style.setProperty('--login-btn-bg', t.login_button_background_color);
        if (t.login_button_text_color) root.style.setProperty('--login-btn-color', t.login_button_text_color);

        // Login Box Position
        if (t.login_box_position === 'Left') {
            root.style.setProperty('--login-box-position', 'absolute');
            root.style.setProperty('--login-box-left', '10%');
            root.style.setProperty('--login-box-right', 'auto');
        } else if (t.login_box_position === 'Right') {
            root.style.setProperty('--login-box-position', 'absolute');
            root.style.setProperty('--login-box-right', '10%');
            root.style.setProperty('--login-box-left', 'auto');
        }

        // Navbar
        if (t.navbar_color) root.style.setProperty('--navbar-bg', t.navbar_color);
        if (t.navbar_text_color) root.style.setProperty('--navbar-color', t.navbar_text_color);
        if (t.hide_help_button) root.style.setProperty('--hide-help', 'none');

        // Buttons
        if (t.button_background_color) root.style.setProperty('--btn-primary-bg', t.button_background_color);
        if (t.button_text_color) root.style.setProperty('--btn-primary-color', t.button_text_color);

        // Workspace
        if (t.body_background_color) root.style.setProperty('--body-bg', t.body_background_color);
        if (t.sidebar_background_color) root.style.setProperty('--sidebar-bg', t.sidebar_background_color);
        if (t.sidebar_text_color) root.style.setProperty('--sidebar-text-color', t.sidebar_text_color);

        this.revealLoginBox();
        this.updateLogo();
    }

    revealLoginBox() {
        const loginBox = document.querySelector('.for-login');
        if (loginBox) {
            loginBox.style.opacity = '1';
            loginBox.style.transform = 'translateY(0)';
            loginBox.classList.add('theme-ready');
        }
    }

    updateLogo() {
        if (this.themeData?.app_logo) {
            const logos = document.querySelectorAll('.app-logo, .navbar-brand img');
            logos.forEach(img => {
                img.src = this.themeData.app_logo;
            });
        }
        if (this.themeData?.app_name) {
            const brands = document.querySelectorAll('.navbar-brand span, .nav-brand-area .app-name');
            brands.forEach(b => {
                b.textContent = this.themeData.app_name;
            });
        }
    }
}

// Global initialization
window.EthioBizTheme = new EthioBizTheme();
