var app = app || {};

app.BookmarkModel = Backbone.Model.extend({
	defaults: {
		title: '',
		link: '#',
		row: 0,
		col: 0,
		image_src: 'js/assets/img/default_image.png',
	}


});