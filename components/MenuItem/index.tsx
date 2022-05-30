import React from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import style from './menuitem.module.css'

export type MenuItemProps = {
  name: string;
}

const MenuItem = ({ name } : MenuItemProps) => {
  const { pathname } = useRouter()
  const href = name.toLowerCase()
  const isActive = pathname == href

  const computedStyle = isActive? `${style.li} ${style.active}` : style.li

  return (<li className={computedStyle}>
            <Link href={`/${href}`}>
              {name}
            </Link>
          </li>)
}

export default MenuItem
