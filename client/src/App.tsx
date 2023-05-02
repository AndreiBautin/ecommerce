import useSWR from "swr";
import "./assets/css/App.css";
import { HeaderSimple } from "./components/HeaderSimple";
import { AppShell } from "@mantine/core";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

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
  const links = [
    { link: "/", label: "Home" },
    { link: "/#shop", label: "Shop" },
    { link: "/#about", label: "About" },
    { link: "/cart", label: "Cart" },
  ];

  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

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
        <Notifications />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </AppShell>
    </div>
  );
}

export default App;
