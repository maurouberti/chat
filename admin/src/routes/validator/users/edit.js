const { param, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    await param('id', 'O campo id é obrigatório.')
        .notEmpty()
        .isMongoId()

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.redirect('/users')
    }
    
    return next()
}