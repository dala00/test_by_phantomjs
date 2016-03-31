(function() {
wait = require('../lib/waitfor');
var webpage = require('webpage');
var mocha = require('../lib/mocha-phantom.js').create({reporter:'spec', timeout:1000*60*5});
chai = require('chai');
expect = chai.expect;

mocha.setup('bdd');

// テストの定義
describe('Fade out Test', function() {
    // pageオブジェクトを作成
    var page = webpage.create();

    // テストの前処理の記述
    before(function(done) {
        // 指定したページをオープン
        page.open('http://url.for.test/', function(status) {
            if (status !== 'success') {
                console.log('error!');
                phantom.exit();
                return;
            }
            done();
        });
    });

	it('Fade out', function(done) {
		var oldDisplay = page.evaluate(function() {
			var ret = $('#closePanel').css('display');
			$('#closeButton').trigger('click');
			return ret;
		});
		var display;
		wait.for(function() {
			display = page.evaluate(function() {
				return $('#closePanel').css('display');
			});
			return display != oldDisplay;
		}, function() {
			expect(display).to.not.equal(oldDisplay);
			done();
		});
    });

    after(function() {
        // PhantomJSの終了
        phantom.exit();
    });
});

// テストの実行
var runner = mocha.run();
})();
