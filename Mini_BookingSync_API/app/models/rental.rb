class Rental < ApplicationRecord
  validates :name,  :presence => true
  validates :address, :presence => true,
            :length => { :minimum => 5 }

  has_many :reservations, :dependent => :destroy
end
