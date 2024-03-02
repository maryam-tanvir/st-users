import React from "react";
import { Link } from "react-router-dom";
//import images
import logoSm from "../../assets/images/logo-sm.png";
import { Container, Row, Col } from "reactstrap";

const ErrorBasic = () => {
    document.title = "500 Error | Dashonic - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="authentication-bg min-vh-100">
                <div className="bg-overlay bg-white"></div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="text-center py-5">
                                <h1 className="display-1 fw-normal error-text">5
                                    <img src={logoSm} alt="" className="avatar-lg h-auto mx-2" />0</h1>
                                <h4 className="text-uppercase text-muted">Internal Server Error</h4>
                                <div className="mt-5 text-center">
                                    <Link className="btn btn-primary" to="/sales">Back to Dashboard</Link>
                                </div>
                            </div>
                        </Col>

                    </Row>

                </Container>

            </div>
        </React.Fragment>
    );
};

export default ErrorBasic;