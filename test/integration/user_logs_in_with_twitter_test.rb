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
    assert_equal "/", current_path
    assert_equal 200, page.status_code
  end

  def stub_omniauth
    # first, set OmniAuth to run in test mode
    OmniAuth.config.test_mode = true
    # then, provide a set of fake oauth data that
    # omniauth will use when a user tries to authenticate:
    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      uid: nil,
      provider: "spotify",
      credentials: {
        refresh_token: "2ffddso30345",
        token: "1234432048u32tfdsa5"
      },
      info: {
        display_name: "Adam Ki Jensen",
        email: "adajensen@gmail.com",
        id: "124295125"
      }
    })
  end
end
