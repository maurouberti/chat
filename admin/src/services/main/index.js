module.exports = (req, res) => {
    return res.render('main/index', {
        title: 'Chats - Admin',
        user_logged: req.user
    })
}