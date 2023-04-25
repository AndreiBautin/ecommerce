package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

type Todo struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Done bool `json:"done"`
	Body string `json:"body"`
}

type Product struct {
	Id int `json:"id"`
	Title string `json:"title"`
	Price float32 `json:"price"`
	ImageName string `json:"imageName"`
}

func main() {
	fmt.Print("Hello world")

	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", "localhost", 5432, "postgres", "postgres", "ecommerce")

    db, err := sql.Open("postgres", psqlconn)
	CheckError(err)

	defer db.Close()

	err = db.Ping()
	CheckError(err)

	fmt.Println("Connected!")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	todos := []Todo{}

	// products:= []Product{    
	// 	{
	// 		Id: 1,
	// 		Title: "Notebook",
	// 		Price: 1.5,
	// 		ImageName: "Notebook.png",
	// 	},
	// 	{
	// 		Id: 2,
	// 		Title: "Pen",
	// 		Price: 2.5,
	// 		ImageName: "Pen.png",
	// 	},
	// 	{
	// 		Id: 3,
	// 		Title: "Printer",
	// 		Price: 20.5,
	// 		ImageName: "Printer.png",
	// 	},
	// 	{
	// 		Id: 4,
	// 		Title: "Ink",
	// 		Price: 24.5,
	// 		ImageName: "Ink.png",
	// 	},
	// }

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		todo.ID = len(todos) + 1

		todos = append(todos, *todo)

		return c.JSON(todos)
	})

	app.Patch("/api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid id")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}

		return c.JSON(todos)
	})

	app.Get("/api/todos/", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	app.Get("/api/products/", func(c *fiber.Ctx) error {
		rows, err := db.Query("SELECT * FROM public.\"Product\"")
		if err != nil {
			return c.JSON(err)
		}
		var products []*Product // declare a slice of courses that will hold all of the Course instances scanned from the rows object
		for rows.Next() { // this stops when there are no more rows
			c := new(Product) // initialize a new instance
			err := rows.Scan(&c.Id, &c.Title, &c.Price, &c.ImageName) // scan contents of the current row into the instance
			if err != nil {
				return err
			}
		
			products = append(products, c) // add each instance to the slice
		}
		if err := rows.Err(); err != nil { // make sure that there was no issue during the process
			return err
		}

		return c.JSON(products)
	})



	log.Fatal(app.Listen(":4000"))
}

func CheckError(err error) {
    if err != nil {
        log.Fatal(err)
    }
}