import useSWR from "swr";
import "./assets/css/App.css";
import { HeaderNavbar } from "./components/HeaderNavbar";
import { AppShell } from "@mantine/core";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Footer } from "./components/Footer";
import Checkout from "./components/Checkout";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51N4ti8C4fJn5tMJYNfvyborZfLf4M5r8bBTSx1erKpvzwtM5k5bGAUmLvIuE5tPA1whiTNASjZU2TPq07IfH12EE00ysCFv9l0"
);

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${ENDPOINT}/api/createPaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
  };

  const links = [
    { link: "/", label: "Home" },
    { link: "/cart", label: "Cart" },
  ];

  return (
    <div id="page-wrapper">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AppShell
            padding="md"
            header={<HeaderNavbar links={links} />}
            footer={<Footer links={links} />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Notifications />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
            </Routes>
          </AppShell>
        </Elements>
      )}
    </div>
  );
}

export default App;
