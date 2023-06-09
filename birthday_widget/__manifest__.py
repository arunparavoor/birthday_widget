{
    'name': 'Birthday info for all employees List and Kanban view',
    'summary': """Birthday info for all employees in List and Kanban view.""",
    'version': '15.0',
    'description': """Birthday info for all employees in List and Kanban view.""",
    'author': 'Arun Reghu Kumar',
    'company': 'Tech4Logic',
    'website': 'https://tech4logic.wordpress.com/',
    'category': 'HR',
    'depends': ['base', 'hr'],
    'data': [
        'views/hr_employee_view.xml',
        ],
    'qweb': [],
    'assets': {
        'web.assets_backend': [
            'birthday_widget/static/src/js/birthday_reminder.js'
        ],
    },
    'images': ['static/description/banner.jpg'],
    'demo': [],
    'installable': True,
    'auto_install': False,

}
