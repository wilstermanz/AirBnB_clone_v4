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
