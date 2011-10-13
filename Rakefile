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
task :seed do
  content = ''
  File.open('public/index.html', 'r') do |file|
    file.each do |line|
      content += line
    end
  end

  fixtures = '';
  Dir["spec/javascripts/fixtures/*.html"].each do |file_name|
    File.open(file_name, 'r') do |file|
      file.each do |line|
        fixtures += "    #{line}"
      end
      fixtures += "\n"
    end
  end
  File.open('public/index.html', 'w') {|f| f.write(content.gsub(/<!-- Templates Start -->(.*)<!-- Templates End -->/m, "<!-- Templates Start -->\n\n\n#{fixtures}\n    <!-- Templates End -->"))}
end
