//=============================================================================
// DATA
//=============================================================================

var mails = [
	{
		folder: 'in',
		ref: 'Lorem ipsum dolor',
		body: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
		date: new Date('2015-04-14T12:34:27'),
		sender: 'josef@mail.mvc',
		recipient: 'rainer@mail.mvc'
	},
	{
		folder: 'in',
		ref: 'Test Mail',
		body: 'Das ist ein Test',
		date: new Date('2015-04-03T14:31:15'),
		sender: 'stefan@mail.mvc',
		recipient: 'rainer@mail.mvc'
	},
	{
		folder: 'in',
		ref: 'Spam Spam Spam', 
		body: 'Das ist Spam!!!',
		date: new Date('2015-04-14T18:56:47'),
		sender: 'spambot@spam.mvc',
		recipient: 'rainer@mail.mvc'
	},
	{
		folder: 'out',
		ref: 'RE: Lorem ipsum dolor',
		body: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
		date: new Date('2015-04-14T12:38:31'),
		sender: 'rainer@mail.mvc',
		recipient: 'josef@mail.mvc'
	},
	{
		folder: 'out',
		ref: 'Gibt es Neues?',
		body: 'Oder ist alles beim Alten?',
		date: new Date('2015-04-12T18:19:11'),
		sender: 'rainer@mail.mvc',
		recipient: 'stefan@mail.mvc'
	}
];

var contacts = [
	{
		name: 'Stefan',
		email: 'stefan@mail.mvc'
	},
    { 
		name: 'Josef',
		email: 'josef@mail.mvc'
	}
];

//=============================================================================
// SERVER
//=============================================================================

var express    = require('express');
var bodyParser = require('body-parser');

var sqlite3    = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// prepare database
db.serialize(function() {

	db.run('CREATE TABLE mails (folder TEXT, ref TEXT, body TEXT, date DATE, sender TEXT, recipient TEXT)');
	var stmt = db.prepare('INSERT INTO mails VALUES (?, ?, ?, ?, ?, ?)');

	for (var i = 0; i < mails.length; i++) {
	    stmt.run(mails[i].folder, mails[i].ref, mails[i].body, mails[i].date, mails[i].sender, mails[i].recipient);
	}

	stmt.finalize();
	
	db.run('CREATE TABLE contacts (name TEXT, email TEXT)');
	var stmt = db.prepare('INSERT INTO contacts VALUES (?, ?)');

	for (var i = 0; i < contacts.length; i++) {
	    stmt.run(contacts[i].name, contacts[i].email);
	}

	stmt.finalize();
});

var app = express();

var morgan     = require('morgan');
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create router
var router = express.Router();

router.route('/mails/:folder')

	// get all mails
	.get(function(req, res) {
		
		var stmt = db.prepare('SELECT rowid AS id, ref, body, date, ' +
			'sender, recipient FROM mails WHERE folder = ?');
		
		stmt.all(req.params.folder, function(err, rows) {
			res.json(rows);
	    });
	})

	//create new mail
	.post(function(req, res) {
		
		var stmt = db.prepare('INSERT INTO mails VALUES (?, ?, ?, ?, ?, ?)');

		stmt.run(req.params.folder, 
		    req.body.ref, 
			req.body.body, 
			req.body.date, 
			req.body.sender, 
			req.body.recipient, 
			function(err) {
			
			res.json({ message: 'Main gesendet!' });
		});
		
	});

router.route('/mail/:folder/:mail_id')

	// get mail by id
	.get(function(req, res) {
		
		var stmt = db.prepare('SELECT rowid AS id, ref, body, date, ' +
		    'sender, recipient FROM mails WHERE folder = ? AND rowid = ?');
	
		stmt.get(req.params.folder, req.params.mail_id, function(err, row) {
			res.json(row);
	    });
	});

router.route('/contact')

	.post(function(req, res) {
		
		var stmt = db.prepare('INSERT INTO contacts VALUES (?, ?)');

		stmt.run(req.body.name, 
			req.body.email,
			function(err) {
			
			res.json({ message: 'Mail gesendet!' });
		});
	});

router.route('/contacts')

	// get all contacts
	.get(function(req, res) {
		
		var stmt = db.prepare('SELECT rowid AS id, name, email FROM contacts');
	
		stmt.all(function(err, rows) {
			res.json(rows);
		});
	})

	//create new contact
	.post(function(req, res) {
		
		var stmt = db.prepare('INSERT INTO contacts VALUES (?, ?)');

		stmt.run(req.body.name, 
			req.body.email,
			function(err) {
			
			res.json({ message: 'Mail gesendet!' });
		});
	});

router.route('/contact/:contact_id')

	// get contact by id
	.get(function(req, res) {
		
		var stmt = db.prepare('SELECT rowid AS id, name, email FROM contacts WHERE rowid = ?');

		stmt.get(req.params.contact_id, function(err, row) {
			res.json(row);
	    });
	})
	
	// update contact
	.put(function(req, res) {
		
		var stmt = db.prepare('UPDATE contacts SET name = ?, email = ? WHERE rowid = ?');
		
		stmt.run(req.body.name, 
			req.body.email,
			req.params.contact_id,
			function(err) {
				
			res.json({ message: 'Kontakt bearbeitet!' });
		});
	})
	
	// delete contact
	.delete(function(req, res) {

		var stmt = db.prepare('DELETE FROM contacts WHERE rowid = ?');
		
		stmt.run(req.params.contact_id, function(err) {
				
			res.json({ message: 'Kontakt gelöscht!' });
		});
	});

// register routes
app.use('/server', router);
app.use('/angular', express.static('public/angular'));
app.use('/angular-mod', express.static('public/angular-mod'));
app.use('/backbone', express.static('public/backbone'));
app.use('/backbone-mod', express.static('public/backbone-mod'));

// start server
app.listen(8080);
console.log('Server: http://localhost:8080/server/');
console.log('Angular: http://localhost:8080/angular/');
console.log('Angular Mod: http://localhost:8080/angular-mod/');
console.log('Backbone: http://localhost:8080/backbone/');
console.log('Backbone Mod: http://localhost:8080/backbone-mod/');