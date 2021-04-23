import { Button } from "reactstrap";
import { t } from "../assets/utils";
import Header from "../components/Header";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <section className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Digite para pesquisar"
          className="form-control"
        />
        <Button color="primary">{t("SEARCH")}</Button>
      </section>
    </>
  );
}
