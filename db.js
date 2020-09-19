// Setting up Sequelize
const { Sequelize, DataTypes, Model } = require('sequelize')
// Connecting to the DB with Sequelize
const sequelize = new Sequelize(process.env.MARIA_DB, process.env.MARIA_DB_USER, process.env.MARIA_DB_PASS, {
    host: process.env.MARIA_DB_HOST,
    port: process.env.MARIA_DB_PORT,
    dialect: 'mariadb'
})
// Exporting models
module.exports = {
    userModel: function() {
        class User extends Model {}

        User.init({
            // Attribute definition
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize, // Passing connetion here
            modelName: 'User'
        })
        // Returning the User model to use
        return User;
    },
    postModel: function() {
        class Post extends Model {}

        Post.init({
            // Attribute definition
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize, // Passing connetion here
            modelName: 'Post'
        })
        // Returning the Post model to use
        return Post;
    },
    checkConn: async function() {
        try {
            await sequelize.authenticate()
            await sequelize.sync({ force: true })
            console.log('Connection has been established to the DB, and the tables are synced')
        } catch (error) {
            console.error('Unable to connect to DB', error)
        }
    }
}