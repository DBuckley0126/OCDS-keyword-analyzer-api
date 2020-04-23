const Router = require("koa-router");

const indexControllers = require("../controllers/index");

const router = new Router();

router.get("/", indexControllers.index);

module.exports = router;
