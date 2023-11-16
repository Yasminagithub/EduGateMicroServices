const router = require("express").Router();
const jwt = require('jsonwebtoken');
const {Gestionnaire,Etudiant} = require('./db');


const secretKey = 'KEY_TP_EXPRESS';

const gestionnaireMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded && decoded.type === 'gestionnaire') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const etudiantMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded && decoded.type === 'etudiant') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


router.post('/gestionnaire-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Gestionnaire.findOne({ username, password});
        if (user) {
            const token = jwt.sign({ id: user.username, type: 'gestionnaire' }, secretKey);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/etudiant-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Etudiant.findOne({ username, password});
        console.log(user)
        if (user) {
            const token = jwt.sign({ id: user.cne, type: 'etudiant'}, secretKey);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/gestionnaire-route', gestionnaireMiddleware, (req, res) => {
    res.json({ message: 'Welcome, gestionnaire!' });
});

router.get('/etudiant-route', etudiantMiddleware, (req, res) => {
    res.json({ message: 'Welcome, etudiant!' });
});

module.exports = { router, gestionnaireMiddleware, etudiantMiddleware };
