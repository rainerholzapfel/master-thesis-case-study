window.ContactsView = Backbone.View.extend({

	model: ContactsCollection,

    events: {
        'click th'      : 'sort',
        'keyup #search' : 'search'
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
    	var contacts = this.model.getUpdatedList();
        $('.list tbody').html('');
        for (var i = 0; i < contacts.length; i++) {
            $('.list tbody', this.el).append(new ContactsItemView({model: contacts[i]}).render().el);
        }
    }
});

window.ContactsItemView = Backbone.View.extend({

	model: Contact,
    tagName: 'tr',
    
    events: {
        'click': 'viewContact'
    },
    
    viewContact: function () {
    	app.navigate('contact/edit/' + this.model.get('id'), {trigger: true});
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});