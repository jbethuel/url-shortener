package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/greet", func(c *gin.Context) {
		c.String(200, "Hello")
	})

	router.Run("localhost:9090")
}
