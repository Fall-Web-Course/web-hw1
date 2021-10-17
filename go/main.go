package main

import (
	"github.com/gin-gonic/gin"
	"crypto/sha256"
	"net/http"
	"fmt"
)

func getSHA256(input string){
	hash := sha256.Sum256([]byte(input))
	out := fmt.Sprintf("%x", hash)
	return out
}

func sha256_get(c *gin.Context){
	c.HTML(http.StatusOK, "sha256.html", gin.H{})
}

func sha256_post(c *gin.Context){
	input := c.PostForm("text")
	if len(input) < 8 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Your input must be more than 8 chars"})
		return
	}
	hash := getSHA256(input)
	c.HTML(http.StatusOK, "sha256.html", gin.H{"input": input, "sha_value": hash})
	// TOdO: store in databaes
}

func sha256_post(c *gin.Context){
	hash := getSHA256(c.PostForm("string"))
	c.JSON(http.StatusOK, gin.H{"sha256": out})
	// TOdO: store in databaes
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("../nginx locust front/templates/*")

	r.GET("/ping", func(c *gin.Context) { // For the sake of testing
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/", sha256_get)
	r.POST("/sha256", sha256_post)
	r.POST("/sha", sha_api_post)
	// TODO: add get endpoints

	r.Run() // Listens on 0.0.0.0:8080
}
