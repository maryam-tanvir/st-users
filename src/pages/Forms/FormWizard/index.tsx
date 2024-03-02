import React from "react";
import { Container, CardHeader, Card, Row, Col} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import BasicPills from "./BasicPills";

const FormWizard = () => {
  document.title = "Form Wizard | Dashonic - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Forms Steps</h4>
                </CardHeader>
                <BasicPills />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormWizard;
