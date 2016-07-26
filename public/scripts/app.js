//Handlebars Rendering Functions

function render(result, index) {
	//grabs all the HTML from the template
	var templateHtml = $('#search-template').html();
	//a function that takes that HTML and compiles it
	var resultsTemplate = Handlebars.compile(templateHtml);
	//just the HTML of the {{}}s, takes the album and piles them into the appropriate {{}}s
	var partialAlbumHtml = resultsTemplate(result);
	//adds to the top of the section
	console.log(index);
	return (partialAlbumHtml);
}

function renderSearchPage(result, index) {
	var partialAlbumHtml = render(result);
	$('#bottomContent').empty();
	$('#bottomContent').append(partialAlbumHtml);
	Materialize.showStaggeredList('#staggered-test');
}

function renderStorys(storyResult) {
	var templateHtml = $('#storys-template').html();
	var resultsTemplate = Handlebars.compile(templateHtml);
	var partialAlbumHtml = resultsTemplate(storyResult);
	console.log(partialAlbumHtml);
	$('#storyContent').empty();
	$('#storyContent').append(partialAlbumHtml);
	$('.modal-trigger').leanModal();
}

function renderNewStorys(storyResult) {
	var templateHtml = $('#story-singular-template').html();
	var resultsTemplate = Handlebars.compile(templateHtml);
	var partialAlbumHtml = resultsTemplate(storyResult);
	$('#storyContent').prepend(partialAlbumHtml);
	$('.modal-trigger').leanModal();
}

function renderResultsPage(result) {
	var templateHtml = $('#results-template').html();
	var resultsTemplate = Handlebars.compile(templateHtml);
	var partialAlbumHtml = resultsTemplate(result);
	$('#bottomContent').empty();
	$('#bottomContent').append(partialAlbumHtml);
}

function renderUserPage(user) {
	var templateHtml = $('#admin-template').html();
	var resultsTemplate = Handlebars.compile(templateHtml);
	var partialAlbumHtml = resultsTemplate(user);
	$('#bottomContent').empty();
	$('#bottomContent').append(partialAlbumHtml);
	// Materialize.showStaggeredList('#staggered-results');
}

//intitialize google map
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: {
			lat: 37.81803,
			lng: -122.265158
		}
		// styles: [{stylers:[{hue:'#2c3e50'},{saturation:250}]},{featureType:'road',elementType:'geometry',stylers:[{lightness:50},{visibility:'simplified'}]},{featureType:'road',elementType:'labels',stylers:[{visibility:'off'}]}]
		//  styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	});
	var geocoder = new google.maps.Geocoder();

	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	});
}

//geocode search parameters
function geocodeAddress(geocoder, resultsMap) {
	var loc = [];
	var bounds = new google.maps.LatLngBounds();
	var address = document.getElementById('address').value;
	geocoder.geocode({
		'address': address
	}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			resultsMap.setCenter(results[0].geometry.location);
			loc[0] = results[0].geometry.location.lat();
			loc[1] = results[0].geometry.location.lng();
			// the place where loc contains geocoded coordinates
			$.get('/api/locations?longitude=' + loc[0] + '&latitude=' + loc[1]).success(function(clinicsNearby) {
				$.each(clinicsNearby, function(index, data) {
					var latLng = new google.maps.LatLng(data.loc[0], data.loc[1]);
					var letter = String.fromCharCode("A".charCodeAt(0) + index);
					clinicsNearby[index].letter_designation = letter;
					var marker = new google.maps.Marker({
						map: resultsMap,
						animation: google.maps.Animation.DROP,
						icon: "http://maps.google.com/mapfiles/marker" + letter + ".png",
						position: latLng,
						title: "test!",
					});
					bounds.extend(latLng);
					resultsMap.fitBounds(bounds);
					marker.setMap(resultsMap);
					google.maps.event.addDomListener(window, 'load', initMap);
					google.maps.event.addListener(marker, 'click', function() {
						renderSearchPage(clinicsNearby[index], index);
					});
				});
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}

$(document).ready(function() {
	renderUserPage(window.user);
	$('.modal-trigger').leanModal();
	Handlebars.registerHelper('breaklines', function(text) {
		text = Handlebars.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new Handlebars.SafeString(text);
	});

	//click listeners
	$('body').on('click', '.learnMoreButton', function(e) {
		var resultId = $('#resultContainer').data('result-id');
		$.get('/api/clinics/' + resultId).success(function(result) {
			$.get('/api/clinics/' + resultId + '/storys').success(function(storyResult) {
				var resultToBeShown = result;
				$('.floatMap').fadeOut('slow');
				$('#bottomContent').fadeOut('slow', function() {
					renderResultsPage(resultToBeShown);
					renderStorys(storyResult);
					$('#bottomContent').fadeIn('slow');
				});
			});
		});
	});

	$('.modal-test').on('click', function(e) {
		$('#bottomContent').fadeIn('slow');
		$('.floatMap').fadeIn('slow');
		// $('.floatMap').css('position', 'fixed');
	});

	$('body').on('click', '#submitNewStoryBtn', function(event) {
		event.preventDefault();
		var clinicId = $('body #idContainer').data('result-id');
		// var resultId = $('#resultContainer').data('result-id');
		var textareaData = {
			story_content: $('#storyContentInput').val()
		};
		$.post('/api/clinics/' + clinicId + '/storys', textareaData, function(result) {
			$(this).trigger("reset");
			$('#modalNewStory').closeModal();
			renderNewStorys(result);
		});
	});

	$('#newClinicForm form').on('submit', function(event) {
		event.preventDefault();
		var formData = $(this).serialize();
		var longitude = $('#longitudeInput').val();
		var latitude = $('#latitudeInput').val();
		var latLng = [latitude, longitude];
		var loc = "loc=" + latLng + "&";
		$.post('/api/clinics', formData, function(clinic) {});
		$(this).trigger("reset");
		$('#modalNewClinic').closeModal();
	});
});
