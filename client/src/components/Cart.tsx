import React from "react";
import { ProductTable } from "./ProductTable";
import { Container } from "@mantine/core";
import { Title } from "@mantine/core";
import { Button } from "@mantine/core";

function Cart() {
  function checkout() {
    window.location.replace("/checkout");
  }

  return (
    <Container px="lg">
      <Title order={2} ta="center" mt="sm">
        Cart
      </Title>
      <ProductTable />
      <Button mt={10} onClick={() => checkout()}>
        Next
      </Button>
    </Container>
  );
}

export default Cart;
