import { Avatar, Table, Group, Text, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { CartProduct } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { remove } from "../features/cart/cartSlice";

export function ProductTable() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const removeItem = (productId: number) => {
    dispatch(remove(productId));
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

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
                {formatter.format(
                  row.product.price * (1 - row.product.discount)
                )}
              </Text>
            </td>
            <td>
              <Text fz="sm" c="dimmed" ta="left">
                {formatter.format(
                  row.product.price * (1 - row.product.discount) * row.quantity
                )}
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
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {" "}
            <Text fz="sm" c="dimmed" ta="left">
              Grand Total:{" "}
              {formatter.format(
                cart.products.reduce(function (acc, obj) {
                  var priceWithDiscount =
                    obj.product.price * (1 - obj.product.discount);
                  return acc + priceWithDiscount * obj.quantity;
                }, 0)
              )}
            </Text>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
}
