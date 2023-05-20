import { Layout, Menu, Popconfirm } from 'antd'
import {
 HomeOutlined,
 DiffOutlined,
 EditOutlined,
 LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'


const { Header, Sider } = Layout

function Main () {
 const location = useLocation()
 console.log(location)
 const navigate = useNavigate()
 const { userStore, loginStore } = useStore()
 //副作用函数
 useEffect(() => {
  //获取用户信息
  userStore.getUser()
 }, [userStore])
 //退出登录
 const onQuit = () => {
  loginStore.logOut()
  //跳转到登录页
  navigate('/login', { replace: true })
 }
 return (
  <Layout>
   <Header className="header">
    <div className="logo" />
    <div className="user-info">
     <span className="user-name">{userStore.userinfo.name}</span>
     <span className="user-logout">
      <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onQuit}>
       <LogoutOutlined /> 退出
      </Popconfirm>
     </span>
    </div>
   </Header>
   <Layout>
    <Sider width={200} className="site-layout-background">
     <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[location.pathname]}
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
     >
      <Menu.Item icon={<HomeOutlined />} key="/">
       <Link to="/">数据概览</Link>
      </Menu.Item>
      <Menu.Item icon={<DiffOutlined />} key="/Admin/Cms">
       <Link to="/Admin/Cms">内容管理</Link>
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />} key="/Admin/Artical">
       <Link to="/Admin/Artical">发布文章</Link>
      </Menu.Item>
     </Menu>
    </Sider>
    <Layout className="layout-content" style={{ padding: 20 }}>
     {/* 二级路由默认页面 */}
     <Outlet />
    </Layout>
   </Layout>
  </Layout>
 )
}

export default observer(Main)