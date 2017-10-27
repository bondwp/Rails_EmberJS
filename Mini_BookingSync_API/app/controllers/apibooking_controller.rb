class ApibookingController < ApplicationController
=begin
  protect_from_forgery with: :null_session

  before_action :destroy_session

  def destroy_session
    request.session_options[:skip] = true
  end
=end

=begin
  def show
    rental = Rental.find(params[:id])

    render(json: RentalSerializer.new(rental).to_json)
  end
=end
  def getRental
    @rental = Rental.find(params[:id])
    render json:@rental
  end

  def getRentalAll
    @rental = Rental.all
    render json:@rental
  end

  def index
    id = [params[:id]]
    @Rentals = id
    render json:@Rentals
  end

  def addRental
    @rental = Rental.new(params[:rental_params])

    respond_to do |format|
      if @rental.save
        format.html { redirect_to @rental, notice: 'Rental was successfully created.' }
        format.json { render :show, status: :created, location: @rental }
      else
        format.html { render :new }
        format.json { render json: @rental.errors, status: :unprocessable_entity }
      end
    end
  end

  def delRental
    @rental = Rental.find(params[:rental_id])
    @rental.delete
  end

  def addReservation
    @rental = Rental.find(params[:rental_id])
    #@reservation = @rental.reservations.new(params[:reservation_params])


    @reservation_params = ActiveSupport::JSON.decode(params[:reservation_params])
    @client_email = @reservation_params["client_email"]
    @start_at = @reservation_params["start_at"]
    @end_at = @reservation_params["end_at"]
    @reservation = @rental.reservations.new(:client_email => @client_email, :start_at => @start_at, :end_at => @end_at)

    if @reservation.save
      render json:@reservation
    else
      render json:0
    end
  end

  def getReservationsAll
    if params[:rental_id].present?
      @rental = Rental.find(params[:rental_id])
      render json:@rental.reservations
    else 
      render json:Reservation.all
    end
  end

  def getReservations
    @rental = Rental.find(params[:rental_id])
    render json:@rental.reservations
  end

  def delReservation
    @rental = Rental.find(params[:rental_id])
    @rental.reservations.delete(params[:reserv_id])
  end

  def getAdmins
    @admins = Admin.all
    render json:@admins
  end

  def checkAdmin
    if Admin.exists?(email: params[:email],password: params[:password])
      @admin = 1
      render json:@admin
    else
      @admin = 0
      render json:@admin
    end
  end
end