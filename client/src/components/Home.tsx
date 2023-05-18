import { Hero } from "./Hero";
import { Grid } from "@mantine/core";
import { About } from "./About";
import { ProductCard } from "./ProductCard";
import useSWR from "swr";
export const ENDPOINT = "http://localhost:4000";
import { Product } from "../features/cart/cartSlice";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function Home({}) {
  const { data } = useSWR<Product[]>("api/products", fetcher);

  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="shop">
        <Grid px={{ base: 10, sm: 25, md: 100, lg: 200 }}>
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
        <About />
      </section>
    </div>
  );
}

export default Home;
