import React from "react";
import "./resou.css";
import { fetch as fetchPolyfill } from "whatwg-fetch";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import idaction from "../../../dispach/dispachcation/dispachation";
class Resou extends React.Component{
    constructor(){
        super();
        this.state = {
            resuotuijian:[],
            flag:true,
            muzclist:[],

        }
    }
    render(){
        let {resuotuijian,flag,muzclist} = this.state;
        return(
            <div>
                <div className='serch'>
                    <div className='serchiner'>
                        <i className='iconfont icon-fangdajing'></i>
                        <input type='text' placeholder='搜索 歌名 歌手 专辑' onChange={this.handchange.bind(this)}/>
                    </div>
                </div>
                {
                    flag?<div>
                    <div className='remensuo'>热门搜索</div>
                    <div>
                        <ul className='libox'>
                            {
                                resuotuijian.map((item,index)=>(
                                    <li key={index}>{item.first}</li>

                                ))
                            }
                        </ul>
                    </div>
                </div>:<div>
                    <ul className='licontent'>
                        {
                            muzclist.map((item,index)=>(
                                <Link to='/order' key={index}>
                                <li  onClick={this.handid.bind(this,item.id)} onClick={this.props.handid.bind(this,item.id)}>
                                    <div>
                                        <span>{item.name}</span>
                                        <div>{item.artists[0].name}</div>
                                    </div>
                                    <i className='iconfont icon-shipin'></i>
                                </li>
                                </Link>
                            ))
                        }
                        
                    </ul>
                </div>
                }
                
                
            </div>
        )
    }
    timer=null
    handchange(e){
        let val = e.target.value;
        if(val !== ""){
            this.setState({
                flag:false
            })
            clearTimeout(this.timer)
            this.timer=setTimeout(()=>{
                fetchPolyfill('http://47.100.53.108:8081/search?keywords='+val+'&limit=10')
                .then((res) => res.json())
                .then((data) => {
                    let muzclist = data.result.songs;
                    this.setState({
                        muzclist:muzclist 
                    })
                })
            },300)
                
        }else{
            this.setState({
                flag:true
            })
        }
        

    }
    handid(id){
        console.log(id)
    }
    componentDidMount(){
        fetchPolyfill('http://47.100.53.108:8081/search/hot')
            .then((res) => res.json())
            .then((data) => {
                let resuotuijian = data.result.hots;
                this.setState({
                    resuotuijian:resuotuijian 
                })
            })
    }
}
const mapStateToProps = (state)=>({

})
const mapDispatchToProps = (dispatch)=>({
    handid(id){
        dispatch(idaction(id))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Resou)