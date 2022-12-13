// Lists checked amenities
$(document).ready(function () {
  const checkedAmenities = [];
  const names = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      checkedAmenities.push($(this).attr('data-id'));
      names.push($(this).attr('data-name'));
    } else {
      const indexID = names.indexOf($(this).attr('data-id'));
      const indexName = names.indexOf($(this).attr('data-name'));
      checkedAmenities.splice(indexID, 1);
      names.splice(indexName, 1);
    }
    $('.amenities h4').html(names.join(', '));
  });

  // Checks api status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // This loads in everything using only the api
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    async: false,
    success: function (places) {
      $.get('http://0.0.0.0:5001/api/v1/users/', function (users) {
        for (const place of places) {
          const user = users.filter(user => {
            return user.id === place.user_id;
          })[0];
          $('.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${user.first_name} ${user.last_name}
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
        }
      });
    }
  });
  // This loads in everything with checked amenities using only the api
  $('button').on('click', function () {
    console.log('hello');
    $('.places > article').remove();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function (data) {
        $.get('http://0.0.0.0:5001/api/v1/users/', function (users) {
          for (const place of data) {
            const user = users.filter(user => {
              return user.id === place.user_id;
            })[0];
            $('.places').append(`<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${user.first_name} ${user.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
          }
        });
      }
    });
  });
});
