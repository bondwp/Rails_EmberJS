import DS from 'ember-data';

const { 
	attr,
	hasMany
} = DS;

export default DS.Model.extend({

	reservation: hasMany('reservation'),
	name: attr('string'),
	address: attr('string'),
	description: attr('string'),
	photo: attr('string'),
	daily_rate: attr('number'),
	created_at: attr('date'),
	updated_at: attr('date')

});
