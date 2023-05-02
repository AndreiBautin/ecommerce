import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import { IconGauge, IconUser, IconLock } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Extreme performance",
    description: "Powered by a Golang backend",
    icon: IconGauge,
  },
  {
    title: "User friendly",
    description: "Slick and responsive design",
    icon: IconUser,
  },
  {
    title: "Secure",
    description: "Payments integrated with Stripe.js",
    icon: IconLock,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

function seeMore() {
  window.location.replace("https://www.andreibautin.com");
}

export function Feature() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        About
      </Title>

      <Text
        c="dimmed"
        className={classes.description}
        ta="center"
        mt="md"
        mb="md"
      >
        Backend: Go
        <br />
        Frontend: React with Mantine Component Library
        <br />
        Database: PostgreSQL
      </Text>

      <Group position="center">
        <Badge variant="filled" size="lg" mt={5} onClick={() => seeMore()}>
          See more
        </Badge>
      </Group>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
