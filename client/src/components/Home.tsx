import { HeroContentLeft } from "./HeroContentLeft";
import { Grid } from "@mantine/core";
import { About } from "./About";
import { ProductCard } from "./ProductCard";
import useSWR from "swr";
import { Product } from "../interfaces/Product";
export const ENDPOINT = "http://localhost:4000";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { add } from "../features/cart/cartSlice";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function Home({}) {
  const { data } = useSWR<Product[]>("api/products", fetcher);

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() =>
          dispatch(
            add({
              id: 1,
              imageName: "laptop.jpg",
              productName: "acer",
              cpu: "ryzen",
              gpu: "3060ti",
              display: "hd",
              hddssd: "1tb",
              ram: "1tb",
              price: 100,
              discount: 0,
              quantity: 1,
            })
          )
        }
      >
        add
      </button>
      <span>{JSON.stringify(cart.products)}</span>
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
