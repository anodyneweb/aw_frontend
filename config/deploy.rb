# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.11.2'

set :application, 'anodyne-frontend'
set :repo_url, 'git@github.com:anodyneweb/aw_frontend.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/ubuntu/apps/anodyne-frontend'

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

# -------------------------------------------------

set :linked_dirs, %w[node_modules]

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
    end
  end

  task :npm_install do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        unless test "[ -d #{File.join(current_path, 'node_modules')} ]"
          execute :npm, 'install yo'
        end
        execute :npm, 'install'
      end
    end
  end

  task :build do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        execute "ng build --prod"
      end
    end
  end

  after :npm_install, :build
  after :publishing, :restart
  after :published, :npm_install
end
