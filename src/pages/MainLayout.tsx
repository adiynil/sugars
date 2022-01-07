import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'tdesign-react'
import Logo from '../components/logo'

export default function MainLayout(props: any) {
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState('/')
  return (
    <main>
      <Layout>
        <Layout.Header>
          <Menu.HeadMenu
            theme='dark'
            value={location.pathname}
            expandType='popup'
            logo={<Logo />}
            onChange={(v: any) => {
              setActive(v)
              navigate(v)
            }}
            style={{ padding: '0 30px' }}
          >
            <Menu.MenuItem value='/'>Home</Menu.MenuItem>
            <Menu.SubMenu title='Pages'>
              <Menu.MenuItem value='/a'>PageA</Menu.MenuItem>
              <Menu.MenuItem value='/b'>PageB</Menu.MenuItem>
            </Menu.SubMenu>
            <Menu.MenuItem value='/page'>404</Menu.MenuItem>
          </Menu.HeadMenu>
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
        <Layout.Footer>
          Copyright @ 2019-Present Adiynil. All Rights Reserved
        </Layout.Footer>
      </Layout>
    </main>
  )
}
