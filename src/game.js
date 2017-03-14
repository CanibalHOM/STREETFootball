var gameLayer = cc.Layer.extend({
    footballField	: null,
	spriteSheet		: null,
    runningAction	: null,
	ball			: null,
	players			: null,
	//enemy			: null,	
    ctor:function(){
        //////////////////////////////
        // 1. super init first
        this._super();
		
		this.players = {};
		
		var size = cc.winSize;
		
		this.footballField = new cc.Sprite(res.footballfield_png);
		this.footballField.attr({
			x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.footballField);
		
		cc.eventManager.addListener(keyboardListener,this);	
		
		this.init();

        return true;
		
    },
	init:function(){
		animationLoader.init();	
		clientNet.init(this);
		clientNet.connect();
		this.ball = new ball();
		this.ball.addToLayer(this,cc.p(0,0));
    },
	createPlayer:function(id){
		var player = new gameObject();
		player.addToLayer(this,cc.p(0,0));
		this.players[id] = player;
	},
	runAction:function(action,x,y){
		//if(action == 'run') player.left(); 
		//if(action == 'up') player.up(); 
		//if(action == 'right') player.right(); 
		//if(action == 'down') player.down(); 		
    },
	updatePlayers:function(date){
		var players = date.players;
		for(var i in date.players){
			cc.log(this.players);
			this.players[players[i].id].move(players[i].x,players[i].y);
		}
		this.ball.move(date.ball.x,date.ball.y);
    },
	start:function(date){
		var players = date.players;
		for(var i in date.players){
			this.createPlayer(players[i].id);
			this.players[players[i].id].move(players[i].x,players[i].y);
		}	
    }	
});

var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
});

