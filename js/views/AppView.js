var app = app || {};


app.AppView = Backbone.View.extend({
	el: '#bookmarkapp',

	template_popup: _.template( $('#popup-form').html() ),

	events: {


	},

	initialize: function(){
		/* ------------- Initialize variables -------------  */



		_.bindAll(this, 'showCreateBookmarkForm', 'changeBookmark', 'retuneListeners');

		/* ------------- Initialize listeners -------------  */
		this.listenTo(app.bookmarks, 'add', this.addOne);
		this.listenTo(app.bookmarks, 'reset', this.addAll);
		this.$el.on('click', '.bookmark-placeholder', this.showCreateBookmarkForm);

		/* ------------- Restore saved bookmarks -------------  */
		app.bookmarks.fetch();
	},

	render: function(){

	},
	showCreateBookmarkForm: function(e){
		console.log('showCreateBookmarkForm:AppView');
		var element = $(e.currentTarget);
		var parent = element.parent();
		var popupform = this.template_popup();
		this.$el.off('click', this.showCreateBookmarkForm);
		this.$el.on('keypress', 'input', this.changeBookmark);

		if (!element.hasClass('form-is-active')){
			element.append(popupform);
			element.addClass('form-is-active');
		}
	},
	
	changeBookmark: function(e){
		console.log('changeBookmark:AppView');
		if (e.which === ENTER_KEY){
			var element = $(e.currentTarget);
			var edit_form_element = element.parent();
			var bookmark_placeholder_element = edit_form_element.parent();

			var col = bookmark_placeholder_element.index();
			var row = bookmark_placeholder_element.parent().index();
			console.log("col: " + col);
			console.log("row: " + row);
			if (!bookmark_placeholder_element.hasClass('bookmark')){
				var obj = this.createObjectFromInput(edit_form_element, row, col);
				var bmodel = new app.BookmarkModel(obj);
				app.bookmarks.create(bmodel);
				var view = new app.BookmarkView({model: bmodel});
				bookmark_placeholder_element.replaceWith(view.render().el);
				this.retuneListeners();
			}
		}

	},

	retuneListeners: function(){
		this.$el.off('click', this.changeBookmark);
		this.$el.off('keypress', this.changeBookmark);
		this.$el.on('click', '.bookmark-placeholder', this.showCreateBookmarkForm);
	},

	createObjectFromInput: function(parent, row_, col_){
		var title_ = parent.find('input#title').val();
		var link_ = parent.find('input#link').val();
		var obj = {
			title: title_,
			link: link_,
			row: row_,
			col: col_,
		};
		return obj;
	},

	/*----------- UI -------------*/
	addOne: function(bookmark){
		console.log('addOne:AppView');
		// var view = new app.BookmarkView({model: bookmark});
		var col = bookmark.get('col');
		var row = bookmark.get('row');
		var $bookmarks = this.$('.bookmarks div:nth-child(' + col + ')');
		console.log($bookmarks.html());


		// todo

	},
	addAll: function(){

	},

	


});