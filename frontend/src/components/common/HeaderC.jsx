import React, { Fragment, useContext, useEffect } from 'react'
import '../../styles/common/header.scss'
import { Button, Container } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../redux/action/profileAction'
import { NavLink, useNavigate } from 'react-router-dom'
import { mainContext } from '../../App'
import { DUMMY2 } from '../../redux/type/type'
import Swal from 'sweetalert2'
const HeaderC = () => {
  let state = useSelector((state) => state)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])

  let navigate = useNavigate()
  let contextData = useContext(mainContext)
  const logOut = () => {
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Logout. Thank you For Visit',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.removeItem('token')
    contextData.setIsLogin(false)
    contextData.removecookies('token')
    navigate('/')
    dispatch({ type: DUMMY2 })
  }
  return (
    <Fragment>
      <Container fluid className='header'>
        <div className='d-flex justify-content-between'>
          <Button onClick={logOut} className='logout ms-2'>Logout</Button>
          <NavLink to="/profile" className='text-white text-decoration-none d-flex'>
            <div className='header-profile mx-2'><img src={state.profile.profileData[0]?.userImage} className='rounded-circle' alt="" /></div>
            <h2 className='mx-2'>{state.profile.profileData[0]?.userName}</h2>
          </NavLink>
        </div>
      </Container>
    </Fragment >
  )
}

export default HeaderC