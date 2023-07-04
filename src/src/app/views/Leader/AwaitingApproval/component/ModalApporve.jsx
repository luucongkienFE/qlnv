import { DatePicker, Form, Checkbox, Modal, Button } from "antd";
import { APPROVE_EMPLOYEE_DATA } from "app/redux/types";
import { useDispatch } from "react-redux";

function ModalApprove({ open, setOpen, id, setReRender, reRender, setOpenModalFile }) {
  const [formApporve] = Form.useForm();
  const dispatch = useDispatch();
  const formatDate = "DD/MM/YYYY";

  const onFinish = () => {
    dispatch({ type: APPROVE_EMPLOYEE_DATA, id: id });
    setOpenModalFile(false);
    setOpen(false);
    setReRender(!reRender);
  };

  return (
    <div className="modal-appove">
      <Modal
        open={open}
        centered
        title="XÁC NHẬN PHÊ DUYỆT"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={300}
      >
        <Form
          className="form-apporve"
          form={formApporve}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item name="terminatedDate" label="Ngày duyệt">
            <DatePicker format={formatDate} />
          </Form.Item>
          <Form.Item name="qualified" label="Đã đủ điều kiện phê duyệt">
            <Checkbox checked />
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
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalApprove;
