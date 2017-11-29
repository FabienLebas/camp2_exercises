const fs = require('fs');
const path = require('path');
const readline = require("readline");

let pathSplitted = path.resolve().split("/");

function optionsDirectory(directory){
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("\n1.Open\n2.Copy\n3.Move");
  reader.question(`\nChoose an option for your directory ${pathSplitted[pathSplitted.length - 1]} > `, (number) => {
    if(number === "1"){
      console.log(`\n`);
      getContent(directory);
      reader.close();
    } else if (number === "2"){
      console.log("\n");
      reader.question("\nName of the copy directory? > ", (name) => {
        console.log("J'en suis là 😁");
      });
    }
  });
}

function optionsFile(file){
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("\n1.Open\n2.Copy\n3.Move");
  reader.question(`\nChoose an option for your file ${pathSplitted[pathSplitted.length - 1]} `, (number) => {
    if(number === "1"){
      console.log(`\n~Diplaying ${file}`);
      pathSplitted.pop();
      fs.readFile(file, (error1, data) => {
        if (error1){
          console.warn("Error while reading the file");
        } else {
          console.log(`\n${data}\nEnd of your file\n`);
          getContent("./");
        }
      });
      reader.close();
    }
  });
}

function navigate(path){
  fs.lstat(path, (error, stats) => {
    if(error){
      console.warn(`Error while checking if ${path} is a directory or a file`);
    } else {
      if (stats.isFile()){
        optionsFile(path);
      }else if (stats.isDirectory()){
        optionsDirectory(path);
      }else {
        console.warn("Not a file or a directory");
        console.log(`\n`);
        getContent("../" + path);      }
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
