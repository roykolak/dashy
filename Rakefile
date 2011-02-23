#!/usr/bin/env ruby

require 'rubygems'
require 'bundler'
Bundler.setup

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

desc "Deploy to dashboard box"
task :deploy do
  system("sh scripts/deploy.sh")
  puts "Deployed!"
end