var config = {
  title: "Dashy, he's always watching",
  refreshInterval:5000,
  sounds: {
    success:'sounds/success.mp3',
    continuingSuccess:'sounds/continuing_success.mp3',
    building:'sounds/building.mp3',
    failure:'sounds/failure.mp3'
  },
  projects:[
   {
      name:'Android app',
      url:'http://builder/job/android_app/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }
  ],
  pings:[
    {
      name:'Code Server',
      url:'http://builder/job/code_server/lastBuild/api/json?jsonp=?',
      ci:'Hudson'
    }
  ]
};
