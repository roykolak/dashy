ssh dashboard@dashboard <<EOT
  cd /var/www/dashboard
  git pull
  touch public/refresh.txt
  sleep 7
  rm public/refresh.txt
EOT
