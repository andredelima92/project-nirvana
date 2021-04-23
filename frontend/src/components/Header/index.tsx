import { Button } from "reactstrap";
import { t } from "../../assets/utils";

import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={`${styles.headerContainer} mb-3`}>
      <div>
        <img src="/logo.png" alt="logo" />
      </div>

      <div>
        <Button>{t("REGISTER_TOURIST_SPOT")}</Button>
      </div>
    </header>
  );
};

export default Header;
