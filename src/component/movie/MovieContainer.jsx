import React from 'react'

// 导入antd相关的组件
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;


import { Link, Route, Switch } from 'react-router-dom'
// 引入电影组件
import MovieList from '@/Component/movie/MovieList'
import MovieDetail from '@/Component/movie/MovieDetail'

export default class MovieContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return <Layout style={{ height: '100%' }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="in_theaters">
                        <Link to='/movie/in_theaters/1'>正在热映</Link>
                    </Menu.Item>
                    <Menu.Item key="coming_soon">
                        <Link to='/movie/coming_soon/1'>即将上映</Link>
                    </Menu.Item>
                    <Menu.Item key="top250">
                        <Link to='/movie/top250/1'>Top250</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className='site-layout-background'
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {/* 左侧的三个链接因为排版相同，所以共用一个组件，只是数据不同 */}
                    {/* 电影列表 */}
                    {/* 即使使用了精确匹配exact，也会从上到下将所有的路由规则匹配一遍 */}
                    {/* 使用路由中的switch组件，能够指定，如果前边的路由规则优先匹配到了，则放弃后续路由的匹配 */}
                    <Switch>
                        <Route exact path='/movie/detail/:id' component={MovieDetail}></Route>
                        <Route exact path='/movie/:type/:page' component={MovieList}></Route>

                    </Switch>

                </Content>
            </Layout>
        </Layout>
    }
}