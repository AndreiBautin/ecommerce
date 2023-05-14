import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
  rem,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { add } from "../features/cart/cartSlice";
import { useAppDispatch } from "../app/hooks";
import { Product } from "../features/cart/cartSlice";

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
  const dispatch = useAppDispatch();

  function AddToCart() {
    dispatch(
      add({
        product: {
          id: product.id,
          imageName: product.imageName,
          productName: product.productName,
          price: product.price,
          discount: product.discount,
          description: product.description,
        },
        quantity: 1,
      })
    );

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
          Description
        </Text>

        <Group spacing={8} mb={-8}>
          {product.description}
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
