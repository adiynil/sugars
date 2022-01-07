import React, { Component, ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'
import { setTitle, uuid } from './utils/index'
import {
  BrowserRouter as Router,
  NavigateFunction,
  Outlet,
  Route,
  RouteProps,
  Routes,
  useLocation,
  useNavigate,
  useRoutes
} from 'react-router-dom'
import Logo from './components/logo'
import './layout.css'
import { Layout, Menu } from 'tdesign-react'

const { Header, Content, Footer } = Layout

const rootElement = document.getElementById('root')

function Page(props: any) {
  return <h1>Page{props.name}</h1>
}

function App(props: any) {
  return <h1>App</h1>
}

function NotFound() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1>404 Not Found</h1>
      <p>There is nothing here.</p>
    </main>
  )
}
function MainLayout(props: any) {
  const [active, setActive] = useState('/')
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <Layout>
        <Header>
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
            <Menu.SubMenu value='/403' title='Pages'>
              <Menu.MenuItem value='/a'>PageA</Menu.MenuItem>
              <Menu.MenuItem value='/b'>PageB</Menu.MenuItem>
            </Menu.SubMenu>
            <Menu.MenuItem value='/404'>404</Menu.MenuItem>
          </Menu.HeadMenu>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Copyright @ 2019-Present Adiynil. All Rights Reserved</Footer>
      </Layout>
    </>
  )
}

interface CustomRoute {
  name?: string
  path?: string
  redirect?: string
  element?: JSX.Element
  children?: CustomRoute[]
  meta?: any
}
const routes: Array<CustomRoute> = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />,
        meta: { title: 'App' },
        children: [
          { path: 'a', element: <Page name='A' />, meta: { title: 'PageA' } },
          { path: 'b', element: <Page name='B' />, meta: { title: 'PageB' } },
          {
            path: '404',
            element: <NotFound />,
            meta: { title: '404' }
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />,
        meta: { title: '404' }
      }
    ]
  }
]

function generateRouter(routes: Array<CustomRoute>): JSX.Element {
  const reRenderElement = (Element: any, meta: any) => {
    return function (props: any) {
      meta.title && setTitle(meta.title)
      return <>{Element}</>
    }
  }
  const mapRoute = (r: CustomRoute) => {
    if (r.element && r.meta) {
      const NewElement = reRenderElement(r.element, r.meta)
      r.element = <NewElement />
    }
    const hasPath = (r: any) => r.hasOwnProperty('path')
    const hasElement = (r: any) => r.hasOwnProperty('element')
    const hasChildren = (r: any) => r.hasOwnProperty('children')
    const isLayout = (r: any) => hasElement(r) && !hasPath(r)
    const prop: RouteProps = {}
    hasPath(r) && (prop.path = r.path)
    if (isLayout(r) || !hasChildren(r)) prop.element = r.element
    return (
      <Route key={uuid()} {...prop}>
        {hasChildren(r) && mapRoutes(r.children!)}
        {hasPath(r) && hasElement(r) && hasChildren(r) && (
          <Route index element={r.element!} />
        )}
      </Route>
    )
  }
  const mapRoutes = (rs: Array<CustomRoute>) => rs.map(mapRoute)
  return (
    <Router>
      <Routes>{mapRoutes(routes)}</Routes>
    </Router>
  )
}

// ReactDOM.render(
//   <Router>
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path='/'>
//           <Route path='a' element={<Page name='A' />} />
//           <Route path='b' element={<Page name='B' />} />
//           <Route index={true} element={<App />} />
//         </Route>
//         <Route path='404' element={<NotFound />} />
//         <Route path='*' element={<NotFound />} />
//       </Route>
//     </Routes>
//   </Router>,
//   rootElement
// )
ReactDOM.render(generateRouter(routes), rootElement)
