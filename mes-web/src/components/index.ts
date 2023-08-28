import AddressSearchBar from "./address-search-bar";
import AppDrawer from "./app-drawer";
import ApprovalModal from "./approval-modal";
import Calendar from "./calendar";
import CardHeader from "./card-header";
import Draggable from "./draggable";
import DrawerForm from "./drawer-form";
import LayerControl from "./layer-control";
import LayoutBreadcrumb from "./layout-breadcrumb";
import LayoutFooter from "./layout-footer";
import LayoutHeader from "./layout-header";
import LayoutSider from "./layout-sider";
import LayoutSiderProject from "./layout-sider-project";
import MapEdit from "./map-edit";
import MapRender from "./map-render";
import PreviewCalendar from "./preview-calendar";

export {
  AddressSearchBar,
  AppDrawer,
  ApprovalModal,
  Calendar,
  CardHeader,
  Draggable,
  DrawerForm, LayerControl, LayoutBreadcrumb,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  LayoutSiderProject, MapEdit,
  MapRender,
  PreviewCalendar
};

export const tipColorList = [
  { label: "正常", color: "#02BF79", bgColor: "rgba(2,191,121,0.06)", value: "normal", },
  { label: "异常", color: "#BE0D0D", bgColor: "rgba(190,13,13,0.06)", value: "abnormal", },
  // { label: "未开始", color: "#E16A02", bgColor: "rgba(225,106,2,0.06)", value: "vacate",},
  { label: "未排班", color: "#DDE0E3", bgColor: "rgba(221,224,227,0.2)", value: "notask",},
  { label: "问题已解决", color: "#1D51F4", bgColor: "rgba(29,81,244,0.06)", value: "processed",}
]
