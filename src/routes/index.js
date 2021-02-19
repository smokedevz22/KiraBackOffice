import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";
import TiposCuentaDeposito from "../pages/pages/TiposCuentaDeposito";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));
const Formik = async(() => import("../pages/forms/Formik"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));
const Chat = async(() => import("../pages/pages/Chat"));


//Products
const Products = async(() => import("../pages/pages/Products"));
const Actividades = async(() => import("../pages/pages/Actividades"));
const Tarifas = async(() => import("../pages/pages/Tarifas"));
const CoberturasProductos = async(() => import("../pages/pages/CoberturasProductos"));
const Siniestros = async(() => import("../pages/pages/Siniestros"));
const Polizas = async(() => import("../pages/pages/Polizas"));
const Cotizaciones = async(() => import("../pages/pages/Cotizaciones"));
const Usuarios = async(() => import("../pages/pages/Usuarios"));

const DetallePoliza = async(() => import("../pages/pages/DetalleSeguro"));
const DetalleSiniestro = async(() => import("../pages/pages/DetalleSiniestro"));


const PlanesProductos = async(() => import("../pages/pages/PlanesProductos"));

const SubPlanes = async(() => import("../pages/pages/SubPlanes"));

const Bancos = async(() => import("../pages/pages/Bancos"));
const Tarjetas = async(() => import("../pages/pages/Tarjetas"));
const TiposCuentasDeposito = async(() => import("../pages/pages/TiposCuentaDeposito"));
const TiposMediosPago = async(() => import("../pages/pages/TiposMediosPago"));
const MediosDeposito = async(() => import("../pages/pages/MediosDepositos"));
const MediosPago = async(() => import("../pages/pages/MediosPago"));
const VigenciasActivas = async(() => import("../pages/pages/VigenciasActivas"));
const Ubicaciones = async(() => import("../pages/pages/Ubicaciones"));
const Autos = async(() => import("../pages/pages/Autos"));
const TarifasAuto = async(() => import("../pages/pages/TarifasAuto"));

const Liquidaciones = async(() => import("../pages/pages/LiquidacionBitacora"));
const EstadosLiquidaciones = async(() => import("../pages/pages/EstadosLiquidaciones"));
const CausalesSiniestros = async(() => import("../pages/pages/CausalesSiniestros"));
const BitacoraSiniestros = async(() => import("../pages/pages/BitacoraSiniestro"));
const CoberturaCotizacion = async(() => import("../pages/pages/CoberturaCotizacion"));
const EstadoCotizacion = async(() => import("../pages/pages/EstadoCotizacion"));
const VigenciaCotizacion = async(() => import("../pages/pages/VigenciaCotizacion"));
const MultimediaCotizacion = async(() => import("../pages/pages/MultimediaCotizacion"));
const MultimediaPoliza = async(() => import("../pages/pages/MultimediaPoliza"));
const CoberturaPoliza = async(() => import("../pages/pages/CoberturaPoliza"));
const CobroPoliza = async(() => import("../pages/pages/CobroPoliza"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));
const APICalls = async(() => import("../pages/docs/APICalls"));
const ESLintAndPrettier = async(() =>
  import("../pages/docs/ESLintAndPrettier")
);
const Support = async(() => import("../pages/docs/Support"));
const Changelog = async(() => import("../pages/docs/Changelog"));

// Landing
const Landing = async(() => import("../pages/presentation/Landing"));

// Protected routes
const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  header: "Pages",
  icon: <Sliders />,
  component: Default,
};



const pagesRoutes = {
  id: "BACK-API",
  path: "/",
  icon: <Grid />,
  children: [

    {
      path: "/pages/products",
      name: "Productos",
      component: Products,
    },
    {
      path: "/pages/actividades",
      name: "Actividades",
      component: Actividades,
    },
    {
      path: "/pages/planes",
      name: "Planes",
      component: PlanesProductos,
    },
    {
      path: "/pages/subplanes",
      name: "SubPlanes",
      component: SubPlanes,
    },
    {
      path: "/pages/tarifas",
      name: "Tarifas",
      component: Tarifas,
    },
    {
      path: "/pages/coberturas",
      name: "Coberturas",
      component: CoberturasProductos,
    },

    {
      path: "/pages/siniestros/:id",
      name: "Detalle siniestro",
      component: DetalleSiniestro,
    },
    {
      path: "/pages/polizas/:id",
      name: "Detalle poliza",
      component: DetallePoliza,
    },


    {
      path: "/pages/siniestros",
      name: "Siniestros",
      component: Siniestros,
    },
    {
      path: "/pages/polizas",
      name: "Polizas",
      component: Polizas,
    },
    {
      path: "/pages/cotizaciones",
      name: "Cotizaciones",
      component: Cotizaciones,
    },
    {
      path: "/pages/usuarios",
      name: "Usuarios",
      component: Usuarios,
    },
  ],
  component: null,

};

const projectsRoutes = {
  id: "GLOBALES",
  path: "/",
  icon: <Grid />,
  children: [
    {
      path: "/globales/bancos",
      name: "Bancos",
      component: Bancos,
    },
    {
      path: "/globales/tarjetas",
      name: "Tarjetas",
      component: Tarjetas,
    }, {
      path: "/globales/cuentas_deposito",
      name: "Tipo cuentas depositos",
      component: TiposCuentasDeposito,
    },
    {
      path: "/globales/tipos_pago",
      name: "Tipos Medios Pago",
      component: TiposMediosPago,
    },
    {
      path: "/globales/medios_depositos",
      name: "Medios de depositos",
      component: MediosDeposito,
    },
    {
      path: "/globales/medios_pagos",
      name: "Medio de pago",
      component: MediosPago,
    },
    {
      path: "/globales/vigencias_activas",
      name: "Vigencia activa",
      component: VigenciasActivas,
    },

    {
      path: "/globales/ubicaciones",
      name: "Ubicaciones",
      component: Ubicaciones,
    },
    {
      path: "/globales/autos",
      name: "Autos",
      component: Autos,
    },
    {
      path: "/globales/tarifas_autos",
      name: "Tarifas auto",
      component: TarifasAuto,
    },
    {
      path: "/globales/bitacora_siniestros",
      name: "Bitacora siniestro",
      component: BitacoraSiniestros,
    },
    {
      path: "/globales/liquidaciones_bitacora",
      name: "Liquidacion bitacora",
      component: Liquidaciones,
    },
    {
      path: "/globales/estado_liquidaciones",
      name: "Estados liquidacion",
      component: EstadosLiquidaciones,
    },
    {
      path: "/globales/causales_siniestros",
      name: "Causales siniestros",
      component: CausalesSiniestros,
    },
    {
      path: "/globales/cobertura_cotizacion",
      name: "Cobertura cotizacion",
      component: CoberturaCotizacion,
    },
    {
      path: "/globales/estado_cotizacion",
      name: "Estado cotizacion",
      component: EstadoCotizacion,
    },

    {
      path: "/globales/vigencia_activa",
      name: "Vigencia cotizacion",
      component: VigenciaCotizacion,
    },
    {
      path: "/globales/multimedia_cotizacion",
      name: "Multimedia cotizacion",
      component: MultimediaCotizacion,
    },
    {
      path: "/globales/multimedia_poliza",
      name: "Multimedia poliza",
      component: MultimediaPoliza,
    },
    {
      path: "/globales/cobertura_poliza",
      name: "Cobertura poliza",
      component: CoberturaPoliza,
    },
    {
      path: "/globales/cobro_poliza",
      name: "Cobro poliza",
      component: CobroPoliza,
    },
  ],
};

const invoiceRoutes = {
  id: "Invoices",
  path: "/invoices",
  icon: <CreditCard />,
  children: [
    {
      path: "/invoices",
      name: "List",
      component: InvoiceList,
    },
    {
      path: "/invoices/detail",
      name: "Details",
      component: InvoiceDetails,
    },
  ],
  component: null,
};

const orderRoutes = {
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
};

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  children: null,
};

const calendarRoutes = {
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/alerts",
      name: "Alerts",
      component: Alerts,
    },
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
    },
    {
      path: "/components/pagination",
      name: "Pagination",
      component: Pagination,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
    },
  ],
  component: null,
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
    },
    {
      path: "/forms/dropzone",
      name: "Dropzone",
      component: Dropzone,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
    },
    {
      path: "/forms/formik",
      name: "Formik",
      component: Formik,
    },
  ],
  component: null,
};

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
    },
    {
      path: "/tables/data-grid",
      name: "Data Grid",
      component: DataGrid,
    },
  ],
  component: null,
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
  component: null,
};

const landingRoutes = {
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Landing,
  children: null,
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  header: "Material App",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/documentation/getting-started",
      name: "Getting Started",
      component: GettingStarted,
    },
    {
      path: "/documentation/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
    },
    {
      path: "/documentation/deployment",
      name: "Deployment",
      component: Deployment,
    },
    {
      path: "/documentation/theming",
      name: "Theming",
      component: Theming,
    },
    {
      path: "/documentation/state-management",
      name: "State Management",
      component: StateManagement,
    },
    {
      path: "/documentation/api-calls",
      name: "API Calls",
      component: APICalls,
    },
    {
      path: "/documentation/eslint-and-prettier",
      name: "ESLint & Prettier",
      component: ESLintAndPrettier,
    },
    {
      path: "/documentation/support",
      name: "Support",
      component: Support,
    },
  ],
  component: null,
};

const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v2.0.0",
  icon: <List />,
  component: Changelog,
  children: null,
};

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  documentationRoutes,
  changelogRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  pagesRoutes,
  projectsRoutes,
  invoiceRoutes,
  calendarRoutes,
  authRoutes,
  changelogRoutes,
];
