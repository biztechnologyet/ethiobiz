import frappe

def boot_session(bootinfo):
    """
    Inject Dynamic Theme branding directly into the boot session.
    Reads from 'EthioBiz Theme' DocType to support user changes.
    """
    try:
        # Fetch Settings (Uncached or Cached)
        # Using db.get_value is faster than get_doc
        primary_color = frappe.db.get_value("EthioBiz Theme", "EthioBiz Theme", "primary_color") or "#2F6B4F"
    except Exception:
        primary_color = "#2F6B4F"

    bootinfo.ethiobiz_theme_css = f"""
    <style id="ethiobiz-boot-css">
        :root {{
            --primary-color: {primary_color} !important;
            --primary: {primary_color} !important;
            --blue-500: {primary_color} !important;
            --text-color: #0E1A1A !important;
            
            /* Button Overrides */
            --btn-primary-bg: {primary_color} !important;
            --btn-primary-color: #ffffff !important;
        }}
        
        /* Direct Button Targeting */
        .btn-primary, 
        .primary-action, 
        button[data-label="Save"], 
        button[data-label="Create"],
        button[data-label="Submit"],
        button[data-label="Update"],
        button.btn-primary {{
            background-color: {primary_color} !important;
            border-color: {primary_color} !important;
            color: #ffffff !important;
            fill: #ffffff !important;
            background-image: none !important;
        }}
        
        .btn-primary:hover,
        button[data-label="Save"]:hover {{
            filter: brightness(0.9);
        }}
    </style>
    """
