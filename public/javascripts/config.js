var config = {
  people:[
    '@roybot5000', 
    '@tomkersten', 
    '@paulsexton'
   ],
  builds:[
    {
      name:'ArlisWebsite', 
      url:'http://builder.gn-research/job/ArlisWebsite/lastBuild/api/json',
      sound:true
    },{
      name:'Dashboard',
      url:'http://builder.gn-research/job/Dashboard/lastBuild/api/json',
      sound:true
    }, {
      name:'S2 Circuit',
      url:'http://phobos:8080/job/S2%20circuit/lastBuild/api/json',
      sound:true
    }, {
      name:'LibTdt',
      url:'http://phobos:8080/job/LibTdt/lastBuild/api/json',
      sound:true
    }, {
      name:'Eup',
      url:'http://builder.gn-research/job/Eup/lastBuild/api/json',
      sound:true
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