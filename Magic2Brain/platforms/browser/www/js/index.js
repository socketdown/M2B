var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        angular.element(document).ready(function() {
            //angular.bootstrap(document);
        });
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

var cardsJSON = "";

function loadFile(fileURL){
	window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", gotFile, fail);
}

function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
}

function gotFile(fileEntry) {

    fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log("Text is: "+this.result);
            cardsJSON = this.result;
        }

        reader.readAsText(file);
    });

}

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);

    // or, if you wanted to avoid alerts...

    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre)
}