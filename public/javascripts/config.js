var config = {
  title: "Dashy, he's always watching",
  refreshInterval:5000,
  sounds: {
    success:'sounds/success.mp3',
    building:'sounds/building.mp3',
    failure:'sounds/failure.mp3'
  },
  projects:[
    {
      name:'ArlisWebsite',
      url:'http://builder.research/job/ArlisWebsite/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'S2 Circuit',
      url:'http://usglvdt088:8080/job/S2%20circuit/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'ArlisNet',
      url:'http://usglvdt088:8080/job/Arlis.Net/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'LibTdt',
      url:'http://usglvdt088:8080/job/LibTdt/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'CRTools',
      url:'http://usglvdt088:8080/job/CRTools/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'Eup',
      // url:'http://builder.research/job/Eup/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'Dispenser',
      // url:'http://builder.research/job/Dispenser/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }
  ],
  pings:[
    {
      name:'Phobos',
      url:'http://builder.research/job/Ping%20Phobos/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'Hermes',
      url:'http://builder.research/job/Ping%20Hermes/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'SB 0',
      url:'http://builder.research/job/Ping%20Sound%20Booth%200/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'SB 1',
      url:'http://builder.research/job/Ping%20Sound%20Booth%201/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }, {
      name:'SB 2',
      url:'http://builder.research/job/Ping%20Sound%20Booth%202/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }
  ]
}