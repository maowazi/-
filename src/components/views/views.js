import Loadable from "react-loadable";
import Loading from "../loading/loading";

const Home = Loadable({
    loader:()=>import("../home/home"),
    loading:Loading
})
const HomeTuijian = Loadable({
    loader:()=>import("../home/tuijian/tuijian"),
    loading:Loading  
})
const HomeRege = Loadable({
    loader:()=>import("../home/rege/rege"),
    loading:Loading  
})
const HomeResou = Loadable({
    loader:()=>import("../home/resou/resou"),
    loading:Loading  
})
const Order = Loadable({
    loader:()=>import("../order/order"),
    loading:Loading
})

export {
    Home,
    HomeTuijian,
    HomeRege,
    HomeResou,
    Order
}