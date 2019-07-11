import React from "react";
import { fetch as fetchPolyfill } from "whatwg-fetch";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import idaction from "../../../dispach/dispachcation/dispachation";
import "./rege.css"
class Rege extends React.Component{
    constructor(){
        super();
        this.state = {
            url:'',
            datalist:[]
        }
    }
    render(){
        let {url,datalist} = this.state;
        return(
            <div>
                <div className='imgbox'>
                    <img src={url} alt='图片'/>
                </div>
                {
                    datalist.map((item, index) => (
                        <Link to='/order' key={index}>
                        <div className='gedanlist' onClick={this.props.handid.bind(this,item.id)}>
                            <div className='namelist'>
                                <span>{item.name}</span>
                                <span>{item.al.name}</span>
                            </div>
                            <i className='iconfont icon-shipin'></i>
                        </div>
                        </Link>
                    ))
                }
                
            </div>
        )
    }
    componentDidMount() {
        fetchPolyfill('http://47.100.53.108:8081/top/list?idx=1')
            .then((res) => res.json())
            .then((data) => {
                let url = data.playlist.coverImgUrl;
                let datalist = data.playlist.tracks;
                this.setState({
                    url:url,
                    datalist:datalist 
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
export default connect(mapStateToProps,mapDispatchToProps)(Rege)