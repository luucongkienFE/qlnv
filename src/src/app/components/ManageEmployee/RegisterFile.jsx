import React from "react";
import {
  DatePicker,
  Form,
  Button,
  Row,
  Col,
  Space,
  Input,
  Table,
  Tooltip,
} from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PROPOSAL } from "app/redux/types";

function RegisterFile() {
  const dispatch = useDispatch();
  const formatDate = "DD/MM/YYYY";
  const [formRegisterFile] = Form.useForm();

  const dataRegisterFile = useSelector((state) => state.proposal.data?.data);
  const dataEmployee = useSelector((state) => state.diploma.data);

  console.table(dataRegisterFile);

  const onFinishRegisterFile = (values) => {
   
    dispatch({ type: ADD_PROPOSAL, id: dataEmployee?.employeeInfo?.employeeId,type:values.type,date:values.date,note:values.note,content:values.content });

  };
  const columns = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (text, record, index) => index + 1,
      },
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
      title: "Loại hồ sơ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Nội dung",
      key: "content",
      dataIndex: "content",
    },
  ];

  return (
    <>
      {" "}
      <Form
        className="form-register-file"
        layout="vertical"
        form={formRegisterFile}
        name="register"
        onFinish={onFinishRegisterFile}
      >
        <div className="register-file">
          <Form.Item
            name="type"
            label="Loại hồ sơ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="date"
                label="Ngày đăng ký"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập trường này!",
                  },
                ]}
              >
                <DatePicker format={formatDate} />
              </Form.Item>
            </Col>
            <Col span={19}>
              <Form.Item
                name="note"
                label="Ghi chú"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập trường này!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
          <Table
            dataSource={dataRegisterFile}
            columns={columns}
            style={{
              width: "94%",
              marginTop: "4%",
              minHeight: "100px",
            }}
          />
        </div>
      </Form>
    </>
  );
}

export default RegisterFile;
