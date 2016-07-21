console.log("Sanity Check: JS is working!");
var template;
var $clinicsList;
var allClinics = [];

$(document).ready(function(){

  $clinicsList = $('#clinicTarget');

  // compile handlebars template
  var source = $('#clinics-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/clinics',
    success: handleSuccess,
    error: handleError
  });

  $('#newClinicForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/clinics',
      data: $(this).serialize(),
      success: newClinicSuccess,
      error: newClinicError
    });
  });

  $clinicsList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/clinics/'+$(this).attr('data-id'),
      success: deleteClinicSuccess,
      error: deleteClinicError
    });
  });

});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $clinicsList.empty();

  // pass `allClinics` into the template function
  var clinicsHtml = template({ clinics: allClinics });

  // append html to the view
  $clinicsList.append(clinicsHtml);
}

function handleSuccess(json) {
  allClinics = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#clinicTarget').text('Failed to load clinics, is the server working?');
}

function newClinicSuccess(json) {
  $('#newClinicForm input').val('');
  allClinics.push(json);
  render();
}

function newClinicError() {

}

function deleteClinicSuccess(json) {
  var clinic = json;
  var clinicId = clinic._id;

  // find the clinic with the correct ID and remove it from our allClinics array
  for(var index = 0; index < allClinics.length; index++) {
    if(allClinics[index]._id === clinicId) {
      allClinics.splice(index, 1);
      break;  // we found our clinic - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteClinicError() {

}
