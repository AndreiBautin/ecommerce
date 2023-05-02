import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
} from "@mantine/core";
import {
  IconFrame,
  IconBadgeHd,
  IconScreenShare,
  IconCpu,
  IconCpu2,
} from "@tabler/icons-react";
import { Product } from "../interfaces/Product";
import { Notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-around",
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100%",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  function AddToCart() {
    var existingCart = localStorage.getItem("cart");
    if (!existingCart) {
      existingCart = "";
    }
    var parsedCart;
    try {
      parsedCart = JSON.parse(existingCart);
    } catch (e) {
      console.log(e);
    }
    if (!parsedCart) {
      parsedCart = [];
    }
    parsedCart.push(product);
    localStorage.setItem("cart", JSON.stringify(parsedCart));

    Notifications.show({
      title: "Cart Updated",
      message: "Item has been added",
    });
  }

  const { classes } = useStyles();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  var priceWithDiscount = product.price * (1 - product.discount);
  var formattedPrice = formatter.format(priceWithDiscount);

  const specDetails = [
    { label: product.cpu, icon: IconCpu },
    { label: product.gpu, icon: IconCpu2 },
    { label: product.display, icon: IconScreenShare },
    { label: product.hddssd, icon: IconBadgeHd },
    { label: product.ram, icon: IconFrame },
  ];

  const specs = specDetails.map((specDetail) => (
    <Center key={specDetail.label}>
      <specDetail.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{specDetail.label}</Text>
    </Center>
  ));

  var markup = (
    <Card mt={50} withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={`images/${product.imageName}`} />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{product.productName}</Text>
        </div>
        {product.discount > 0 && product.discount < 1 && (
          <Badge variant="outline">{product.discount * 100}% off</Badge>
        )}
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Specs
        </Text>

        <Group spacing={8} mb={-8}>
          {specs}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              {formattedPrice}
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }} onClick={AddToCart}>
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );

  return markup;
}
