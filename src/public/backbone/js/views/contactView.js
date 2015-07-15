window.ContactView = Backbone.View.extend({

	model: Contact,
	
	initialize: function(options) {
		this.options = options;
	},
    
    events: {
    	'click #submit-save' : 'saveContact',
    	'click #submit-delete' : 'deleteContact'
    },
    
    saveContact: function() {
    	var valid = true;
    	$('#contact-form .input-field').each(function(index, field) {
    		if (!field.checkValidity()) valid = false;
    	});

    	if (valid) {
    		var contact = this.model;

    		contact.set('name', $('#form-name').val());
    		contact.set('email', $('#form-email').val());

    		contact.save({}, {
    		    success: function (model, respose, options) {
    		    	app.navigate('contact/all', {trigger: true});
    		    }
    		});
    	}
    },
    
    deleteContact: function() {
    	this.model.destroy({
    	    success: function (model, respose, options) {
    	    	app.navigate('contact/all', {trigger: true});
    	    }
    	});
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});