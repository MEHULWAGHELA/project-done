import React, { useEffect } from 'react'
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../redux/action/profileAction'
import {  Card, CardBody, CardImg, CardSubtitle,  CardTitle, Col, Container, Row } from 'reactstrap'
import { BiSolidUserPin } from 'react-icons/bi'
import { FaBirthdayCake,  FaRegAddressCard, FaUniversity, FaPhoneSquareAlt } from 'react-icons/fa'
import {  MdOutlineLocalLibrary } from 'react-icons/md'
import { GiIndiaGate, GiPostOffice } from 'react-icons/gi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { TfiEmail } from 'react-icons/tfi'
import { BsGenderMale } from 'react-icons/bs'
const Profile = () => {
    let state = useSelector((state) => state)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        <>
            <div className='pb-3'>
                <Container>
                    {state.profile.profileData.map((x, i) => {
                        return (
                            <Row className='g-0'>
                                <Col xs={12} sm={10} md={5} className='px-3'>
                                    <Card>
                                        <CardImg
                                            alt="Card image cap"
                                            src={x.userImage}
                                            top
                                            className='profile-image'
                                        />
                                    </Card>
                                </Col>
                                <Col xs={12} sm={10} md={7}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                <div className='profile-data text-center'>
                                                    <span className='profile-icons'><BiSolidUserPin /></span>
                                                    {x.userName}
                                                </div>
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><FaRegAddressCard /></span>
                                                            Address={x.address}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><MdOutlineLocalLibrary /></span>
                                                            State={x.state}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><HiOutlineBuildingOffice2 /></span>
                                                            Office Contact{x.officeContact}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><FaPhoneSquareAlt /></span>
                                                            Mobile={x.mobile}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><FaUniversity /></span>
                                                            Qualification={x.qualification}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><FaBirthdayCake /></span>
                                                            Birth Date={x.birthDate.split('T')[0]}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><BsGenderMale /></span>
                                                            Gender={x.gender}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><TfiEmail /></span>
                                                            Email={x.email}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><GiPostOffice /></span>
                                                            Postal Code={x.postalCode}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='profile-data'>
                                                            <span className='profile-icons'><GiIndiaGate /></span>
                                                            Country={x.country}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })}
                </Container>
            </div >
        </>
    )
}

export default Hoc(Profile)