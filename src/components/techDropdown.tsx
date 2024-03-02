import React, { useState } from 'react';
import { Col, Row} from 'reactstrap';
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = (props: any) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Col lg={8}>
      <div>
        <div className="menu-title" onClick={toggleDropdown}>
          {props.t('Components')}
        </div>
        {showDropdown && (
          <Row>
            <Col lg={5}>
              <div>
                <Link to="/ui-alerts" className="dropdown-item">
                  {props.t('Alerts')}
                </Link>
                <Link to="/ui-buttons" className="dropdown-item">
                  {props.t('Buttons')}
                </Link>
                {/* ... Other dropdown links ... */}
              </div>
            </Col>
            <Col lg={5}>
              <div>
                <Link to="/ui-placeholders" className="dropdown-item">
                  {props.t('Placeholders')}
                </Link>
                <Link to="/ui-progressbars" className="dropdown-item">
                  {props.t('Progress Bars')}
                </Link>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </Col>
  );
};

export default DropdownMenu;
