const apisRouter = require("express").Router();
const controller_apis = require("../mvc/controllers/api.controller");

//
apisRouter.get("/", controller_apis.getApis);
apisRouter.get("/test", controller_apis.test);

module.exports = apisRouter;
