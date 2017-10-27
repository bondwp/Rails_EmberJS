import DS from 'ember-data';

const {
	attr,
	belongsTo
} = DS;

export default DS.Model.extend({
	rental_id: belongsTo('rental'),
	client_email: attr('string'),
	start_at: attr('string'),
	end_at: attr('string'),
	created_at: attr('date'),
	updated_at: attr('date')
});
