import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
	isShowingModal: false,
	actions: {
		toggleModal: function() {
			this.toggleProperty('isShowingModal');
		},
		cancelReservation() {
			this.toggleProperty('isShowingModal');
		},
		changeDateAction(){
			var start_at = this.get('startAt');
			var end_at = this.get('endAt');
			if(start_at && end_at){
				var startDate = new Date(start_at);
				var endDate = new Date(end_at);
				if(startDate.getTime() <= endDate.getTime()){
					var model = this.get('rental_detail');
					var daily_rate = model.rental.getProperties('daily_rate').daily_rate;
					console.log(daily_rate);

					var total_price = ( ( endDate.getTime() - startDate.getTime() ) / ( 1000 * 3600 * 24 ) + 1 ) * daily_rate ;
					console.log(total_price);
					this.set('total_price', total_price);
				} else {
					this.set('total_price', '0.00');
				}
			} else {
				this.set('total_price', '0.00');
			}
		},
		submitReservation() {
			var client_email = this.get('client_email');
			var start_at = this.get('startAt');
			var end_at = this.get('endAt');

			if(!client_email || !client_email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")){
				alert("Please enter a valid email address");
			} else if(!start_at){
				alert("Please enter start date.");
			} else if(!end_at){
				alert("Please enter end date");
			} else {
				var startDate = new Date(start_at);
				var endDate = new Date(end_at);
				if(startDate.getTime() > endDate.getTime()){
					alert("Start date cannot be behind end date.");
				} else {
					var model = this.get('rental_detail');
					var reservations = this.get('rental_detail.reservations').toArray();

					var length = reservations.length;

					var isOverlapped = false;
					for(var i = 0; i < length; i++){

						var reservation = reservations[i];

						if(isOverlappedBInA(reservation.getProperties('start_at'), reservation.getProperties('end_at'), start_at, end_at)){
							isOverlapped = true;
							break;
						}
					} 

					if(isOverlapped){
						alert("Your duration is overlapped with others.");
					} else {
						this.toggleProperty('isShowingModal');
						this.set('client_email', '');
						this.set('startAt', '');
						this.set('endAt', '');
						
					
						var reservation_params = JSON.stringify({
							client_email: client_email,
							start_at: start_at,
							end_at: end_at
						});

						var url = "http://localhost:3000/api/addReservation?rental_id=" + model.rental.id + "&" + "reservation_params=" + reservation_params;

						var controller = this;
						Ember.$.ajax({
							url: url,
							type: "GET",
							dataType: "JSON"
						}).then(function(resp){
							if(resp == 0){
							} else {
								console.log(resp);
								var new_reserv = controller.store.createRecord('reservation', resp);
								console.log(new_reserv);
								controller.get('rental_detail.reservations').pushObject(new_reserv._internalModel);
							}
						}).catch(function(error){
							console.log(error);
						});
					}
				}
			}
		}
	}
});

function isOverlappedBInA(startAtA, endAtA, startAtB, endAtB) {
	var startDateA = new Date(startAtA.start_at);
	var endDateA = new Date(endAtA.end_at);
	var startDateB = new Date(startAtB);
	var endDateB = new Date(endAtB);

	var startTimeA = startDateA.getTime();
	var startTimeB = startDateB.getTime();
	var endTimeA = endDateA.getTime();
	var endTimeB = endDateB.getTime();

	if(startTimeA <= startTimeB && startTimeB <= endTimeA){
		return true;
	}

	if(startTimeA <= endTimeB && endTimeB <= endTimeA){
		return true;
	}

	if(startTimeB <= startTimeA && startTimeA <= endTimeB){
		return true;
	}

	if(startTimeB <= endTimeA && endTimeA <= endTimeB){
		return true;
	}

	return false;
}
