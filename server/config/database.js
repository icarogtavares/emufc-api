import { getConfig } from './index'

let config = getConfig({
    development: {
        username: "root",
        password: "root",
        database: "emufc",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "root",
        password: "root",
        database: "emufc",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    test: {
        username: "root",
        password: "root",
        database: "emufc_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    }
});

export default config