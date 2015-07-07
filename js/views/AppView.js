var app = app || {};


app.AppView = Backbone.View.extend({
	el: '#bookmarkapp',

	template_popup: _.template( $('#popup-form').html() ),

	events: {
		'click .delete-all-bookmarks' : 'deleteAllBookmarks',
	},

	initialize: function(){
		/* ------------- Initialize variables -------------  */



		_.bindAll(this, 'showCreateBookmarkForm', 'changeBookmark', 'retuneListeners');

		/* ------------- Initialize listeners -------------  */
		this.listenTo(app.bookmarks, 'add', this.addOne);
		// this.listenTo(app.bookmarks, 'reset', this.addAll);
		this.$el.on('click', '.bookmark-placeholder', this.showCreateBookmarkForm);

		/* ------------- Restore saved bookmarks -------------  */
		app.bookmarks.fetch();
	},

	render: function(){

	},
	showCreateBookmarkForm: function(e){
		// console.log('showCreateBookmarkForm:AppView');
		var element = $(e.currentTarget);
		var parent = element.parent();
		var popupform = this.template_popup();

		this.$el.off('click', this.showCreateBookmarkForm);

		this.$el.on('keypress', 'input', this.changeBookmark);

		if (!element.hasClass('form-is-active')){
			element.append(popupform);
			element.addClass('form-is-active');
		}
		var cancel_button = element.find('.close-bookmark');
		// console.log(cancel_button);
		$(cancel_button).on('click', function(){

			element.children('.edit-form').remove();
			element.removeClass('form-is-active');
		});
		this.$el.on('click', '.bookmark-placeholder', this.showCreateBookmarkForm);
	},
	
	changeBookmark: function(e){
		// console.log('changeBookmark:AppView');
		if (e.which === ENTER_KEY){
			var element = $(e.currentTarget);
			var edit_form_element = element.parent();
			var bookmark_placeholder_element = edit_form_element.parent();

			var col = bookmark_placeholder_element.index();
			var row = bookmark_placeholder_element.parent().index();
			// console.log("col: " + col);
			// console.log("row: " + row);
			if (!bookmark_placeholder_element.hasClass('bookmark')){
				var obj = this.createObjectFromInput(edit_form_element, row, col);
				var bmodel = new app.BookmarkModel(obj);
				app.bookmarks.create(bmodel);
				
				// bookmark_placeholder_element.replaceWith(view.render().el);
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
		// var doesnt_contain_httpwww_prefix = link_.indexOf('http');
		// var doesnt_contain_httpswww_prefix = link_.indexOf('https')
		// var PREFIX = "http://www.";
		// var link_ = PREFIX + link_;
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
		// console.log('addOne:AppView');
		var col = bookmark.get('col');
		var row = bookmark.get('row');
		var $row = this.$('.bookmarks div:nth-child(' + col + ')');
		var col_ = col+1;
		var row_ = row+1;
		var $col = this.$('.bookmarks div:nth-child('+ row_ +') div:nth-child('+ col_+')');
		var view = new app.BookmarkView({model: bookmark});
		$col.replaceWith(view.render().el);

	},
	deleteAllBookmarks: function(){
		// console.log('deleteAllBookmarks:AppView');
		// console.log(app.bookmarks.models);
		_.invoke(app.bookmarks.models, 'destroy');
	},

	


});
