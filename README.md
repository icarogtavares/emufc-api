# EMUFC-API

### Tech

* [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/) for tests.
* [Loadtest](https://github.com/alexfernandez/loadtest) for loadtests.
* [Sequelize](http://docs.sequelizejs.com/) as ORM with [MySQL](https://www.mysql.com/) as database with [Sequelize-CLI](https://github.com/sequelize/cli) helping to create models/migration files and execute them.


### Installation

Recommended to use [Node.js](https://nodejs.org/) v6+ to run the project.

Install the dependencies and devDependencies and start the server.

```sh
$ cd emufc-api
$ npm install
```

### Development

Want to contribute? Great!

**Please, first configure `./server/src/config/database.js` file or use configured variables before running commands.**

- **To run the app in development mode:**
```sh
$ npm run dev
```

- **Running the app in production mode:**
```sh
$ npm start
```

- **Running tests:**
```sh
$ yarn test
```

- **Running loadtest:**

You need to start the server and run the tests on another terminal.

```sh
$ yarn loadtest
```

**Model Associations:**

- `Place` has many `Equipment`.
- `Responsible` has many `Equipment`
- `Equipment` belongs to `Place` and `Responsible`.