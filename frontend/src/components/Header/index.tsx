import Link from "next/link";
import { Col, Row } from "reactstrap";
import { t } from "../../assets/utils";

import styles from "./index.module.scss";

const Header = () => {
  return (
    <nav className={`${styles.headerContainer}`}>
      <Row>
        <Col>
          <img src="/logo.png" alt="logo" />
        </Col>
        <Col className="form-inline d-flex justify-content-end">
          <Link href="/create">
            <button>{t("REGISTER_TOURIST_SPOT")}</button>
          </Link>
        </Col>
      </Row>
    </nav>
  );
};

export default Header;
