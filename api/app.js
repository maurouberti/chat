var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

var server = require('http').Server(app)
var io = require('socket.io')(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/chat_dev', { useUnifiedTopology: true, useNewUrlParser: true });

// conf socket.io
app.use((req, res, next) => {
  res.io = io
  next()
})

var sockets = io.sockets
sockets.on('connection', function(socket) {
  console.log('Uma nova conexão aberta.')

  socket.on('message room', function(data) {
    socket.broadcast.in(data.room).emit('messaged', {
      message: data.message,  
      room: data.room
    })
  })

  socket.on('message user', function(data) {
    socket.broadcast.in(data.user).emit('messaged', {
      message: data.message,
      user: data.user
    })
  })

  socket.on('join user', function(data) {
    socket.user = data.user
    socket.join(socket.user)
    socket.emit('joined user', data)
  })

  socket.on('join room', function(data) {
    socket.room = data.room
    socket.join(socket.room)
    socket.emit('joined room', data)
  })

  socket.on('leave room', function(data) {
    socket.leave(data.room)
    socket.room = ''
    socket.emit('leaved room', true)
  })

})


require('./routes')(app);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
module.exports = {
  app: app,
  server: server
}
