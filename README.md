# EMUFC-API

### Tech

* [Babel](https://babeljs.io/) to translate the written code into the javascript supported by [NodeJS](https://nodejs.org/en/).
* [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/) for tests.
* [Yarn](https://yarnpkg.com/en/) to download npm dependecies.
* [Sequelize](http://docs.sequelizejs.com/) as ORM with [MySQL](https://www.mysql.com/) as database with [Sequelize-CLI](https://github.com/sequelize/cli) helping to create models/migration files and execute them.


### Installation

Recommended to use [Node.js](https://nodejs.org/) v6+ to run the project.

Install the dependencies and devDependencies and start the server.

```sh
$ cd emufc-api
$ sudo yarn
```

### Development

Want to contribute? Great!

**Please, first configure `./server/src/config/database.js` file or use configured variables before running commands.**

If you need to run `migrate script` configure `./server/src/config/database.js` too.

- **To run the app in development mode:**
```sh
$ sudo yarn run dev
```

- **Running the app in production mode:**
```sh
$ sudo yarn run migrate
$ sudo yarn start
```

- **Running all tests:**
```sh
$ sudo yarn test
```

- **Running test only on `equipment` routes:**
```sh
$ sudo yarn test-equipments
```
