import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { t } from "../../assets/utils";
import Header from "../../components/Header";
import { Row, Col, FormGroup, Button } from "reactstrap";
import ibgeService from "../../services/ibge";
import notification from "../../services/notification.js";

import styles from "./index.module.scss";
import Link from "next/link";

const Create = ({ states }) => {
  const [name, setName] = useState("");
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const [citys, setCitys] = useState([]);
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");

  async function getCitys(UF: string) {
    const citys = await ibgeService.getCitys(UF);

    if (citys) {
      setCitys(citys);
      setCity(citys[0]);
    }
  }

  useEffect(() => {
    getCitys(uf);
  }, [uf]);

  const handleSetName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleSetReference = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.target.value);
  }, []);

  const handleSetDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleSetUF = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
    setUf(e.target.value);
  }, []);

  const handleSetCity = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      setCity(e.target.value);
    },
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      return notification.$e(t("NAME_EMPTY"));
    }

    if (!uf) {
      return notification.$e(t("UF_EMPTY"));
    }

    if (!city) {
      return notification.$e(t("CITY_EMPTY"));
    }

    const form = {
      name,
      city,
      uf,
      reference,
      description,
    };

    console.log(form);

    notification.$s(t("SAVED_SUCCESS"), false, true);
  };

  return (
    <>
      <Header />
      <section className={`${styles.container} `}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Row>
              <Col sm="2" className="offset-md-2">
                <label htmlFor="name" className="col-form-label">
                  {t("NAME")}:
                </label>
              </Col>
              <Col sm="6 mt-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleSetName}
                  value={name}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="1" className="offset-md-2">
                <label htmlFor="name" className="col-form-label">
                  {t("LOCALIZATION")}:
                </label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="2" className="offset-md-2">
                <label htmlFor="uf" className="col-form-label">
                  {t("UF_CITY")}:
                </label>
              </Col>
              <Col sm="2" xs="4">
                <select
                  className="form-control sm-mb-2"
                  id="uf"
                  onChange={handleSetUF}
                >
                  <option value=""></option>
                  {states.map((state: string) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xs="8" sm="4">
                <select
                  className="form-control"
                  id="citys"
                  placeholder={t("CITY")}
                  onChange={handleSetCity}
                >
                  {citys.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="2" className="offset-md-2">
                <label htmlFor="reference" className="col-form-label">
                  {t("REFERENCE")}:
                </label>
              </Col>
              <Col sm="6 mt-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="reference"
                  onChange={handleSetReference}
                  value={reference}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="2" className="offset-md-2">
                <label htmlFor="description" className="col-form-label">
                  {t("DESCRIPTION")}:
                </label>
              </Col>
              <Col sm="6 mt-sm-2">
                <textarea
                  maxLength={100}
                  className="form-control"
                  id="description"
                  onChange={handleSetDescription}
                  value={description}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup className="mt-5">
            <Row>
              <Col sm="7" xs="9" className="offset-md-2">
                <Link href="/">
                  <Button type="button">Voltar</Button>
                </Link>
              </Col>
              <Col sm="3" xs="3">
                <Button color="success" type="submit">
                  Salvar
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </section>
    </>
  );
};

export default Create;

export const getServerSideProps = async () => {
  const states = await ibgeService.getStates();

  return {
    props: { states },
  };
};
