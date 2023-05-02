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

interface ProductTableProps {
  data: {
    imageName: string;
    productName: string;
    price: number;
    discount: number;
  }[];
}

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export function ProductTable({ data }: ProductTableProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  var newData = data.map(function (ele) {
    var priceWithDiscount = ele.price * (1 - ele.discount);
    var formattedPrice = formatter.format(priceWithDiscount);
    return { ...ele, formattedPrice: formattedPrice };
  });

  const theme = useMantineTheme();
  const rows = newData.map((item) => (
    <tr key={item.productName}>
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
          {item.formattedPrice}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} onClick={() => {}} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

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
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
