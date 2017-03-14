/*var socket = io.connect("http://localhost:80");
if ( socket === undefined ) {
    cc.log("Could not connect to socket.io");
} else {
    socket.on('connect', function() {

		//socket.send('message','i am join!!!')
		//cc.log("we make it!!!");
		socket.emit('input', { my: 'data' });
    });
	socket.on('message', function(data) {
		socket.emit('message', data);
		cc.log(data);
	});
}
*/


var clientNet = {
	gameLayer	: null,
	socket		: null,
	init:function(gameLayer){
		this.gameLayer = gameLayer;
	},
	init1:function(gameLayer){
		cc.log(this.gameLayer);	
	},
	connect:function(){	
		this.socket = io.connect('http://localhost');	
		this.socket.emit('auth', { name: 'Hello Server' });
		this.socket.on('auth', function (data) {
			if(!data){ 
				cc.log("error connect");
			}else{	
				clientNet.gameLayer.createPlayer(data.id);
			}
		});
		this.socket.on('newplayer', function (data) {
			clientNet.gameLayer.createPlayer(data.id);
		});
		this.socket.on('state', function (data) {
			clientNet.gameLayer.updatePlayers(data);
		});
		this.socket.on('start', function (data) {
			clientNet.gameLayer.start(data);
		});		
	},
	inputMsg:function(){
	},	
	outputAction:function(action,x,y){
		this.socket.emit('action', { action: action, x: x, y: y});
		clientNet.gameLayer.runAction(action,x,y);
	}
};


