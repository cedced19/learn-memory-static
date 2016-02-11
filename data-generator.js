#!/usr/bin/env node
'use strict';
var fs = require('fs'),
   request = require('request'),
   program = require('commander'),
   colors = require('colors'),
   pkg = require('./package.json'),
   isThere =  require('is-there');

program
  .version(pkg.version)
  .option('-s, --server  [string]', 'specified the adress where the generator can get the data "example.com:7772"')
  .option('-f, --filename  [string]', 'specified the data file where the generator can get the data "data.json"')
  .option('-c, --check', 'check if there is an update')
  .parse(process.argv);

var writeStream = fs.createWriteStream('dist/data.json');

writeStream.on('error', function(err) {
  console.log('Error of writing.'.red);
});

writeStream.on('finish', function () {
  console.log('The data has been saved, upload the dist file to a http server.'.green);
});

if (program.server) {
  var url = 'http://' + program.server;
  var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/; // check whether a string is a URL
  if (matcher.test(url)) {
    request(url + '/api/long/')
    .on('error', function(err) {
       console.log('Error of the request.'.red);
    })
    .pipe(writeStream);
  } else {
    console.log('This isn\'t a valid URL.'.red);
  }
} else if (program.filename) {
    if (!isThere(program.filename)) return console.log('This isn\'t a valid filename.'.red);
    var readStream = fs.createReadStream(program.filename);

    readStream.on('open', function () {
      readStream.pipe(writeStream);
    });

    readStream.on('error', function(err) {
      console.log('Error of reading.'.red);
    });
} else {
  console.log('Please set a server adress or a filename.'.red);
}

if (program.check) {
    require('check-update-github')({
      name: pkg.name,
      currentVersion: pkg.version,
      user: 'cedced19',
      branch: 'master'
    }, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
}
