var AppRouter = Backbone.Router.extend({

    routes: {
    	'mail/new'         : 'mailNew',
        'mail/:folder/:id' : 'mailDetail',
        'mail/:folder'     : 'mails',
        'contact/add'      : 'contactNew', // +1 line
        'contact/edit/:id' : 'contactDetail',
        'contact/:folder'  : 'contacts',
        '*path'            : 'defaultRoute'

    },

    initialize: function() {
    	this.data = {
    		mails: {},
    		contacts: {}
    	};
    },
    
    showSubview: function(subview) {
    	if (subview == 'contacts') {
    		$('#title').html(' // Kontakte');
            $('#sub-contact').show();
            $('#sub-mail').hide();
    	} else if(subview == 'mails') {
    		$('#title').html(' // Mails');
            $('#sub-contact').hide();
            $('#sub-mail').show();
    	}
    },
    
    defaultRoute: function() {
    	app.navigate('main/in', {trigger: true});
    },
    
    mailNew: function() {
		var mail = new Mail({}, {task: 'create'});
		$('#content').html(new MailView({model: mail, type: 'new'}).render().el);

		this.showSubview('mails');
    },
    
    mailDetail: function(folder, id) {
        var mail = new Mail({id: id}, {folder: folder, task: 'read'});
        mail.fetch({success: function() {
            $('#content').html(new MailView({model: mail, type: folder}).render().el);
        }});
        
        this.showSubview('mails');
    },
    
	mails: function(folder) {
		if (typeof app.data.mails[folder] == 'undefined')
			app.data.mails[folder] = new MailsCollection([], {folder: folder});
		app.data.mails[folder].fetch({success: function() {
            $('#content').html(new MailsView({model: app.data.mails[folder]}).render().el);
        }});
        
		this.showSubview('mails');
    },
    
    contactNew: function() {
		var contact = new Contact({}, {task: 'create'});
		$('#content').html(new ContactView({model: contact, type: 'new'}).render().el);

		this.showSubview('contacts');
    },
    
    contactDetail: function(id) {
        var contact = new Contact({id: id}, {task: 'read'});
        contact.fetch({success: function() {
            $('#content').html(new ContactView({model: contact}).render().el);
        }});
        
        this.showSubview('contacts');
    },

	contacts: function(folder) {
		if (typeof app.data.contacts[folder] == 'undefined')
			app.data.contacts[folder] = new ContactsCollection();
		app.data.contacts[folder].fetch({success: function() {
            $('#content').html(new ContactsView({model: app.data.contacts[folder]}).render().el);
        }});
        
		this.showSubview('contacts');
    }

});

utils.loadTemplate([
	'MailView',
	'MailsView',
	'MailsItemView',
	'ContactView',
	'ContactsView',
	'ContactsItemView',
], function() {
    app = new AppRouter();
    Backbone.history.start();
});