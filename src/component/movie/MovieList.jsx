import React from 'react'
// 导入fetch-jsonp
import fetchJsonp from 'fetch-jsonp'

// 导入加载中的组件
import { Spin, Alert, Pagination } from 'antd';
// 导入电影项组件
import MovieItem from '@/component/movie/MovieItem'
import { func } from 'prop-types';
export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,//表示是否正在加载
            movies: [],//电影列表数据
            nowPage: parseInt(props.match.params.page) || 1,//当前展示第几页的数据
            total: 0,//总共多少页的数据
            movieType: props.match.params.type,//电影 类型
            pageSize: 12,//一页多少条数据
        }
    }

    UNSAFE_componentWillMount() {
        this.loadMovieListByTypeAndPage()//这里只调用了一次
    }

    // 接受新的属性
    UNSAFE_componentWillReceiveProps(nextProps) {
        // 注意this.setState()是异步的，第二个参数是回调函数
        this.setState({
            isLoading: true,//表示是否正在加载
            nowPage: parseInt(nextProps.match.params.page) || 1,//当前展示第几页的数据
            movieType: nextProps.match.params.type,//电影 类型
        }, () => {
            this.loadMovieListByTypeAndPage()
        })
    }

    render() {
        return <div>
            {this.renderList()}
        </div>
    }

    // 通过电影类型和页码获取电影数据
    loadMovieListByTypeAndPage = () => {
        // 数据的开始索引
        const start = this.state.pageSize * (this.state.nowPage - 1)
        let url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
        // 默认的fetch受到跨域限制，无法直接使用。这时使用第三方包fetch-jsonp来发送JSONP请求，用法和fetch完全一致
        fetchJsonp(url).then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isLoading: false,//数据加载完毕
                    total: data.total,
                    movie: data.subjects
                })
            })
    }

    // 渲染电影列表
    renderList = () => {
        if (this.state.isLoading) {//正在加载，说明数据还没有请求完成
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影列表"
                    description="精彩内容，稍后呈现....."
                    type="info"
                />
            </Spin>
        } else {//为false，说明数据加载完成
            return <div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.movie.map(item => {
                        return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                    })}
                </div>
                <Pagination style={{float:'right'}} defaultCurrent={this.state.nowPage} total={this.state.total} defaultPageSize={this.state.pageSize} onChange={this.pageChange} onShowSizeChange={this.pageSizeChange}/>
            </div>
        }
    }

    // 分页导航中页码改变的事件
    pageChange = (page)=>{
        // 也可以操作BOM实现路由的跳转
        // window.location = `/#/movie/${this.state.movieType}/${page}`
        // 编程式路由导航
        this.props.history.push(`/movie/${this.state.movieType}/${page}`)
    }

    // 页数改变的事件
    pageSizeChange = (current, size)=>{
        this.setState({
            pageSize: size
        },()=>{
            this.props.history.push(`/movie/${this.state.movieType}/1`)
        })
    }
}
// 当使用fetch API获取数据时，第一个.then获取不到数据，拿到的是一个Response对象，我们可以调用response.json()得到一个新的promise