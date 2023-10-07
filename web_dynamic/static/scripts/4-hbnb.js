$('document').ready(function () {
    $("amenities").css("margin-right", "5px");
    $('input[type="checkbox"]').css("margin-right", "5px");
    $(".filters h4").css({
	"margin-left": "15%",
	"margin-top": "0",
	"height": "15px",
	"font-weight": "400",
	"font-size": "14px",
	"white-space": "nowrap",
	"overflow": "hidden",
	"text-overflow": "ellipsis"
    });
    let amenityDict = {}
    $('input[type="checkbox"]').on("change", function() {
	let amenityId = $(this).data("id");
	let amenityName = $(this).data("name");
	if ($(this).is(":checked")) {
	    amenityDict[amenityName] = amenityId;
	} else {
	    delete amenityDict[amenityName];
	}
	let amenitiesText = Object.keys(amenityDict).join(", ");
	$("div.amenities h4").text(amenitiesText);
    });

    const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
    $.get(url, function (res) {
        if (res.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    /*
      Retrieve all places and create an article tag with them
    */
    const getPlaces = function () {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:5001/api/v1/places_search/',
            data: '{}',
            dataType: 'json',
            success: function (places) {
                $.each(places, function (index, place) {
                    $('.places').append(
                        '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">' + place.price_by_night +
                        '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' +
                        '<br />' + place.max_guest + ' Guests' +
                        '</div>' +
                        '<div class="number_rooms">' +
                        '<br />' + place.number_rooms + ' Bedrooms' +
                        '</div>' +
                        '<div class="number_bathrooms">' +
                        '<br />' + place.number_bathrooms + ' Bathroom' +
                        '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description +
                        '</div>' +
                        '</article>'
                    );
                });
            }
        });
    };
    getPlaces();

    /*new POST request to places_search is made with the list of Amenities
      checked when button is clicked
    */
    $('button[type="button"]').on("click", function() {
	$.ajax({
	    url: "http://localhost:5001/api/v1/places_search/",
	    method: "POST",
	    contentType: "application/json",
	    dataType: "json",
	    data: JSON.stringify(Object.values(amenityDict)),
            success: function (places) {
                $.each(places, function (index, place) {
                    $('.places').append(
                        '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">' + place.price_by_night +
                        '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' +
                        '<br />' + place.max_guest + ' Guests' +
                        '</div>' +
                        '<div class="number_rooms">' +
                        '<br />' + place.number_rooms + ' Bedrooms' +
                        '</div>' +
                        '<div class="number_bathrooms">' +
                        '<br />' + place.number_bathrooms + ' Bathroom' +
                        '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description +
                        '</div>' +
                        '</article>'
                    );
                });
		console.log(places);
	    },
	    error: function(xhr, status, error) {
		console.log(xhr.statusText);
	    }
	});
    });
});
