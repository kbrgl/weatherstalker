$(function () {
    var getCityName = function (position, cb) {
        $.getJSON(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true`, cb);
    };
    navigator.geolocation.getCurrentPosition(function(position) {
        getCityName(position, function(data) {
            $('input[name="location"]').val(data.results[0].address_components[3].long_name);
            $('form').submit();
        });
    });

  setTimeout(function () {
      $('body').html('Hmmmm.... things usually don\'t take this long to load. Are you sure your GPS is on?');
  }, 6000);
});
