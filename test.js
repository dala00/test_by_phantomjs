var exec = require('child_process').exec;
var fs = require('fs');

fs.readdir('./spec', function(err, files) {
    if (err) throw err;
    var fileList = files.filter(function(file) {
        return fs.statSync('spec/' + file).isFile() && /.*\.js$/.test(file); //絞り込み
    });
	for (var i = 0; i < fileList.length; i++) {
		var file = fileList[i];
		var cmd = "node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs spec\\" + file;
		exec(cmd, {timeout: 100000}, function(error, stdout, stderr) {
			console.log(stdout);
		});
	}
});
