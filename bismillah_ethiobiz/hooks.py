app_name = "bismillah_ethiobiz"
app_title = "Bismillah EthioBiz"
app_publisher = "Bismillah"
app_description = "Custom EthioBiz ERPNext Customizations for Ethiopian Market"
app_email = "info@ethiobiz.et"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = [
    "/assets/bismillah_ethiobiz/css/ethiobiz_theme.css"
]
app_include_js = [
    "/assets/bismillah_ethiobiz/js/bismillah_ethiobiz.js",
    "/assets/bismillah_ethiobiz/js/ethiobiz_theme.js"
]

# include js, css files in header of web template (login, etc)
web_include_css = [
    "/assets/bismillah_ethiobiz/css/ethiobiz_theme.css"
]
web_include_js = [
    "/assets/bismillah_ethiobiz/js/ethiobiz_theme.js"
]

# Client-side bindings
# --------------------

doctype_js = {
    "Employee": "public/js/employee_custom.js",
    "Project": "public/js/project_custom.js"
}

# Override standard doctypes
# --------------------------
# override_doctype_class = {
#     "ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
doc_events = {
    "Workspace": {
        "before_insert": "bismillah_ethiobiz.bismillah_ethiobiz.overrides.validate_workspace_permissions",
        "before_save": "bismillah_ethiobiz.bismillah_ethiobiz.overrides.validate_workspace_permissions"
    },
    "Company": {
        "before_insert": "bismillah_ethiobiz.bismillah_ethiobiz.overrides.validate_company_permissions"
    }
}

# Fixtures
# --------
fixtures = [
    "Custom Role",
    "Property Setter",
    "Custom Field"
]

# Boot Injection
# --------------
extend_bootinfo = "bismillah_ethiobiz.bismillah_ethiobiz.boot.boot_session"
