class ReservationsController < ApplicationController
  def create_back
    @rental = Rental.find(params[:rental_id])
    @reservation = @rental.reservations.create(params[:reservation])
    redirect_to rental_path(@rental)
  end
  def destroy
    @rental = Rental.find(params[:rental_id])
    @reservation = @rental.reservations.find(params[:id])
    @reservation.destroy
    redirect_to rental_path(@rental)
  end

  def create
    @rental = Rental.find(params[:rental_id])
    @reservation = @rental.reservations.new(reservation_params)

    if @reservation.save
      #redirect_to :action => 'list'
      redirect_to rental_path(@rental)
    else
      @rentals = Rental.all
      render :action => 'new'
    end
  end

  def reservation_params
    params.require(:reservation).permit(:client_email, :start_at, :end_at)
  end


  def list
    @reservations = Reservation.all
  end

  def show
    @reservation = Book.find(params[:id])
  end

  def new
    @reservation = Reservation.new
    @rentals = Rental.all
  end

  def edit
  end

  def update
  end

  def delete
  end
end
