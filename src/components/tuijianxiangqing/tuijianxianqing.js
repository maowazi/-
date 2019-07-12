import React,{Fragment} from "react";
import "./tuijianxiangqing.css";
import {fetch as fetchData} from "whatwg-fetch";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
class TuijianXiangqing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerdata:{},
            creatoravatarUrl:'',
            nickname:"",
            tags:[],
            tracks:[],
            flag:true
        }
    }
    render(){
        let {bannerdata,creatoravatarUrl,nickname,tags,tracks,flag} = this.state;
        return(
            <div>
                <div className='banner' style={{backgroundImage:`url(${bannerdata.coverImgUrl})`}}>
                        <div className='banner_left'>
                            <img src={bannerdata.coverImgUrl} alt='答题' />
                        </div>
                        <div className='banner_right'>
                            <h3>{bannerdata.name}</h3>
                            <p>
                                <img src={creatoravatarUrl} alt='答案' />
                                <span>{nickname}</span>
                            </p>
                        </div>
                </div>
                <div className='xiangqing'>
                    <div className='xiangqing_box1'>
                        <p>标签 : {tags.map((item,index)=><Fragment key={index}><span>{item}</span></Fragment>)}</p>
                    </div>
                    <div>
                        <p>简介 : <span>{bannerdata.name}</span></p>
                    </div>
                    <div>
                        {
                            flag?<p className='shenglue'>{bannerdata.description}</p>:<p>{bannerdata.description}</p>
                        }
                    </div>
                    <div className='I_box'>
                        <i className='iconfont icon-xiajiantou' onClick={this.handfalg.bind(this)}></i>

                    </div>
                </div>
                <div className='geqvliabiao'>歌曲列表</div>
                <div className='listcontent'>
                    {
                        tracks.map((item, index) => (
                            <Link key={index} to={{pathname:"/order",query:{id:item.id}}}>
                            <div className='lidtinner'>
                                <div className='listinner_left'>
                                    {index+1}
                                </div>
                                <div className='listinner_right'>
                                    <div>
                                        <div className='shenglue2'>{item.name}</div>
                                        <div>{item.ar[0].name}{item.al.name}</div>
                                    </div>
                                    <div className='iconfont icon-shipin'>

                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))
                    }
                    
                </div>
            </div>
        )
    }
    componentDidMount(){
        let id = this.props.location.query?this.props.location.query.id:window.sessionStorage.getItem("id");
        fetchData("http://47.100.53.108:8081/playlist/detail?id="+id)
            .then((res)=>res.json())
            .then((data)=>{
                this.setState({
                    bannerdata:data.playlist,
                    creatoravatarUrl:data.playlist.creator.avatarUrl,
                    nickname:data.playlist.creator.nickname,
                    tags:data.playlist.tags,
                    tracks:data.playlist.tracks
                })
                window.sessionStorage.setItem("id",id);
            })
    }
    handfalg(e){
        let evet = e.target
        if(this.state.flag){
            this.setState({
                flag:false
            })
            evet.className = "iconfont icon-shangjiantou";
        }else{
            this.setState({
                flag:true
            })
            evet.className = "iconfont icon-xiajiantou"
        }
    }
}
const mapStateToProps = (state)=>({

})
const mapDispatchToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(TuijianXiangqing)