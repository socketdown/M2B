var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
    },
	
	loadModules: function(fileList, func){
		console.log("loading modules...");
		for(var i = 0; i < fileList.length; i++){
			// Get html head section
			var head = document.getElementsByTagName('body')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = "/js/modules/" + fileList[i]; //get module in query

			//add the script reference
			head.appendChild(script);
			console.log("loading modules:" + fileList[i]);
		}
	},
	
	loadText: function(file, div){
		
	},
	
};