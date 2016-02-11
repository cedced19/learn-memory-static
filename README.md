# Learn Memory Static
A static software to host your lessons.
Here it is the generator of this software.

[Preview](https://cedced19.github.io/learn-memory-static/)

[![Build Status](https://travis-ci.org/cedced19/learn-memory-static.svg)](https://travis-ci.org/cedced19/learn-memory-static)

## Installation

__Required:__ Node.js and git

```bash
$ git clone --depth=1 --branch=master https://github.com/cedced19/zikcenter-static
$ npm install --production
$ node data-generator.js -f data.json
```

## Data
You need a __save__ of a [Learn Memory Server](https://github.com/cedced19/learn-memory) which you can get by using [Learn Memory Archiver](https://github.com/cedced19/learn-memory-archiver).

If you don't use this one, you can use `--server [adress]` option.

## Options
```
--server [adress]          specified the adress where the generator can get the data "example.com:7772"
--filename [string]        specified the data file where the generator can get the data "data.json"
```
