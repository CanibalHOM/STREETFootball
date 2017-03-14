var mainMenuUI = cc.Layer.extend({
    mainSprite:null,
	startGame:function(){
	   cc.director.runScene(new gameScene());	
		return true;	
    },	
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
		
		this.mainSprite = new cc.Sprite(res.HelloWorld_png);
		this.mainSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.mainSprite, 0);
		
		var imageLogo 			= new cc.Sprite(res.logo_png);
		//var imageSelectedLogo 	= new cc.Sprite(res.selectlogo_png);
		var menuLogo 			= new cc.MenuItemSprite(imageLogo);  
		
		var menuStart 			= new cc.MenuItemFont("Play",this.startGame,this);
		var menuNameTextField 	= new cc.EditBox(cc.size(150, 40),cc.Scale9Sprite.create(res.editbox_png));
		
		menuNameTextField.setPlaceHolder("Input NickName");
		menuNameTextField.setPlaceholderFontColor(cc.color(0,0,0));
		menuNameTextField.setFontColor(cc.color(0,0,0));
        menuNameTextField.setDelegate(this);
		menuNameTextField.setMaxLength(10);
		menuNameTextField.attr({
            x: size.width / 2,
            y: size.height / 2
        });
		//var menuOption = new cc.MenuItemFont("Option");
		this.addChild(menuNameTextField);
		
		var menu = new cc.Menu(menuLogo,menuStart);
		
		menu.alignItemsVertically();
		this.addChild(menu); 

        return true;
    }
});

var mainMenuUIScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainMenuUI();
        this.addChild(layer);
    }
});

