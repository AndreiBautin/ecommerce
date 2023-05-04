import React from "react";
import { ProductTable } from "./ProductTable";
import { Container } from "@mantine/core";
import { Title } from "@mantine/core";
import { Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { decrement, increment } from "../features/counter/counterSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  function checkout() {
    navigate("/checkout");
  }

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Container px="lg">
      <Title order={2} ta="center" mt="sm">
        Cart
      </Title>
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
      <ProductTable />
      <Button mt={10} onClick={() => checkout()}>
        Next
      </Button>
    </Container>
  );
}

export default Cart;
