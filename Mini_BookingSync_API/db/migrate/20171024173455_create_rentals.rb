class CreateRentals < ActiveRecord::Migration[5.1]
  def change
    create_table :rentals do |t|
      t.string :name
      t.string :address
      t.text :description
      t.string :photo
      t.float :daily_rate

      t.timestamps
    end
  end
end
