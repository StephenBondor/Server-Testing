exports.up = function(knex, Promise) {
	return knex.schema.createTable('thing', tbl => {
		//primary key
		tbl.increments(); //defaults to a column named id, autoincrements

		//other feilds
		tbl.text('name', 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('thing');
};
