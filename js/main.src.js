Rx.Observable.fromEvent($('#input'), 'keyup')
	.map(e => e.target.value)
	.filter(text => text.length > 2)
	.throttle(1000 /* ms */)
	.distinctUntilChanged()
	.flatMapLatest(term => Rx.Observable.fromPromise(
		$.ajax({
			url: 'http://es.wikipedia.org/w/api.php',
			dataType: 'jsonp',
			data: {
				action: 'opensearch',
				format: 'json',
				search: encodeURI(term)
			}
		}).promise()))
	.subscribe (data =>
		$('#results')
			.empty ()
			.append ($.map (data[1], (value) => 
				$('<li>' + value + '</li>'))),
		error => console.log (error));
