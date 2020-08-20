var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

var users = [];

app.use(require('express').static(__dirname + '/public'));

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
		//console.log("Um usuário se desconectou")
	})

	//Recebendo mensagem
	socket.on('message', function(txt, nickname){
		console.log("Disseram: " + txt)
		io.emit('message', txt)
	})

	//Pegando o nickname do usuário conectado
	//enviando mensagem que o usuário se conectou
	socket.on('setNickname', function(nickname){
		users[nickname] = {active: true};
		io.emit("usuarioConectado", nickname);
	});
});


http.listen(process.env.PORT || 5000, function(){
	console.log("Projeto rodando em http://localhost:5000")
})