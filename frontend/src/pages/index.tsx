import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { t } from "../assets/utils";
import Header from "../components/Header";
import api from "../services/api";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./home.module.scss";
import Link from "next/link";

interface Travel {
  id: number;
  name: string;
  uf: string;
  city: string;
  reference: string | null;
  description: string | null;
}

interface HomeProps {
  travels: Travel[];
  paginate: number;
}

export default function Home({ travels, paginate }: HomeProps) {
  const nextPage = Number(paginate) + 1;
  const previousPage = Number(paginate) - 1;

  return (
    <>
      <Header />
      <section className="mb-5">
        <Row>
          <Col>
            <input
              type="text"
              placeholder={t("INPUT_FOR_SEARCH")}
              className="form-control"
            />
          </Col>
          <Col sm="3" xs="3">
            <Button color="primary" block>
              {t("SEARCH")}
            </Button>
          </Col>
        </Row>
      </section>
      <section className="mt-2 mb-4">
        <Row>
          {travels.map((travel) => (
            <Col md="3 mb-2" key={travel.id}>
              <Card>
                <CardHeader>{travel.name}</CardHeader>
                <CardBody>
                  <CardTitle tag="h5" className="text-truncate">
                    {travel.reference}
                  </CardTitle>
                  <CardText className="text-truncate">
                    {travel.description}
                  </CardText>
                  <Button>{t("SEE_MORE")}</Button>
                </CardBody>
                <CardFooter>{`${travel.city}, ${travel.uf}`}</CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <footer>
        <Row>
          {paginate > 1 && (
            <>
              <Link href={`/?_paginate=${previousPage}`}>
                <a className="mr-auto">
                  <AiOutlineArrowLeft size={35} />
                </a>
              </Link>
            </>
          )}
          {travels.length === 4 && (
            <>
              <Link href={`/?_paginate=${nextPage}`}>
                <a className="ml-auto">
                  <AiOutlineArrowRight size={35} />
                </a>
              </Link>
            </>
          )}
        </Row>
      </footer>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const _limit = 4;
  const paginate = query._paginate ? query._paginate * _limit : _limit;
  const _offset = paginate - 4;

  const { data } = await api.get("travels", {
    params: {
      _offset,
      _limit,
      _orderBy: "id",
    },
  });

  return {
    props: {
      travels: data,
      paginate: query._paginate ?? 1,
    },
  };
};
