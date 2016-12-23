$( document ).ready(function() {
//AJAX to delete article (DELETE)
$(".delete").on('click', function(e){
  e.preventDefault();
  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    // get data returned from the DELETE route
    console.log(data);

    // go back to the homepage after deleting anything.
    window.location = '/disasters';
  });
});

//AJAX to edit article (PUT)
$(".edit-form").on('submit', function(e){
  e.preventDefault();
  var element = $(this);
  var url = element.attr('action');
  var formData = element.serialize();

  $.ajax({
    method: 'PUT',
    url: url,
    data: formData
  }).done(function(data){
    console.log(data);

    window.location = '/disasters';
  });
});

//Display current time
$(".currentTime").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

var timeToCompare;
var getTime = function() {
  $(".currentTime").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  timeToCompare = new Date();
}
setInterval(getTime, 1000);



});
