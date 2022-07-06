import React, { FunctionComponent } from 'react'
import Sidebar from '../Sidebar'
import style from './layout.module.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps): FunctionComponent<LayoutProps> =>
  <div className={style.layout}>
    <Sidebar />
    <main>
      {props.children}
    </main>
  </div>

export default Layout
