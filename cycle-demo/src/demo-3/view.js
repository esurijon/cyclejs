import {h} from '@cycle/dom';
const { div, span, h1, input, label, button, p, ul, li } = require('hyperscript-helpers')(h);

function createLi(map) {
	return Object.keys(map).map( key =>  li([span(key + ' '), span(map[key] + ' '), button('.remove', 'x')]) );
}

function view(hkMap) { 

return  div([
   	label('Demo 3: Keyboard shortcut sequence'),
	input({placeholder: 'Ctrl+Alt+D'}),
	button('.add', 'Add'),
	p('Keyboard shortcuts:'),
	ul(
		createLi(hkMap)	
	)
]);

};

module.exports = function(state$) {
	return state$.map(view);
};