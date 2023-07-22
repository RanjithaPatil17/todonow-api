const { authJwt } = require("../middlewares");
const controller = require("../controllers/todo.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

	app.post("/api/todo/create", [authJwt.verifyToken], controller.createTodo);
	app.get("/api/todo/list", [authJwt.verifyToken], controller.listTodo);
	app.get("/api/todo/detail/:id", [authJwt.verifyToken], controller.detailTodo);
	app.put("/api/todo/update/:id", [authJwt.verifyToken], controller.updateTodo);
	app.delete("/api/todo/delete/:id", [authJwt.verifyToken], controller.deleteTodo);

};