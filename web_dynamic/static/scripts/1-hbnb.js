$(document).ready(function() {
    $('input[type="checkbox"]').css("margin-right", "10px");
    let amenityIdList = []
    $('input[type="checkbox"]').on("change", function() {
	let amenityId = $(this).data("id");
	if ($(this).is(":checked")) {
	    amenityIdList.push(amenityId);
	} else {
	    let index = amenityIdList.indexOf(amenityId);
	    if (index !== -1) {
		amenityIdList.splice(index, 1);
	    }
	}
	let amenitiesText = amenityIdList.join(", ");
	$("div h4").text(amenitiesText);
    });
});
