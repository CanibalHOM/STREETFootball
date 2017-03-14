var keyboardListener = cc.EventListener.create({
	event: cc.EventListener.KEYBOARD,
	onKeyPressed:  function(keyCode, event){  
		switch(keyCode) {
				case cc.KEY.a:
				case cc.KEY.left:
					clientNet.outputAction("run",-1,0);
					break;
				case cc.KEY.w:
				case cc.KEY.up:
					clientNet.outputAction("run",0,1);
					break;                
				case cc.KEY.d:
				case cc.KEY.right:
					clientNet.outputAction("run",1,0);
					break;
				case cc.KEY.s:
				case cc.KEY.down:
					clientNet.outputAction("run",0,-1);
					break;  
				case cc.KEY.space:
					clientNet.outputAction("punch",-1,0);
					break;   					
		}
    }
});