package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

type Product struct {
	Id int `json:"id"`
	ImageName string `json:"imageName"`
	ProductName string `json:"productName"`
	CPU string `json:"cpu"`
	GPU string `json:"gpu"`
	Display string `json:"display"`
	HDDSSD string `json:"hddssd"`
	RAM string `json:"ram"`
	Price float32 `json:"price"`
	Discount float32 `json:"discount"`
}

type OrderProduct struct {
	Product Product `json:product`
	Quantity int `json:quantity`
}

type Order struct {
	ID int `json:id`
	FirstName string `json:firstName`
	LastName string `json:lastName`
	Address string `json:address`
	City string `json:city`
	State string `json:state`
	Zip string `json:zip`
	Phone string `json:phone`
	Email string `json:email`
	Cart []OrderProduct `json:cart`
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

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Get("/api/products/", func(c *fiber.Ctx) error {
		rows, err := db.Query("SELECT * FROM public.\"Product\"")
		CheckError(err)

		var products []*Product // declare a slice of courses that will hold all of the Course instances scanned from the rows object
		for rows.Next() { // this stops when there are no more rows
			c := new(Product) // initialize a new instance
			err := rows.Scan(&c.Id, &c.ImageName, &c.ProductName, &c.CPU, &c.GPU, &c.Display, &c.HDDSSD, &c.RAM, &c.Price, &c.Discount) // scan contents of the current row into the instance
			CheckError(err)
		
			products = append(products, c) // add each instance to the slice
		}
		if err := rows.Err(); 
		err != nil { // make sure that there was no issue during the process
			CheckError(err)
			return err
		}

		return c.JSON(products)
	})

	app.Post("/api/orders", func(c *fiber.Ctx) error {
		order := &Order{}

		if err := c.BodyParser(order); err != nil {
			log.Fatal(err)
			return err
		}
		
		lastInsertId := 0
		query := fmt.Sprintf("INSERT INTO \"Order\" (\"FirstName\", \"LastName\", \"Address\", \"City\", \"State\", \"Zip\", \"Phone\", \"Email\") VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s') RETURNING \"Id\";", order.FirstName, order.LastName, order.Address, order.City, order.State, order.Zip, order.Phone, order.Email)
		
		err := db.QueryRow(query).Scan(&lastInsertId)
		CheckError(err)		

		for index, element := range order.Cart {
			query2 := fmt.Sprintf("INSERT INTO \"OrderProduct\" (\"Quantity\", \"ProductId\", \"OrderId\") VALUES ('%d', '%d', '%d');", element.Quantity, element.Product.Id, lastInsertId)
			row, err := db.Query(query2)
			CheckError(err)
			print(row)
			print(index)
		}

		return c.JSON("success")
	})

	log.Fatal(app.Listen(":4000"))
}

func CheckError(err error) {
    if err != nil {
        log.Fatal(err)
    }
}