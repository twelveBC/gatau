const { Users, Profiles, Histories} = require('./models')

// Users.create({
//     username: 'admin',
//     password: 'admin',
//     role: 'admin'
// })
Profiles.create({
    fullName: "DataTypes.STRING",
    email: "DataTypes@STRING.com",
    birthDate: "DataTypes.STRING",
    address: "DataTypes.STRING",
    UserId: '3'
})
Histories.create({
    user: "DataTypes.STRING",
    otherUser: "DataTypes.STRING",
    result: "DataTypes.STRING",
    UserId: '3'
})