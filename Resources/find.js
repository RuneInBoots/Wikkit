// identifiying the object (needed to be able to add to the window)
var _find = Ti.UI.currentWindow;



// ====================== CREATING ELEMENTS ======================
// SLOGAN
var _intro = Ti.UI.createLabel({
	height:50,
	width: 250,
	top: 20,
	color:'#f2efdc',
	text: 'About what do you want to acquire knowledge?',
	font:{fontSize:18,fontFamily:'Helvetica Neue'},
	textAlign:'center'
});

// SEARCHFIELD
var _searchField = Ti.UI.createTextField({
	height:40,
	width:250,
	top:40,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText:'enter a term'
});

// SEARCHBTN
var _searchBtn = Ti.UI.createButton({
	height: 40,
	width: 150,
	top: 20,
	title: 'Discover!',
	textAlign: 'center',
	color:"#19546c",
	backgroundImage:'images/button.png'	
});



// ====================== EVENTLISTENERS ======================
// SEARCHFIELD
_searchField.addEventListener('return', function(){
	_searchField.blur();
})

_searchField.addEventListener('change', function(e){
	//_currentArticle = e.value;
	//value == '' ? _searchBtn.enabled=false : _searchBtn.enabled=true;
})

// SEARCH
_searchBtn.addEventListener('click', function(){
	if (_searchField.value != ''){
		// creating window search
		var _search = Ti.UI.createWindow({
			url: 'search.js',
			title: 'Discover',
			searchterm: _searchField.value
		});
		Titanium.UI.currentTab.open(_search,{animated:true});
	}
});



// ====================== ADDING and OPENING ======================
// adding elements to window
_find.add(_intro);
_find.add(_searchField);
_find.add(_searchBtn);

