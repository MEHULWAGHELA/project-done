import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment, createContext, useEffect, useState } from 'react';
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SignIn';
import Dashboard from './components/pages/Dashboard';
import Cart from './components/pages/Cart';
import CompletedOrder from './components/pages/CompletedOrder';
import Profile from './components/pages/Profile';
import Product from './components/pages/Product';
import Orders from './components/pages/Orders';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { DUMMY2 } from './redux/type/type';

export const mainContext = createContext()
function App() {
  let [isLogin, setIsLogin] = useState(false)
  let state = useSelector((state) => state)
  let [cookies, setcookies, removecookies] = useCookies('token')
  let dispatch = useDispatch()
  useEffect(() => {
    if (state.signin.token) {
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Login Successfull',
        showConfirmButton: false,
        timer: 1500
      })
      let expiryDate = new Date()
      expiryDate.setMinutes(expiryDate.getMinutes() + 60)
      setcookies('token', state.signin.token, { path: '/', expires: expiryDate })
      localStorage.setItem("token", state.signin.token)
      setIsLogin(true)
      dispatch({ type: DUMMY2 })
    }
  }, [state])

  // useEffect(() => {
  //   console.log(isLogin)
  //   if (isLogin) {
  //     setInterval(() => {
  //       if (!cookies.token) {
  //         console.log('in')
  //         setIsLogin(false);
  //         localStorage.removeItem("token")
  //       }
  //     }, 10000);
  //   }
  // })

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    }
  }, [])

  return (
    <div className="App">
      <mainContext.Provider value={{ setIsLogin: setIsLogin, removecookies: removecookies }}>
        <CookiesProvider>
          <Container fluid className='g-0'>
            <BrowserRouter>
              <Routes>
                {(isLogin) ?
                  <Fragment>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/completedOrder" element={<CompletedOrder />} />
                    <Route path="/profile" element={<Profile />} />
                  </Fragment>
                  :
                  <Fragment>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<SignIn />} />
                  </Fragment>
                }
              </Routes>
            </BrowserRouter>
          </Container>
        </CookiesProvider>
      </mainContext.Provider>
    </div >
  );
}

export default App;
