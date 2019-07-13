const {
    sequelize,
    users,
    events
} = require('../../db/models')
const express = require('express')
const router = express.Router()


const returnResposeHelper = (res, status, result) => {
    
    res.status(status).send({Result: result, Success : status < 400, status: status})

}

sequelize.sync({force: false})
.then(res => {
    console.log("Connection good!")
})
.catch(err => {
    console.log(`ERROR: cod ${err}`)
})

router.get('/', (req, res) => {
    res.send("Hello from GET API")
})
router.post('/register', (req, res) => {
    let userData = req.body
    users.create(userData)
    .then(result => {
        returnResposeHelper(res, 200, result)
        
    })
    .catch(err => {
        returnResposeHelper(res, 502, err.errors[0]['message'])
        console.log(`ERROR: ${err}`)
    })
})

router.post('/event', (req, res) => {
    let eventData = req.body
    events.create(eventData)
    .then(result => {
        returnResposeHelper(res, 200, result)
        
    })
    .catch(err => {
        returnResposeHelper(res, 502, err.errors[0]['message'])
        console.log(`ERROR: ${err}`)
    })
})


router.post('/login', (req, res) => {
    let {
        username,
        password
    } = req.body
    
    let returnedResult
    let status
    users.findByPk(username)
    .then(result => {

        if(!result){
            
            status = 404
            returnedResult = `Username ${username} doesn't exist`
            
        }
        else {
            if (password != result.password ) {
                status = 502
                returnedResult = "Wrong Password or Username!"
                
                
            }
            else {
                status = 200
                returnedResult = result
            }
            

        }
        returnResposeHelper(res, status, returnedResult)
        
    })
    .catch(err => {
        returnResposeHelper(res, 502, err.errors[0]['message'])
        
    })
})


router.get("/events", (req, res) => {
    events.findAll()
    .then(result => {

        returnResposeHelper(res, 200, result)

    })

})


module.exports = router