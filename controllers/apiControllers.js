const { Users, Histories, Profiles } = require('../models')
const {hashPassword,checkPassword } = require('../middlewares/passsworHash')
const { getToken,authenticacaToken } = require('../middlewares/authentication')

class API {
    static dashboard(req,res){
        res.json('restful API v2')
    }

    static async signup(req,res) {
        res.json('ini signup')
    }
    static async actionSignup(req,res) {
        try {
            const { username, password, role} = req.body
            const users = await Users.findOne({ where:{ username:username}})
            if (username == null || username == undefined || username == "") {
                return res.json('please input username')
            }
            if (password == null || password == undefined || password == "") {
                return res.json('please input password')
            }
            const hash = hashPassword(password)
            Users.create({
                username,
                password: hash,
                role
            })
            res.status(200).json({
                message : 'Your data has been register',
                username,
                role
            })
        } catch (error) {
            res.json('Internal Server Error')   
        }
    }

    static async login(req,res) {
        res.json('ini login')
    }
    static async actionLogin(req,res) {
        try {
            const { username, password } = req.body
            const users = await Users.findOne({ where:{ username:username}})
            const isPassword = checkPassword(password, users.password)
            if (username == null || username == undefined || username == "") {
                return res.json('please input username')
            }
            if (password == null || password == undefined || password == "") {
                return res.json('please input password')
            }
            if (!users) return res.json('username not regis')
            if (!isPassword) return res.json('your password wrong')

            res.status(200).json({
                message : 'Your are Login',
                username : username,
                token : getToken(users.id, users.username, users.role)
            })
        } catch (error) {
            res.json('Internal Server Error')  
        }
    }

    static isAuthorization(req,res) {
        const { id, username, role} = req.user.dataValues
        res.json({
            message : 'You are Authorization',
            id,
            username,
            role
        })
    }
    static async roomId(req,res) {
        res.json('ini room id')
    }
}

module.exports = API