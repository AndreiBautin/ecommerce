import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { update } from "../features/activeLink/activeLinkSlice";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  logo: {
    height: "95%",
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderNavbarProps {
  links: { link: string; label: string }[];
}

export function HeaderNavbar({ links }: HeaderNavbarProps) {
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure(false);
  const activeLink = useAppSelector((state) => state.activeLink);
  const { classes, cx } = useStyles();

  const navigate = useNavigate();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink.link === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        dispatch(update(link.link));
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <img className={classes.logo} src={logo} />
        <Group spacing={5}>{items}</Group>
      </Container>
    </Header>
  );
}
