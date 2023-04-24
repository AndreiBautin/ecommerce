import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";
import "./assets/css/App.css";
import AddTodo from "./components/AddTodo";
import ProductsSection from "./components/ProductsSection";
import SiteHeader from "./components/SiteHeader";

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

  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todosn/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <div id="page-wrapper">
      <div id="header">
        <SiteHeader />

        <nav id="nav">
          <ul>
            <li className="current">
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#">Dropdown</a>
              <ul>
                <li>
                  <a href="#">Lorem dolor</a>
                </li>
                <li>
                  <a href="#">Magna phasellus</a>
                </li>
                <li>
                  <a href="#">Etiam sed tempus</a>
                </li>
                <li>
                  <a href="#">Submenu</a>
                  <ul>
                    <li>
                      <a href="#">Lorem dolor</a>
                    </li>
                    <li>
                      <a href="#">Phasellus magna</a>
                    </li>
                    <li>
                      <a href="#">Magna phasellus</a>
                    </li>
                    <li>
                      <a href="#">Etiam nisl</a>
                    </li>
                    <li>
                      <a href="#">Veroeros feugiat</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Veroeros feugiat</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="left-sidebar.html">Left Sidebar</a>
            </li>
            <li>
              <a href="right-sidebar.html">Right Sidebar</a>
            </li>
            <li>
              <a href="two-sidebar.html">Two Sidebar</a>
            </li>
            <li>
              <a href="no-sidebar.html">No Sidebar</a>
            </li>
          </ul>
        </nav>
      </div>

      <section id="banner">
        <header>
          <h2>
            Arcana:
            <em>
              A responsive site template freebie by
              <a href="http://html5up.net">HTML5 UP</a>
            </em>
          </h2>
          <a href="#" className="button">
            Learn More
          </a>
        </header>
      </section>

      <section className="wrapper style1">
        <div className="container">
          <div className="row gtr-200">
            <section className="col-4 col-12-narrower">
              <div className="box highlight">
                <i className="icon solid major fa-paper-plane"></i>
                <h3>This Is Important</h3>
                <div>
                  <AddTodo mutate={mutate} />
                </div>
              </div>
            </section>
            <section className="col-4 col-12-narrower">
              <div className="box highlight">
                <i className="icon solid major fa-pencil-alt"></i>
                <h3>Also Important</h3>
                <p>
                  Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et
                  dapibus nisl amet mattis, sed a rutrum accumsan sed.
                  Suspendisse eu.
                </p>
              </div>
            </section>
            <section className="col-4 col-12-narrower">
              <div className="box highlight">
                <i className="icon solid major fa-wrench"></i>
                <h3>Probably Important</h3>
                <p>
                  Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et
                  dapibus nisl amet mattis, sed a rutrum accumsan sed.
                  Suspendisse eu.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="wrapper style2">
        <div className="container">
          <header className="major">
            <h2>A gigantic heading you can use for whatever</h2>
            <p>With a much smaller subtitle hanging out just below it</p>
          </header>
        </div>
      </section>

      <ProductsSection />

      <section id="cta" className="wrapper style3">
        <div className="container">
          <header>
            <h2>Are you ready to continue your quest?</h2>
            <a href="#" className="button">
              Insert Coin
            </a>
          </header>
        </div>
      </section>

      <div id="footer">
        <div className="container">
          <div className="row">
            <section className="col-3 col-6-narrower col-12-mobilep">
              <h3>Links to Stuff</h3>
              <ul className="links">
                <li>
                  <a href="#">Mattis et quis rutrum</a>
                </li>
                <li>
                  <a href="#">Suspendisse amet varius</a>
                </li>
                <li>
                  <a href="#">Sed et dapibus quis</a>
                </li>
                <li>
                  <a href="#">Rutrum accumsan dolor</a>
                </li>
                <li>
                  <a href="#">Mattis rutrum accumsan</a>
                </li>
                <li>
                  <a href="#">Suspendisse varius nibh</a>
                </li>
                <li>
                  <a href="#">Sed et dapibus mattis</a>
                </li>
              </ul>
            </section>
            <section className="col-3 col-6-narrower col-12-mobilep">
              <h3>More Links to Stuff</h3>
              <ul className="links">
                <li>
                  <a href="#">Duis neque nisi dapibus</a>
                </li>
                <li>
                  <a href="#">Sed et dapibus quis</a>
                </li>
                <li>
                  <a href="#">Rutrum accumsan sed</a>
                </li>
                <li>
                  <a href="#">Mattis et sed accumsan</a>
                </li>
                <li>
                  <a href="#">Duis neque nisi sed</a>
                </li>
                <li>
                  <a href="#">Sed et dapibus quis</a>
                </li>
                <li>
                  <a href="#">Rutrum amet varius</a>
                </li>
              </ul>
            </section>
            <section className="col-6 col-12-narrower">
              <h3>Get In Touch</h3>
              <form>
                <div className="row gtr-50">
                  <div className="col-6 col-12-mobilep">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-6 col-12-mobilep">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <ul className="actions">
                      <li>
                        <input
                          type="submit"
                          className="button alt"
                          value="Send Message"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>

        <ul className="icons">
          <li>
            <a href="#" className="icon brands fa-twitter">
              <span className="label">Twitter</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon brands fa-facebook-f">
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon brands fa-github">
              <span className="label">GitHub</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon brands fa-linkedin-in">
              <span className="label">LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon brands fa-google-plus-g">
              <span className="label">Google+</span>
            </a>
          </li>
        </ul>

        <div className="copyright">
          <ul className="menu">
            <li>&copy; Untitled. All rights reserved</li>
            <li>
              Design: <a href="http://html5up.net">HTML5 UP</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
