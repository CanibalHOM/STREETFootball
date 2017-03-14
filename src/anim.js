var animationLoader = {
	init : function(){
    	cc.spriteFrameCache.addSpriteFrames(res.runleft_plist);
    	cc.spriteFrameCache.addSpriteFrames(res.rundown_plist);
    	cc.spriteFrameCache.addSpriteFrames(res.runup_plist);		
	},
	createAnimation : function(name,n){
		
		var frames = [];
        
		for(var i = 1; i < n; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame(name + i + '.png');
            frames.push(frame);
        }
		
        var animation = new cc.Animation(frames, 0.04);

        return new cc.Animate(animation);
	}
};


