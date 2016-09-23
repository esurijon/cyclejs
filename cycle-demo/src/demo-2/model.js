import Rx from 'rx';
const kb = require('../kb/keyboard-shortcuts');

const Operations = {
  AddItem: itemId => function(state) { 
	  state[itemId] = 0; 
	  return state;
  },
  RemoveItem: itemId => function(state) { 
	  delete state[itemId]; 
	  return state;
  },
  UpdateItem: item => function(state) { 
	  state[item.id] = item.count;
	  return state;
  }
};

function createHotKeyCounter$(text) {
	const hkcounter$ = kb.create(text)
	    .scan((acc, x) => acc + 1, 0)
	    .map( count => ({
	        id: text,
	        count: count
	      }
	    ));

	return hkcounter$;
}

function model(intents) {

  const validSeq$ = intents.addHotkey.filter( _ => kb.validate(_) );
	
  const addOp$ = validSeq$.map( _ => Operations.AddItem(_) );	
  const remOp$ = intents.removeHotkey.map( _ => Operations.RemoveItem(_) );	
  const updOp$ = validSeq$
    .flatMap( text => createHotKeyCounter$(text) )
    .map(item => Operations.UpdateItem(item));	

  const state$ = Rx.Observable
  	.merge(addOp$, remOp$, updOp$)
  	.scan( (state, operation) => operation(state), {} );

  return state$;
}

module.exports = model;
