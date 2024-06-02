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
});
