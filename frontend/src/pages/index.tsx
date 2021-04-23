import { Col, Row, Button, FormGroup } from "reactstrap";
import { t } from "../assets/utils";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm="6">
          <input type="text" className="form-control mt-2" />
        </Col>
        <Col sm="2">
          <Button>{t("SEARCH")}</Button>
        </Col>
      </Row>
    </>
  );
}
