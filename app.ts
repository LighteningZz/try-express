// lib/app.ts
import * as express from "express";
import * as fs from "fs";
import * as createError from "http-errors"
import * as  path from "path"
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

class App {

    public app: express.Application;
    private views: string[] = [];
    constructor() {
        this.app = express();
        this.init();
        this.setupRoutes();
        this.setupViews();
        this.errorHandler();
    }
    private init(): void {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private setupRoutes(): void {
        const APP_DIR = path.join(__dirname, 'src');
        const ROUTER = express.Router();
        const ROUTE_FILE = 'routes.ts';
        const DEFAULT_ROUTE = require(path.join(APP_DIR, 'home', ROUTE_FILE));
        const features = fs.readdirSync(APP_DIR).filter(
            file => {
                const ROUTE_PATH = path.join(APP_DIR, file, ROUTE_FILE);
                return fs.existsSync(ROUTE_PATH);
            }
        )
        features.forEach(feature => {
            const ROUTE_PATH = path.join(APP_DIR, feature);
            const routes = require(path.join(ROUTE_PATH, ROUTE_FILE));
            routes.setup(ROUTER);
            this.app.use(`/${feature}`, ROUTER);
            this.views.push(path.join(ROUTE_PATH, 'views'))
        });
        DEFAULT_ROUTE.setup(ROUTER);

    }
    private setupViews(): void {
        this.app.set('view engine', 'pug');
        this.app.set('views', [path.join(__dirname, 'src', 'shared', 'views'), ...this.views]);
    }
    private errorHandler(): void {
        this.app.use((req, res, next) => {
            next(createError(404));
        });
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }

}

export default new App().app;