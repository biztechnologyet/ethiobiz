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
            const response = await fetch(`/api/method/bismillah_ethiobiz.ethiobiz_theme.api.get_custom_theme?v=${Date.now()}`);
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
        // Core Branding
        if (t.primary_color) {
            root.style.setProperty('--primary-color', t.primary_color);
            root.style.setProperty('--primary', t.primary_color);
            root.style.setProperty('--blue-500', t.primary_color); // Force Override Default Blue
        }

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
        if (navBg) root.style.setProperty('--navbar-bg', navBg); // This might be redundant with t.navbar_bg above

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
        if (sidebarBg) root.style.setProperty('--sidebar-bg', sidebarBg); // This might be redundant with t.sidebar_bg above

        if (t.sidebar_text_color) root.style.setProperty('--sidebar-text-color', t.sidebar_text_color);

        this.revealLoginBox();
        this.updateLogo();
        this.forceApplyStyles();
    }

    updateLogo() {
        if (this.themeData?.app_logo) {
            const logoSelectors = [
                '.navbar-brand img',
                '.app-logo',
                'img[src*="/assets/frappe/images/frappe-framework-logo.svg"]'
            ];

            logoSelectors.forEach(sel => {
                const els = document.querySelectorAll(sel);
                els.forEach(el => {
                    // Avoid replacing if already set to avoid flicker loop if observer used later
                    if (el && el.src && el.src.indexOf(this.themeData.app_logo) === -1) {
                        el.src = this.themeData.app_logo;
                        // Also set style to ensure visibility if hidden by default
                        el.style.display = 'inline-block';
                        el.style.maxHeight = '30px'; // Standard height
                    }
                });
            });
        }

        if (this.themeData?.app_name) {
            const brands = document.querySelectorAll('.navbar-brand span, .nav-brand-area .app-name');
            brands.forEach(b => {
                b.textContent = this.themeData.app_name;
            });
        }
    }

    forceApplyStyles() {
        console.log("EthioBiz Internal: Force Applying Safety CSS");
        const styleId = 'ethiobiz-nuclear-css';
        let style = document.getElementById(styleId);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        // MAGALA GREEN HARDCODED SAFETY NET
        style.innerHTML = `
            :root {
                --primary-color: #2F6B4F !important;
                --primary: #2F6B4F !important;
                --blue-500: #2F6B4F !important;
                --text-color: #0E1A1A !important;
            }
            .btn-primary, 
            .primary-action, 
            button[data-label="Save"], 
            button[data-label="Create"],
            button[data-label="Submit"],
            button[data-label="Update"],
            button.btn-primary {
                background-color: #2F6B4F !important;
                border-color: #2F6B4F !important;
                color: #ffffff !important;
                fill: #ffffff !important;
            }
            .btn-primary:hover,
            button[data-label="Save"]:hover {
                background-color: #265941 !important;
            }
        `;
    }
    collapseSidebar() {
        if (!this.themeData || !this.themeData.hide_sidebar) return;

        // Function to attempt collapse
        const attemptCollapse = () => {
            // 1. Try standard trigger
            const toggleBtn = document.querySelector('.sidebar-toggle-btn');
            const sidebar = document.querySelector('.layout-side-section');

            // Only click if sidebar is visible (width > 0 under standard conditions)
            if (sidebar && toggleBtn && !document.body.classList.contains('sidebar-collapsed')) {
                // Check if actually expanded? Frappe doesn't standardly have a class for expanded/collapsed on body usually, 
                // but checking offsetWidth is a good proxy.
                if (sidebar.getBoundingClientRect().width > 10) {
                    console.log("EthioBiz: Collapsing Sidebar via Click");
                    toggleBtn.click();
                }
            }

            // 2. Try Standard Mobile/Desk Sidebar (if different)
            if (frappe.app && frappe.app.sidebar && frappe.app.sidebar.toggle_sidebar) {
                // API method if available (rare in public API)
            }
        };

        // Attempt immediately
        attemptCollapse();

        // Creative Fix: "The Poller"
        // Aggressively check every 500ms for the first 5 seconds of page load
        // because Frappe sometimes renders the sidebar LATE.
        let checks = 0;
        const maxChecks = 10;
        const poller = setInterval(() => {
            checks++;
            const sidebar = document.querySelector('.layout-side-section');
            const toggleBtn = document.querySelector('.sidebar-toggle-btn');

            // If sidebar exists and is WIDE (expanded), click it.
            if (sidebar && sidebar.getBoundingClientRect().width > 20 && toggleBtn) {
                console.log("EthioBiz Poller: Force Collapsing Sidebar");
                toggleBtn.click();
            }

            if (checks >= maxChecks) clearInterval(poller);
        }, 500);
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
        if (!this.themeData || !this.themeData.enable_light_label_fix) return;

        // Add observer for Route Changes to re-apply collapse
        if (typeof frappe !== 'undefined' && frappe.router) {
            frappe.router.on('change', () => {
                this.updateLogo(); // Re-check logo
                this.forceApplyStyles(); // Re-force CSS
                if (this.themeData && this.themeData.hide_sidebar) {
                    this.collapseSidebar();
                }
            });
        }

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

            // Enhanced attribute replacement for Dropdowns/Tooltips
            const attrs = ['title', 'aria-label', 'data-label', 'data-value', 'alt', 'placeholder'];
            attrs.forEach(attr => {
                document.querySelectorAll(`[${attr}*="Frappe"]`).forEach(el => {
                    let val = el.getAttribute(attr);
                    if (val) {
                        let newVal = val.replace('Frappe Light', 'Light').replace('Frappe', 'EthioBiz');
                        if (val !== newVal) el.setAttribute(attr, newVal);
                    }
                });
            });
        };

        renameFn(); // Initial run

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Rename Labels
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        this.processNode(node);
                    });
                }
                // Also check text content changes
                if (mutation.type === 'characterData') {
                    this.processNode(mutation.target);
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
    }

    processNode(node) {
        // Text Replacement Logic
        if (node.nodeType === 3) { // Text Node
            let text = node.nodeValue;
            if (text && text.includes('Frappe Light')) {
                node.nodeValue = text.replace('Frappe Light', 'EthioBiz Light'); // Explicit Rename
            }
        }
        // Element Attributes
        if (node.nodeType === 1) { // Element
            // Check attributes
            ['title', 'aria-label', 'data-label', 'data-value', 'alt', 'placeholder'].forEach(attr => {
                if (node.hasAttribute(attr)) {
                    let val = node.getAttribute(attr);
                    if (val && val.includes('Frappe Light')) {
                        node.setAttribute(attr, val.replace('Frappe Light', 'EthioBiz Light'));
                    }
                }
            });
            // Subtree
            if (node.childNodes.length > 0) {
                node.childNodes.forEach(child => this.processNode(child));
            }
        }
    }
}

// Global initialization
if (!window.EthioBizThemeInstance) {
    window.EthioBizThemeInstance = new EthioBizTheme();
}
