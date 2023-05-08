import {
  Container,
  Title,
  TextInput,
  Button,
  createStyles,
  rem,
} from "@mantine/core";

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

function submit() {
  alert("test");
}

function Checkout() {
  const { classes } = useStyles();

  return (
    <Container px="lg">
      <Title order={2} ta="center" mt="sm">
        Checkout
      </Title>
      <TextInput placeholder="First name" mt="sm" classNames={classes} />
      <TextInput placeholder="Last name" mt="sm" classNames={classes} />
      <TextInput placeholder="Address" mt="sm" classNames={classes} />
      <TextInput placeholder="City" mt="sm" classNames={classes} />
      <TextInput placeholder="State" mt="sm" classNames={classes} />
      <TextInput placeholder="Zip" mt="sm" classNames={classes} />
      <TextInput placeholder="Phone" mt="sm" classNames={classes} />
      <TextInput placeholder="Email" mt="sm" classNames={classes} />
      <Button mt={10} onClick={() => submit()}>
        Submit
      </Button>
    </Container>
  );
}

export default Checkout;
