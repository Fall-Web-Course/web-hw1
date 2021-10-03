package main

import (
	"github.com/gin-gonic/gin"
	"crypto/sha256"
	"net/http"
	"fmt"
)


func sha256_get(c *gin.Context){
	c.HTML(http.StatusOK, "sha256.html", gin.H{})
}

func sha256_post(c *gin.Context){
	input := c.PostForm("text")
	hash := sha256.Sum256([]byte(input))
	out := fmt.Sprintf("%x", hash)
	c.HTML(200, "sha256.html", gin.H{"input": input, "sha_value": out})
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("../nginx locust front/templates/*")

	r.GET("/ping", func(c *gin.Context) { // For the sake of testing
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/sha256", sha256_get)
	r.POST("/sha256", sha256_post)

	r.Run() // Listens on 0.0.0.0:8080
}
