const Router = require("koa-router");

const indexControllers = require("../controllers/index");

const router = new Router();

router.get("/", indexControllers.index);

router.get("/:service/keywords", indexControllers.getKeywords);

router.get("/:service/search/keywords", indexControllers.getKeywordsWithSearch);

module.exports = router;
