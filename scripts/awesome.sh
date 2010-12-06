ssh -t dashboard@dashboard <<EOT
  cd /var/www/dashboard
  touch public/awesome.txt
  sleep 7
  rm public/awesome.txt
EOT