var res = {
    HelloWorld_png 		: "res/HelloWorld.png",
	logo_png 			: "res/logo/logo.png",
	editbox_png 		: "res/ui/editbox.png",	
	ball_png 			: "res/ball.png",
	footballfield_png 	: "res/footballfield.png",
	runleft_png 		: "res/animations/runleft.png",
	runleft_plist 		: "res/animations/runleft.plist",
	runup_png 			: "res/animations/runup.png",
	runup_plist 		: "res/animations/runup.plist",
	rundown_png 		: "res/animations/rundown.png",
	rundown_plist 		: "res/animations/rundown.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
