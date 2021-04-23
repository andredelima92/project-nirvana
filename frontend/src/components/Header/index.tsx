import { Col, Row, Button } from "reactstrap";

import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Row>
        <Col>
          <img src="/logo.png" alt="" />
        </Col>
        <Col>
          <Button color="primary">Cadastrar um ponto turistico</Button>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
