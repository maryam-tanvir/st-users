import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  FormFeedback,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

// withRouter
import withRouter from "src/components/Common/withRouter";

import { Image,  Tags } from "./contactlistCol";

import {
  getUsers as onGetUsers,
  addNewUser,
  deleteUser,
  updateUser,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "src/components/Common/TableContainer";
import { useFormik } from "formik";
import * as Yup from "yup";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import DeleteModal from "src/pages/Calendar/DeleteModal";

const ContactsList = () => {
  document.title = "User List | Dashonic - React Admin & Dashboard Template";
  const dispatch = useDispatch();

  const { users } = useSelector((state: any) => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (userList && userList.name) || "",
      designation: (userList && userList.designation) || "",
      tags: (userList && userList.tags) || "",
      email: (userList && userList.email) || "",
      projects: (userList && userList.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser1 = {
          id: userList.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };

        // update user
        dispatch(updateUser(updateUser1));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
          img: avatar1,
        };
        // save new user
        dispatch(addNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(true);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUserList(users);
    setIsEdit(false);
  }, [users]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setUserList(null);
    } else {
      setModal(true);
    }
  };

  const handleUserClick = (arg: any) => {
    const user = arg;
    setUserList({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

 const handleDeleteUser = () => {
    dispatch(deleteUser(userList.id));
    setDeleteModal(false);
  };

  const onClickDelete = (users: any) => {
    setUserList(users);
    setDeleteModal(true);
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
        Header: "Name",
        filterable: true,
        disableFilters: true,
        accessor: (cellProps: any) => (
          <Image value={cellProps.img} name={cellProps.name} />
        ),
      },
      {
        Header: "Position",
        accessor: "designation",
        filterable: true,
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor : "email",
        filterable: true,
        disableFilters: true,
      },
      {
        Header: "Tags",
        filterable: true,
        disableFilters: true,
        accessor: (cellProps: any) => {
          return <Tags value={cellProps.tags} />;
        },
      },
      {
        Header: "Projects",
        accessor : "projects",
        filterable: true,
        disableFilters: true,
      },
      {
        Header: "Action",
        Cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
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
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {isEdit ? "Edit User" : "Add User"}
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
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Insert Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Designation</Label>
                              <Input
                                name="designation"
                                label="Designation"
                                type="text"
                                placeholder="Insert Designation"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation &&
                                  validation.errors.designation
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.designation &&
                              validation.errors.designation ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.designation}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Insert Email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Option</Label>
                              <Input
                                type="select"
                                name="tags"
                                className="form-select"
                                multiple={true}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tags || []}
                                invalid={
                                  validation.touched.tags &&
                                  validation.errors.tags
                                    ? true
                                    : false
                                }
                              >
                                <option>Photoshop</option>
                                <option>illustrator</option>
                                <option>Html</option>
                                <option>Php</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>UI/UX Designer</option>
                                <option>Ruby</option>
                                <option>Css</option>
                              </Input>
                              {validation.touched.tags &&
                              validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Projects</Label>
                              <Input
                                name="projects"
                                label="Projects"
                                type="text"
                                placeholder="Insert Project"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.projects || ""}
                                invalid={
                                  validation.touched.projects &&
                                  validation.errors.projects
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.projects &&
                              validation.errors.projects ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.projects}
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

export default withRouter(ContactsList);
