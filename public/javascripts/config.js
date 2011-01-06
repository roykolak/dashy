var config = {
  projects:[
    {
      name:'ArlisWebsite',
      url:'http://builder.research/job/ArlisWebsite/lastBuild/api/json',
      ci:'Hudson'
    },{
      name:'Dashboard',
      url:'http://builder.research/job/Dashboard/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'S2 Circuit',
      url:'http://phobos:8080/job/S2%20circuit/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'LibTdt',
      url:'http://phobos:8080/job/LibTdt/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'CRTools',
      url:'http://phobos:8080/job/CRTools/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'Eup',
      url:'http://builder.research/job/Eup/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'Dispenser',
      url:'http://builder.research/job/Dispenser/lastBuild/api/json',
      ci:'Hudson'
    }
  ],
  pings:[
    {
      name:'Phobos',
      url:'http://builder.research/job/Ping%20Phobos/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'Hermes',
      url:'http://builder.research/job/Ping%20Hermes/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'SB 0',
      url:'http://builder.research/job/Ping%20Sound%20Booth%200/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'SB 1',
      url:'http://builder.research/job/Ping%20Sound%20Booth%201/lastBuild/api/json',
      ci:'Hudson'
    }, {
      name:'SB 2',
      url:'http://builder.research/job/Ping%20Sound%20Booth%202/lastBuild/api/json',
      ci:'Hudson'
    }
  ]
}