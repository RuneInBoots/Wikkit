
// identifiying the object (needed to be able to add to the window)
var _about = Ti.UI.currentWindow;

// ====================== CREATING ELEMENTS ======================
// RUNE
var _nameR = Ti.UI.createLabel({
	height:50,
	width: 250,
	top: 20,
	color:"white",
	font:{fontSize:21,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	text: 'Made by RuneInBoots'
});

// tweets btn
var _btnR = Ti.UI.createButton({
	title: 'Tweets of RuneInBoots',
	height: 40,
	width: 250,
	top: 15,
	textAlign: 'center',
	textAlign: 'center',
	color:"#19546c",
	backgroundImage:'images/button.png'
	
});

// ANNELIES
var _nameA = Ti.UI.createLabel({
	height:50,
	width: 250,
	top: 50,
	color:"white",
	font:{fontSize:21,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	text: 'Made by Annelies'
});

// tweets btn
var _btnA = Ti.UI.createButton({
	title: 'Tweets of AnneliesDeleu',
	height: 40,
	width: 250,
	top: 15,
	textAlign: 'center',
	textAlign: 'center',
	color:"#19546c",
	backgroundImage:'images/button.png'
	
});

// ====================== EVENTLISTENERS ======================
// SEARCH
_btnR.addEventListener('click', function(){
	var win = Ti.UI.createWindow({
		url: 'tweets_rune.js',
		title: '@RuneInBoots',
		backgroundColor: '#a8bdbf'
	});
	Titanium.UI.currentTab.open(win,{animated:true});
});

_btnA.addEventListener('click', function(){
	var win = Ti.UI.createWindow({
		url: 'tweets_annelies.js',
		title: '@AnneliesDeleu',
		backgroundColor: '#a8bdbf'
	});
	Titanium.UI.currentTab.open(win,{animated:true});
});


// ====================== ADDING and OPENING ======================
_about.add(_nameR);
if (Ti.Platform.name != "android") { _about.add(_btnR); }
_about.add(_nameA);
if (Ti.Platform.name != "android") { _about.add(_btnA); }
