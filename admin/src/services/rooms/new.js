const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
    let room = new Rooms()

    return res.render('rooms/create', {
        title: 'Salas - Chat Admin',
        room,
        user_logged: req.user
    })
}