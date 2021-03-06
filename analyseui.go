package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	templatedir  = "./templates/"
	roottemplate = "index.tpl"
)

const AppID = "96e8358e-677c-4e54-a322-52f8d8a921ee"

var logger *log.Logger

func portbinding() string {
	if port := os.Getenv("PORT"); port != "" {
		return port
	}
	return "8081"
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.New("index").Delims("{{{", "}}}").ParseFiles(templatedir + roottemplate)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if err = tpl.Execute(w, nil); err != nil {
		fmt.Println(err)
	}
}

func main() {

	http.HandleFunc("/", rootHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	logger.Printf("analyseui (%s) listening on port %s\n", AppID, portbinding())
	http.ListenAndServe(":"+portbinding(), nil)
}

func init() {
	logger = log.New(os.Stderr, filepath.Base(os.Args[0])+": ", log.LstdFlags)
}
