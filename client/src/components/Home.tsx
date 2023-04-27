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
      imageName: "asus.jpg",
      productName: "ASUS ROG",
      CPU: "Intel Core i7",
      GPU: "NVIDIA GeForce RTX 4060",
      Display: '16.0", Full HD (1920 x 1080)',
      HDDSSD: "2TB SSD",
      RAM: "64GB",
      price: 2709.99,
      discount: 0.25,
    },
    {
      imageName: "hp.jpg",
      productName: "HP ProBook",
      CPU: "AMD Ryzen 5",
      GPU: "AMD Radeon RX Vega 7",
      Display: "13.3”, Full HD (1920 x 1080)",
      HDDSSD: "256GB",
      RAM: "16GB",
      price: 1060.99,
      discount: 0,
    },
    {
      imageName: "acer.jpg",
      productName: "Acer Chromebook",
      CPU: "AMD Ryzen 3",
      GPU: "AMD Radeon RX Vega 3",
      Display: '14.0", Full HD (1920 x 1080)',
      HDDSSD: "128GB",
      RAM: "8GB",
      price: 369.99,
      discount: 0,
    },
    {
      imageName: "dell.jpg",
      productName: "Dell Inspiron",
      CPU: "Intel Core i7",
      GPU: "Intel Iris Xe Graphics G7",
      Display: '15.6", Full HD (1920 x 1080)',
      HDDSSD: "1TB SSD",
      RAM: "16GB DDR5",
      price: 979.99,
      discount: 0,
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
