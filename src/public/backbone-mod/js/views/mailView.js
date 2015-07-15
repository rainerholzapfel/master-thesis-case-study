window.MailView = Backbone.View.extend({

	model: Mail,
	
	initialize: function(options) {
		this.options = options;
	},
    
    events: {
    	'click input[type=submit]' : 'sendMail'
    },
    
    sendMail: function() {
    	var valid = true;
    	$('#mail-form .input-field').each(function(index, field) {
    		if (!field.checkValidity()) valid = false;
    	});

    	if (valid) {
    		var mail = this.model;

	    	if (mail.get('id') != null) {
	    		mail.set('ref', 'RE: ' + mail.get('ref'));
	    		mail.set('recipient', mail.get('sender'));
	    	} else {
	    		mail.set('ref', $('#form-ref').val());
	    		mail.set('recipient', $('#form-recipient').val());
	    	}
	    	
	    	mail.set('id', null);
	    	mail.set('body', $('#form-body').val());
	    	mail.set('sender', 'rainer@mail.mvc');
	    	mail.set('date', new Date());
	    	mail.options.folder = 'out';
	    	mail.options.task = 'create';

    		mail.save({}, {
    		    success: function (model, respose, options) {
    		    	app.navigate('mail/' + model.options.folder, {trigger: true});
    		    }
    		});
    	}
    },

    render: function () {
    	this.model.set('tmpDate', $.format.date(new Date(this.model.get('date')), '\'am\' dd-MM-yyyy \'um\' HH:mm'));
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});