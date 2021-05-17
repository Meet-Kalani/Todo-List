const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        res.status(401).send('Access denied! No token provided');
    } else {
        let decoded = jwt.verify(token, 'myPrivateKey');
        req.decoded = decoded;
        next();
    }
}