#!/usr/bin/env node

(function(global) {

	var _BOOK  = require('fs').readFileSync(__dirname + '/book.html').toString('utf8');
	var _INDEX = require('fs').readFileSync(__dirname + '/index.html').toString('utf8');


	var _fs       = require('fs');
	var _lexer    = require('./html.js');
	var _parser   = require('./markdown.js');
	var _path     = require('path');


	var FILES = process.argv[2].split(':').filter(function(tmp) {
		return tmp !== '';
	});


	if (FILES.length > 0) {

		var book_index = [];


		FILES.forEach(function(file) {

			var book_in  = _path.resolve(__dirname + '/../../', file);
			var book_out = _path.resolve(__dirname + '/../../', file.replace('.md', '.html'));


			var blob = _parser.decode(_fs.readFileSync(book_in, 'utf8').toString('utf8'));
			if (blob !== null) {

				var book_data = _lexer.encode(blob);
				var book_link = './book/' + file.split('/').pop().replace('.md', '.html');
				var book_name = file.split('/').pop().substr(3).replace('.md', '');

				if (book_data !== null && book_data.length > 0) {

					var tmp = _BOOK;

					tmp = tmp.split('${data}').join(book_data);
					tmp = tmp.split('${name}').join(book_name);

					_fs.writeFileSync(book_out, tmp, 'utf8');


					book_index.push('<a href="' + book_link + '"><img src="' + book_link.replace('.html', '.svg') + '"/><h3>' + book_name + '</h3></a>');

				}

			}

		});


		if (book_index.length > 0) {
			var tmp = _INDEX.split('${index}').join(book_index.join('\n\t'));
			_fs.writeFileSync(__dirname + '/../../index.html', tmp, 'utf8');
		}

	}

})(typeof global !== 'undefined' ? global : this);

