function intent(DOM) {
  return {
    addHotkey: DOM.select('button.add').events('click')
    	.map(evt => evt.target.previousElementSibling.value)
    	.filter(val => val.trim().length)
		.startWith("Ctrl+Alt+D", "Ctrl+Shift+S", "Alt+W"),
    removeHotkey: DOM.select('button.remove').events('click').
      map(evt => evt.target.previousElementSibling.previousElementSibling.innerText.trim())
  };
}

module.exports = intent;