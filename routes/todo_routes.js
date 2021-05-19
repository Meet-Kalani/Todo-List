const express = require('express');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const user = require('../models/user');
const { todo } = require("../models/todo");
const router = express.Router();

router.get('/', auth, (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    user.findOne({ mail: decoded.mail })
        .populate('todo').exec((err, founduser) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(founduser);
                res.send(founduser);
            }
        })
})

router.get('/u/:userID/:todoID', auth, (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    user.findOne({ _id: req.params.userID }, (err, founduser) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            for (let i = 0; i < founduser.todo.length;i++) {
                if (founduser.todo[i]._id == req.params.todoID) {
                    res.send(founduser.todo[i]);
                    break;
                }
            }
        }
    })
})

router.post('/a', auth, (req, res) => {
    console.log('You just hit /todo/a route')
    todo.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        position: req.body.position
    }, (err, success) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            let decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            user.findOne({ mail: decoded.mail }, (err, foundUser) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {

                    let idOfCreatedTodo = success;

                    user.findOneAndUpdate(
                        { mail: decoded.mail },
                        { $push: { todo: idOfCreatedTodo } },
                        (err, data) => {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            } else {
                                res.json(data);
                            }
                        }
                    );

                }
            })
        }
    })
})

router.put('/u/:id', auth, (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    user.findOne({mail:decoded.mail},(err,foundUser)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            let indexToBeUpdated;
            for (let i = 0; i < foundUser.todo.length; i++){
                if(foundUser.todo[i]._id == req.params.id){
                    indexToBeUpdated = i;
                }
            }
            foundUser.todo.set(indexToBeUpdated, {
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                position:req.body.position
            });
            foundUser.save((err, success) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log('Data Updated Successfully');
                    res.send(success)
                }
            });
        }
    })
})

router.delete('/d/:id', auth, (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    user.updateOne({
        mail: decoded.mail
      }, {
        $pull: {
          'todo': {
            _id:req.params.id
          }
        }
      },(err,success)=>{
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Data Deleted Successfully');
            res.send(success);
          }
      });
})

module.exports = router;