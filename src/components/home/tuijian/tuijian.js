import React from "react";
import {Link} from "react-router-dom";
import { fetch as fetchPolyfill } from "whatwg-fetch";
import {connect} from "react-redux";
import idaction from "../../../dispach/dispachcation/dispachation";
import "./tuijian.css"
class Tuijian extends React.Component {
    constructor() {
        super();
        this.state = {
            datalist: [],
            tuijianlist: []
        }
    }
    render() {
        let { datalist, tuijianlist } = this.state
        return (
            <div>
                <div className='tuijian'>推荐歌单</div>
                <div className='tuijianlist'>
                    {
                        datalist.map((item, index) => (
                            <div className='imgwarp' key={index}>
                                <div className='imgbox'>
                                    <img src={item.picUrl} alt='图片'/>
                                </div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='zuixinyinyue'>最新音乐</div>
                {
                    tuijianlist.map((item, index) => (
                        <Link to="/order" key={index}>
                        <div className='gedanlist'  onClick={this.props.handid.bind(this,item.id)}>
                            <div className='namelist'>
                                <span>{item.name}</span>
                                <span>{item.song.artists[0].name}</span>
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
        fetchPolyfill('http://47.100.53.108:8081/personalized')
            .then((res) => res.json())
            .then((data) => {
                let arr = data.result.splice(0, 6);
                this.setState({
                    datalist: arr
                })
            })
        fetchPolyfill('http://47.100.53.108:8081/personalized/newsong')
            .then((res) => res.json())
            .then((data) => {
                let arr = data.result;
                this.setState({
                    tuijianlist: arr
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
export default connect(mapStateToProps,mapDispatchToProps)(Tuijian)