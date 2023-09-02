import React, { useEffect } from 'react'
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/completedorder.scss'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import { BiSolidCategory } from 'react-icons/bi'
import { FaRupeeSign } from 'react-icons/fa'
import { FcAbout } from 'react-icons/fc'
import { BsShop } from 'react-icons/bs'
import { ImMobile } from 'react-icons/im'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderCompleted } from '../../redux/action/orderCompletedAction'
const CompletedOrder = () => {
  let state = useSelector((state) => state)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderCompleted())
  }, [])
  return (
    <Container fluid>
      <Row className='g-4 product_card my-2'>
        {
          state.product.productData.map((x, i) => {
            return (
              <Col xs={12} md={6} lg={4} key={i} >
                <Card className='position-relative' style={{ backgroundColor: x.color }}>
                  <img
                    alt="Sample"
                    src={x.productImage}
                  />
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
    </Container >

  )
}

export default Hoc(CompletedOrder)