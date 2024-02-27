const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/signup', auth.signUp);
    app.post('/login', auth.login);
}