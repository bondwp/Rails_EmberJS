Rails.application.routes.draw do

  resources :admins
  resources :rentals do
    resources :reservations
  end
  get 'home/index'
  root :to => "home#index"

  get 'api/',to: 'apibooking#getRentalAll'
  get 'api/rentals',to: 'apibooking#getRentalAll'
  get 'api/rentals/:id',to: 'apibooking#getRental'
  get 'api/index/:id', to: 'apibooking#index'
  get 'api/delRental/:id', to: 'apibooking#delRental'
  match 'api/addRental', to: 'apibooking#addRental', via: [:get, :post] #:rental_params

  get 'api/:rental_id/delReservation/:reserv_id',to: 'apibooking#delReservation'
  get 'api/reservations',to: 'apibooking#getReservationsAll'
  get 'api/reservations/:rental_id',to: 'apibooking#getReservations'
  
  get 'api/addReservation', to: 'apibooking#addReservation'
  #match 'api/addReservation', to: 'apibooking#addReservation', via: [:get, :post] #:reservation_params,:rental_id

  match 'api/getAdmins' => 'apibooking#getAdmins', via: [:get, :post]
  match 'api/checkAdmin' => 'apibooking#checkAdmin', via: [:get, :post]  #:email , :password

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
