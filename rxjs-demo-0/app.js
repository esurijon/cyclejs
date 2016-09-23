requirejs.config({
    paths: {
        'rx.all': '../rxjs-dist/rx.all',
        'jquery': 'https://code.jquery.com/jquery-3.1.0.min'
    }
});

// Load the main app module to start the app
requirejs(['jquery', 'keyboard-shortcuts'], function($, kbShortcut) {

});
