import React from "react";
import m from "../home/images/t.png";
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { Slider} from 'antd';
import {connect} from "react-redux";
import { fetch as fetchPolyfill } from "whatwg-fetch";
import "./order.css"
class Order extends React.Component{
    constructor(){
        super();
        this.state={
            url:'',
            flag:"block",
            sum:"none",
            id:'',
            src:'',
            strTimerM:'',
            strUpdataTimer:'',
            timer:0,
            zongmiao:0,
            disabled:false,
            inputValue: 10,
            volume:10,
            visibility:'hidden'

        }
    }
    render(){
        let {url,flag,sum,src,strTimerM,strUpdataTimer,timer,disabled,volume,visibility} = this.state;
        
        return(
            <div className='content' style={{background:`url(${url}) no-repeat center center`}}>
                <div className='contentinner'>
                    <div className='imgbox'><img alt='图标' src={m}/><p>网易云音乐</p></div>
                    <div className='box'>
                        <div className='box1' onClick={this.handStop.bind(this)}>
                            <div className='box2' style={{backgroundImage:`url(${url})`}}>
                            </div>
                        </div>
                        <i className='iconfont icon-shipin' onClick={this.handStop.bind(this)} style={{display:`${flag}`}}></i>
                    </div>
                    <audio ref='audo' onDurationChange={this.handtimer.bind(this)} onTimeUpdate = {this.handtimerM.bind(this)} onPlaying={this.handUpdataJindu.bind(this)} onEnded={this.handend.bind(this)} controls src={src} hidden loop id='audo' timeupdate="updateTime"></audio>
                    <div className='jindutiao' style={{display:`${sum}`}}>
                        <Slider
                            min={0}
                            max={10}
                            onChange={this.onChangeYinliang.bind(this)}
                            value={volume}
                            disabled={disabled}
                            vertical
                            className="Yinliang"
                            style={{visibility:`${visibility}`}}
                        />
                        <i className='iconfont icon-xiaolaba' onClick={this.handYinyliang.bind(this)}></i>

                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={timer}
                        />
                        <div className='jindutiaoinner'>
                            <span>{strUpdataTimer}</span>
                            <Slider className='jindutiaobox' value={timer} onChange={this.onChange.bind(this)} disabled={disabled} />
                            <span>{strTimerM}</span>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
    flag=false
    timers = null;
    handStop(e){
        let audo = document.getElementById("audo");
        if(this.flag){        //停止播放
            e.target.parentNode.children[0].style.animationPlayState="paused";
            e.target.style.animationPlayState="paused";
            e.target.parentNode.style.animationPlayState="paused";
            audo.pause();
            this.flag=false;
            this.setState({
                flag:"block",
                sum:"none"
            })
            clearInterval(this.timers)
        }else{                      //开始播放
            e.target.style.animationPlayState="running";
            e.target.parentNode.style.animationPlayState="running";
            e.target.parentNode.children[0].style.animationPlayState="running";
            audo.play();
            this.flag=true;
            this.setState({
                flag:"none",
                sum:"block"
            })
            this.timers = setInterval(()=>{
                let yiTimer = audo.currentTime;
                let num = parseInt(yiTimer/this.state.zongmiao*100);
                this.setState({
                    timer:num
                })
                if(this.state.timer >= 100){
                    clearInterval(this.timers)
                }
            },1000)
        }
    }
    
    onChange(e){
        let audo = this.refs.audo;
        let zongmiao = this.state.zongmiao;
        let kuaijinmiao = parseInt(e/100);
        let num = e/100*zongmiao;
        audo.currentTime = num;
        this.setState({
            timer:kuaijinmiao
        })
        
        
    }
    onChangeYinliang(e){
        let audo = this.refs.audo;
        audo.volume = e/10;
        this.setState({
            volume:e
        })
    }
    startt = true
    handYinyliang(){
        if(this.startt){
            this.setState({
                visibility:"inherit"
            })
            this.startt = false;
        }else{
            this.setState({
                visibility:"hidden"
            })
            this.startt = true;
        }

    }
    componentDidMount(){
        // console.log(this.props.location.query);
        let id = this.props.id?this.props.id:this.props.location.query?this.props.location.query.id:window.sessionStorage.getItem("id");
        window.sessionStorage.setItem("id",id)
        fetchPolyfill('http://47.100.53.108:8081/song/detail?ids='+id)   //获取图片
            .then((res) => res.json())
            .then((data) => {
                
                let urls = data.songs.length > 0 ? data.songs[0].al.picUrl : window.sessionStorage.getItem('urls');
                this.setState({
                    url: urls
                })
                window.sessionStorage.setItem("urls",urls)
            })
        fetchPolyfill('http://47.100.53.108:8081/music/url?id='+id)  //获取音乐地址
        .then((res) => res.json())
        .then((data) => {
            let url = data.data.length > 0 ? data.data[0].url : window.sessionStorage.getItem("url");
            this.setState({
                src: url
            })
            window.sessionStorage.setItem("url",url)
        })
        // fetchPolyfill('http://47.100.53.108:8081/lyric?id='+id)  //获取歌词
        // .then((res) =>{console.log(res)})
        // .then((data) => {
        //     console.log(data)
        //     this.setState({
        //         // src: url
        //     })
        //     // window.sessionStorage.setItem("url",url)
        // })
        
    }
    componentDidUpdate(){

    }
    handtimer(e){           //获取总时长
        let timerM = e.target.duration;//总秒数
        let strTimerM = parseInt(parseInt(timerM)/60) + ":" + parseInt(timerM) % 60;
        this.setState({
            strTimerM:strTimerM,
            zongmiao:parseInt(timerM)
        })
    }

    handtimerM(e){           //获取已播放时长
        let UpdataTimer = e.target.currentTime;
        let strUpdataTimer = parseInt(parseInt(UpdataTimer)/60) + ":" + parseInt(UpdataTimer) % 60;
        
        this.setState({
            strUpdataTimer:strUpdataTimer
            
        })
        
    }
    handend(e){                          //结束执行一次
        let audo = document.getElementById("audo");
        let box1 = document.querySelector(".box1")
        box1.style.animationPlayState="paused";
            audo.pause();
            this.flag=false;
            this.setState({
                // flag:"block",
                // sum:"none",
                timer:0
            })
    }
    handUpdataJindu(){       //开始播放触发
        
    }
}
const mapStateToProps = (state)=>({
    id:state.storedata.id
})
const mapDispatchToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(Order)