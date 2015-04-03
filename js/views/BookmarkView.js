var app = app || {};

app.BookmarkView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookmark col col1-3 center',
	model: app.BookmarkModel,
	template: _.template($('#bookmark-template').html()),
	template_popup: _.template( $('#popup-form').html() ),
	template_placeholder: _.template($('#bookmark-placeholder-template').html()),
	
	events: {
		'click .edit-bookmark' : 'edit',
		'click .delete-bookmark' : 'delete',

	},

	initialize: function(){

		_.bindAll(this, 'edit', 'change', 'delete');
		/* ------------- Initialize listeners -------------  */
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		
	},

	render: function(){
		var templ = this.template(this.model.attributes);
		this.$el.html(templ);
		return this;
	},
	edit: function(e) {
		console.log('edit:BookmarkView');
		var button_element = $(e.currentTarget);
		var bookmark_element = button_element.parent();
		var popupform = this.template_popup();

		this.$el.off('click', this.createBookmark);
		this.$el.on('keypress', 'input', this.change);

		if (!bookmark_element.hasClass('form-is-active')){
			bookmark_element.append(popupform);
			bookmark_element.addClass('form-is-active');
		}
	},
	delete: function(e){
		console.log('delete:BookmarkView');
		var templ = this.template_placeholder();
		this.$el.replaceWith(templ);
		this.model.destroy();
		
	},
	change: function(e){
		console.log('change:BookmarkView');
		if (e.which == ENTER_KEY){
			this.$el.removeClass('form-is-active');
			var element = $(e.currentTarget);
			var edit_form_element = element.parent();

			var obj = this.createObjectFromInput(edit_form_element);
			this.model.set(obj);
			this.model.save();
		}
	},

	createObjectFromInput: function(parent){
		var title_ = parent.find('input#title').val();
		var link_ = parent.find('input#link').val();
		var doesnt_contain_httpwww_prefix = link_.indexOf('http://www.');
		var PREFIX = "http://www.";
		var link_ = PREFIX + link_;
		var obj = {
			title: title_,
			link: link_,
		};
		return obj;
	},

});