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
        if (amenityNames.length > 0) {
            $('div.amenities h4').text(amenityNames.join(', '));
        } else {
            $('div.amenities h4').html('&nbsp');
        }
    });
});
$.get('http://0.0.0.0:5001/api/v1/status/', function (data, class_status) {
    if (class_status === 'success') {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }
});
$('.filters button').click(function() {
        const List = Object.keys(selectedAmenities);
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            dataType: 'json',
            data: JSON.stringify({ amenities: List }),
            contentType: 'application/json; charset=utf-8',
            success: function (places) {
                for (let i = 0; i < places.length; i++) {
                    $('.places').append(`<article>
                        <div class="title_box">
                            <h2> ${places[i].name} </h2>
                            <div class="price_by_night"> ${places[i].price_by_night} </div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${places[i].max_guest}
                                ${places[i].max_guest > 1 ? 'Guests' : 'Guest'}
                            </div>
                            <div class="number_rooms">${places[i].number_rooms}
                                ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}
                            </div>
                            <div class="number_bathrooms">${places[i].number_bathrooms}
                                ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                            </div>
                        </div>
                        <div class="user">
                        </div>
                        <div class="description">
                            ${places[i].description}
                        </div>
                    </article>`);
                }
            },
            error: function (xhr, status) {
                console.log('error ' + status);
            }
        });
    });
});
