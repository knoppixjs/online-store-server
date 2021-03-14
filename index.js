const express = require('express')
const config = require("config")
const mongoose = require("mongoose")
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()