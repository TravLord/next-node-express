const User = require('../models/user')
const AWS = require('aws-sdk')
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');

    AWS.config.update({
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    //new instance
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });

    // exporting result of register function to routes
    exports.register = (req,res) => {
        // auto email to registar , destructure request
        const {name, email, password} = req.body;
        //check if user already exists using User model schema export (utilize mongoose methods
        //exec method requires arg function taking in user or error if not found)
        User.findOne({email}).exec((err, user) => {
        if(user) {
            console.log(err)
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        // generate signed token with user name email and pw, 
        // grab token from front end and give to user after confirmation link clicked
        const token = jwt.sign({name,email,password}, process.env.JWT_ACCOUNT_ACTIVATION, {
            expiresIn:'10m'
        });
    
       // send email (ref)
       const params = registerEmailParams(email,token);

            //promise gives us access to then() promise chaining
            const sendEmailOnRegister = ses.sendEmail(params).promise();

            sendEmailOnRegister
            .then(data => {
                console.log('email submitted to SES', data);
                res.json({
                    message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
                });
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.json({message: `We could not verify your email, please try again...`
            })
        });          
    });
};
