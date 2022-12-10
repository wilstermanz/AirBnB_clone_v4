// Lists checked amenities
$(function () {
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
});

// Checks api status
$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
