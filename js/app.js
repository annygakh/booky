  var app = app || {};
  var ENTER_KEY = 13;

  $(function() {


  	/* ----------- popup form --------------- */
  	// function deselect(e) {
  	//   $('.pop').slideFadeToggle(function() {
  	//     e.removeClass('selected');
  	//   });    
  	// }

  	// $(function() {
  	//   $('.edit-bookmark').on('click', function() {
  	//     if($(this).hasClass('selected')) {
  	//       deselect($(this));               
  	//     } else {
  	//       $(this).addClass('selected');
  	//       $('.pop').slideFadeToggle();
  	//     }
  	//     return false;
  	//   });

  	//   $('.close').on('click', function() {
  	//     deselect($('.edit-bookmark'));
  	//     return false;
  	//   });
  	// });

  	// $.fn.slideFadeToggle = function(easing, callback) {
  	//   return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
  	// };
    // Kick things off by creating the **App**.
    new app.AppView();

  });