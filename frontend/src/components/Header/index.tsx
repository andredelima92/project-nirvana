import Link from "next/link";
import { Col, Row } from "reactstrap";
import { t } from "../../assets/utils";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "./index.module.scss";

const Header = () => {
  return (
    <nav className={`${styles.headerContainer}`}>
      <Row>
        <Col className="mr-auto">
          <img src="/logo.png" alt="logo" />
        </Col>
        <Col xs="7" sm="6" md="5" lg="3" className="form-inline">
          <Link href="/create">
            <button>
              <AiOutlinePlus className="mr-2" />
              {t("REGISTER_TOURIST_SPOT")}
            </button>
          </Link>
        </Col>
      </Row>
    </nav>
  );
};

export default Header;
