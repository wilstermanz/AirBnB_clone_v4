$(function () {
  const checkedAmenities = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      checkedAmenities.push($(this).attr('data-id'));
    } else {
      checkedAmenities.splice($.inArray($(this).attr('data-id'), checkedAmenities), 1);
    }
    $('.amenities h4').html(checkedAmenities.join(', '));
  });
});
