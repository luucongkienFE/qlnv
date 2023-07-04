import React from "react";
import {
    DatePicker,
    Form,
    Checkbox,
    Modal,
    Button,
    Image,
    Row,
    Col,
    Card,
    Space,
    Input,
    Collapse,
    Table,
    Tooltip,
  } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

function CardInfor() {

    const employeeInfor = useSelector((state) => state.formEmployee);
    const dataEmployee = useSelector((state) => state.diploma.data);
    const dataRegisterFile = useSelector((state) => state.proposal.data?.data);
    console.log(employeeInfor, "im", dataRegisterFile);

    const formatDate = "DD/MM/YYYY";
  
    let teamName;
    const dataFormatEmployee = {
      ...dataEmployee?.employeeInfo,
      dateOfBirth: moment(dataEmployee?.employeeInfo?.dateOfBirth).format(
        formatDate
      ),
    };
    console.log(dataFormatEmployee);
    switch (dataEmployee?.employeeInfo.teamId) {
      case 1:
        teamName = "Front-end";
        break;
      case 2:
        teamName = "Back-end";
        break;
      default:
        break;
    }


    return ( <Row>
        <Col span={5} offset={1}>
          <Row>
            <Col>
              <div className="img">
                <Image
                  width={190}
                  height={210}
                  src={
                    dataFormatEmployee
                      ? dataFormatEmployee.photoUrl
                      : "https://muineprivatecar.net/Design/avatar.png"
                  }
                />
              </div>
            </Col>
          </Row>
          <div className="infor-left">
            <h3>{dataEmployee?.employeeInfo.fullName}</h3>
            <p>{teamName}</p>
          </div>
        </Col>
        <Col span={14} offset={2}>
          <Card title="Thông tin nhân viên" bordered style={{ width: 600 }}>
            <Space direction="vertical">
              <Space direction="horizontal" size={16}>
                <div className="custom-input">
                  <p className="label">Họ và tên</p>
                  <Input value={dataFormatEmployee?.fullName} />
                </div>
                <div className="custom-input">
                  <p className="label">Mã nhân viên</p>
                  <Input value={dataFormatEmployee?.code} />
                </div>
                <div className="custom-input">
                  <p className="label">Số điện thoại</p>
                  <Input value={dataFormatEmployee?.phone} />
                </div>
              </Space>
              <Space direction="horizontal" size={16}>
                <div className="custom-input">
                  <p className="label">Email</p>
                  <Input value={dataFormatEmployee?.email} />
                </div>
                <div className="custom-input">
                  <p className="label">CCCD/CMT</p>
                  <Input value={dataFormatEmployee?.citizenId} />
                </div>
                <div className="custom-input">
                  <p className="label">Ngày sinh</p>
                  <Input value={dataFormatEmployee?.dateOfBirth} />
                </div>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row> );
}

export default CardInfor;