const { Users, Profiles, Histories} = require('../models')
const { hashPassword, checkPassword } = require('../middlewares/passsworHash')
const { getToken, authenticacaToken } = require('../middlewares/authentication')

class adminController {
    static home(req,res){
        res.redirect('/login')
    }
    
    static async login(req,res){ 
        res.render('login', { title:"Login" })
    }
    static async actionLogin(req,res){ 
        try {
            const { username, password } = req.body
            const users = await Users.findOne({ where:{ username:username}})
            const isPassword = checkPassword(password, users.password)
            if (!users) return res.send('username not found')
            if (!isPassword) return res.send('password wrong')
            const token = getToken(username,password,users.role)
            console.log("data token ==> ",token);
            const readToken = authenticacaToken(token)
            console.log("data generate token ==> ", readToken);
            // -> push ke local passport
            res.redirect("/dashboard")
        } catch (error) {
            res.redirect("/login")
        }
    }

    static async signup(req,res){ 
        res.render('signup/signup', { title:"Sign Up" })
    }
    static async actionSignUp(req,res){
        try {
            const { username, password, role } = req.body
            const users = await Users.findOne({ where:{ username:username}})
            if (username == null || username == undefined || 
                username == " " || password == null || 
                password == undefined || password == " ") {
                    return res.send('please input username or password')
                }
                if (users) return res.send('username has been register')
                console.log(username,hashPassword(password),role);
                Users.create({
                    username,
                    password: hashPassword(password),
                    role
                })
                res.send("data anda sudah terbuat, terima kasih.")
            } catch (error) {
            res.redirect('/signup')
        }
    }

    static async biodata(req,res){ 
        res.render('biodata/biodata', { title:"Biodata" })
    }
    static async profile(req,res){ 
        res.render('profile/dashboard/view_dashboard', { title:"Profile" })
    }
    static async dashboard(req,res){ 
        res.render('dashboard/dashboard/view_dashboard',{ title:"Dashboard" })
    }
    static async game(req,res){ 
        res.render('game/dashboard/view_dashboard',{ title:"game" })
    }
    static async logout(req,res){ 
        res.send('ini logout')
    }
}

module.exports = adminController