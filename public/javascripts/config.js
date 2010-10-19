var config = {
  builds:[
    {
      name:'ArlisWebsite', 
      url:'http://builder.gn-research/job/ArlisWebsite/lastBuild/api/json'
    },{
      name:'Dashboard',
      url:'http://builder.gn-research/job/Dashboard/lastBuild/api/json'
    }, {
      name:'S2 Circuit',
      url:'http://phobos:8080/job/S2%20circuit/lastBuild/api/json'
    }, {
      name:'LibTdt',
      url:'http://phobos:8080/job/LibTdt/lastBuild/api/json'
    }, {
      name:'Eup',
      url:'http://builder.gn-research/job/Eup/lastBuild/api/json'
    }, {
      name:'Eup User Management',
      url:'http://builder.gn-research/job/EUP%20User%20Management/lastBuild/api/json'
    }// , {
    //       name:'SB0 Test',
    //       url:'http://builder.gn-research/job/SB0%20Test/lastBuild/api/json',
    //       sound:false
    //     }, {
    //       name:'Sound Booth 0', 
    //       url:'http://builder.gn-research/job/Sound%20Booth%200/lastBuild/api/json',
    //       sound:false
    //     }, {
    //       name:'Sound Booth 1',
    //       url:'http://builder.gn-research/job/Sound%20Booth%201/lastBuild/api/json',
    //       sound:false
    //     }, {
    //       name:'Sound Booth 2',
    //       url:'http://builder.gn-research/job/Sound%20Booth%202/lastBuild/api/json',
    //       sound:false
    //     }    
  ]
}