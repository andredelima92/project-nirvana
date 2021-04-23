import { Head } from "next/document";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import { Container } from "reactstrap";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
