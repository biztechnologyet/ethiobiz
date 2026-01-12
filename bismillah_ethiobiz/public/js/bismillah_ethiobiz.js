frappe.provide("bismillah_ethiobiz");

/* 
   ETHIOBIZ THEME ENGINE (BOOT INJECTION MODE)
   This script picks up the CSS injected by the server session (boot.py) 
   and applies it immediately to the DOM.
*/

// 1. Boot Handler - Injects CSS from Server Session
$(document).on('app_ready', function () {
    // Hide Help Dropdown
    $('.dropdown-help').hide();

    // Check for Boot Data (Sent by boot.py)
    if (frappe.boot && frappe.boot.ethiobiz_theme_css) {
        console.log("EthioBiz: Injecting Boot CSS (Server-Side)");
        if (!document.getElementById('ethiobiz-boot-css')) {
            $('head').append(frappe.boot.ethiobiz_theme_css);
        }
    } else {
        console.warn("EthioBiz: No Boot CSS found. Falling back to Nuclear Shim.");
        applyNuclearShim();
    }
});

// 2. Fallback "Nuclear" Shim (Runs if Boot fails or early load)
function applyNuclearShim() {
    const styleId = 'ethiobiz-nuclear-shim';
    if (document.getElementById(styleId)) return;

    console.log("EthioBiz: Applying Nuclear Shim CSS");
    const css = `
        :root { 
            --primary-color: #2F6B4F !important;
            --primary: #2F6B4F !important;
            --blue-500: #2F6B4F !important;
        }
        /* Hard Button Overrides */
        .btn-primary, 
        button[data-label="Save"], 
        button[data-label="Create"],
        button.btn-primary { 
            background-color: #2F6B4F !important; 
            border-color: #2F6B4F !important;
            color: #fff !important;
        }
        .btn-primary:hover,
        button[data-label="Save"]:hover {
            background-color: #265941 !important;
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = css;
    document.head.appendChild(style);
}

// 3. Immediate Execution (For Login Page / Early Stage)
applyNuclearShim();

