package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/paymentintent"
)

type Product struct {
	Id int `json:"id"`
	ImageName string `json:"imageName"`
	ProductName string `json:"productName"`
	Price float32 `json:"price"`
	Discount float32 `json:"discount"`
	Description string `json:"description"`
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
	stripe.Key = "sk_test_51N4ti8C4fJn5tMJY6kv5B5K4GlQRWjjpVKTXNPb2hkg0pQoYQKJM58ZWrnqPzqVpRP8lKbSq2DQlq1DSwv7C6Ubp00mOWWt6GL"

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

	app.Get("/api/products/", func(c *fiber.Ctx) error {
		rows, err := db.Query("SELECT * FROM public.\"Product\"")
		CheckError(err)

		var products []*Product 
		for rows.Next() {
			c := new(Product)
			err := rows.Scan(&c.Id, &c.ImageName, &c.ProductName, &c.Price, &c.Discount, &c.Description)
			CheckError(err)
		
			products = append(products, c)
		}
		if err := rows.Err(); 
		err != nil {
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

		return c.JSON(lastInsertId)
	})

	app.Post("/api/createPaymentIntent", func(c *fiber.Ctx) error {	  
		params := &stripe.PaymentIntentParams{
		  Amount:   stripe.Int64(140),
		  Currency: stripe.String(string(stripe.CurrencyUSD)),
		}
	  
		pi, err := paymentintent.New(params)
		if err != nil {
			log.Fatal(err)
			return err
		}

		return c.JSON(struct {
			ClientSecret string `json:"clientSecret"`
		  }{
			ClientSecret: pi.ClientSecret,
		  })
	})

	log.Fatal(app.Listen(":4000"))
}

func CheckError(err error) {
    if err != nil {
        log.Fatal(err)
    }
}