scp -r public/* rkolak@research:/srv/www/htdocs/dashboard
ssh rkolak@research <<EOT
  cd /srv/www/htdocs/dashboard
  touch refresh.txt
  sleep 7
  rm refresh.txt
EOT
