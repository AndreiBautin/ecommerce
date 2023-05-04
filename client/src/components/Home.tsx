import { HeroContentLeft } from "./HeroContentLeft";
import { Grid } from "@mantine/core";
import { About } from "./About";
import { ProductCard } from "./ProductCard";
import useSWR from "swr";
import { Product } from "../interfaces/Product";
export const ENDPOINT = "http://localhost:4000";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { decrement, increment } from "../features/counter/counterSlice";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function Home({}) {
  const { data } = useSWR<Product[]>("api/products", fetcher);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
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
        <About />
      </section>
    </div>
  );
}

export default Home;
