const Users = require('./../../schemas/users')

module.exports = (req, res) => {
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-')

    Users
        .register(req.body, req.body.password, (err, account) => {
            if (err) {
                return res.send('Error ' + error)
            }

            return res.redirect('/users')
        })

    // Users
    //     .create(req.body)
    //     .then((user) => {
    //         return res.redirect('/users')
    //     })
    //     .catch((error) => {
    //         return res.send('Error ' + error)
    //     })
}