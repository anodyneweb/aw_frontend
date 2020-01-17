source 'https://rubygems.org'

# git_source(:github) do |repo_name|
#   repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
#   "https://github.com/#{repo_name}.git"
# end

# Ruby
ruby '2.6.3'

group :development do
  gem 'capistrano-rails'
  gem 'capistrano-thin'
  gem 'capistrano-rvm'
end

# Rack middleware for blocking & throttling abusive requests
gem 'rack-attack'
gem 'thin', group: :production