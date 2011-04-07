var config = {
  title:"Dashy, he's always watching",
  refreshInterval:5000,
  sounds: {
    continuingSuccess:'sounds/continuing_success.mp3',
    success:'sounds/success.mp3',
    building:'sounds/building.mp3',
    failure:'sounds/failure.mp3'
  },
  projects:[
    {
      name:'Android app',
      url:'http://path/to/project/on/ci/for/json/api/',
      ci:'Hudson'
    }
    // Add more...
  ],
  pings:[
    {
      name:'Name of server',
      url:'http://path/to/pinging/project/on/ci/for/json/api/',
      ci:'Hudson'
    }
    // Add more...
  ]
}
