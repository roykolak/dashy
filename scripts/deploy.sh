scp -r public/* dashboard.research@research:/opt/research_data/websites/dashboard.research/website
ssh dashboard.research@research <<EOT
  cd /opt/research_data/websites/dashboard.research/website
  touch refresh.txt
  sleep 7
  rm refresh.txt
EOT
