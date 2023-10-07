/* Script that listen for changes on each INPUT checkbox tag */
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
});
