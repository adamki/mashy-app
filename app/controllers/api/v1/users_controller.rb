class Api::V1::UsersController < ApplicationController
  respond_to :json

  def index
    user = User.all
    respond_with user
  end

  def show
    respond_with User.find_by(id: params[:id])
  end
end
