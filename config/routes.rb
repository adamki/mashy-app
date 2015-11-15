Rails.application.routes.draw do
  root 'welcome#index'
  get '/auth/spotify', as: :login
  get '/auth/spotify/callback', to: 'sessions#create'
  get "/logout" => 'sessions#destroy'
  resources :playlists

  namespace :api do
    namespace :v1 do
      resources :playlists, defaults: { format: :json}, only: [:index, :show]
      resources :users, defaults: { format: :json}, only: [:index, :show]
      resources :tracks, defaults: { format: :json}, only: [:index, :show]
    end
  end
end
