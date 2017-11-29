const fs = require('fs');

function pwd(){
  fs.realpath("./", (error, path) => {
    if (error) {
      console.warn(error);
    } else {
      console.log(path);
    }
  })
}

function deleteFile(fileName){
  fs.unlink(fileName, (error) => {
    if (error){
      console.warn(error);
    } else {
      console.log("File deleted");
    }
  })
}

function createFile(fileName){
  fs.open(fileName, 'w', (error, file) => {
    if (error) {
      console.warn(error);
    } else {
      console.log(`OK saved`);
    }
  });
}

function copyPaste(sourceFilename, targetFilename, f){
  fs.readFile(sourceFilename, (error, data) => {
    if (error) {
      console.warn(error + "during copy");
    } else {
      fs.writeFile(targetFilename, data, (error) => {
        if (error) {
          console.warn(error + "during paste");
        } else {
          console.log("Copy paste OK");
          if (f !== undefined) {
            f(sourceFilename, targetFilename);
          }
        }
      })
    }
  })
}

function cutPaste(sourceFilename, targetFilename){
  copyPaste(sourceFilename, targetFilename, deleteFile);
}

function touch(fileName){
  fs.access(fileName, (error) => {
    if (error) {
      console.warn("File does not exists");
    } else {
      console.log("File exists");
      fs.writeFile(fileName, "", (error2) => {
        if (error2){
          console.warn("Error while opening file");
        } else {
          console.log("Modification date modified");
        }
      });
    }
  })
}

touch("test.txt");
