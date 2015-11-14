require 'test_helper'

class Api::V1::PlaylistsControllerTest < ActionController::TestCase
   test "#index" do
     get :index, format: :json
     assert_response :success
   end

   test "#index returns the right number of objects" do
     number_of_playlists = Playlist.count
     get :index, format: :json
     json_response = JSON.parse(response.body)
     assert_equal number_of_playlists, json_response.count
   end

   test "#show returns the right info" do
     playlist = playlists(:one)
     get :show, id: playlist.id, format: :json
     assert_response :success
   end
 end
