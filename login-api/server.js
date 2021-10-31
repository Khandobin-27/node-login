const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'YOUR DATABASE PASSWORD',
      database : 'YOUR DATABASE NAME'
    }
});

//test line to see if the users from database are connected to the front-end
db.select('*').from('users').then(data => {
    console.log(data)
})

const app = express()
app.use(express.json())
app.use(cors())


// / -> res = this is working
app.get('/', (req, res) => {
    res.send(database.users)
})

//cheching te login data if the user
// /signin -> POST = success/fail
app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        //compairing the password with the hash
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('Wrong credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
})

//creating a new user
// /register -> POST = user
app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    const hash = bcrypt.hashSync(password)
    //connecting login and users tables
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()

                    }).then(user => {
                        res.json(user[0])
                        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
})

// /profile/:userId -> GET = user
app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    db.select('*').from('users')
    .where({
        id: id
    })
    .then(user => {
        //if statement bacuse the empty array(no users) in javascript is also TRUE
        //that is why not showing the mistake
        //therfore there is a need to check if the array is not 0 (not empty)
        if(user.length) {
            res.json(user[0])
        }else {
            res.status(400).json('Not found')
        }
    }).catch(err => res.status(400).json('Error getting user'))
})


app.listen(3000, () => {
    console.log('Server is running')
})
