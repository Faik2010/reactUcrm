// dashboard
import Analytics from "pages/Dashboards/Analytics";
import Ecommerce from "pages/Dashboards/Ecommerce";
import Email from "pages/Dashboards/Email";
import HRDashboard from "pages/Dashboards/HR";
import SocialMediaDashboard from "pages/Dashboards/SocialMedia";

// cashBox (örnek olarak bırakıldı)
import CashBoxAdd from "pages/cashBox/cashBoxAdd";
import CashBoxEdit from "pages/cashBox/cashBoxEdit";
import CashBoxList from "pages/cashBox/cashBoxList";

// Ui element
import UiAlert from "pages/Components/UIElement/UiAlert";
import UiAvatar from "pages/Components/UIElement/UIAvatar";
import UiButtons from "pages/Components/UIElement/UiButtons";
import UIDrawer from "pages/Components/UIElement/Drawer";
import UiModal from "pages/Components/UIElement/Modal";
import UiLabel from "pages/Components/UIElement/UILabel";
import UiCards from "pages/Components/UIElement/UiCards";
import UiCollapse from "pages/Components/UIElement/UiCollapse";
import UiCountdown from "pages/Components/UIElement/UiCountdown";
import UiDropdown from "pages/Components/UIElement/UiDropdown";
import UiGallery from "pages/Components/UIElement/UiGallery";
import UiLists from "pages/Components/UIElement/UiLists";
import UiNotification from "pages/Components/UIElement/UiNotification";
import UiSpinners from "pages/Components/UIElement/UiSpinners";
import UITimeline from "pages/Components/UIElement/UiTimeline";
import UiProgressBar from "pages/Components/UIElement/UiProgressBar";
import UITooltip from "pages/Components/UIElement/UiTooltip";
import UiVideo from "pages/Components/UIElement/UiVideo";

// plugins
import PSimpleBar from "pages/Components/Plugins/Simplebar";
import PLightBox from "pages/Components/Plugins/Lightbox";
import SwiperSlider from "pages/Components/Plugins/SwiperSlider";
import ScrollHint from "pages/Components/Plugins/ScrollHint";
import VideoPlayer from "pages/Components/Plugins/VideoPlayer";

// navbar
import NavBars from "pages/Components/Navigation/Navbars";
import NavTabs from "pages/Components/Navigation/Tabs";
import NavigationBreadcrumb from "pages/Components/Navigation/NavigationBreadcrumb";
import Pagination from "pages/Components/Navigation/Pagination";

// forms
import FormsBasic from "pages/Components/Forms/Basic";
import FormValidation from "pages/Components/Forms/Validation";
import InputMask from "pages/Components/Forms/InputMask";
import FormSelect from "pages/Components/Forms/Select";
import CheckboxRadio from "pages/Components/Forms/CheckboxRadio";
import FormSwitches from "pages/Components/Forms/Switches";
import FormWizard from "pages/Components/Forms/Wizard/FormWizard";
import FileUpload from "pages/Components/Forms/FileUpload";
import FormDatePicker from "pages/Components/Forms/Datepicker";
import FormTimePicker from "pages/Components/Forms/Timepicker";
import FormColorPicker from "pages/Components/Forms/Colorpicker";
import FormMultiSelect from "pages/Components/Forms/MultiSelect";
import FormInputSpin from "pages/Components/Forms/InputSpin";
import FormClipboard from "pages/Components/Forms/Clipboard";
import EditorClassic from "pages/Components/Forms/Editor/EditorClassic";
import BasicTable from "pages/Components/Table/Basic";
import ReactDataTable from "pages/Components/Table/ReactTable";
import RemixIcon from "pages/Components/Icons/Remix";
import LucidIcon from "pages/Components/Icons/Lucide";
import MapsGoogle from "pages/Components/MapsGoogle";
import MapsLeaflet from "pages/Components/MapsLeaflet";

//Charts (sadece temel chart tipleri bırakıldı)
import AreaCharts from "pages/ApexCharts/AreaCharts/index";
import BarCharts from "pages/ApexCharts/BarCharts";
import ColumnCharts from "pages/ApexCharts/ColumnCharts";
import LineChart from "pages/ApexCharts/LineCharts";
import PieChart from "pages/ApexCharts/PieCharts/Index";

// Landing
import OnePage from "pages/Components/Landing/Onepage";
import Product from "pages/Components/Landing/Product";

//Register
import BasicRegister from "pages/AuthenticationInner/Register/Basic";
import RegisterCover from "pages/AuthenticationInner/Register/RegisterCover";
import RegisterBoxed from "pages/AuthenticationInner/Register/RegisterBoxed";
import RegisterModern from "pages/AuthenticationInner/Register/RegisterModern";

// EmailVerify
import BasicEmailVerify from "pages/AuthenticationInner/VerifyEmail/Basic";
import EmailCover from "pages/AuthenticationInner/VerifyEmail/EmailCover";
import EmailModern from "pages/AuthenticationInner/VerifyEmail/EmailModern";

// TwoSteps
import BasicTwoSteps from "pages/AuthenticationInner/TwoSteps/Basic";
import TwoStepsCover from "pages/AuthenticationInner/TwoSteps/TwoStepsCover";
import TwoStepsBoxed from "pages/AuthenticationInner/TwoSteps/TwoStepsBoxed";
import TwoStepsModern from "pages/AuthenticationInner/TwoSteps/TwoStepsModern";

// Logout
import BasicLogout from "pages/AuthenticationInner/Logout/Basic";
import LogoutCover from "pages/AuthenticationInner/Logout/LogoutCover";
import LogoutBoxed from "pages/AuthenticationInner/Logout/LogoutBoxed";
import LogoutModern from "pages/AuthenticationInner/Logout/LogoutModern";

// Reset Password
import BasicResetPassword from "pages/AuthenticationInner/ResetPassword/Basic";
import ResetPasswordCover from "pages/AuthenticationInner/ResetPassword/ResetPasswordCover";
import ResetPasswordBoxed from "pages/AuthenticationInner/ResetPassword/ResetPasswordBoxed";
import ResetPasswordModern from "pages/AuthenticationInner/ResetPassword/ResetPasswordModern";

// Create Password
import BasicCreatePassword from "pages/AuthenticationInner/CreatePassword/Basic";
import CreatePasswordModern from "pages/AuthenticationInner/CreatePassword/CreatePasswordModern";
import CreatePasswordCover from "pages/AuthenticationInner/CreatePassword/CreatePasswordCover";
import CreatePasswordBoxed from "pages/AuthenticationInner/CreatePassword/CreatePasswordBoxed";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Pages404 from "pages/AuthenticationInner/Pages404";
import UserProfile from "pages/Authentication/UserProfile";
import ComingSoon from "pages/AuthenticationInner/ComingSoon";
import Offline from "pages/AuthenticationInner/Offline";
import Maintenance from "pages/AuthenticationInner/Maintenance";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Analytics },
  { path: "/dashboard-analytics", component: Analytics },
  { path: "/dashboard-ecommerce", component: Ecommerce },
  { path: "/dashboard-email", component: Email },
  { path: "/dashboard-hr", component: HRDashboard },
  { path: "/dashboard-social-media", component: SocialMediaDashboard },

  // CashBox (örnek modül)
  { path: "/cashbox-list", component: CashBoxList },
  { path: "/cashbox-add", component: CashBoxAdd },
  { path: "/cashbox-edit", component: CashBoxEdit },

  // Ui Element
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-avatar", component: UiAvatar },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-label", component: UiLabel },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-collapse", component: UiCollapse },
  { path: "/ui-countdown", component: UiCountdown },
  { path: "/ui-drawer", component: UIDrawer },
  { path: "/ui-dropdown", component: UiDropdown },
  { path: "/ui-gallery", component: UiGallery },
  { path: "/ui-lists", component: UiLists },
  { path: "/ui-notification", component: UiNotification },
  { path: "/ui-modal", component: UiModal },
  { path: "/ui-spinners", component: UiSpinners },
  { path: "/ui-timeline", component: UITimeline },
  { path: "/ui-progress-bar", component: UiProgressBar },
  { path: "/ui-tooltip", component: UITooltip },
  { path: "/ui-video", component: UiVideo },

  // plugins
  { path: "/plugins-simplebar", component: PSimpleBar },
  { path: "/plugins-lightbox", component: PLightBox },
  { path: "/plugins-swiper-slider", component: SwiperSlider },
  { path: "/plugins-scroll-hint", component: ScrollHint },
  { path: "/plugins-video-player", component: VideoPlayer },

  // navigation
  { path: "/navigation-navbars", component: NavBars },
  { path: "/navigation-tabs", component: NavTabs },
  { path: "/navigation-breadcrumb", component: NavigationBreadcrumb },
  { path: "/navigation-pagination", component: Pagination },

  // Forms
  { path: "/forms-basic", component: FormsBasic },
  { path: "/forms-validation", component: FormValidation },
  { path: "/forms-input-mask", component: InputMask },
  { path: "/forms-select", component: FormSelect },
  { path: "/forms-checkbox-radio", component: CheckboxRadio },
  { path: "/forms-switches", component: FormSwitches },
  { path: "/forms-wizard", component: FormWizard },
  { path: "/forms-file-upload", component: FileUpload },
  { path: "/forms-datepicker", component: FormDatePicker },
  { path: "/forms-timepicker", component: FormTimePicker },
  { path: "/forms-colorpicker", component: FormColorPicker },
  { path: "/forms-multi-select", component: FormMultiSelect },
  { path: "/forms-input-spin", component: FormInputSpin },
  { path: "/forms-clipboard", component: FormClipboard },
  { path: "/forms-editor-classic", component: EditorClassic },

  // Table
  { path: "/tables-basic", component: BasicTable },
  { path: "/tables-datatable", component: ReactDataTable },

  // Icons
  { path: "/icons-remix", component: RemixIcon },
  { path: "/icons-lucide", component: LucidIcon },

  // Map
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-leaflet", component: MapsLeaflet },

  //Charts (sadece temel tipler)
  { path: "/charts-apex-area", component: AreaCharts },
  { path: "/charts-apex-bar", component: BarCharts },
  { path: "/charts-apex-column", component: ColumnCharts },
  { path: "/charts-apex-line", component: LineChart },
  { path: "/charts-apex-pie", component: PieChart },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // Landing
  { path: "/onepage-landing", component: OnePage },
  { path: "/product-landing", component: Product },

  // Register
  { path: "/auth-register-basic", component: BasicRegister },
  { path: "/auth-register-cover", component: RegisterCover },
  { path: "/auth-register-boxed", component: RegisterBoxed },
  { path: "/auth-register-modern", component: RegisterModern },

  // Verify Email
  { path: "/auth-verify-email-basic", component: BasicEmailVerify },
  { path: "/auth-verify-email-cover", component: EmailCover },
  { path: "/auth-verify-email-modern", component: EmailModern },

  // two steps
  { path: "/auth-two-steps-basic", component: BasicTwoSteps },
  { path: "/auth-two-steps-cover", component: TwoStepsCover },
  { path: "/auth-two-steps-boxed", component: TwoStepsBoxed },
  { path: "/auth-two-steps-modern", component: TwoStepsModern },

  // logout
  { path: "/auth-logout-basic", component: BasicLogout },
  { path: "/auth-logout-cover", component: LogoutCover },
  { path: "/auth-logout-boxed", component: LogoutBoxed },
  { path: "/auth-logout-modern", component: LogoutModern },

  //Reset Password
  { path: "/auth-reset-password-basic", component: BasicResetPassword },
  { path: "/auth-reset-password-cover", component: ResetPasswordCover },
  { path: "/auth-reset-password-boxed", component: ResetPasswordBoxed },
  { path: "/auth-reset-password-modern", component: ResetPasswordModern },

  //Create Password
  { path: "/auth-create-password-basic", component: BasicCreatePassword },
  { path: "/auth-create-password-cover", component: CreatePasswordCover },
  { path: "/auth-create-password-boxed", component: CreatePasswordBoxed },
  { path: "/auth-create-password-modern", component: CreatePasswordModern },

  // auth
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },

  // errors
  { path: "/auth-404", component: Pages404 },
  { path: "/auth-offline", component: Offline },
  { path: "/auth-maintenance", component: Maintenance },
  { path: "/coming-soon", component: ComingSoon },
];

export { authProtectedRoutes, publicRoutes };
