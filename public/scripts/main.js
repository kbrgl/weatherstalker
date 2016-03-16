$(function () {
	$.ajax({
		method: 'POST',
		dataType: 'json',
		data: {
			location: 'Stockholm'
		},
		success: function (data) {
			$('body').html('loaded: ' + JSON.stringify(data));
		},
		error: function () {
			$('body').html('something went wrong')
		}
	});
});
