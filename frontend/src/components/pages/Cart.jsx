import React, { useEffect, useState } from 'react'
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/cart.scss'
import { deleteCart, getCart } from '../../redux/action/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, FormGroup, Row } from 'reactstrap'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import { setOrder } from '../../redux/action/orderAction'
import { BiSolidCategory } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { ImMobile } from 'react-icons/im'
import { FcAbout } from 'react-icons/fc'
import { TbDiscountCheckFilled } from 'react-icons/tb'
const Cart = () => {
  let [dummy, setdummy] = useState(1)
  let state = useSelector((state) => state)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const buyNow = (id, index) => {
    let obj = {
      productId: id,
      quantity: document.querySelectorAll('.q_value')[index].value ? document.querySelectorAll('.q_value')[index].value : 1
    }
    dispatch(setOrder(obj))
    dispatch(deleteCart(id))
  }
  const deleteCartData = (id) => {
    dispatch(deleteCart(id))
  }

  const quantityIncrement = (index) => {
    if (document.querySelectorAll('.q_value')[index].value) {
      if ((document.querySelectorAll('.q_value')[index].value) > 0 && (document.querySelectorAll('.q_value')[index].value) < 10) {
        document.querySelectorAll('.q_value')[index].value = Number(document.querySelectorAll('.q_value')[index].value) + 1;
      }
    }
    else {
      document.querySelectorAll('.q_value')[index].value = 2;
    }
    setdummy(dummy + 1)
  }
  const quantityDecrement = (index) => {
    if (document.querySelectorAll('.q_value')[index].value) {
      if ((document.querySelectorAll('.q_value')[index].value) > 1) {
        document.querySelectorAll('.q_value')[index].value = Number(document.querySelectorAll('.q_value')[index].value) - 1;
      }
    }
    else {
      document.querySelectorAll('.q_value')[index].value = 1;
    }
    setdummy(dummy - 1)
  }

  return (
    <Container fluid>

      <Row className='g-4 product_card my-2'>
        {
          state.cart.cartData.map((x, i) => {
            return (
              <Col xs={12} md={6} lg={4} key={i} >
                <Card className='position-relative' style={{ backgroundColor: x.colors }}>
                  <img
                    alt="Sample"
                    src={x.productImage}
                  />
                  <div className='product_card_three_dot'>
                    <PiDotsThreeOutlineVerticalBold />
                    <div className='product_card_three_dot_hover'>
                      <button onClick={() => deleteCartData(x._id)}>Delete</button>
                    </div>
                  </div>
                  <CardBody>
                    <CardTitle tag="h5">
                      Product:-{x.productName}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      <div>
                        <span className='product_icon'><BiSolidCategory /></span>
                        Category:-{x.category}
                      </div>
                    </CardSubtitle>
                    <CardText>
                      <div>
                        <span className='product_icon'><FaRupeeSign /></span>
                        Price:-{x.price}
                      </div>
                      <div>
                        <span className='product_icon'><FcAbout /></span>
                        Discription:-{x.discription}
                      </div>
                      <div>
                        <span className='product_icon'><BsShop /></span>
                        Shop:-{x.shopName}
                      </div>
                      <div>
                        <span className='product_icon'><ImMobile /></span>
                        Mobile:-{x.mobile}
                      </div>
                      <div>
                        <span className='product_icon'><TbDiscountCheckFilled /></span>
                        Discount:-{x.discount}
                      </div>
                    </CardText>
                    <div className='d-flex flex-column flex-wrap'>
                      <FormGroup>
                        Quantity:-
                        <AiFillPlusSquare onClick={
                          () => quantityIncrement(i)
                        } className='cart_quatity_icons' />
                        <input type="number" className='cart_quantity_input q_value' placeholder='1' />
                        <AiFillMinusSquare className='cart_quatity_icons' onClick={
                          () => quantityDecrement(i)
                        } />
                        {console.log(document.querySelectorAll('.q_value')[i]?.value)}
                        <span>Total price:-{(document.querySelectorAll('.q_value')[i]?.value == undefined ? 1 : document.querySelectorAll('.q_value')[i].value) * x.price}</span>
                      </FormGroup>
                      <Button onClick={() => { buyNow(x._id, i) }}>
                        Buy Now
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </Container>
  )
}

export default Hoc(Cart)