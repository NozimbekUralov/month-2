class ViewController {
    index(req, res) {
        res.render('index', { title: 'Todo App', tasks: [] });
    }
    login(req, res) {
        res.render('login', { title: 'Login' });
    }
    register(req, res) {
        res.render('register', { title: 'Register' });
    }
}

module.exports = new ViewController();