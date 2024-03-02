import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

// Rating Plugin
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";

const UiRating = () => {
    document.title = "Rating | Dashonic - React Admin & Dashboard Template";
    const [def, setdef] = useState<any>("");
    const [def1, setdef1] = useState<any>("");
    const [def2, setdef2] = useState<any>("");
    const [rate, setRate] = useState<string>("");
    const [stopRate, setStopRate] = useState<any>("");
    const [secondrate, setSecondRate] = useState<any>("");
    const [startrate, setStartrate] = useState<any>("");
    const [customize, setcustomize] = useState<string>("");
    const starStyle = {};

    const tooltipContent: Array<any> = [
        "Rate 1",
        "Rate 2",
        "Rate 3",
        "Rate 4",
        "Rate 5",
    ];
    const tooltipContentMore: Array<any> = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ];
    const tooltipContentHalf: Array<any> = ["6", "7", "8", "9", "10"];
    const tooltipContentMiddle: Array<any> = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];
    const tooltipContentStep: Array<any> = ["2", "4", "6", "8", "10"];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Extended UI" breadcrumbItem="Rating" />

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Default rating</h5>
                                                <Rating
                                                    stop={5}
                                                    emptySymbol="mdi mdi-star-outline text-muted"
                                                    fullSymbol="mdi mdi-star text-primary"
                                                    className="rating-symbol-background"
                                                />{" "}
                                                <span>{def}</span>
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 mb-3">Half rating</h5>
                                                <Rating
                                                    stop={5}
                                                    initialRating={1.5}
                                                    fractions={2}
                                                    emptySymbol="mdi mdi-star-outline text-primary "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                                <span>{rate}</span>
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Disabled rating</h5>
                                                <Rating
                                                    stop={5}
                                                />
                                            </div>
                                        </Col>
                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">
                                                    Readonly rating with a value
                                                </h5>
                                                <Rating
                                                    stop={5}
                                                    // defaultRating={2}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">
                                                    Customized heart rating
                                                </h5>
                                                <Rating
                                                    stop={5}
                                                    onChange={(rate: any) => {
                                                        setcustomize(rate);
                                                    }}
                                                    emptySymbol="mdi mdi-heart-outline text-danger"
                                                    fullSymbol="mdi mdi-heart text-danger"
                                                />
                                                <span>{customize}</span>
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Handle events</h5>
                                                <Rating
                                                    stop={5}
                                                    onChange={(rate: any) => alert("Rating : " + rate)}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Customize tooltips</h5>
                                                <Rating
                                                    stop={5}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>
                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Default rating</h5>
                                                <Rating
                                                    stop={8}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">
                                                    Set start rate to 5 [6..10]
                                                </h5>
                                                <Rating
                                                    stop={5}
                                                    onChange={() => {
                                                        setStartrate(!startrate);
                                                    }}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">
                                                    Set start and stop rate [2..10]
                                                </h5>
                                                <Rating
                                                    stop={11}
                                                    onChange={() => {
                                                        setSecondRate(!secondrate);
                                                    }}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">
                                                    Set start and stop rate [2..10]
                                                </h5>
                                                <Rating
                                                    stop={10}
                                                    onChange={() => {
                                                        setStopRate(!stopRate);
                                                    }}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Custom icons</h5>
                                                <Rating
                                                    stop={5}
                                                    emptySymbol="mdi mdi-battery-outline fa-2x text-muted"
                                                    fullSymbol={[
                                                        "mdi mdi-battery-20 fa-2x text-primary",
                                                        "mdi mdi-battery-50 fa-2x text-primary",
                                                        "mdi mdi-battery-70 fa-2x text-primary",
                                                        "mdi mdi-battery-90 fa-2x text-primary",
                                                    ]}
                                                />
                                            </div>
                                        </Col>

                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Fractional rating</h5>
                                                <Rating
                                                    stop={5}
                                                    emptySymbol="mdi mdi-star-outline text-muted "
                                                    fullSymbol="mdi mdi-star text-primary "
                                                    className="rating-symbol-background"
                                                    fractions={6}
                                                />
                                            </div>
                                        </Col>
                                        <Col xl="3" md="4" sm="6">
                                            <div className="p-4 text-center">
                                                <h5 className="font-16 m-b-15">Custom CSS icons</h5>
                                                <Rating
                                                    onChange={(rate2: number) => {
                                                        setdef2(rate2);
                                                    }}
                                                    fractions={2}
                                                />
                                            </div>
                                        </Col>
                                    </Row>{" "}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
export default UiRating;