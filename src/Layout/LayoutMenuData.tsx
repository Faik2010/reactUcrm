import { 
    MonitorDot, 
    Banknote, 
    Component, 
    PieChart, 
    UserRound, 
    Map,
    FileText
} from "lucide-react";

const menuData: any = [
    {
        label: 'menu',
        isTitle: true,
    },
    {
        id: "dashboard",
        label: 'Dashboards',
        link: "/#",
        icon: <MonitorDot />,
        subItems: [
            {
                id: 'analyticsdashboard',
                label: 'Analytics',
                link: '/dashboard-analytics',
                parentId: "dashboard"
            },
            {
                id: 'ecommercedashboard',
                label: 'Ecommerce',
                link: '/dashboard-ecommerce',
                parentId: "dashboard"
            },
            {
                id: 'emaildashboard',
                label: 'Email',
                link: '/dashboard-email',
                parentId: "dashboard"
            },
            {
                id: 'hrdashboard',
                label: 'HR',
                link: '/dashboard-hr',
                parentId: "dashboard"
            },
            {
                id: 'socialdashboard',
                label: 'Social Media',
                link: '/dashboard-social-media',
                parentId: "dashboard"
            },
        ]
    },
    {
        id: "cashBox",
        label: 'Kasa (Örnek)',
        link: "/#",
        icon: <Banknote />,
        subItems: [
            {
                id: 'cashBoxList',
                label: 'Kasa Listesi',
                link: '/cashbox-list',
                parentId: "cashBox"
            },
            {
                id: 'cashBoxAdd',
                label: 'Kasa Ekle',
                link: '/cashbox-add',
                parentId: "cashBox"
            },
        ]
    },
    {
        label: 'components',
        isTitle: true,
    },
    {
        id: "uielements",
        label: 'UI Elements',
        link: "/#",
        icon: <Component />,
        subItems: [
            {
                id: 'alerts',
                label: 'Alerts',
                link: '/ui-alerts',
                parentId: "uielements"
            },
            {
                id: 'buttons',
                label: 'Buttons',
                link: '/ui-buttons',
                parentId: "uielements"
            },
            {
                id: 'cards',
                label: 'Cards',
                link: '/ui-cards',
                parentId: "uielements"
            },
            {
                id: 'modals',
                label: 'Modals',
                link: '/ui-modal',
                parentId: "uielements"
            },
            {
                id: 'dropdowns',
                label: 'Dropdowns',
                link: '/ui-dropdown',
                parentId: "uielements"
            },
        ]
    },
    {
        id: "forms",
        label: 'Forms',
        link: "/#",
        icon: <FileText />,
        subItems: [
            {
                id: 'basicforms',
                label: 'Basic Forms',
                link: '/forms-basic',
                parentId: "forms"
            },
            {
                id: 'formvalidation',
                label: 'Form Validation',
                link: '/forms-validation',
                parentId: "forms"
            },
            {
                id: 'formselect',
                label: 'Form Select',
                link: '/forms-select',
                parentId: "forms"
            },
        ]
    },
    {
        id: "charts",
        label: 'Charts',
        link: "/#",
        icon: <PieChart />,
        subItems: [
            {
                id: 'apexarea',
                label: 'Area Charts',
                link: '/charts-apex-area',
                parentId: "charts"
            },
            {
                id: 'apexbar',
                label: 'Bar Charts',
                link: '/charts-apex-bar',
                parentId: "charts"
            },
            {
                id: 'apexcolumn',
                label: 'Column Charts',
                link: '/charts-apex-column',
                parentId: "charts"
            },
            {
                id: 'apexline',
                label: 'Line Charts',
                link: '/charts-apex-line',
                parentId: "charts"
            },
            {
                id: 'apexpie',
                label: 'Pie Charts',
                link: '/charts-apex-pie',
                parentId: "charts"
            },
        ]
    },
    {
        id: "maps",
        label: 'Maps',
        link: "/#",
        icon: <Map />,
        subItems: [
            {
                id: 'googlemaps',
                label: 'Google Maps',
                link: '/maps-google',
                parentId: "maps"
            },
            {
                id: 'leafletmaps',
                label: 'Leaflet Maps',
                link: '/maps-leaflet',
                parentId: "maps"
            },
        ]
    },
    {
        label: 'pages',
        isTitle: true,
    },
    {
        id: "authentication",
        label: 'Authentication',
        link: "/#",
        icon: <UserRound />,
        subItems: [
            {
                id: 'login',
                label: 'Login',
                link: '/login',
                parentId: "authentication"
            },
            {
                id: 'register',
                label: 'Register',
                link: '/auth-register-basic',
                parentId: "authentication"
            },
            {
                id: 'userprofile',
                label: 'User Profile',
                link: '/user-profile',
                parentId: "authentication"
            },
        ]
    },
];

export { menuData };