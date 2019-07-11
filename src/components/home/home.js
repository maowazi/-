import React,{Fragment} from "react";
import {NavLink,Redirect,Route} from "react-router-dom";
import "./home.css";
import t from "./images/t.png";
import {Homeview} from "../../router/router";

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <Fragment>
                <div className='home'>
                    <div className="home_box1"><img src={t} alt='图片'/><div>下载APP</div></div>
                    
                </div>
                <div className="home_box2">
                    <ul>
                        <li><NavLink to="/home/tuijian">推荐音乐</NavLink></li>
                        <li><NavLink to="/home/rege">热歌榜</NavLink></li>
                        <li><NavLink to="/home/resou">热搜</NavLink></li>
                    </ul>
                </div>
                {
                    Homeview.map((item,index)=>{
                        return <Route path={item.pathName} component={item.component} key={index}/>
                    })
                }
                <Redirect from="/home" to="/home/tuijian"/>
            </Fragment>
        )
    }
}
//http://47.100.53.108:8081 接口网址