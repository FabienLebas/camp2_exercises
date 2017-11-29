const fs = require('fs');
const path = require('path');
const readline = require("readline");

let pathSplitted = path.resolve().split("/");

function navigate(path){
  fs.lstat(path, (error, stats) => {
    if(error){
      console.warn(`Error while checking if ${path} is a directory or a file`);
    } else {
      if (stats.isFile()){
        console.log(`\n~Diplaying ${path}`);
        pathSplitted.pop();
        fs.readFile(path, (error1, data) => {
          if (error1){
            console.warn("Error while reading the file");
          } else {
            console.log(`\n${data}\nEnd of your file\n`);
            getContent(pathSplitted.join("/"));
          }
        });
      }else if (stats.isDirectory()){
        console.log(`\n`);
        getContent(path);
      }else {
        console.warn("Not a file or a directory");
        console.log(`\n`);
        getContent(pathSplitted.join("/"));      }
    }
  })
}

function getContent(directory){
  fs.readdir(directory, (error, files) => {
    if (error){
      console.warn("Error while reading folder content");
    } else {
      let myStructure = "0. ../\n";
      for (let i = 0; i < files.length; i++){
        myStructure += `${i + 1}. ${files[i]}\n`;
      }
      console.log(myStructure);
      const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      reader.question("Choose a number> ", (number) => {
        if(number === "0"){
          pathSplitted.pop();
          fs.realpath(pathSplitted.join("/"), (error1, path) => {
            if(error1){
              console.warn("Error while accessing ../");
            } else {
              navigate(path);
              reader.close();
            }
          });
        }else {
          pathSplitted.push(files[number - 1]);
          navigate(pathSplitted.join("/"));
          reader.close();
        }
      });
    }
  })
}

getContent("./");
