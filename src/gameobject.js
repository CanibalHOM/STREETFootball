var gameObject = cc.Class.extend({
	sprite : null,
    actionLeft : null,
    actionUp : null,
    actionDown : null,
	isFriend	: null,
	ctor:function(){

        //var winSize = cc.winSize;

        this.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('left1.png'));

		this.actionLeft = animationLoader.createAnimation('left',4);
		this.actionUp 	= animationLoader.createAnimation('up',4);
		this.actionDown = animationLoader.createAnimation('down',4);	
		
    },
    addToLayer : function(layer, pos){
		this.sprite.attr({x:0,y:0});
        layer.addChild(this.sprite);

    },
	move : function(x,y){
		this.sprite.attr({x:x,y:y});
	},
    left : function(){
		this.sprite.runAction(this.actionLeft);
    },
	right : function(){
		this.sprite.runAction(this.actionLeft);
		this.sprite.setScaleX(this.sprite.getScaleX() * -1);
    },
	up : function(){
		this.sprite.runAction(this.actionUp);
    },
	down : function(){
		this.sprite.runAction(this.actionDown);
    },
    removeFromLayer : function(pSender){
        pSender.removeFromParent();
    }
	
	
});

var ball = cc.Class.extend({
	sprite : null,
	ctor:function(){
        this.sprite = new cc.Sprite(res.ball_png);
    },
    addToLayer : function(layer, pos){
		this.sprite.attr({x:0,y:0});
        layer.addChild(this.sprite);

    },
	move : function(x,y){
		this.sprite.attr({x:x,y:y});
	},
    removeFromLayer : function(pSender){
        pSender.removeFromParent();
    }	
});