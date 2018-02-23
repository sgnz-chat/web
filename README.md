sgnz-chat Web
====

## Overview
sgnz-chat web client

## Installation

```bash
$ npm install
```

## Quick Start

```bash
$ npm install
```

  Start the server:

```bash
$ npm start
```
## Example 

```bash
$ git clone --recursive -j8 git@github.com:sgnz-chat/web.git
$ npm install
$ npm start
```

## Build

  Development:

```bash
$ npm run postinstall:development
```

  Production:

```bash
$ npm run postinstall:production
```

## Git Update
```bash
$ git submodule foreach 'git checkout master; git pull'
$ git pull
```

## Deploy
1. Copy all files from `assets` and `build` to the website's root directory.

```bash
mv assets/* <htdocs>
mv build/* <htdocs>
```

