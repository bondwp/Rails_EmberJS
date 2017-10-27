import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
	model() {
		return this.store.findAll('rental');
	},

	setupController(controller, model) {
		set(controller, 'rentals', model);
	}
});
