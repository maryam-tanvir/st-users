import React, { useEffect,useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

import {
  addInvoice,
  getInvoices as onGetInvoices,
  deleteInvoice,
  updateInvoice,
} from "../../slices/thunks";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import TableContainer from "src/components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import DeleteModal from "../Calendar/DeleteModal";

const InvoiceList = () => {
  document.title = "Invoice List | Dashonic - React Admin & Dashboard Template";
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState<any>({});

  // for delete invoice
  const [deleteModal, setDeleteModal] = useState(false);

  const { invoices } = useSelector((state: any) => ({
    invoices: state.invoices.invoices,
  }));

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      Amount: (order && order.amount) || "",
      date: (order && order.date) || "",
      founder: (order && order.billingName) || "",
      id: (order && order.id) || "",
      invoiceId: (order && order.invoiceId) || "",
      status: (order && order.status) || "Paid",
      badgecolor: (order && order.badgecolor) || "Success",
    },
    validationSchema: Yup.object({
      Amount: Yup.string().required("Please Enter Amount"),
      founder: Yup.string().required("Please Enter Billing Name"),
      invoiceId: Yup.string().required("Please Enter Invoice Id"),
      status: Yup.string().required("Please Enter Status"),
      date: Yup.date().required("Please Enter Date"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateUser = {
          id: values.id ? values.id : 0,
          amount: values.Amount,
          billingName: values.founder,
          date: moment(values.date).format("DD MMM , YYYY"),
          invoiceId: values.invoiceId,
          status: values.status,
          badgecolor: values.color,
        };

        // update user
        dispatch(updateInvoice(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const invoice = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          amount: values["Amount"],
          billingName: values["founder"],
          date: moment(values["date"]).format("DD MMM, YYYY"),
          invoiceId: values["invoiceId"],
          status: values["status"],
          badgecolor: "success",
        };
        // save new user
        dispatch(addInvoice(invoice));
        validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    dispatch(onGetInvoices());
  }, [dispatch]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const onUpdateData = (data: any) => {
    setOrder({
      id: data.id,
      amount: data.amount,
      badgecolor: data.badgecolor,
      date: moment(data.date).format("YYYY-MM-DD"),
      billingName: data.billingName,
      invoiceId: data.invoiceId,
      status: data.status,
    });
    
    setIsEdit(true);
    toggle();
  };

  const onDeleteData = (data: any) => {
    setDeleteModal(true);
    setOrder(data);
  };

    const handleDeleteInvoice = () => {
      if (order) {
        dispatch(deleteInvoice(order.id));
        setDeleteModal(false);
      }
    };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        Header: "Invoice ID",
        accessor: "invoiceId",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "	Billing Name",
        accessor: "billingName",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Amount",
        accessor: "amount",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
        filterable: true,
        Cell: (invoice: any) => {
          return (
            <div
              className={
                "badge badge-soft-" +
                invoice.row.original.badgecolor +
                " font-size-12"
              }
            >
              {invoice.row.original.status}
            </div>
          );
        },
      },
      {
        Header: "Action",
        Cell: (cellProps: any) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-link text-muted py-1 font-size-16 shadow-none"
                tag="a"
              >
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => onUpdateData(cellProps.row.original)}
                >
                  Edit
                </DropdownItem>
                <DropdownItem>Print</DropdownItem>
                <DropdownItem
                  onClick={() => onDeleteData(cellProps.row.original)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteInvoice}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoices List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={invoices}
                    isGlobalFilter={true}
                    isAddInvoiceList={true}
                    customPageSize={10}
                    className="custom-header-css"
                    handleInvoiceClick={handleUserClicks}
                  />
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {isEdit ? "Edit Invoice" : "Add Invoice"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <Label className="form-label">Invoice ID</Label>
                            <div className="mb-3">
                              <Input
                                name="invoiceId"
                                type="text"
                                placeholder="Insert Invoice Id"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.invoiceId || ""}
                                invalid={
                                  validation.touched.invoiceId &&
                                  validation.errors.invoiceId
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.invoiceId &&
                              validation.errors.invoiceId ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.invoiceId}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Billing Name</Label>
                              <Input
                                name="founder"
                                type="text"
                                placeholder="Insert Billing Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.founder || ""}
                                invalid={
                                  validation.touched.founder &&
                                  validation.errors.founder
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.founder &&
                              validation.errors.founder ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.founder}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Amount</Label>
                              <Input
                                name="Amount"
                                type="text"
                                placeholder="Insert Amount"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.Amount || ""}
                                invalid={
                                  validation.touched.Amount &&
                                  validation.errors.Amount
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.Amount &&
                              validation.errors.Amount ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.Amount}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <Input
                                name="status"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                multiple={false}
                                className="form-select"
                                value={validation.values.status || ""}
                                invalid={
                                  validation.touched.status &&
                                  validation.errors.status
                                    ? true
                                    : false
                                }
                              >
                                <option>Paid</option>
                                <option>Pending</option>
                              </Input>
                              {validation.touched.status &&
                              validation.errors.status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.status}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Date</Label>
                              <Input
                                name="date"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.date || ""}
                                invalid={
                                  validation.touched.date &&
                                  validation.errors.date
                                    ? true
                                    : false
                                }
                              ></Input>
                              {validation.touched.date &&
                              validation.errors.date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.date}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceList;
