requirejs.config({
    paths: {
        'rx.all': '../rxjs-dist/rx.all',
        'jquery': 'https://code.jquery.com/jquery-3.1.0.min'
    }
});

// Load the main app module to start the app
requirejs(['jquery', 'keyboard-shortcuts'], function($, kbShortcuts) {

	var shortuctSequences = Rx.Observable
		.fromEvent(document.querySelector("button"), 'click')
		.map( click => document.querySelector("input").value )
		.startWith('Ctrl+Alt+D', 'Ctrl+Shift+S', 'Trash');


	shortuctSequences.subscribe( text => {
		var tmpl = '<li id="' + text + '"><span>' + text + ': </span><span>0</span></li>';
		var li = $(tmpl);
		$('ul').append(li);
	});

});
