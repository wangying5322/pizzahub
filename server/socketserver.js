var functionArray = [];

functionArray["source-a"] = function sourceA() {
  console.log('in a')
  var ServData = {}
  ServData.name = "source-a"
  setInterval(function() {
    ServData.data = '北京时间：'+ new Date((new Date()).getTime() - 10)
    io.sockets.emit("datacome", ServData)
  },1000)
}

functionArray["source-c"] = function sourceC() {
  console.log('in c')
  var ServData = {}
  ServData.name = "source-c"
  setInterval(function() {
    ServData.data = '../static/image/source-c/c'+ Math.round(Math.random()*10)%3 +'.jpg'
    io.sockets.emit("datacome", ServData)
  },3000)
}

functionArray["source-d"] = function sourceD() {
  console.log('in d')
  var ServData = {}
  ServData.name = "source-d"
  setInterval(function() {
    ServData.data = '../static/image/source-d/d'+ Math.round(Math.random()*10)%6 +'.gif'
    io.sockets.emit("datacome", ServData)
  },3000)
}

functionArray["source-e"] = function sourceE() {
  console.log('in e')
  var ServData = {}
  ServData.name = "source-e"
  var data = new Array()
  ServData.data = data
  setInterval(function(){
    data[0] = (new Date()).getTime()
    data[1] = Math.round(Math.random() * 100)
    // console.log(data)
    io.sockets.emit("datacome", ServData)
  },1000);
};

var io = require('socket.io').listen(8089);
io.sockets.on('connection', function (socket) {
  console.log("Connection " + socket.id + " accepted.");

  socket.on('disconnect', function () {
    console.log("Connection " + socket.id + " terminated.");
  });
  socket.on("newmsg",function(data){
    console.log(data)
  });
  socket.on("bind", function(data){
  	console.log(data)
    if(functionArray[data]){
      functionArray[data]()
    }
  })
});

console.log('hahahah')