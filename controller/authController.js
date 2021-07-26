const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = async (req, res) => {
    let name = req.body.name
    let pass = req.body.pass
    let key = process.env.JWTSECRET


    let tempUser = await user.findOne({ userName: name })

    if (!tempUser) {
        res.json({
            err: "User dosent exist"
        })
        return
    }

    let isAuth = await bcrypt.compare(pass, tempUser.password)
    if (isAuth) {
        let payLoad = {
            name: tempUser.userName,
            password: tempUser.password
        }


        let token = await jwt.sign(payLoad, key)
        // console.log(token);

        res.json({
            success: "logged in",
            token: token
        })
    } else {
        res.json({
            err: "Wrong Password"
        })
    }

}

exports.signUp = async (req, res) => {
    let name = req.body.name;
    let pass = req.body.pass;

    // console.log(process.env.SECRET);
    // res.json({
    //     name, pass
    // })

    // checks if user already exists
    let tempUser = await user.findOne({ userName: name })
    if (tempUser) {
        res.json({
            err: "User already exists"
        })
        return
    }

    //encrypts password
    pass = await bcrypt.hash(pass, 10)
    // console.log(pass);

    //creates new user
    let newUser = new user({
        userName: name,
        password: pass
    })

    await newUser.save((err) => {
        if (err) {
            res.json({
                err: err
            })
            return
        }
    })

    res.json({
        message: 'successfully signed up'
    })
}


exports.isAuth = (req, res, next) => {
    if (!req.headers.auth) {
        res.json({
            err: 'not logged in'
        })
        return
    }

    let token = req.headers.auth;
    token = token.split(' ')[1]


    jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
        if (err) {
            res.json({
                err: "Invalid token : Login in again"
            })
            return
        }

        let tempUser = await user.findOne({ userName: decoded.name })

        if (!tempUser) {
            res.json({
                err: "Invalid User"
            })
            return
        }
        req.user = tempUser
        next()
    })
}