import Rx from 'rx';
const kb = require('../kb/keyboard-shortcuts');

function createHotKeyCounter$(text) {
	const hkcounter$ = kb.create(text)
	    .scan((acc, x) => acc + 1, 0)
	    .map( count => ({
	        id: text,
	        count: count
	      })
	    );

	return hkcounter$;
}

function model(intents) {

  const validSeq$ = intents.addHotkey.filter( _ => kb.validate(_) );
	
  const addOp$ = validSeq$.map( _ => ({op: 'add', seq: _}) );	
  const remOp$ = intents.removeHotkey.map( _ => ({op: 'rem', seq: _}) );	
  const updOp$ = validSeq$
    .flatMap( text => createHotKeyCounter$(text) )
    .map(item => ({op:'upd', seq: item}));	

  const state$ = Rx.Observable
  	.merge(addOp$, remOp$, updOp$)
  	.scan( (state, evt) => {
  		
  		if(evt.op === 'add') {
  			state[evt.seq] = 0; 
  			return state;
  		} else if(evt.op === 'rem') {
  			delete state[evt.seq]; 
  			return state;
  		} else if(evt.op === 'upd') {
  			state[evt.seq.id] = evt.seq.count;
  			return state;
  		} else {
  			return state;
  		}
  		
  	}, {} );

  return state$;
}

module.exports = model;
