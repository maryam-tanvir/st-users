import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Col, Container, Row } from "reactstrap";

import WidgetData from "./Widgets";

import SalesAnalytics from "./SalesAnalytics";

import EarningReports from "./EarningReports";

import Orders from "./Orders";

import SalesByCountry from "./SalesByCountry";

const Sales = () => {
  document.title = "Sales | Dashonic - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Sales" />

          <Row>
            <WidgetData />
          </Row>

          <Row>
            <Col xl={4}>
              <EarningReports />
            </Col>

            <Col xl={8}>
              <SalesAnalytics />
            </Col>
          </Row>

          <Row>
            <Col xl={8}>
              <Orders />
            </Col>

            <Col xl={4}>
              <SalesByCountry />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Sales;
