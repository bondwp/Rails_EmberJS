class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.string :client_email
      t.date :start_at
      t.date :end_at
      t.references :rental, foreign_key: true

      t.timestamps
    end
  end
end
