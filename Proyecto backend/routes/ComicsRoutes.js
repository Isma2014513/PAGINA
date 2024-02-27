const ComicsController = require('../controllers/ComicsController');

const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/Comics', ComicsController.getComics);
    app.get('/Comics/:id', ComicsController.getComicsById);
    app.post('/Comics', auth.authenticate, ComicsController.createComics);
    app.put('/Comics/:id', auth.authenticate, ComicsController.updateComics);
    app.delete('/Comics/:id', auth.authenticate, ComicsController.deleteComic);

}
