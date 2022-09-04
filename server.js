import createError from 'http-errors'
import express from 'express'

// custom imports
import indexRouter from './routes/index.js'
import authRouter from './routes/auth.js'

// definitions
const app = express()

// view engine setup
app.set('view engine', 'pug')

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static('public'))
app.use('/', express.static('node_modules/bootstrap/dist/'))
// app.use('/', express.static('node_modules/font-awesome/'))

// routers
app.use('/', indexRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
});

app.listen(3000)