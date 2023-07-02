import { Hero } from "./Hero";
import { Grid } from "@mantine/core";
import { About } from "./About";
import { ProductCard } from "./ProductCard";
export const ENDPOINT = "http://localhost:4000";
import { Product } from "../features/cart/cartSlice";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyBVA74vzdWYfeSB1RWdRPpCWJOszTKHeDY",
  authDomain: "office-supplies-shop-demo.firebaseapp.com",
  projectId: "office-supplies-shop-demo",
  storageBucket: "office-supplies-shop-demo.appspot.com",
  messagingSenderId: "972839211807",
  appId: "1:972839211807:web:879530de5249454d5d562a",
  measurementId: "G-4HDF097ND5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCol = collection(db, "product");
const productsSnapshot = await getDocs(productsCol);
const products = productsSnapshot.docs.map((doc) => doc.data() as Product);

function Home({}) {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="shop">
        <Grid px={{ base: 10, sm: 25, md: 100, lg: 200 }}>
          {products?.map(function (product) {
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
