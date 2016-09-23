import Rx from 'rx';
const kb = require('../kb/keyboard-shortcuts');

function model(intents) {

  const validSeq$ = intents.addHotkey.filter( _ => kb.validate(_) );
	
  const addOp$ = validSeq$.map( _ => ({op: 'add', seq: _}) );	
  const remOp$ = intents.removeHotkey.map( _ => ({op: 'rem', seq: _}) );	

  const state$ = addOp$.map( item => {
	  let state = {};
	  state[item.seq] = 0;
	  return state;
  });

  return state$;
}

module.exports = model;
