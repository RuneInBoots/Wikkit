// setting the background color to white
if (Ti.Platform.name != "android") { Titanium.UI.setbackgroundImage('images/background.png'); }



//Log our current platform to the console
Ti.API.info('Welcome to wikkit for '+Ti.Platform.osname);



// ====================== CREATING TABS and WINDOWS ======================
// creating tabgroup
var _tabGroup = Ti.UI.createTabGroup({
	barColor: '#133949'	
});

// creating FIND tab and root window 
var _find = Ti.UI.createWindow({
	url:'find.js',
	title: 'Find article',
	layout: 'vertical'
});
var _findTab = Ti.UI.createTab({
	icon: 'images/search.png',
	title: 'Find article',
	window: _find
});

// creating ABOUT tab and root window 
var _about = Ti.UI.createWindow({
	url:'about.js',
	title: 'About',
	layout: 'vertical'

});
var _aboutTab = Ti.UI.createTab({
	icon: 'images/about.png',
	title: 'About',
	window: _about
});


// ====================== ADDING and OPENING ======================
//adding tabs to tabgroup
_tabGroup.addTab(_findTab);
_tabGroup.addTab(_aboutTab);
//open tabgroup
_tabGroup.open();

