const { check, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    await check('name', 'O campo nome é obrigatório.')
        .notEmpty()

    await check('email', 'O campo e-mail é obrigatório.')
        .notEmpty()
        .isEmail()
        
    await check('password', 'O campo senha é obrigatório.')
        .notEmpty()

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.redirect('/users/new')
    }
    
    return next()
}