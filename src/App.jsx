// 这是项目的根组件

import React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

// 导入需要的antd组件
import { Layout, Menu} from 'antd';
const { Header, Content, Footer } = Layout;

// 引入样式表
import appObj from '@/css/app.scss'

// 引入路由相关的组件
import AboutContainer from '@/component/about/AboutContainer'
import HomeContainer from '@/component/home/HomeContainer'
import MovieContainer from '@/component/movie/MovieContainer'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <HashRouter>
            <Layout className='layout'>
                <Header>
                    <div className={appObj.logo} />
                    {/* 在路由中得到hash值赋值给默认选中的选项，使页面刷新时还是路由对应的页面 */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[1]]}>
                        <Menu.Item key="home">
                            <Link to='/home' >首页</Link>
                        </Menu.Item>
                        <Menu.Item key="movie">
                            <Link to='/movie/in_theaters/1'>电影</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to='/about'>关于</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className={appObj['site-layout-content']}>
                        <Route path='/home' component={HomeContainer}></Route>
                        <Route path='/movie' component={MovieContainer}></Route>
                        <Route path='/about' component={AboutContainer}></Route>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </HashRouter>
    }
}