import frappe

def boot_session(bootinfo):
    """
    Inject Magala Green branding directly into the boot session.
    This ensures it loads immediately, even if static assets fail.
    """
    bootinfo.ethiobiz_theme_css = """
    <style id="ethiobiz-boot-css">
        :root {
            --primary-color: #2F6B4F !important;
            --primary: #2F6B4F !important;
            --blue-500: #2F6B4F !important;
            --text-color: #0E1A1A !important;
            
            /* Button Overrides */
            --btn-primary-bg: #2F6B4F !important;
            --btn-primary-color: #ffffff !important;
        }
        
        /* Direct Button Targeting */
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
            background-image: none !important; /* Remove gradients */
        }
        
        .btn-primary:hover,
        button[data-label="Save"]:hover {
            background-color: #265941 !important;
        }

        /* Sidebar Fix */
        .sidebar-item-label {
             /* Ensure visibility */
        }
    </style>
    """
