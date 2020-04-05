const { param, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    await param('slug', 'O campo slug é obrigatório.')
        .notEmpty()

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.redirect('/rooms')
    }
    
    return next()
}