#!/usr/bin/env ruby

require 'rubygems'
require 'bundler'
Bundler.setup

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

namespace :jasmine do
  desc "Run specs via commandline"
  task :headless do
    system("ruby spec/javascripts/support/jazz_money_runner.rb")
  end
end

desc "Deploy to dashboard box"
task :deploy do
  system("sh deploy.sh")
  puts "Deployed!"
end