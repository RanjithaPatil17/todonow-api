const db = require("../models");
const Todo = db.todo;
const User = db.user;


exports.listTodo = async (req, res) => {
    var userId = req.userId;
    user = await User.findOne({ _id: userId }).populate('pending').populate('completed');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }
    completedTodos = user.completed;
    pendingTodos = user.pending;
    return res.status(200).send({ completed: completedTodos, pending: pendingTodos });
};

exports.detailTodo = async (req, res) => {
    var userId = req.userId;
}

exports.updateTodo = async (req, res) => {
    var userId = req.userId;
    var destination = req.body.destination;
    var index = req.body.index;
    var todoId = req.params.id;


    if (destination && destination != "pending" && destination != "completed") {
        return res.status(400).send({ message: "Destination must be either pending or completed." });
    }
    if (!index && !destination) {
        return res.status(400).send({ message: "Index is required." });
    }
    if (!todoId) {
        return res.status(400).send({ message: "Todo id is required." });
    }

    var user = await User.findOne({ _id: userId }).populate('pending').populate('completed');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }
    var completedTodos = user.completed;
    var pendingTodos = user.pending;
    var todo = null;
    // if destination is not there, then just change the index
    if (!destination) {
        for (var i = 0; i < completedTodos.length; i++) {
            if (completedTodos[i]._id == todoId) {
                todo = completedTodos[i];
                completedTodos.splice(i, 1);
                break;
            }
        }
        if (!todo) {
            for (var i = 0; i < pendingTodos.length; i++) {
                if (pendingTodos[i]._id == todoId) {
                    todo = pendingTodos[i];
                    pendingTodos.splice(i, 1);
                    break;
                }
            }
        }
        if (!todo) {
            return res.status(404).send({ message: "Todo not found." });
        }
        if (index < 0 || index > pendingTodos.length) {
            // put it at the end
            pendingTodos.push(todo);
        }
        else {
            pendingTodos.splice(index, 0, todo);
        }
        user.completed = completedTodos;
        user.pending = pendingTodos;
        user.save(function (err, user) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            return res.status(200).send(user);
        }
        );
    }
    else {
        // move from completed to pending
        if (destination == "pending") {
            for (var i = 0; i < completedTodos.length; i++) {
                if (completedTodos[i]._id == todoId) {
                    todo = completedTodos[i];
                    completedTodos.splice(i, 1);
                    break;
                }
            }
            if (!todo) {
                for (var i = 0; i < pendingTodos.length; i++) {
                    if (pendingTodos[i]._id == todoId) {
                        todo = pendingTodos[i];
                        pendingTodos.splice(i, 1);
                        break;
                    }
                }
            }
            if (!todo) {
                return res.status(404).send({ message: "Todo not found." });
            }
            if (index < 0 || index > pendingTodos.length) {
                // put it at the end
                pendingTodos.push(todo);
            }
            else {
                pendingTodos.splice(index, 0, todo);
            }
            user.completed = completedTodos;
            user.pending = pendingTodos;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                return res.status(200).send(user);
            }
            );
        }
        // move from pending to completed
        else {
            for (var i = 0; i < pendingTodos.length; i++) {
                if (pendingTodos[i]._id == todoId) {
                    todo = pendingTodos[i];
                    pendingTodos.splice(i, 1);
                    break;
                }
            }
            if (!todo) {
                for (var i = 0; i < completedTodos.length; i++) {
                    if (completedTodos[i]._id == todoId) {
                        todo = completedTodos[i];
                        completedTodos.splice(i, 1);
                        break;
                    }
                }
            }
            if (!todo) {
                return res.status(404).send({ message: "Todo not found." });
            }
            if (index < 0 || index > completedTodos.length) {
                // put it at the end
                completedTodos.push(todo);
            }
            else {
                completedTodos.splice(index, 0, todo);
            }
            user.completed = completedTodos;
            user.pending = pendingTodos;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                return res.status(200).send(user);
            }
            );
        }
    }

}

exports.deleteTodo = async (req, res) => {
    var userId = req.userId;
    var todoId = req.params.id;
    var user = await User.findOne({ _id: userId }).populate('pending').populate('completed');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }
    var completedTodos = user.completed;
    var pendingTodos = user.pending;
    var todo = null;
    for (var i = 0; i < completedTodos.length; i++) {
        if (completedTodos[i]._id == todoId) {
            todo = completedTodos[i];
            completedTodos.splice(i, 1);
            break;
        }
    }
    if (!todo) {
        for (var i = 0; i < pendingTodos.length; i++) {
            if (pendingTodos[i]._id == todoId) {
                todo = pendingTodos[i];
                pendingTodos.splice(i, 1);
                break;
            }
        }
    }
    if (!todo) {
        return res.status(404).send({ message: "Todo not found." });
    }
    user.completed = completedTodos;
    user.pending = pendingTodos;
    user.save(function (err, user) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send(user);
    }
    );
}

exports.createTodo = async (req, res) => {
    var userId = req.userId;
    user = await User.findOne({ _id: userId }).populate('pending').populate('completed');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }
    var todo = {
        content: req.body.content,
    }
    user.pending.push(todo);
    user.save(function (err, user) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send(user);
    }
    );
}
