const User = require('../models/user')
const AWS = require('aws-sdk')
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');
const shortId = require('shortid');

    AWS.config.update({
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    //new instance of aws email service for our auto registration email
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });

    // exporting result of register function to routes
    // auto email to registar , destructure request body for our selected values
    // check if user already exists using User model schema export (utilize mongoose methods
    // exec method requires arg function taking in user or error if not found) use object destructuring to find email from user Schema
    exports.register = (req,res) => {        
        const {name, email, password} = req.body;      
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
    
       // send email ( func ref email.js helper function)
       // promise in case we can't verify the email upon request 
        const params = registerEmailParams(email,token);
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

// activate registration > check for valid token
// console.log(token)// 1ST ARG TOKEN, 2ND SECRET KEY USED FOR HASHING, 3rd is result for verify jwt func
// if token is recived after 10 min expiration date an error will be thrown as its not verified
exports.registerActivate = (req,res) => {
    const {token} = req.body;
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
        if (err)
        {
            return res.status(401).json({
                error: ' Expired registration Link, you must register again...  Refer to the registration page'
            })
        }

        // make sure user email is unique decode token for user info access to name, email and password
        // using sortId package for custom auto id generation, findOne
        const {name, email, password} = jwt.decode(token)
        const username = shortId.generate()

        User.findOne({email}).exec((err,user) => {
            if(user)
            {
               return res.status(401).json({
                error: 'email is taken'
               });
            }

            // save and register new user
            const NewUser = new User({username, name, email, password})
            NewUser.save((err,result) => {
                if(err) {
                    return res.status(401).json({
                        error: 'Error saving user in database, please try again...'
                       });
                }
                return res.json({
                    message:'Registration success!  Please login...'
                })
            })
        })
    })
};
    //find user authenticate, send token to user
    exports.login = (req,res) => {
        const {email,password} = req.body;
        // console.table({email,password})
        User.findOne({email}).exec((err,user)=> {
            if(err || !user)
            {
                return res.status(400).json({
                    error: 'User with email that does not exist'
                });            
            }
            //authenticate, if user password is not authenticated
            if(!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email and password do not match'
            });
        }

        //generate token using user id as payload and send to client, 2nd arg secret, 3rd expire date
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {_id,name,email,role} = user;

        return res.json ({
            token, user: {_id, name, email, password}
        });

    });


};
