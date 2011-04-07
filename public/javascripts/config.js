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
      name:'Android App',
      url:'http://path/to/project/on/ci/for/json/api/',
      ci:'hudson'
    }, {
      name:'Webapp',
      url:'http://path/to/project/on/ci/for/json/api/',
      ci:'hudson'
    }, {
      name:'iPhone app',
      url:'http://path/to/project/on/ci/for/json/api/',
      ci:'hudson'
    }, {
      name:'Desktop app',
      url:'http://path/to/project/on/ci/for/json/api/',
      ci:'hudson'
    }
  ],
  pings:[]
}
