import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		payload = { reservations: payload };

		return this._super(store, primaryModelClass, payload, id, requestType);
	},
	normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
		payload.reservations.rental = payload.reservations.rental_id;
		delete payload.reservations.rental_id;
		return this._super(store, primaryModelClass, payload, id, requestType);
	},

	normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
		payload.reservations.forEach((reservation) => {
			reservation.rental = reservation.rental_id;
			delete reservation.rental_id;
		});
		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});
