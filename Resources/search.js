// ====================== CREATING API call ======================
	// create hash for data	
	var rowData = [];
	
	// create _loader: HTTP call to wikipedia
	var _loader = Ti.Network.createHTTPClient();
	
	// adding SEARCHTERM of user
	var _wiki_call = "http://en.wikipedia.org/w/api.php?action=opensearch&format=xml&limit=15&search=" + Ti.UI.currentWindow.searchterm;
	
	// asking for the data
	_loader.open("GET", _wiki_call);
	
	

// ====================== ONLOAD (passing data) ======================
	_loader.onload = function() {
		// catching the response	
		var xml_response = this.responseXML.documentElement;
		//Ti.API.debug('xml: ' + JSON.stringify(xml_response));
		
		// getting the number of items
		var section = xml_response.getElementsByTagName("Section");
		//Ti.API.info("before loop: " + section.item(0).childNodes.length);
		
		// for loop to add the data of the remote xml to the hash
		for (var i=0; i<section.item(0).childNodes.length; i++){
			var title_val = xml_response.getElementsByTagName("Text").item(i).text;
			var url_val = xml_response.getElementsByTagName("Url").item(i).text;
			//Ti.API.info(i + "--- title: " + title_val + " url: " + url_val);
			
			rowData.push({title: title_val, url: url_val, hasChild:true });						
		}
		
		
		// ====================== creating TABLEVIEW ======================
		// creating tableview, based on rowData
		var tableview = Ti.UI.createTableView({
			data: rowData,
			backgroundColor: (Ti.Platform.name != "android") ? '#a8bdbf' : 'black'
			//backgroundColor:'#a8bdbf'			
		});
		
	
		// ====================== TABLEVIEW EVENTLISTENER ======================
		tableview.addEventListener('click', function(e){
			if (e.rowData.url){
				var _detail = null;
				
				// ----------------------------------- ANDROID -----------------------------------
				if (Ti.Platform.name == "android") {
					// creating DETAIL window  --iPhone
					_detail = Titanium.UI.createWindow({
						title:e.rowData.title,
						backgroundColor:'#fff',
					});	
				}

				// ----------------------------------- IPHONE -----------------------------------
				else {
					// creating DETAIL window  --iPhone
					_detail = Titanium.UI.createWindow({
						title:e.rowData.title,
						backgroundColor:'#fff',
						barColor:'#111'
					});	
					
					
					// creating TWEET button
					var _tweetBtn = Ti.UI.createButton({
						title: 'Tweet',
					});
					
					_tweetBtn.addEventListener('click',function() {
						// ---------------------------------------------------------------
						// ====================== CREATING ELEMENTS ======================
						// creating TWEET window
						var _tweetWin = Ti.UI.createWindow({
							title: 'Tweet',
							layout:'vertical',
							backgroundColor:'#fff',
							barColor: '#133949',
							backgroundImage: 'images/background.png'
						});
						
						// closebtn
						var _closeBtn = Titanium.UI.createButton({
							title:'Close',
							style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
						});
						
						// info
						var _info = Ti.UI.createLabel({
							height:50,
							width: 250,
							top: 20,
							color:'white',
							text: "We'll be tweeting this for you:",
							font:{fontSize:18,fontFamily:'Helvetica Neue'},
							textAlign:'center'
						});
						
						// tweet
						var _tweetField = Ti.UI.createTextArea({
							height:130,
							width:250,
							top:40,
							font:{fontSize:18,fontFamily:'Helvetica Neue'},
							keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
							returnKeyType:Titanium.UI.RETURNKEY_DONE,
							borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
							editable: true,
							value:'Thanks to the Wikkit App, I read about the subject: "' + e.rowData.title + '"! Check it out at ' + e.rowData.url
							
						});
						
						// TWEETBTN
						var _tweetBtn = Ti.UI.createButton({
							height: 40,
							width: 150,
							top: 20,
							color:'#19546c',
							title: 'Tweet!',
							textAlign: 'center',
							backgroundImage:'images/button.png'	
						});
						
						
						// ====================== EVENTLISTENERS ======================
						_closeBtn.addEventListener('click',function() {_tweetWin.close();});
						
						_tweetBtn.addEventListener('click',function(){
							Ti.include("lib/twitter_api.js");
							
							var twitterApi = new TwitterApi({
								consumerKey : '9Tl7xGu6TJVdzduNjJxoPQ',
								consumerSecret : 'tO7nDQsxWEfvAyWfU9MAOBeWRMCUnELaZ01iX254Eeg'
							});
							
							twitterApi.init();
						
							twitterApi.statuses_update({
								onSuccess : function(responce) { alert('tweet was succesfully placed!'); /*Ti.API.info(responce);*/ },
								onError : function(error) { alert("Couldn't place your tweet, maybe you already tweeted this article."); Ti.API.error(error);},
								parameters : {status : _tweetField.value}
							});
			
						});
						
						// ====================== ADDING and OPENING ======================
						// adding elements to window
						_tweetWin.add(_info);
						_tweetWin.add(_tweetField);
						_tweetWin.add(_tweetBtn);
						_tweetWin.setRightNavButton(_closeBtn);
						
						// open window
						_tweetWin.open({modal:true});
					});
					// ---------------------------------------------------------------
					
				}
				
				// creating WEBVIEW of the selected article
				var webview = Ti.UI.createWebView({
					url: e.rowData.url,
					top: -50
				});
				(Ti.Platform.name != "android") ? _detail.setRightNavButton(_tweetBtn) : '';
				_detail.add(webview);
		
				Ti.UI.currentTab.open(_detail,{animated:true});
			}
		});

		// ====================== ADDING and OPENING ======================
		// add table view to the window
		Titanium.UI.currentWindow.add(tableview);
	};
	
_loader.send();
	
	
		

