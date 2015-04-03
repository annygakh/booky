var app = app || {};

var BookmarkCollection = Backbone.Collection.extend({
	model: app.BookmarkModel,

	localStorage: new Backbone.LocalStorage('booky-bookmarks'),


});

app.bookmarks = new BookmarkCollection();