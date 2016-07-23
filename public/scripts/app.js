console.log("Sanity Check: JS is working!");
var template;
var $clinicsList;
var allClinics = [];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var loc=[];
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
    loc[0]=results[0].geometry.location.lat();
    loc[1]=results[0].geometry.location.lng();
    console.log( loc ); // the place where loc contains geocoded coordinates
    $.get('/api/locations?longitude=' + loc[0] +'&latitude='+loc[1]).success(function (clinicsNearby) {
      console.log(clinicsNearby);
      resultsMap.setCenter(results[0].geometry.location);
      $.each(clinicsNearby, function(key, data) {
        var latLng = new google.maps.LatLng(data.loc[0], data.loc[1]);
        var marker = new google.maps.Marker({
          position: latLng,
          title: data.name,
        });
        marker.setMap(resultsMap);
      });
      var marker = new google.maps.Marker({
      map: resultsMap,
      position: results[0].geometry.location
      });
    });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(document).ready(function(){
$('.modal-trigger').leanModal();
  $('.modal-test').on('click', function(e) {
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
