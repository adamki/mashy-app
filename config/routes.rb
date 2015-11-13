Rails.application.routes.draw do
  root 'welcome#index'
  get '/auth/spotify', as: :login
  get '/auth/spotify/callback', to: 'sessions#create'
  get "/logout" => 'sessions#destroy'
  resources :playlists
end
