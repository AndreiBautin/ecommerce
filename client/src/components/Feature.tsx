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
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Extreme performance",
    description: "Powered by a Golang/PostgreSQL backend and a React frontend",
    icon: IconGauge,
  },
  {
    title: "Security focused",
    description: "Integrated with Google Authentication",
    icon: IconUser,
  },
  {
    title: "No junk",
    description: "Just clean, minimalist code",
    icon: IconCookie,
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

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

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
      <Group position="center">
        <Badge variant="filled" size="lg">
          Like the site?
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Lets make something even better!
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        I make professional full-stack software solutions. Let me tell you a bit
        more about this application.
      </Text>

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
