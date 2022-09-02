const {validationResult} = require('express-validator')

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg  //show the 1st error message that is thrown through validators/auth.js
        })
    }
    next(); //this callback function lets the app continue and will not come to halt 
}