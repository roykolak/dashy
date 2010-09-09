require 'rubygems'
require 'jazz_money'
require 'yaml'

code = []
specs = []

config = YAML::load_stream(File.open('spec/javascripts/support/jasmine.yml')).documents[0]

config['helpers'].each do |path|
  Dir["#{config['src_dir']}#{path}"].each do |file| 
    code << file
  end
end

config['src_files'].each do |path|
  Dir["#{config['src_dir']}#{path}"].each do |file| 
    code << file
  end
end

config['spec_files'].each do |path|
  Dir["#{config['spec_dir']}#{path}"].each do |file| 
    specs << file
  end
end


JazzMoney::Runner.new(code, specs).call