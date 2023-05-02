import React from "react";
import { HeroContentLeft } from "./HeroContentLeft";
import { Grid } from "@mantine/core";
import { Feature } from "./Feature";
import { ProductCard } from "./ProductCard";
import { FooterSimple } from "./FooterSimple";
import useSWR from "swr";
import { Product } from "../interfaces/Product";

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function Home() {
  const { data, mutate } = useSWR<Product[]>("api/products", fetcher);

  const links = [
    { link: "#home", label: "Home" },
    { link: "#shop", label: "Shop" },
    { link: "#about", label: "About" },
    { link: "#cart", label: "Cart" },
  ];

  return (
    <div>
      <section id="home">
        <HeroContentLeft />
      </section>
      <section id="shop">
        <Grid px={100}>
          {data?.map(function (product) {
            return (
              <Grid.Col md={4} lg={3}>
                <ProductCard product={product} />
              </Grid.Col>
            );
          })}
        </Grid>
      </section>
      <section id="about">
        <Feature />
      </section>
    </div>
  );
}

export default Home;
