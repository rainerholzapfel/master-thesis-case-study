window.MailsView = Backbone.View.extend({

	model: MailsCollection,
	
	initialize: function () {
//		this.model.on('sort', this.render);
//		this.model.on('sort', this.renderList, this);
	},

    events: {
    	'click #fetch'  : 'fetch',
        'click th'      : 'sort',
        'keyup #search' : 'search'
    },
    
    fetch: function(event) {
    	var view = this;
    	this.model.fetch({success: function() {
    		view.renderList();
    	}});
    },
    
    sort: function(event) {
    	var field = $(event.target).attr('id');
    	this.model.setSortAttribute(field);
    	this.renderList();
    },
    
    search: function(event) {
    	var term = $(event.target).val();
    	this.model.setSearchTerm(term);
    	this.renderList();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.renderList();
        return this;
    },
    
    renderList: function() {
    	var mails = this.model.getUpdatedList();
        $('.list tbody').html('');
        for (var i = 0; i < mails.length; i++) {
        	mails[i].options = { folder: this.model.options.folder };
            $('.list tbody', this.el).append(new MailsItemView({model: mails[i]}).render().el);
        }
    }
});

window.MailsItemView = Backbone.View.extend({

	model: Mail,
    tagName: 'tr',
    
    events: {
        'click': 'openMail'
    },
    
    openMail: function () {
    	app.navigate('mail/' + this.model.options.folder + '/' + this.model.get('id'), {trigger: true});
    },

//    initialize: function () {
//        this.model.bind("change", this.render, this);
//        this.model.bind("destroy", this.close, this);
//    },

    render: function() {
    	this.model.set('tmpDate', $.format.date(new Date(this.model.get('date')), 'dd-MM-yyyy HH:mm'));
    	
    	if (this.model.options.folder == 'in') this.model.set('tmpEmail', this.model.get('sender'));
    	else this.model.set('tmpEmail', this.model.get('recipient'));
    	
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});