// Importing packages
const mongoose = require('mongoose');
const config = require('config');

// Database Connection String
mongoose.connect("mongodb+srv://admin:"+config.get('dbPassword')+"@cluster0.jcpjt.mongodb.net/todo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
//mongoose.connect("mongodb://localhost/To-Do", { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });

// Database Schema
let todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        maxlength:50
    },
    description: {
        type: String,
        required:true,
        minlength: 1,
        maxlength:255
    },
    priority: {
        type: String,
        required:true
    },
    position: {
        type: String,
        require:true
    }
})

// Exporting Scehma and Model
module.exports.todoSchema = todoSchema;
module.exports.todo = mongoose.model('todo', todoSchema);