require_relative '../test_helper'

class UserLogsInWithTwitterTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Mashy::Application
    stub_omniauth
  end

  test "logging in" do
    visit "/"
    assert_equal 200, page.status_code
    click_link "Sign in with Spotify"
    assert_equal '/', current_path
  end

  def stub_omniauth
    # first, set OmniAuth to run in test mode
    OmniAuth.config.test_mode = true
    # then, provide a set of fake oauth data that
    # omniauth will use when a user tries to authenticate:
    OmniAuth.config.mock_auth[:spotify] = OmniAuth::AuthHash.new({
      :provider => "spotify",
      :uid => "1111111111",
      :info => {
        :id => "1",
        :name => "Claudio Poli",
        :nickname => 'SomeName',
        :display_name => "the klaus",
        :email => "claudio@icorete.ch"
      },
      :credentials => {
        :token => "xxxx",
        :refresh_token => "xxxx"
      },
      :extra => {
        :raw_info => {
          :country => "IT",
          :display_name => "Claudio Poli",
          :email => "claudio@icorete.ch",
          :external_urls => {
            :spotify => "https://open.spotify.com/user/1111111111"
          },
          :href => "https://api.spotify.com/v1/users/1111111111",
          :id => "1111111111",
          :images => [
            {
              "height" => nil,
              "url" => "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/t1.0-1/s320x320/301234_1962753760624_625151598_n.jpg",
              "width" => nil
            }
          ],
          :product => "open",
          :type => "user",
          :uri => "spotify:user:1111111111"
        }
      }
    })
  end
end
