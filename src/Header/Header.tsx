import React from 'react'
import Links from '../Links/Links';
import './Header.css';

interface HeaderProps {
    title:string;
}

export default function Header(prop:HeaderProps) {
  return (
    <div className='TitleBar'>
        <h1 className='Header'>
            {prop.title}
        </h1>

        <p>
            <Links/>
        </p>

    </div>
  )
}
