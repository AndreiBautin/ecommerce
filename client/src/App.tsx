import useSWR from "swr";
import "./assets/css/App.css";
import { HeaderSimple } from "./components/HeaderSimple";
import { AppShell } from "@mantine/core";
import { NavbarMinimal } from "./components/NavbarMinimal";
import { HeroContentLeft } from "./components/HeroContentLeft";
import { FeaturesCard } from "./components/FeaturesCard";
import { Grid } from "@mantine/core";
import { Feature } from "./components/Feature";
import { FooterSimple } from "./components/FooterSimple";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  const links = [
    { link: "#home", label: "Home" },
    { link: "#shop", label: "Shop" },
    { link: "#about", label: "About" },
  ];

  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todosn/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <div id="page-wrapper">
      <AppShell
        padding="md"
        navbar={<NavbarMinimal />}
        header={<HeaderSimple links={links} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <section id="home">
          <HeroContentLeft />
        </section>
        <section id="shop">
          <Grid px={100}>
            <Grid.Col md={4} lg={3}>
              <FeaturesCard />
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <FeaturesCard />
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <FeaturesCard />
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <FeaturesCard />
            </Grid.Col>
          </Grid>
        </section>
        <section id="about">
          <Feature />
        </section>
        <FooterSimple links={links} />
      </AppShell>
    </div>
  );
}

export default App;
