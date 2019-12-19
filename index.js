var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

//Rota principal
app.get('/', function(req, res){
	res.sendFile(__dirname + '/chat.html')
})

//Conexão com o socket
io.on('connection', function(socket){
	//console.log("Um usuário se conectou")

	socket.broadcast.emit('Olá!')

	//Evento chamado quando o usuário fecha a página
	socket.on('disconnect', function(){
		console.log("Um usuário se desconectou")
	})

	//Recebendo mensagem
	socket.on('message', function(txt){
		console.log("Disseram: " + txt)
		io.emit('message', txt)
	})

	socket.on('setNickname', function(nickname){
		console.log(nickname + " entrou na sala")
		io.emit("usuarioConectado", nickname);
	});
});


http.listen(3000, function(){
	console.log("Projeto rodando em http://localhost:3000")
})