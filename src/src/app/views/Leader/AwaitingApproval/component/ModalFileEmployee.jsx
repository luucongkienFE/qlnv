import React, { useState } from "react";
import {
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Tabs,
  Button,
  Layout,
  DatePicker,
  Space,
  Tooltip,
  Table,
} from "antd";
import "../../../../styles/ModalFileStyle.scss";
import moment from "moment";
import {
  DeleteFilled,
  EditFilled,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CardWorkExp from "./CardWorkExp";
import ModalApprove from "./ModalApporve";
import { REJECT_EMPLOYEE, REQUIRED_SUPPLEMENT_DATA } from "app/redux/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalFileEmployee({
  setOpenModalFile,
  openModalFile,
  id,
  setReRender,
  reRender,
  onApproved,
}) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formRequiredSupplement] = Form.useForm();
  const [formReject] = Form.useForm();
  const [formWorkExp] = Form.useForm();
  const { Header, Footer, Sider, Content } = Layout;
  const dateFormat = "DD/MM/YYYY";
  const employeeInfor = useSelector((state) => state.formEmployee);
  const dataEmployee = useSelector((state) => state.diploma.data);

  const formatDataEmployee = dataEmployee?.familyRelations?.map((data) => ({
    ...data,
    gender: data.gder ? "Nữ" : "Nam",
  }));

  const [dataWorkExp, setDataWorkExp] = useState([]);
  const [shouldOpenModalAppove, setShouldOpenModalAppove] = useState(false);
  const [
    shouldOpenModalRequiredSupplement,
    setShouldOpenModalRequiredSupplement,
  ] = useState(false);
  const [
    shouldOpenModalReject,
    setShouldOpenModalReject,
  ] = useState(false);

  const onFinishFormEmployee = (values) => {
    // console.log("1",{ ...values, workExperiences: dataWorkExp },
    //   { employeeId: employeeInfor?.resume.code });
    // dispatch(
    //   updateFormEmployeeRequested(
    //     { ...values, workExperiences: dataWorkExp },
    //     { employeeId: employeeInfor?.resume.code }
    //   )
    // );
    // console.log(2);
  };

  const onFinishRequiredSupplement = (values) => {
    dispatch({
      type: REQUIRED_SUPPLEMENT_DATA,
      id: id,
      statusLog: values.statusLog,
    });
    toast.success('Yêu cầu bổ sung thành công', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setShouldOpenModalRequiredSupplement(false);
    setOpenModalFile(false);
    setReRender(!reRender);
  };
  const onFinishReject = (values) => {
    dispatch({
      type: REJECT_EMPLOYEE,
      id: id,
      rejectedReason: values.rejectedReason,
    });
    toast.success('Yêu cầu bổ sung thành công', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setShouldOpenModalReject(false);
    setOpenModalFile(false);
    setReRender(!reRender);
  };
  const onFinish = (values) => {
    setDataWorkExp([
      ...dataWorkExp,
      {
        ...values,
        time: [
          moment(values.time[0]).format("DD/MM/YYYY"),
          "-",
          moment(values.time[2]).format("DD/MM/YYYY"),
        ],
      },
    ]);
  };
  const columnsRelation = [
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <EditFilled
              style={{ color: "rgb(13, 76, 165)", fontSize: "16px" }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteFilled style={{ color: "red", fontSize: "16px" }} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "fullName",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Quan hệ",
      key: "relation",
      dataIndex: "relation",
    },
    {
      title: "Số CCCD/CMT",
      key: "citizenId",
      dataIndex: "citizenId",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];
  const columns = [
    {
      title: "Tên công ty",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];
  const columnsCertificates = [
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <EditFilled
              style={{ color: "rgb(13, 76, 165)", fontSize: "16px" }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteFilled style={{ color: "red", fontSize: "16px" }} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Tên văn bằng",
      dataIndex: "name",
      key: "fullName",
    },
    {
      title: "Nội dung văn bằng",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Nơi cấp",
      dataIndex: "educationalOrg",
      key: "educationalOrg",
    },
    {
      title: "Ngày cấp",
      key: "issuanceDate",
      dataIndex: "issuanceDate",
    },
    {
      title: "Lĩnh vực",
      key: "field",
      dataIndex: "field",
    },
  ];
  if (employeeInfor) columnsCertificates.shift() && columnsRelation.shift();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {shouldOpenModalAppove && (
        <ModalApprove
          open={shouldOpenModalAppove}
          setOpen={setShouldOpenModalAppove}
          id={id}
          setReRender={setReRender}
          reRender={reRender}
          setOpenModalFile={setOpenModalFile}
        />
      )}
      {shouldOpenModalRequiredSupplement && (
        <div className="modal-required-supplement">
          <Modal
            open={shouldOpenModalRequiredSupplement}
            centered
            title="YÊU CẦU BỔ SUNG"
            onOk={() => setShouldOpenModalRequiredSupplement(false)}
            onCancel={() => setShouldOpenModalRequiredSupplement(false)}
            footer={null}
            width={300}
          >
            <Form
              className="form-required-supplement"
              form={formRequiredSupplement}
              name="registerRequiredSupplement"
              onFinish={onFinishRequiredSupplement}
              layout="vertical"
            >
              <Form.Item name="statusLog" label="Lý do">
                <TextArea />
              </Form.Item>

              <div className="btn-action">
                <Button key="submit1" type="primary" htmlType="submit">
                  Xác nhận
                </Button>

                <Button
                  key="back"
                  type="primary"
                  danger
                  style={{ backgroundColor: "#faad14" }}
                  onClick={() => setShouldOpenModalRequiredSupplement(false)}
                >
                  Hủy
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      )}
      {shouldOpenModalReject && (
        <div className="modal-reject">
          <Modal
            open={shouldOpenModalReject}
            centered
            title="YÊU CẦU BỔ SUNG"
            onOk={() => setShouldOpenModalReject(false)}
            onCancel={() => setShouldOpenModalReject(false)}
            footer={null}
            width={300}
          >
            <Form
              className="form-reject"
              form={formReject}
              name="registerReject"
              onFinish={onFinishReject}
              layout="vertical"
            >
              <Form.Item name="rejectedDate" label="Ngày từ chối">
                <DatePicker format={dateFormat} />
              </Form.Item>
              <Form.Item name="rejectedReason" label="Lý do">
                <TextArea />
              </Form.Item>

              <div className="btn-action">
                <Button key="submit" type="primary" htmlType="submit">
                  Xác nhận
                </Button>

                <Button
                  key="back"
                  type="primary"
                  danger
                  style={{ backgroundColor: "#faad14" }}
                  onClick={() => setShouldOpenModalReject(false)}
                >
                  Hủy
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      )}
      <Modal
        open={true}
        title="HỒ SƠ NHÂN VIÊN"
        onOk={() => setOpenModalFile(false)}
        onCancel={() => setOpenModalFile(false)}
        footer={null}
        width={1000}
      >
        <Form
          className="form-file"
          form={form}
          name="register"
          onFinish={onFinishFormEmployee}
        >
          <Tabs
            defaultActiveKey="2"
            tabPosition="left"
            items={[
              {
                label: `HỒ SƠ`,
                key: 1,
                children: (
                  <div className="cv">
                    <Layout>
                      <Sider style={{ padding: "10px" }}>
                        <div className="cv-img">
                          <Image
                            width={150}
                            height={150}
                            src={
                              "https://muineprivatecar.net/Design/avatar.png"
                            }
                          />
                        </div>
                        <div>
                          <h4>SỞ THÍCH</h4>
                          {employeeInfor ? (
                            <h5> {employeeInfor?.cv?.hobby}</h5>
                          ) : (
                            <TextArea placeholder="Sở thích của bạn!" />
                          )}
                        </div>
                        <div>
                          <h4>LIÊN HỆ</h4>
                          <h5>
                            <MailOutlined />
                            Email
                          </h5>
                          <p>{employeeInfor?.resume?.email}</p>
                          <h5>
                            <EnvironmentOutlined />
                            Địa chỉ
                          </h5>
                          <p>{employeeInfor?.resume?.address}</p>
                          <h5>
                            <PhoneOutlined />
                            Điện thoại
                          </h5>
                          <p>{employeeInfor?.resume?.phone}</p>
                        </div>
                        <div>
                          <h4>KỸ NĂNG</h4>
                          {employeeInfor ? (
                            <h5> {employeeInfor?.cv?.skill}</h5>
                          ) : (
                            <TextArea placeholder="Kỹ năng của bạn!" />
                          )}
                        </div>
                      </Sider>
                      <Layout>
                        <Header>
                          <h2 className="name">
                            {employeeInfor?.resume?.fullName}
                          </h2>
                        </Header>
                        <Content>
                          <Form
                            className="form-work-exp"
                            layout="vertical"
                            form={formWorkExp}
                            name="register"
                            onFinish={onFinish}
                          >
                            <div className="careerGoal">
                              <h3>MỤC TIÊU</h3>
                              {employeeInfor ? (
                                <h5> {employeeInfor?.cv?.careerGoal}</h5>
                              ) : (
                                <TextArea placeholder="Mục tiêu của bạn!" />
                              )}
                            </div>
                            <div className="work-exp">
                              <h3>KINH NGHIỆM LÀM VIỆC</h3>
                              {employeeInfor ? (
                                ""
                              ) : (
                                <div className="work-exp-form">
                                  <Form.Item name="company" label="Tên công ty">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="position" label="Chức vụ">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="detail" label="Mô tả">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name="startDate"
                                    label="Ngày bắt đầu"
                                  >
                                    <DatePicker format={dateFormat} />
                                  </Form.Item>
                                  <Form.Item
                                    name="endDate"
                                    label="Ngày kết thúc"
                                  >
                                    <DatePicker format={dateFormat} />
                                  </Form.Item>
                                  <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                      Lưu
                                    </Button>
                                  </Form.Item>
                                </div>
                              )}
                              {<CardWorkExp />}
                            </div>
                          </Form>
                        </Content>
                        <Footer style={{ height: "100px" }}></Footer>
                      </Layout>
                    </Layout>
                  </div>
                ),
              },
              {
                label: `SƠ YẾU LÝ LỊCH`,
                key: 2,
                children: (
                  <div className="resume">
                    <div className="resume-head">
                      <Row>
                        <Col span={8} className="resume-img">
                          <Image
                            width={"120px"}
                            height={"180px"}
                            src={
                              "https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-avatar-m%C3%A8o-d%E1%BB%85-th%C6%B0%C6%A1ng.jpg"
                            }
                          />
                        </Col>
                        <Col span={16} style={{ textAlign: "center" }}>
                          <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                          <h5>Độc lập - Tự do - Hạnh Phúc</h5>
                          <hr
                            style={{ borderTop: "2px solid", width: "30%" }}
                          />
                          <h4>SƠ YẾU LÝ LỊCH</h4>
                          <h5>TỰ THUẬT</h5>
                        </Col>
                      </Row>
                    </div>
                    <h4 style={{ marginTop: "3%", fontWeight: "bold" }}>
                      I. THÔNG TIN BẢN THÂN
                    </h4>
                    <div className="content">
                      <Form
                        form={form}
                        name="register"
                        layout="horizontal"
                        onFinish={onFinishFormEmployee}
                      >
                        <Row gutter={[16, 8]}>
                          <Col span={16}>
                            <Form.Item name="fullName" label="1. Họ và tên: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.fullName}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name="gender" label="2. Nam/Nữ: ">
                              <Input
                                defaultValue={
                                  employeeInfor?.resume?.gender === 1
                                    ? "Nam"
                                    : "Nữ"
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Form.Item
                              name="dateOfBirth"
                              label="3. Ngày sinh: "
                            >
                              <Input
                                defaultValue={
                                  employeeInfor?.resume?.dateOfBirth
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name="address" label="4. Nơi sinh: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.address}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Form.Item
                              name="currentAddress"
                              label="5. Nguyên quán: "
                            >
                              <Input
                                defaultValue={
                                  employeeInfor?.resume?.currentAddress
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={8}>
                            <Form.Item name="citizenId" label="6. Số CCCD: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.citizenId}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name="citizenIdIssuanceDate"
                              label="7. Ngày cấp: "
                            >
                              <Input
                                defaultValue={
                                  employeeInfor?.resume?.citizenIdIssuanceDate
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name="citizenIdIssuingAuthority"
                              label="8. Nơi cấp: "
                            >
                              <Input
                                defaultValue={
                                  employeeInfor?.resume
                                    ?.citizenIdIssuingAuthority
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Form.Item name="phone" label="9. Số điện thoại: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.phone}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Form.Item name="email" label="10. Email: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.email}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Form.Item name="ethnicity" label="11. Dân tộc: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.ethnicity}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name="religion" label="12. Tôn giáo: ">
                              <Input
                                defaultValue={employeeInfor?.resume?.religion}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    <h4 style={{ marginTop: "3%", fontWeight: "bold" }}>
                      II. QUAN HỆ GIA ĐÌNH
                    </h4>
                    <div>
                      <Table
                        columns={columnsRelation}
                        dataSource={formatDataEmployee}
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: `DANH SÁCH VĂN BẰNG`,
                key: 3,
                children: (
                  <div className="certificates">
                    <Table
                      columns={columnsCertificates}
                      dataSource={dataEmployee?.certificates}
                    />
                  </div>
                ),
              },
            ]}
          />
          <div className="btn-action">
            <Button
              key="back"
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => {
                setShouldOpenModalAppove(true);
              }}
            >
              Duyệt
            </Button>
            <Button
              key="back"
              type="primary"
              onClick={() => {
                setShouldOpenModalRequiredSupplement(true);
              }}
            >
              Yêu cầu bổ sung
            </Button>
            <Button
              key="back"
              type="primary"
              danger
              onClick={() => setShouldOpenModalReject(true)}
            >
              Từ chối
            </Button>
            <Button
              key="back"
              type="primary"
              danger
              style={{ backgroundColor: "#faad14" }}
              onClick={() => setOpenModalFile(false)}
            >
              Hủy
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalFileEmployee;
