var io = require('socket.io');
var http = require('http');
var idPlayer 		= 0;
var actionRadius 	= 15;
var punchRadius 	= 25;

var FootballPlayer = function(id,name,isRedTeam = true,isGoalkeeper = false) {
	this.id 			= id;
	this.isRedTeam 		= isRedTeam;
	this.isGoalkeeper 	= isGoalkeeper;	
	this.x 				= 0;
	this.y 				= 0;
	this.speed 			= 2;
	this.punchSpeed 	= 20;	
	this.name 			= name;
}

var Ball = function(x,y) {
	this.x 				= x;
	this.y 				= y;
}

var Ball = function(x,y) {
	this.x 				= x;
	this.y 				= y;
}

Ball.prototype.move = function(xVec,yVec,speed) {
	this.x = this.x + speed*5*xVec;
	this.y = this.y + speed*5*yVec;
}

FootballPlayer.prototype.move = function(xVec,yVec) {
	this.x = this.x + this.speed*xVec;
	this.y = this.y + this.speed*yVec;
}

var Game = function() {
	this.players 		= {};
	this.ball 			= new Ball(100,100);
	this.redTeamScore 	= 0;
	this.blueTeamScore 	= 0;	
	this.playersNumber 	= 0;
	this.maxPlayers 	= 10;	
}  

Game.prototype.createPlayer = function(player) {
		this.playersNumber++;
		this.players[idPlayer] = player;
}

Game.prototype.destroyPlayer = function(id) {
	this.playersNumber--;
	for(var i in this.players){
		if(this.players[i]==id)
			delete this.players[i];
	}
}

Game.prototype.getState = function() {
	var result = {};
	for(var id in this.players){
		var player = this.players[id];
		result[id] = {id:id,x:player.x, y:player.y};
	}
	return {players:result,ball:this.ball};
}

Game.prototype.updateState = function(data,id) {
	if(data.action == 'punch'){
		if(((this.ball.x < this.players[id].x + punchRadius)&&(this.ball.x > this.players[id].x - punchRadius))
			&&((this.ball.y < this.players[id].y + punchRadius)&&(this.ball.y > this.players[id].y - punchRadius)))
					this.ball.move(data.x,data.y,this.players[id].punchSpeed);
	}
	if(data.action == 'run'){
		if(((this.ball.x < this.players[id].x + actionRadius)&&(this.ball.x > this.players[id].x - actionRadius))
			&&((this.ball.y < this.players[id].y + actionRadius)&&(this.ball.y > this.players[id].y - actionRadius))){
				this.ball.move(data.x,data.y,this.players[id].speed);
				
			}
		console.log(this.ball);
		this.players[id].move(data.x,data.y);
		console.log(this.players[id].x);
		console.log(this.players[id].y);
	}
}


var game = new Game();

var Client = function(socket) {
	//this.date = new Date();
	this.counter = 0;
	this.socket = socket;
	this.player = null;
}

Client.prototype.onAuth = function(data) {
	this.player = new FootballPlayer(idPlayer,data.name);
	if(game.playersNumber>=game.maxPlayers){
		this.socket.emit('auth', false);
	}else{
		this.socket.emit('start',game.getState());	
		game.createPlayer(this.player)
		this.socket.emit('auth',{'id': idPlayer });	
		this.socket.broadcast.emit('newplayer',{'id': idPlayer });
		idPlayer++;
	}	
}

Client.prototype.onDisconnect = function() {
	game.destroyPlayer(this.player);
}

Client.prototype.onInput = function(data) {
	game.updateState(data,this.player.id);
}

Client.prototype.update = function() {
	this.counter++;
	this.socket.emit('state', game.getState());
	this.socket.broadcast.emit('state', game.getState());
}

var clients = [];

var app = http.createServer();
var io = io.listen(app);
app.listen(80);


io.sockets.on('connection', function (socket) {
	var client = new Client(socket);	
	clients.push(client);
	socket.on('auth', function (data) {
		client.onAuth(data);
	});
	socket.on('action', function (data) {
		client.onInput(data);
		client.update();
	});	
	socket.on('disconnect', function () {
		var index = clients.indexOf(client);
		if(index != -1) {
			clients.splice(index);
		}		
		client.onDisconnect();
	});
});