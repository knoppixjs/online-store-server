const express = require('express')
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require("config")
const mongoose = require("mongoose")
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = 5000


const app = express()
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()