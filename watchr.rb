require 'growl'

watch( 'spec/javascripts/.*_spec.js' )  {|md| run }
watch( 'public/javascripts/.*.js' )  {|md| run }

def run
  result = `rake jasmine:headless`
  puts result
  growl result
end

def growl(message)
  time = message.match(/Finished in ([0-9]*\.?[0-9]+) seconds?/)[0]
  examples = message.match(/([0-9]*\.?[0-9]+) examples?/)[0]
  failures = message.match(/([0-9]*\.?[0-9]+) failures?/)[0]
  puts message
  if message.include? '0 failures'
    Growl.notify_ok "#{examples}\n#{time}", :sticky => false, :title => failures
  else
    Growl.notify_error "#{examples}\n#{time}", :sticky => false, :title => failures
  end
end