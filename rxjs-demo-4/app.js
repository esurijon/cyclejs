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
	    .startWith('Ctrl+Alt+D', 'Ctrl+Shift+S')
	    .map( text => {
	      return {
	        id: text.replace(/\+/g,'_'),
	        text: text
	      }
	    });

  shortuctSequences.subscribe(
    seq => {
      var tmpl = '<li id="' + seq.id + '"><span>' + seq.text + ': </span><span>0</span></li>';
      var li = $(tmpl);
      $('ul').append(li);
      
      kbShortcuts.create(seq.text).subscribe(
    	x => {
    		var el = $('ul > li#' + seq.id + ' > span').eq(1);
    		var count = el.text()*1 + 1; 
    		el.text( count );
    	}
      );
      
    }
  );

});
