const user = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const saltRounds = 10;

router.post('/signup', (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            user.create({
                userName: req.body.userName,
                mail: req.body.mail,
                password: hash,
            }, (err, success) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('New user signed up');
                    console.log('---------------------------------------------');
                    console.log('User Name: ' + success.userName);
                    console.log('User Mail: ' + success.mail);
                    console.log('---------------------------------------------');
                    console.log('')
                    res.redirect('/');
                }
            });
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/login', (req, res) => {
    user.find({ mail: req.body.mail }, (err, success) => {
        if (err || success.length == 0) {
            res.json({
                success: false,
                message: 'Invalid Credentials!'
            });
        } else {
            console.log('in else');
            let token = jwt.sign({ mail: req.body.mail }, config.get('jwtPrivateKey'));
            bcrypt.compare(req.body.password, success[0].password, function (err, result) {
                console.log("Logged In : " + result);
                if (result == true) {
                    console.log('---------------------------------------------');
                    console.log("Logged In User Name: " + success[0].userName);
                    console.log("Logged In User Mail: " + success[0].mail);
                    console.log('---------------------------------------------');
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        userName: success[0].userName,
                        token: token
                    });
                } else {
                    res.redirect('/user/login');
                }
            });
        }
    })
})

router.post('/contact', (req, res) => {
    try {
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: config.get('smtpUsername'),
                pass: config.get('smtpPassword')
            }
        });

        const mailOptions = {
            from: req.body.mail, // sender address
            to: 'meetkalani2002@gmail.com', // list of receivers
            subject: req.body.name, // Subject line
            html: `<h2>${req.body.message}</h2>`// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(info);
                console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
            }
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;