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
import { ADD_INCREASE_SALARY, ADD_PROPOSAL } from "app/redux/types";
import moment from "moment";

function IncreaseSalary() {
  const dispatch = useDispatch();
  const formatDate = "DD/MM/YYYY";
  const [formIncreaseSalary] = Form.useForm();

  const dataIncreaseSalary = useSelector((state) => state.salary.data?.data);
  console.log("sala",dataIncreaseSalary);
  const dataEmployee = useSelector((state) => state.diploma.data);

  const onFinishIncreaseSalary = (values) => {
    console.log(values, "ac");
    dispatch({
      type: ADD_INCREASE_SALARY,
      id: dataEmployee?.employeeInfo?.employeeId,
      salary: values.salary,
      salaryScale: values.salaryScale,
      count:values.count,
      date: moment(values.date).format("YYYY-MM-DD"),
      reason: values.reason,
      note: values.note,
    });
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
      title: "Ngày tăng lương",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Lần thứ",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Bậc",
      key: "salaryScale",
      dataIndex: "salaryScale",
    },
    {
      title: "Lương",
      key: "salary",
      dataIndex: "salary",
    },
    {
      title: "Ghi chú",
      key: "note",
      dataIndex: "note",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
    },
  ];

  return (
    <>
      <Form
        className="form-increase-salary"
        layout="vertical"
        form={formIncreaseSalary}
        name="register"
        onFinish={onFinishIncreaseSalary}
      >
        <div className="register-file">
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="date"
                label="Ngày tăng lương"
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
            <Col span={5}>
              <Form.Item
                name="count"
                label="Lần thứ"
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
            <Col span={5}>
              <Form.Item
                name="salaryScale"
                label="Bậc"
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
            <Col span={9}>
              <Form.Item
                name="salary"
                label="Lương"
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

          <Row gutter={16}>
          <Col span={11}>
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
            <Col span={11}>
              <Form.Item
                name="reason"
                label="Lý do"
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
            <Col span={2}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={"btn-submit"}>
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Table
            dataSource={dataIncreaseSalary}
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

export default IncreaseSalary;
