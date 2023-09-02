import React, { useEffect } from 'react'
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/orders.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, getOrder } from '../../redux/action/orderAction'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi'
import { BiSolidCategory } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { ImMobile } from 'react-icons/im'
import { FcAbout } from 'react-icons/fc'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { MdProductionQuantityLimits } from 'react-icons/md'
const Orders = () => {
  let state = useSelector((state) => state)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrder())
  },[])

  const deleteOrderData = (id) => {
    dispatch(deleteOrder(id))
  }

  return (
    <div>
      <Container fluid>
        <Row className='g-4 product_card my-2'>
          {
            state.order.orderData.map((x, i) => {
              return (
                <Col xs={12} md={6} lg={4} key={i} >
                  <Card className='position-relative' style={{ backgroundColor: x.color }}>
                    <img
                      alt="Sample"
                      src={x.productImage}
                    />
                    <div className='product_card_three_dot'>
                      <PiDotsThreeOutlineVerticalBold />
                      <dir className='product_card_three_dot_hover'>
                        <button onClick={() => deleteOrderData(x._id)}>Delete</button>
                      </dir>
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
                        <div>
                          <span className='product_icon'><MdProductionQuantityLimits /></span>
                          Quantity:-{x.quantity}
                        </div>
                        <div>
                          <span className='product_icon'><TbDiscountCheckFilled /></span>
                          Total Price:-{x.price * x.quantity}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default Hoc(Orders)