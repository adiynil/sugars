import { Component } from 'react'

import { Layout, Menu, Breadcrumb, DatePicker, Button } from 'antd'
import Logo from './components/logo'

const { Header, Content, Footer } = Layout

interface AppState {
  count: number
  total: number
}

class App extends Component {
  state: AppState
  constructor(props: any) {
    super(props)
    this.state = { count: 0, total: 20 }
  }
  componentDidMount() {}
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Logo />
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']}>
            <Menu.Item key='home'>Home</Menu.Item>
            <Menu.Item key='2'>PageA</Menu.Item>
            <Menu.Item key='3'>PageB</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 380 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default App
