import { Fragment, useContext } from "react"
import SidebarC from "../common/SidebarC"
import {  Col, Row } from "reactstrap"
import HeaderC from "../common/HeaderC"
import '../../styles/hoc/hoc.scss'
export const Hoc = (Component) => {
    const NewComponent = () => {        
        return (
            <Fragment>
                <Row className="g-0">
                    <Col xs={4} md={3} lg={2} className='hoc_sidebar g-0'>
                        <SidebarC />
                    </Col>
                    <Col xs={8} md={9} lg={10} className="g-0">
                        <HeaderC />
                        <Component />
                    </Col>
                </Row>
            </Fragment>
        )
    }
    return NewComponent
}