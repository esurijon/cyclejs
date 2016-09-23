define(['rx.all', 'keyCodeMap'], function (Rx, keyCodeMap) {

	var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
	var keyUps = Rx.Observable.fromEvent(document, 'keyup');

	var keyEvents = Rx.Observable
		.merge(keyDowns, keyUps)
		.distinctUntilChanged(
			null,
			(a,b) => {
				return a.keyCode === b.keyCode && a.type === b.type;
			}
		)
		.share();


	ctrlKeyPressStream = keyEvents
		.filter((event) => 	event.keyCode === keyCodeMap['ctrl'])
		.map( e => e.type );
	
	altKeyPressStream = keyEvents
		.filter((event) => 	event.keyCode === keyCodeMap['alt'])
		.map( e => e.type );

	dKeyPressStream = keyEvents
		.filter((event) => 	event.keyCode === keyCodeMap['d'])
		.map( e => e.type );

	Rx.Observable
		.combineLatest(ctrlKeyPressStream, altKeyPressStream, dKeyPressStream)
		.filter( arr => {
			var isDown = true;
			for (var i = 0; i < arr.length; i++) {
				isDown = isDown && (arr[i] === 'keydown');
			}
			return isDown;
		}).subscribe( _ => console.log('se ha presionado Ctrl+Alt+D'));


});
