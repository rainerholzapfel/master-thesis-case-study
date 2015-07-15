window.Mail = Backbone.Model.extend({

	urlRoot: function() {
    	if (this.options.task == 'create') {
    		return '../server/mails/' + this.options.folder;
    	} else {
    		return '../server/mail/' + this.options.folder;
    	}
    },
    
    defaults: {
    	id: null,
        ref: '',
        body: '',
        date: '',
        sender: '',
        recipient: ''
    },
    
    idAttribute: 'id',
    
    initialize: function (attrs, options) {
    	this.options = options;
    }
    
});

window.MailsCollection = Backbone.Collection.extend({

    model: Mail,

    url: function() {
    	return '../server/mails/' + this.options.folder;
    },
    
    initialize: function(models, options){
		this.options = options;
	},

    sortAttribute: 'ref',
    sortDirection: 1,
    searchTerm: '',

    comparator: function(a, b) {
       var a = a.get(this.sortAttribute),
           b = b.get(this.sortAttribute);

       if (a == b) return 0;

       if (this.sortDirection == 1) {
          return a > b ? 1 : -1;
       } else {
          return a < b ? 1 : -1;
       }
    },
    
    setSortAttribute: function(attr) {
        if (attr == this.sortAttribute) {
     	    this.sortDirection = -this.sortDirection;
        } else {
            this.sortAttribute = attr;
     	    this.sortDirection = 1;
        }
        this.sort();
    },
	
	setSearchTerm: function(term) {
		this.searchTerm = term;
	},
	
	getUpdatedList: function() {
		if (this.searchTerm) {
			var term = this.searchTerm;
			return this.filter(function(m, searchTerm) {
				var str = m.get('ref') + m.get('sender') + m.get('recipient');
				return str.toLowerCase().indexOf(term.toLowerCase()) != -1;
			});
		} else {
			return this.models;
		}
	}

});