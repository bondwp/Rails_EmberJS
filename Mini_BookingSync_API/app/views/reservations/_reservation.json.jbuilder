json.extract! reservation, :id, :client_email, :start_at, :end_at, :rental_id, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
