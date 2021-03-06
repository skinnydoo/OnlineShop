# OnlineShop

OnlineShop is a showcase of a transactional website that allows users to purchase electronic products online. The kind of functionnality we see in website like Amazon, Newegg etc...

## Install

```
git clone https://github.com/skinnydoo/OnlineShop.git
```

Then make sure you have Node and npm installed and at the root of the project do

```
npm install
```

Then, in the server folder you will need to create a copy of `.env.example`, and rename it to `.env`. This file contains any configuration specific to your setup. In particular, it is important to set up a valid MongoDB connection or the project will not run.

### Install Node and NPM on Mac

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
```

### Install Node and NPM on Windows

Install from [Node.js website](https://nodejs.org/en/).

Verify using

```
node --version
npm --version
```

## Run

```
npm start
```

If everything goes well, the server will be accessible from the following address: `http://localhost:3000`. As for the client, it will be accessible from: `http://localhost:8000`.


## Repo structure

1. Client : An Angular app
2. Server : A Node app

## Projects

[:arrow_heading_up: Root](./README.md)

[:point_right: Client](client/)

[:point_right: Server](server/)
