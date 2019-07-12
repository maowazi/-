import {Home,HomeTuijian,HomeRege,HomeResou,Order,TuijinaXiangqing} from "../components/views/views";

const viewRouter = [
    {
        pathName:"/home",
        component:Home
    },
    {
        pathName:"/order",
        component:Order
    },
    {
        pathName:"/tuijianxiangqing",
        component:TuijinaXiangqing
    }
]
const Homeview = [
    {
        pathName:"/home/tuijian",
        component:HomeTuijian
    },
    {
        pathName:"/home/rege",
        component:HomeRege
    },
    {
        pathName:"/home/resou",
        component:HomeResou
    },

]
export {
    viewRouter,
    Homeview
}