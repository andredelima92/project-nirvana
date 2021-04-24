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
import api from "../../services/api";
import { useRouter } from "next/router";

interface Travel {
  id: number;
  name: string;
  uf: string;
  city: string;
  reference: string | null;
  description: string | null;
}
interface CreateProps {
  states: any;
  travel: Travel;
  travel_id: number | null;
}

const Create = ({ states, travel, travel_id }: CreateProps) => {
  const router = useRouter();

  const [id, setId] = useState(travel_id);
  const [name, setName] = useState(travel.name);
  const [uf, setUf] = useState(travel.uf);
  const [city, setCity] = useState(travel.city);
  const [citys, setCitys] = useState([]);
  const [reference, setReference] = useState(travel.reference);
  const [description, setDescription] = useState(travel.description);

  async function getCitys(UF: string) {
    const citys = await ibgeService.getCitys(UF);

    if (citys) {
      setCitys(citys);
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

  const create = useCallback(async (form) => {
    try {
      await api.post("/travels", form);
      notification.$s(t("SAVED_SUCCESS"), false, true);
      router.push("/");
    } catch (err) {
      console.log(err);
      notification.$e(t("ERROR_TO_SAVE"), false);
    }
  }, []);

  const update = useCallback(async (form, id) => {
    try {
      await api.put(`/travels/${id}`, form);
      notification.$s(t("SAVED_SUCCESS"), false, true);
      router.push("/");
    } catch (err) {
      console.log(err);
      notification.$e(t("ERROR_TO_SAVE"), false);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !uf || !city || !reference || !description) {
      return notification.$e(t("FIELDS_EMPTY"));
    }

    const form = {
      name,
      city,
      uf,
      reference,
      description,
    };

    if (id) {
      return update(form, id);
    }

    return create(form);
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
                  defaultValue={travel.uf}
                >
                  <option value=""></option>
                  {states.map((uf, i) => (
                    <option key={uf} value={uf}>
                      {uf}
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
                  <option value=""></option>
                  {citys.map((city, i) => (
                    <option
                      key={i}
                      value={city}
                      selected={city === travel.city}
                    >
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
          <FormGroup className="mt-5 mb-2">
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

export const getServerSideProps = async ({ query }) => {
  const id = query.id ?? null;
  let travel = {};

  const states = await ibgeService.getStates();

  if (id) {
    const { data } = await api.get(`travels/${id}`);
    travel = data;
  }

  return {
    props: { states, travel, travel_id: id },
  };
};
