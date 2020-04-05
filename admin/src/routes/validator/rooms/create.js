const { check, validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    check('name', 'O campo nome é obrigatório.')
        .notEmpty()

    check('description', 'O campo descrição é obrigatório.')
        .notEmpty()

    check('enable', 'O campo situação é obrigatório.')
        .notEmpty()

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.redirect('/users/new')
    }
        
    return next()
}