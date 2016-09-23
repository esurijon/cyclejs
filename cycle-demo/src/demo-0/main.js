import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';

const drivers = { 
	DOM: makeDOMDriver('#app') 
};

const intent = require('./intent');
const model = require('./model');
const view = require('./view');


function main(drivers) {

  const intents = intent(drivers.DOM);
  const state$ = model( intents );
  const sinks = {
    DOM: view( state$ )
  };
  
  return sinks;

}

module.exports = function() {
	run(main, drivers);
};
