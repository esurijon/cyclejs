define(['rx.all', 'keyCodeMap'], function (Rx, keyCodeMap) {

	var text = "Alt+Shift+S";

	var count = 0;
	var codes = [];
	
	text.toLowerCase().split("+").forEach( c => { 
		count++;
		codes.push(keyCodeMap[c]);
	});
	
	
	var keyDowns = (evt) => {
		if(codes.includes(evt.keyCode)) {
			count--;
			if(count == 0) {
				console.log(text);
			}
		}
		
	};
	
	var keyUps = (evt) => { 
		if(codes.includes(evt.keyCode)) {
			count++;
		}
	};

	Rx.Observable.fromEvent(document, 'keydown').subscribe(
		keyDowns,
		_ => console.log('Completed'),
		_ => console.error(_)
	);
	Rx.Observable.fromEvent(document, 'keyup').subscribe(
		keyUps,
		_ => console.log('Completed'),
		_ => console.error(_)
	);

});
