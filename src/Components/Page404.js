import React from 'react'
import pageimg404 from '../images/404pageimg.png'
import logo from '../images/logo.png'
import './Page404.css'

const Page404 = () => {
  return (
    <div className='page-not-fount-cls-404'>
     <div className='images-not-found'><img src={logo} alt="logo"/></div>
      <div className='images-not-found'><img src={pageimg404} alt="pageimg404"/></div>
    </div>
  )
}

export default Page404
