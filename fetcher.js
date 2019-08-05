const request = require('request');
const fs = require("fs");
const args = process.argv.slice(2);//get arguments as an array
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = function (URL, localFile) {
  request(URL, (error, response, body) => {
    if (response.statusCode === 200) {

      if (fs.existsSync(localFile)) {
        rl.question(localFile + ' already exist. replace? ', (answer) => {
          if (answer === 'y') {
            fs.writeFile(localFile, body, (err) => {
              if (err) throw err;
              console.log('Downloaded and saved ' + body.length + ' bytes to ' + localFile);
            });
          } else {
            console.log('thanks!');
          }
          rl.close();
        });
      } else {
        fs.writeFile(localFile, body, (err) => {
          if (err) throw err;
          console.log('Downloaded and saved ' + body.length + ' bytes to ' + localFile);
        });
        rl.close();
      }
    } else {
      console.log('Error web page not found');
    }
  });
};

fetcher(args[0], args[1]);
