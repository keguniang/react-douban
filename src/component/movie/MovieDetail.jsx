import React from 'react'

import { Spin, Alert, Button } from 'antd';
// 导入fetch-jsonp
import fetchJsonp from 'fetch-jsonp'

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,//表示是否正在加载
            id: props.match.params.id,//电影的id
            info: {}
        }
    }
    render() {
        return <div>
            {this.renderDetail()}
        </div>
    }

    UNSAFE_componentWillMount() {
        this.loadMovieDetailById()
    }

    // 通过电影id获取电影详情
    loadMovieDetailById = () => {
        // https://api.douban.com/v2/movie/subject/:id
        let url = `https://douban.uieee.com/v2/movie/subject/?id=${this.state.id}`
        // 默认的fetch受到跨域限制，无法直接使用。这时使用第三方包fetch-jsonp来发送JSONP请求，用法和fetch完全一致
        fetchJsonp(url).then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isLoading: false,//数据加载完毕
                    info: data
                })
            })
    }

    // 渲染电影列表
    renderDetail = () => {
        if (this.state.isLoading) {//正在加载，说明数据还没有请求完成
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影详情"
                    description="精彩内容，稍后呈现....."
                    type="info"
                />
            </Spin>
        } else {//为false，说明数据加载完成
            return <div>
                <Button type="primary" onClick={this.goBack}> 《返回详情列表页面</Button>
                <div style={{textAlign:'center'}}>
                    <h1>{this.state.info.title}</h1>
                    <img src={this.state.info.large} alt="" />
                </div>

                <p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }

    // 后退按钮
    goBack = () => {
        this.props.history.goBack()
    }
}