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

		_.bindAll(this, 'edit', 'change', 'delete', 'autofill');
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
		// console.log('edit:BookmarkView');
		var button_element = $(e.currentTarget);
		var bookmark_element = button_element.parent();
		var popupform = this.template_popup();

		// this.$el.off('click', this.createBookmark); // not needed
		this.$el.on('keypress', 'input', this.change);

		if (!bookmark_element.hasClass('form-is-active')){
			bookmark_element.append(popupform);
			this.autofill(bookmark_element);
			bookmark_element.addClass('form-is-active');
		}
		// user changed his mind about changing the bookmark
		var cancel_button = bookmark_element.find('.close-bookmark');
		$(cancel_button).on('click', function(){
			bookmark_element.children('.edit-form').remove();
			bookmark_element.removeClass('form-is-active');
		});
		this.$el.off('click', this.change);
	},
	autofill: function(element){
		var title_input = element.find('input#title');
		var link_input = element.find('input#link');
		// console.log(title_input);
		var title = this.model.get("title");
		var link = this.model.get("link");
		// console.log(title);
		// console.log(link);
		title_input.attr('value', title);
		link_input.attr('value', link);

	},
	delete: function(e){
		// console.log('delete:BookmarkView');
		var templ = this.template_placeholder();
		this.$el.replaceWith(templ);
		this.model.destroy();
		
	},
	change: function(e){
		// console.log('change:BookmarkView');
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
		if (doesnt_contain_httpwww_prefix){
			var PREFIX = "http://www.";
			link_ = PREFIX + link_;
			
		}
		var obj = {
			title: title_,
			link: link_,
		};
		return obj;
	},

});