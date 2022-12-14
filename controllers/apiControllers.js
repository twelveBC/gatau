const { Users, usergamehistories } = require('../models')
const {hashPassword,checkPassword } = require('../middlewares/passsworHash')
const { getToken, authenticateToken } = require('../middlewares/authentication')
const randomString = require('../middlewares/random')
const jwt_decode = require('jwt-decode')

function gameRules(player, player2) {
    if(
        (player === 'kertas' && player2 === 'batu') || 
        (player === "batu" && player2 === "gunting") || 
        (player === "gunting" && player2 === "kertas")) {
          return "player 1 win";
      } else if (player === player2) {
        return "draw";
      } else {
        return "player 2 win";
      }
}
 function checkWinner(params) {
    let p1 = params.filter(el => el == 'player 1 win')
    let p2 = params.filter(el => el == 'player 2 win')
    let draw = params.filter(el => el == 'draw')
    if (p1 > p2 && p1 > draw ) return "player 1 win"
    if (p2 > p1 && p2 > draw ) return "player 2 win"
    return "draw"
 }

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
    static async createRoom(req,res) {
        try {
            const { nameRoom } = req.body
            console.log(nameRoom);
            if (!nameRoom) return res.json('please input name room')
            const roomId = randomString()
            res.json({
                roomId:`room_${roomId}`,
                room_name: nameRoom,
                message: 'Succes Create Room'
            })
            usergamehistories.create({ room:nameRoom, roomId:`room_${roomId}` })
        } catch (error) {
            
        }
    }
    static async roomId(req,res) {
        try {
            const { player1, player2, roomId, player1_pick, player2_pick } = req.body
            // validation token
            let token_p1 = jwt_decode(player1)
            let token_p2 = jwt_decode(player2)
            // check room is available
            let checkRoom = await usergamehistories.findOne({ where: {roomId:roomId}})
            if (!checkRoom) return res.json('room id has not found, please create the room')
            // game start
            let p1 = player1_pick.split(",")
            let p2 = player2_pick.split(",")
            let sum = []
            for (let i = 0; i <= 2; i++) {
                let win = gameRules(p1[i],p2[i])
                sum.push(win)
            }
            // update table history
            checkRoom.playerOne = token_p1.username
            checkRoom.playerTwo = token_p2.username
            checkRoom.result = checkWinner(sum)
            await checkRoom.save()
            res.json({
                message : "Game finish",
                player_One : token_p1.username,
                player_Two : token_p2.username,
                result : checkWinner(sum),
                player1_pick,
                player2_pick
            })
        } catch (error) {
            res.json('please input the right token')
        }
    }
}

module.exports = API