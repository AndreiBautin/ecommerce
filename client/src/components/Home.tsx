import React from "react";
import { HeroContentLeft } from "./HeroContentLeft";
import { Grid } from "@mantine/core";
import { Feature } from "./Feature";
import { ProductCard } from "./ProductCard";
import { FooterSimple } from "./FooterSimple";

function Home() {
  const links = [
    { link: "#home", label: "Home" },
    { link: "#shop", label: "Shop" },
    { link: "#about", label: "About" },
    { link: "#cart", label: "Cart" },
  ];

  const products = [
    {
      imageName: "macbook.jpg",
      productName: "Macbook",
      productDescription: "test",
      specOne: "test",
      specTwo: "test",
      specThree: "test",
      specFour: "test",
      price: 350.0,
      discount: 0.3,
    },
    {
      imageName: "macbook.jpg",
      productName: "Macbook 2",
      productDescription: "test",
      specOne: "test",
      specTwo: "test",
      specThree: "test",
      specFour: "test",
      price: 350.0,
      discount: 0.4,
    },
    {
      imageName: "macbook.jpg",
      productName: "Macbook 3",
      productDescription: "test",
      specOne: "test",
      specTwo: "test",
      specThree: "test",
      specFour: "test",
      price: 350.0,
      discount: 0,
    },
    {
      imageName: "macbook.jpg",
      productName: "Macbook 4",
      productDescription: "test",
      specOne: "test",
      specTwo: "test",
      specThree: "test",
      specFour: "test",
      price: 350.0,
      discount: 0.3,
    },
  ];

  return (
    <div>
      <section id="home">
        <HeroContentLeft />
      </section>
      <section id="shop">
        <Grid px={100}>
          {products.map(function (product) {
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
      <FooterSimple links={links} />
    </div>
  );
}

export default Home;
