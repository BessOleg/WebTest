var fs = require('fs');

module.exports.login = function (req, res) {
    var foundUser;
    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    for (var i = 0; i < users.length; i++) {
        var u = users[i].username, p = users[i].password
        if (u == req.body.username && p == req.body.password) {
            foundUser = u;
            break;
        }
    }
    if (foundUser !== undefined) {
        req.session.username = foundUser;
        console.log("Login succesful: ", req.session.username);
        res.send('Login succesful: '  + ';user:' + req.session.username);
    } else {
        console.log("Login fail: ", req.body.username);
        res.status(401).send('Login error');
    }
};


module.exports.admin = function (req, res) {
    if (req.session.username == 'admin') {
        console.log(req.session.username + ' requested admin page');
        res.render('admin');
    } else {
        res.status(403).send('Access Denied!');
    }
};


module.exports.user = function (req, res) {
    try {
        if (req.session.username.length > 0) {
            console.log(req.session.username + ' requested user page');
            res.render('user');

        } else {
            res.status(403).send('Access Denied!');
        }
    } catch{ res.status(403).send('Access Denied!'); }
     
};

module.exports.logout = function (req, res) {
    req.session.username = '';
    console.log('logout');
    res.end('logged out!');
};


module.exports.register = function (req, res) {

    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    for (var i = 0; i < users.length; i++) {
        var u = users[i].username, p = users[i].password

        if (u != req.body.username ) { 
            users.push({ "username": req.body.username, "password": req.body.password });
            fs.writeFileSync('users.json', JSON.stringify(users));
            res.send("Successful registration");
            break;
        }
    }
    

};

