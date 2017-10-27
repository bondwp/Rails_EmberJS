import Ember from 'ember';
import RSVP from 'rsvp';

const { Route, set } = Ember;

export default Route.extend({
	model(params) {
		return RSVP.hash({
			rental: this.get('store').findRecord('rental', params.rental_id),
			reservations: this.store.query('reservation', { rental_id: params.rental_id })
		});
	},

	setupController(controller, model) {
		set(controller, 'rental_detail', model);
	}
});