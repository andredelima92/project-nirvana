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
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useState } from "react";
import notification from "../services/notification";

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
  _search: string;
}

export default function Home({ travels, paginate, _search }: HomeProps) {
  const router = useRouter();
  const nextPage = Number(paginate) + 1;
  const previousPage = Number(paginate) - 1;
  const [newSearch, setNewSearch] = useState(_search);

  const handleDelete = useCallback(async (travel: Travel) => {
    try {
      await api.delete(`travels/${travel.id}`);
      notification.$s(t("DELETE_SUCCESS"));
      router.push(`/?_paginate=${paginate}&_search=${newSearch}`);
    } catch (err) {
      notification.$e(t("ERROR_TO_DELETE"));
      console.log(err);
    }
  }, []);

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
              value={newSearch}
              onChange={(e) => setNewSearch(e.target.value)}
            />
          </Col>
          <Col sm="3" xs="3">
            <Link href={`/?_search=${newSearch}`}>
              <Button color="primary" block>
                {t("SEARCH")}
              </Button>
            </Link>
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
                  <Row>
                    <Col>
                      <Link href={`/create?id=${travel.id}`}>
                        <Button>{t("SEE_MORE")}</Button>
                      </Link>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => handleDelete(travel)}
                        color="danger"
                      >
                        <BsTrash />
                      </Button>
                    </Col>
                  </Row>
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
              <Link href={`/?_paginate=${previousPage}&_search=${newSearch}`}>
                <a className="mr-auto">
                  <AiOutlineArrowLeft size={35} />
                </a>
              </Link>
            </>
          )}
          {travels.length === 4 && (
            <>
              <Link href={`/?_paginate=${nextPage}&_search=${newSearch}`}>
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
  const _search = query._search ?? "";

  const { data } = await api.get("travels", {
    params: {
      _offset,
      _limit,
      _orderBy: "id",
      _search,
    },
  });

  console.log(data);

  return {
    props: {
      travels: data,
      paginate: query._paginate ?? 1,
      _search,
    },
  };
};
