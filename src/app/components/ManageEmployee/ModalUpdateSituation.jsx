import React from "react";
import {
  Modal,
  Button,
} from "antd";
import "../../styles/ModalUpdateSituationStyle.scss";
import CardInfor from "./CardInfor";
import CollapseForm from "./CollapseForm";


function ModalUpdateSituation({
  openModalUpdateSituation,
  setOpenModalUpdateSituation,
}) {
  return (
    <div>
      <Modal
        open={openModalUpdateSituation}
        centered
        title="CẬP NHẬT DIỄN BIẾN"
        onOk={() => setOpenModalUpdateSituation(false)}
        onCancel={() => setOpenModalUpdateSituation(false)}
        footer={null}
        width={1000}
        className="Modal"
      >
        <CardInfor/>
        <CollapseForm/>

        <div className="btn-action">
          <Button key="submit" type="primary" htmlType="submit">
            Xác nhận
          </Button>

          <Button
            key="back"
            type="primary"
            danger
            style={{ backgroundColor: "#faad14" }}
            onClick={() => setOpenModalUpdateSituation(false)}
          >
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateSituation;
