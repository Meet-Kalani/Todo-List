const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        
        if (token == "undefined") {
            res.status(401).send('Access denied! No token provided');
        } else {
            let decoded = jwt.verify(token, 'myPrivateKey');
            req.decoded = decoded;
            next();
        }
    } catch (err) {
        res.send(err);
    }
}