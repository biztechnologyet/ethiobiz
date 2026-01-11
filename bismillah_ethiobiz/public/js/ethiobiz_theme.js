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
            // 1. Immediate apply from cache
            this.applyCachedTheme();

            // 2. Fetch fresh data
            await this.loadTheme();

            // 3. Apply fresh theme
            if (this.themeData) {
                this.applyTheme();
            }

            // 4. Start label observer
            this.initLabelObserver();
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

        // Core Branding
        if (t.primary_color) root.style.setProperty('--primary-color', t.primary_color);

        // Login Page
        const loginBg = t.login_bg_color || t.login_page_background_color || t.background_color;
        if (loginBg) root.style.setProperty('--login-bg-color', loginBg);

        const loginImage = t.login_bg_image || t.login_page_background_image;
        if (loginImage) root.style.setProperty('--login-bg-image', `url("${loginImage}")`);

        const loginBoxBg = t.login_box_bg || t.login_box_background_color;
        if (loginBoxBg) root.style.setProperty('--login-box-bg', loginBoxBg);

        const loginBtnBg = t.login_btn_bg || t.login_button_background_color;
        if (loginBtnBg) root.style.setProperty('--login-btn-bg', loginBtnBg);

        const loginBtnColor = t.login_btn_color || t.login_button_text_color;
        if (loginBtnColor) root.style.setProperty('--login-btn-color', loginBtnColor);

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
        const navBg = t.navbar_bg_color || t.navbar_color;
        if (navBg) root.style.setProperty('--navbar-bg', navBg);

        if (t.navbar_text_color) root.style.setProperty('--navbar-color', t.navbar_text_color);
        if (t.hide_help_button) root.style.setProperty('--hide-help', 'none');

        // Buttons
        const btnBg = t.btn_primary_bg || t.button_background_color;
        if (btnBg) root.style.setProperty('--btn-primary-bg', btnBg);

        const btnColor = t.btn_primary_color || t.button_text_color;
        if (btnColor) root.style.setProperty('--btn-primary-color', btnColor);

        // Workspace
        const bodyBg = t.background_color || t.body_background_color;
        if (bodyBg) root.style.setProperty('--body-bg', bodyBg);

        const sidebarBg = t.sidebar_bg_color || t.sidebar_background_color;
        if (sidebarBg) root.style.setProperty('--sidebar-bg', sidebarBg);

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
            const logos = document.querySelectorAll('.app-logo, .navbar-brand img, .web-footer img');
            logos.forEach(img => {
                // Prevent infinite loop if logo same
                if (img.src.indexOf(this.themeData.app_logo) === -1) {
                    img.src = this.themeData.app_logo;
                }
            });
        }
        if (this.themeData?.app_name) {
            const brands = document.querySelectorAll('.navbar-brand span, .nav-brand-area .app-name, .web-footer .brand-text');
            brands.forEach(b => {
                b.textContent = this.themeData.app_name;
            });
        }
    }

    initLabelObserver() {
        const renameFn = () => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while (node = walker.nextNode()) {
                const text = node.nodeValue;
                if (text.includes('Frappe Light')) {
                    node.nodeValue = text.replace('Frappe Light', 'Light');
                } else if (text === 'Frappe') {
                    // Be careful with single word Frappe, usually branding
                    node.nodeValue = 'EthioBiz';
                }
            }

            // Re-check specific attributes like titles or aria-labels if needed
            document.querySelectorAll('[title*="Frappe"]').forEach(el => {
                el.title = el.title.replace('Frappe', 'EthioBiz');
            });
        };

        renameFn();
        const observer = new MutationObserver(renameFn);
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
}

// Global initialization
if (!window.EthioBizThemeInstance) {
    window.EthioBizThemeInstance = new EthioBizTheme();
}
