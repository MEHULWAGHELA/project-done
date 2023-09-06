import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/product.scss'
import { deleteProduct, getProduct } from '../../redux/action/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Card,
  Row,
  Col,
  Container,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import ProductForm from '../other/ProductForm';
import { setCart } from '../../redux/action/cartAction';
import { setOrder } from '../../redux/action/orderAction';
import { BiSolidCategory } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { ImMobile } from 'react-icons/im'
import { FcAbout } from 'react-icons/fc'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
const Product = (props) => {
  let [editState, setEditState] = useState(false)
  let [dummy, setdummy] = useState(1)
  let [editObj, setEditObj] = useState()
  let state = useSelector((state) => state)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  useEffect(() => {
    dispatch(getProduct())
  }, [])

  const editProductData = (id) => {
    setEditState(true)
    editObj = state.product.productData.filter((x) => x._id === id)[0]
    setEditObj(editObj)
    toggle()
  }
  const deleteProductData = (id) => {
    dispatch(deleteProduct(id))
  }

  const buyNow = (id, index) => {
    let obj = {
      productId: id,
      quantity: document.querySelectorAll('.q_value')[index].value || 1
    }
    dispatch(setOrder(obj))
  }

  const addToCart = (id) => {
    dispatch(setCart(id))
  }

  {/* quantity */ }
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

  {/* quantity */ }
  let addProductFun = () => {
    toggle()
    setEditState(false)
  }
  return (
    <div>
      {/* Modal  */}

      <div>
        <div className='my-3 d-flex justify-content-end'>
          <Button onClick={addProductFun}>
            Add Product
          </Button>
        </div>
        <Modal
          isOpen={modal}
          toggle={toggle}
          className={className}
          backdrop={true}
          keyboard={true}
        >
          <ModalHeader toggle={toggle}>Product Info</ModalHeader>
          <ModalBody>
            <ProductForm toggle={toggle} editObj={editObj} editState={editState} />
          </ModalBody>
        </Modal>
      </div>

      {/* Modal  */}


      {/* CARD */}

      <Container fluid>
        <Row className='g-4 product_card my-2'>
          {
            state.product.productData.map((x, i) => {
              return (
                <Col xs={12} sm={6} lg={4} key={i}>
                  <Card className='position-relative' style={{ backgroundColor: x.colors }}>
                    <img
                      alt="Sample"
                      src={x.productImage}
                    />
                    <div className='product_card_three_dot'>
                      <PiDotsThreeOutlineVerticalBold />
                      <div className='product_card_three_dot_hover'>
                        <button onClick={() => editProductData(x._id)}>Edit</button>
                        <button onClick={() => deleteProductData(x._id)}>Delete</button>
                      </div>
                    </div>
                    <CardBody>
                      {console.log(x)}
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
                      <div className='d-flex justify-content-between quant_main'>
                        <div className='d-flex flex-column flex-wrap quant_sub'>
                          <FormGroup className='quant_div'>
                            <span className='text-white'>Quantity:-</span>
                            <AiFillPlusSquare onClick={
                              () => quantityIncrement(i)
                            } className='cart_quatity_icons' />
                            <input type="number" className='cart_quantity_input q_value' placeholder='1' />
                            <AiFillMinusSquare className='cart_quatity_icons' onClick={
                              () => quantityDecrement(i)
                            } />
                            <div>Total price:-{((document.querySelectorAll('.q_value')[i]?.value == undefined || document.querySelectorAll('.q_value')[i]?.value == '') ? 1 : document.querySelectorAll('.q_value')[i].value) * x.price}</div>
                          </FormGroup>
                          <Button className='buy_btn' onClick={() => { buyNow(x._id, i) }}>
                            Buy Now
                          </Button>
                        </div>
                        <Button onClick={() => addToCart(x._id)}>
                          Add To Cart
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container >

      {/* CARD */}

    </div >
  )
}

export default Hoc(Product)

Product.propTypes = {
  className: PropTypes.string,
};


