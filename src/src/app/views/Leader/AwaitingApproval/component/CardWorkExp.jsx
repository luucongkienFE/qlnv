import { Col, Row } from "antd";
import moment from "moment/moment";
import { useSelector } from "react-redux";

function CardWorkExp() {
  const employeeInfor = useSelector(
    (state) => state.formEmployee?.cv?.workExperiences
  );
  const dateFormat = "DD/MM/YYYY";

  return (
    <div className="card-work-exp">
      {employeeInfor?.map((data) => (
        <>
          <Row className="head">
            <Col span={16}>
              <h5 className="company">{data?.company}</h5>
            </Col>
            <Col span={4}>
              <h5>{moment(data?.startDate).format(dateFormat)}</h5>
            </Col>
            <Col span={4}>
              <h5>{moment(data?.endDate).format(dateFormat)}</h5>
            </Col>
          </Row>
          <Row>
            <h5>{data?.position}</h5>
          </Row>
          <Row>
            <h5>{data?.detail}</h5>
          </Row>
        </>
      ))}
    </div>
  );
}

export default CardWorkExp;
