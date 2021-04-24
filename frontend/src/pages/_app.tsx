import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import styles from "../styles/app.module.scss";
import { Container } from "reactstrap";

function MyApp({ Component, pageProps }) {
  return (
    <Container fluid className={styles.mainPage}>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
