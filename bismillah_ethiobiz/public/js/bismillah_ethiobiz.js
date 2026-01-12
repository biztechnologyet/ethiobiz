frappe.provide("bismillah_ethiobiz");

$(document).on('app_ready', function () {
    // Hide Help Button
    $('.dropdown-help').hide();

    // Rename 'Frappe Light' to 'Light'
    // This requires hooking into the theme switcher or simple DOM manipulation if possible
});

// Shim to force load EthioBiz Theme (Bypassing Build System)
// Injected by Antigravity
(function () {
    // Only load if not already loaded (simple check)
    if (window.EthioBizThemeLoaded) return;
    window.EthioBizThemeLoaded = true;

    const ts = Date.now();
    const jsPath = "/assets/bismillah_ethiobiz/js/ethiobiz_theme.js?v=" + ts;
    const cssPath = "/assets/bismillah_ethiobiz/css/ethiobiz_theme.css?v=" + ts;

    // Load CSS
    $('<link>')
        .appendTo('head')
        .attr({
            type: 'text/css',
            rel: 'stylesheet',
            href: cssPath
        });

    // Load JS
    $.getScript(jsPath).fail(function (jqxhr, settings, exception) {
        console.error("EthioBiz Theme Shim Failed to load script:", exception);
    });

    console.log("EthioBiz Theme Shim: Assets Injected");
})();
