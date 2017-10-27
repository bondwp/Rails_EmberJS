json.extract! rental, :id, :name, :address, :description, :photo, :daily_rate, :created_at, :updated_at
json.url rental_url(rental, format: :json)
