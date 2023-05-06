import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { CartProduct } from "../features/cart/cartSlice";
import { useAppSelector } from "../app/hooks";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    textAlign: "center",
  },
}));

export function ProductTable() {
  const { classes, cx } = useStyles();

  const cart = useAppSelector((state) => state.cart);

  const removeItem = (productId: number) => {};

  return (
    <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {cart.products.map((row: CartProduct) => (
          <tr>
            <td>
              <Group>
                <Avatar size={100} src={`/images/${row.product.imageName}`} />
              </Group>
            </td>
            <td>
              <Text fz="sm" c="dimmed" ta="left">
                {row.product.productName}
              </Text>
            </td>
            <td>
              <Text fz="sm" c="dimmed" ta="left">
                {row.quantity}
              </Text>
            </td>
            <td>
              <Text fz="sm" c="dimmed" ta="left">
                {row.product.price}
              </Text>
            </td>
            <td>
              <Text fz="sm" c="dimmed" ta="left">
                {row.product.price * row.quantity}
              </Text>
            </td>
            <td>
              <Group spacing={0} position="left">
                <ActionIcon color="red">
                  <IconTrash
                    size="1rem"
                    stroke={1.5}
                    onClick={() => removeItem(row.product.id)}
                  />
                </ActionIcon>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
