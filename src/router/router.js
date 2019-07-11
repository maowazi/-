import {Home,HomeTuijian,HomeRege,HomeResou,Order} from "../components/views/views";

const viewRouter = [
    {
        pathName:"/home",
        component:Home
    },
    {
        pathName:"/order",
        component:Order
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