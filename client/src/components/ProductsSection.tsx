import React from "react";
import useSWR from "swr";
import { createStyles } from "@mantine/core";

export interface Product {
  id: number;
  title: string;
  price: number;
}

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
}));

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function ProductsSection() {
  const { data } = useSWR<Product[]>("api/products", fetcher);

  const { classes } = useStyles();

  return (
    <section className="wrapper style1">
      <div className={classes.container}>
        <div className="row">
          <section className="col-6 col-12-narrower">
            <div className="box post">
              <a href="#" className="image left">
                <img src="images/pic01.jpg" alt="" />
              </a>
              <div className="inner">
                <h3>The First Thing</h3>
                <p>{JSON.stringify(data)}</p>
              </div>
            </div>
          </section>
          <section className="col-6 col-12-narrower">
            <div className="box post">
              <a href="#" className="image left">
                <img src="images/pic02.jpg" alt="" />
              </a>
              <div className="inner">
                <h3>The Second Thing</h3>
                <p>
                  Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et
                  dapibus nisl amet mattis, sed a rutrum accumsan sed.
                  Suspendisse eu.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="row">
          <section className="col-6 col-12-narrower">
            <div className="box post">
              <a href="#" className="image left">
                <img src="images/pic03.jpg" alt="" />
              </a>
              <div className="inner">
                <h3>The Third Thing</h3>
                <p>
                  Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et
                  dapibus nisl amet mattis, sed a rutrum accumsan sed.
                  Suspendisse eu.
                </p>
              </div>
            </div>
          </section>
          <section className="col-6 col-12-narrower">
            <div className="box post">
              <a href="#" className="image left">
                <img src="images/pic04.jpg" alt="" />
              </a>
              <div className="inner">
                <h3>The Fourth Thing</h3>
                <p>
                  Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et
                  dapibus nisl amet mattis, sed a rutrum accumsan sed.
                  Suspendisse eu.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
