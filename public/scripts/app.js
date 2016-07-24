console.log("Sanity Check: JS is working!");
var template;
var $clinicsList;
var allClinics = [];

function render(result, index) {
  console.log(result, template);
  // console.log('rendering album', album);
  //grabs all the HTML from the template
  var templateHtml = $('#search-template').html();
  console.log(templateHtml);
  //a function that takes that HTML and compiles it
  var resultsTemplate = Handlebars.compile(templateHtml);
  console.log(resultsTemplate);
  //just the HTML of the {{}}s, takes the album and piles them into the appropriate {{}}s
  var partialAlbumHtml = resultsTemplate(result);
  console.log(partialAlbumHtml);
  //adds to the top of the section
  console.log(index);
  return(partialAlbumHtml);
  // $('.bigLetterHeadline').empty();
  // $('.bigLetterHeadline').append(index);
}

function renderSearchPage(result, index) {
  var partialAlbumHtml = render(result);
  $('#bottomContent').empty();
  $('#bottomContent').append(partialAlbumHtml);
  Materialize.showStaggeredList('#staggered-test');
}

function renderResultsPage(result, index) {
  console.log(result, template);
  // console.log('rendering album', album);
  //grabs all the HTML from the template
  var templateHtml = $('#results-template').html();
  console.log(templateHtml);
  //a function that takes that HTML and compiles it
  var resultsTemplate = Handlebars.compile(templateHtml);
  console.log(resultsTemplate);
  //just the HTML of the {{}}s, takes the album and piles them into the appropriate {{}}s
  var partialAlbumHtml = resultsTemplate(result);
  console.log(partialAlbumHtml);
  //adds to the top of the section
  console.log(index);
  $('#bottomContent').empty();
  $('#bottomContent').append(partialAlbumHtml);
  // Materialize.showStaggeredList('#staggered-results');
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.81803, lng: -122.265158}
   //  mapTypeId: google.maps.MapTypeId.ROADMAP,
   //  styles: styleArray
   // styles: [{stylers:[{hue:'#2c3e50'},{saturation:250}]},{featureType:'road',elementType:'geometry',stylers:[{lightness:50},{visibility:'simplified'}]},{featureType:'road',elementType:'labels',stylers:[{visibility:'off'}]}]
   //  styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var loc=[];
  // var markersArray = [];
  // var bounds = new google.maps.LatLngBounds();
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      loc[0]=results[0].geometry.location.lat();
      loc[1]=results[0].geometry.location.lng();
      console.log( loc ); // the place where loc contains geocoded coordinates
      $.get('/api/locations?longitude=' + loc[0] +'&latitude='+loc[1]).success(function (clinicsNearby) {
           console.log(clinicsNearby);
           $.each(clinicsNearby, function(index, data) {
             var latLng = new google.maps.LatLng(data.loc[0], data.loc[1]);
             console.log(data.name);
             var letter = String.fromCharCode("A".charCodeAt(0) + index);
             clinicsNearby[index].letter_designation=letter;
             var marker = new google.maps.Marker({
               map: resultsMap,
               animation: google.maps.Animation.DROP,
               icon: "http://maps.google.com/mapfiles/marker" + letter + ".png",
               position: latLng,
               title: "test!",
             });
             console.log(marker);
            //  markersArray.push(marker);
             marker.setMap(resultsMap);
            //  console.log(markersArray);
             google.maps.event.addDomListener(window, 'load', initMap);
             google.maps.event.addListener(marker, 'click', function() {
               console.log("boop" + index);
               console.log(clinicsNearby[index]);
             renderSearchPage(clinicsNearby[index], index);

             });
           });
       });


      // var marker = new google.maps.Marker({
      //  map: resultsMap,
      //  position: results[0].geometry.location
      // });


      // for (var i = 0; i < markersArray.length; i++) {
      //   bounds.extend(markersArray[i].getPosition());
      // }
      // console.log(bounds);
      // results.fitBounds(bounds);
      // console.log(markersArray);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(document).ready(function(){
$('body').on('click', '.learnMoreButton', function(e) {
  console.log("boopboop");
  var resultId= $('#resultContainer').data('result-id');
  console.log(resultId);
  $.get('/api/clinics/' + resultId).success(function (result) {
    var resultToBeShown = result;
    console.log(resultToBeShown);
    $('#bottomContent').fadeOut();
    $('.floatMap').fadeOut();
    renderResultsPage(resultToBeShown);
  });
});
$('.modal-trigger').leanModal();

  $('.modal-test').on('click', function(e) {
    $('#bottomContent').fadeIn();
    $('.floatMap').fadeIn();
    // $('.floatMap').css('position', 'fixed');
    // $('.floatMap').css('margin-left', '+100%');
      console.log('add-clinic clicked!');

      // var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      // console.log('id',id);
      // console.log(id);
      // var currentAlbumId= id;
      // $('#songModal').data('album-id', currentAlbumId);
      // $('.modal').modal();
  });




$('#newClinicForm form').on('submit', function(event) {
  event.preventDefault();
  console.log("test");
  var formData = $(this).serialize();
  console.log(formData);
  $.post('/api/clinics', formData, function(clinic) {
    // renderAlbum(clinic);  //render the server's response
  });
  $(this).trigger("reset");
  $('#modalNewClinic').closeModal();
});
});
//   $clinicsList = $('#clinicTarget');
//
//   // compile handlebars template
//   var source = $('#clinics-template').html();
//   template = Handlebars.compile(source);
//
//   $.ajax({
//     method: 'GET',
//     url: '/api/clinics',
//     success: handleSuccess,
//     error: handleError
//   });
//
//   $('#newClinicForm').on('submit', function(e) {
//     e.preventDefault();
//     console.log('new clinic serialized', $(this).serializeArray());
//     $.ajax({
//       method: 'POST',
//       url: '/api/clinics',
//       data: $(this).serializeArray(),
//       success: newClinicSuccess,
//       error: newClinicError
//     });
//   });
//
//   $clinicsList.on('click', '.deleteBtn', function() {
//     console.log('clicked delete button to', '/api/clinics/'+$(this).attr('data-id'));
//     $.ajax({
//       method: 'DELETE',
//       url: '/api/clinics/'+$(this).attr('data-id'),
//       success: deleteClinicSuccess,
//       error: deleteClinicError
//     });
//   });
//
//   $clinicsList.on('submit', '#addCharacterForm', function(e) {
//     e.preventDefault();
//     console.log('new characters');
//     $.ajax({
//       method: 'POST',
//       url: '/api/clinics/'+$(this).attr('data-id')+'/characters',
//       data: $(this).serializeArray(),
//       success: newCharacterSuccess,
//       error: newCharacterError
//     });
//   });
//
//   $clinicsList.on('click', '.deleteCharacter', function() {
//     $.ajax({
//       method: 'DELETE',
//       url: '/api/clinics/'+$(this).data('clinicid')+'/characters/'+$(this).data('charid'),
//       success: deleteCharacterSuccess
//     });
//   });
//
// });
//
// // helper function to render all posts to view
// // note: we empty and re-render the collection each time our post data changes
// function render () {
//   // empty existing posts from view
//   $clinicsList.empty();
//
//   // pass `allClinics` into the template function
//   var clinicsHtml = template({ clinics: allClinics });
//
//   // append html to the view
//   $clinicsList.append(clinicsHtml);
// }
//
// function handleSuccess(json) {
//   allClinics = json;
//   render();
// }
//
// function handleError(e) {
//   console.log('uh oh');
//   $('#clinicTarget').text('Failed to load clinics, is the server working?');
// }
//
// function newClinicSuccess(json) {
//   $('#newClinicForm input').val('');
//   allClinics.push(json);
//   render();
// }
//
// function newClinicError() {
//   console.log('newclinic error!');
// }
//
// function deleteClinicSuccess(json) {
//   var clinic = json;
//   console.log(json);
//   var clinicId = clinic._id;
//   console.log('delete clinic', clinicId);
//   // find the clinic with the correct ID and remove it from our allClinics array
//   for(var index = 0; index < allClinics.length; index++) {
//     if(allClinics[index]._id === clinicId) {
//       allClinics.splice(index, 1);
//       break;  // we found our clinic - no reason to keep searching (this is why we didn't use forEach)
//     }
//   }
//   render();
// }
//
// function deleteClinicError() {
//   console.log('deleteclinic error!');
// }
//
// function newCharacterSuccess(json) {
//   var clinic = json;
//   var clinicId = clinic._id;
//   // find the clinic with the correct ID and update it
//   for(var index = 0; index < allClinics.length; index++) {
//     if(allClinics[index]._id === clinicId) {
//       allClinics[index] = clinic;
//       break;  // we found our clinic - no reason to keep searching (this is why we didn't use forEach)
//     }
//   }
//   render();
// }
//
// function newCharacterError() {
//   console.log('adding new character error!');
// }
//
// function deleteCharacterSuccess(json) {
//   var clinic = json;
//   var clinicId = clinic._id;
//   // find the clinic with the correct ID and update it
//   for(var index = 0; index < allClinics.length; index++) {
//     if(allClinics[index]._id === clinicId) {
//       allClinics[index] = clinic;
//       break;  // we found our clinic - no reason to keep searching (this is why we didn't use forEach)
//     }
//   }
//   render();
// }
