Rails.application.routes.draw do
  root 'dashboard#index'

  get '/auth/twitter', as: :login
  get '/auth/twitter/callback' => 'sessions#create'
  get "/logout" => 'sessions#destroy'
end
