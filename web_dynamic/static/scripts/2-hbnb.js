$(document).ready(function () {
    const selectedAmenities = {};
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');
        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
        const amenityNames = Object.values(selectedAmenities);
        if (amenityNames.length > 0){
            $('div.amenities h4').text(amenityNames.join(', '));
        } else {
            $('div.amenities h4').html('&nbsp');
        }
    });
$.get('http://0.0.0.0:5001/api/v1/status/', function(data, class_status) {
	if (class_status === 'success') {
		if (data === 'OK') {
		$('#api_status').addClass('available');
	} else {
		$('#api_status').removeClass('available');
	}
    }
});
});
