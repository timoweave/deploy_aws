const chalk = require('chalk');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 80;

class Server {


    constructor() {
        const app = express();
        app.use(morgan("dev"));
        this.app = app;
        this.init_routes();
    }

    listen(port, callback) {
        const app = this.app;
        app.listen(port, callback);
    }
    
    init_routes() {
        const app = this.app;
        app.use(this.add_date);
        app.get("/:item", this.handle_item);
        app.get("/", this.handle_index);
        app.use(this.handle_error);
    }
    
    handle_error(req, res) { // no page
        const data = {
            message : "page not found",
            time : req.date.toUTCString()
        };
        res.status(400).json(data);
    }

    handle_index(req, res) { // index page
        const data = {
            page : "index.html",
            message : "hello index",
            time: req.date.toUTCString()
        };
        res.status(200).json(data);
    }

    handle_item(req, res) { // param
        const data = {
            param : req.params.item,
            message : "item param",
            time: req.date.toUTCString()
        };
        res.status(200).json(data);
    }

    add_date(req, res, next) {
        req.date = new Date();
        next();
    }
    
}

const app = new Server();
app.listen(port, () => {
    console.log(chalk.green("OK"), "listen", port);
});
