import { ENDPOINT } from "../App";
import {
  Container,
  Title,
  TextInput,
  Button,
  createStyles,
  rem,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { clear } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";
import { update } from "../features/activeLink/activeLinkSlice";
import { Notifications } from "@mantine/notifications";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";

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
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
    },

    validate: {
      firstName: isNotEmpty("Invalid first name"),
      lastName: isNotEmpty("Invalid last name"),
      address: isNotEmpty("Invalid address"),
      city: isNotEmpty("Invalid city"),
      state: isNotEmpty("Invalid state"),
      zip: (value) =>
        /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) ? null : "Invalid phone number",
      phone: (value) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
          ? null
          : "Invalid phone number",
      email: isEmail("Invalid email"),
    },
  });

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
      cart: cart.products,
    };
    await fetch(`${ENDPOINT}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    Notifications.show({
      title: "Success!",
      message: "Order submitted",
    });
    dispatch(clear());
    dispatch(update("/"));
    navigate("/");
  }

  return (
    <Container px="lg">
      <Title order={2} ta="center" mt="sm">
        Checkout
      </Title>
      <form onSubmit={form.onSubmit(submit)}>
        <TextInput
          placeholder="First name"
          mt="sm"
          {...form.getInputProps("firstName")}
          classNames={classes}
        />
        <TextInput
          placeholder="Last name"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          placeholder="Address"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("address")}
        />
        <TextInput
          placeholder="City"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("city")}
        />
        <Select
          placeholder="State"
          mt="sm"
          classNames={classes}
          data={[
            { value: "Alabama", label: "Alabama" },
            { value: "Alaska", label: "Alaska" },
            { value: "Arizona", label: "Arizona" },
            { value: "Arkansas", label: "Arkansas" },
            { value: "California", label: "California" },
            { value: "Colorado", label: "Colorado" },
            { value: "Connecticut", label: "Connecticut" },
            { value: "Delaware", label: "Delaware" },
            { value: "Florida", label: "Florida" },
            { value: "Georgia", label: "Georgia" },
            { value: "Hawaii", label: "Hawaii" },
            { value: "Idaho", label: "Idaho" },
            { value: "Illinois", label: "Illinois" },
            { value: "Indiana", label: "Indiana" },
            { value: "Iowa", label: "Iowa" },
            { value: "Kansas", label: "Kansas" },
            { value: "Kentucky", label: "Kentucky" },
            { value: "Louisiana", label: "Louisiana" },
            { value: "Maine", label: "Maine" },
            { value: "Maryland", label: "Maryland" },
            { value: "Massachusetts", label: "Massachusetts" },
            { value: "Michigan", label: "Michigan" },
            { value: "Minnesota", label: "Minnesota" },
            { value: "Mississippi", label: "Mississippi" },
            { value: "Missouri", label: "Missouri" },
            { value: "Montana", label: "Montana" },
            { value: "Nebraska", label: "Nebraska" },
            { value: "Nevada", label: "Nevada" },
            { value: "New Hampshire", label: "New Hampshire" },
            { value: "New Jersey", label: "New Jersey" },
            { value: "New Mexico", label: "New Mexico" },
            { value: "New York", label: "New York" },
            { value: "North Carolina", label: "North Carolina" },
            { value: "North Dakota", label: "North Dakota" },
            { value: "Ohio", label: "Ohio" },
            { value: "Oklahoma", label: "Oklahoma" },
            { value: "Oregon", label: "Oregon" },
            { value: "Pennsylvania", label: "Pennsylvania" },
            { value: "Rhode Island", label: "Rhode Island" },
            { value: "South Carolina", label: "South Carolina" },
            { value: "South Dakota", label: "South Dakota" },
            { value: "Tennessee", label: "Tennessee" },
            { value: "Texas", label: "Texas" },
            { value: "Utah", label: "Utah" },
            { value: "Vermont", label: "Vermont" },
            { value: "Virginia", label: "Virginia" },
            { value: "Washington", label: "Washington" },
            { value: "West Virginia", label: "West Virginia" },
            { value: "Wisconsin", label: "Wisconsin" },
            { value: "Wyoming", label: "Wyoming" },
          ]}
          {...form.getInputProps("state")}
        />
        <TextInput
          placeholder="Zip"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("zip")}
        />
        <TextInput
          placeholder="Phone"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("phone")}
        />
        <TextInput
          placeholder="Email"
          mt="sm"
          classNames={classes}
          {...form.getInputProps("email")}
        />
        <Button mt={10} type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Checkout;
