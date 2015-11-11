Rails.application.routes.draw do
  root 'dashboard#index'

  get '/auth/spotify', as: :login
  get '/auth/spotify/callback', to: 'sessions#create'

  get "/logout" => 'sessions#destroy'
end
