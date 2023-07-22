exports.listTodo = async (req, res) => {
    var userId = req.userId;
    Todo.find({ userId: userId }, function (err, todos) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send(todos);
    }
    );
};

exports.detailTodo = async (req, res) => {
    var userId = req.userId;
    Todo.findOne({ userId: userId, _id: req.params.id }, function (err, todo) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (!todo) {
            return res.status(404).send({ message: "Todo not found." });
        }
        return res.status(200).send(todo);
    });
}

exports.updateTodo = async (req, res) => {
    var userId = req.userId;
    Todo.findOne({ userId: userId, _id: req.params.id }, function (err, todo) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (!todo) {
            return res.status(404).send({ message: "Todo not found." });
        }
        todo.text_description = req.body.text_description;
        todo.completed = req.body.completed;
        todo.save(function (err, todo) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            return res.status(200).send(todo);
        });
    });
}

exports.deleteTodo = async (req, res) => {
    var userId = req.userId;
    Todo.findOne({ userId: userId, _id: req.params.id }, function (err, todo) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        if (!todo) {
            return res.status(404).send({ message: "Todo not found." });
        }
        todo.remove(function (err, todo) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            return res.status(200).send({ message: "Todo successfully deleted." });
        });
    });
}

exports.createTodo = async (req, res) => {
    var userId = req.userId;
    var todo = new Todo({
        userId: userId,
        text_description: req.body.text_description,
        completed: req.body.completed,
    });
    todo.save(function (err, todo) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send(todo);
    });
}
