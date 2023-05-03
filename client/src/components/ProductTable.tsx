import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface Product {
  imageName: string;
  productName: string;
  price: number;
  discount: number;
}

export function ProductTable() {
  var data = JSON.parse(localStorage.getItem("cart") ?? "");

  const [cart, updateCart] = useState(data);

  const handleRemoveItem = (productName: string) => {
    updateCart(
      cart.filter((item: Product) => item.productName !== productName)
    );
  };

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  // var newData = cart.map(function (ele) {
  //   var priceWithDiscount = ele.price * (1 - ele.discount);
  //   var formattedPrice = formatter.format(priceWithDiscount);
  //   return { ...ele, formattedPrice: formattedPrice };
  // });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((item: Product) => (
            <tr>
              <td>
                <Group spacing="sm">
                  <Avatar size={100} src={`/images/${item.imageName}`} />
                  <Text fz="sm" fw={500}>
                    {item.productName}
                  </Text>
                </Group>
              </td>
              <td>
                <Text fz="sm" c="dimmed">
                  {item.productName}
                </Text>
              </td>
              <td>
                <Text fz="sm" c="dimmed">
                  {item.price}
                </Text>
              </td>
              <td>
                <Group spacing={0} position="right">
                  <ActionIcon color="red">
                    <IconTrash
                      size="1rem"
                      stroke={1.5}
                      onClick={() => handleRemoveItem(item.productName)}
                    />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
