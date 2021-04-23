import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <main className={styles.mainPage}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
