import { ENDPOINT } from "../App";
import {
  Container,
  Title,
  TextInput,
  Button,
  createStyles,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { clear } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

export function Checkout() {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const cart = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const { classes } = useStyles();

  async function submit() {
    var payload = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      cart: cart,
    };
    alert(JSON.stringify(payload));
    // const ordered = await fetch(`${ENDPOINT}/api/orders`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // }).then((r) => r.json());
    dispatch(clear());
    navigate("/");
  }

  return (
    <Container px="lg">
      <Title order={2} ta="center" mt="sm">
        Checkout
      </Title>
      <TextInput
        placeholder="First name"
        mt="sm"
        onChange={(event) => setFirstName(event.target.value)}
        classNames={classes}
      />
      <TextInput
        placeholder="Last name"
        mt="sm"
        classNames={classes}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextInput
        placeholder="Address"
        mt="sm"
        classNames={classes}
        onChange={(event) => setAddress(event.target.value)}
      />
      <TextInput
        placeholder="City"
        mt="sm"
        classNames={classes}
        onChange={(event) => setCity(event.target.value)}
      />
      <TextInput
        placeholder="State"
        mt="sm"
        classNames={classes}
        onChange={(event) => setState(event.target.value)}
      />
      <TextInput
        placeholder="Zip"
        mt="sm"
        classNames={classes}
        onChange={(event) => setZip(event.target.value)}
      />
      <TextInput
        placeholder="Phone"
        mt="sm"
        classNames={classes}
        onChange={(event) => setPhone(event.target.value)}
      />
      <TextInput
        placeholder="Email"
        mt="sm"
        classNames={classes}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button mt={10} onClick={() => submit()}>
        Submit
      </Button>
    </Container>
  );
}

export default Checkout;
