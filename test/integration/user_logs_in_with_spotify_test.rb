require_relative '../test_helper'

class UserLogsInWithTwitterTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Mashy::Application
    stub_omniauth
  end

  test "logging in" do
    skip
    visit "/"
    click_link "Sign in with Spotify"
    assert page.has_content?('mashy')
  end

  def stub_omniauth
    OmniAuth.config.test_mode = true
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
    })
  end




end
