import React, { Fragment } from 'react'
import '../../styles/common/sidebar.scss'
import { NavLink, Navigate } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineProductionQuantityLimits, MdOutlineIncompleteCircle } from 'react-icons/md'
import { LiaJediOrder } from 'react-icons/lia'
import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
const SidebarC = () => {
  return (
    <Fragment>
      <div className='w-100 side-bar'>
        <img src={require('../../assets/images/Dashboard.jpg')} className='w-100 h-100' alt="" />
      </div>
      <div className='sidebar_navlink mt-3'>
        <ul>
          <NavLink to="/" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <RxDashboard /><span className='align-middle ms-2'>Dashboard</span>
            </li>
          </NavLink>


          <NavLink to="/product" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <MdOutlineProductionQuantityLimits /><span className='align-middle ms-2'>Product</span>
            </li>
          </NavLink>

          <NavLink to="/cart" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <BsCart4 /><span className='align-middle ms-2'>Cart</span>
            </li>
          </NavLink>

          <NavLink to="/orders" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <LiaJediOrder /><span className='align-middle ms-2'>Orders</span>
            </li>
          </NavLink>

          <NavLink to="/completedOrder" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <MdOutlineIncompleteCircle /><span className='align-middle ms-2'>Completed Order</span>
            </li>
          </NavLink>

          <NavLink to="/profile" className='sidebar_navlink_color text-decoration-none fs-5'>
            <li>
              <CgProfile /><span className='align-middle ms-2'>Profile</span>
            </li>
          </NavLink>

        </ul>
      </div>
    </Fragment>
  )
}

export default SidebarC