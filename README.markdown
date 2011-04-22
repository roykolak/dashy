# What?

Dashy is a frontend to CI software. It animates, it makes noises, it remembers past build states, it is just a simple webpage, and it gets you new friends.

[Presentation](http://roykolak.github.com/dashy-presentation/)

# Why?

Because CI is boring and monotonous. Dashy is made of the opposite.

# How?

Dashy only supports Hudson at the moment because Hudson is the only CI system in the entire world to support JSONp. (remember Dashy is a dumb webpage frontend)

## Setup

  1. Get code
  2. Drop the '.sample' from public/javascript/config.js.sample
  3. Configure config.js to meet your needs
  4. Serve up public/ in something like Apache
  6. Load it up in a browser
  5. Get some sleep, you look tired

## Configuring

The only code you need to touch is in public/javascripts/config.js

Here are a few tips:

* the ci property in each project should always be 'Hudson' (it's the only system supported at the moment)
* the url property in each project should always point to the jsonp feed of the last build
* the pings array should contain Hudson builds that ping a server and return true or false, therefore follow the same rules above.

Here is a sample config.js file

    var config = {
      title:"Dashy, He's always watching",
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
          url:'http://builder/job/AndroidApp/lastBuild/api/json?jsonp=?',
          ci:'Hudson'
        },{
          name:'iPhone app',
          url:'http://builder/job/iPhoneApp/lastBuild/api/json?jsonp=?',
          ci:'Hudson'
        }
      ],
      pings:[
        {
          name:'Builder',
          url:'http://builder/job/PingBuilder/lastBuild/api/json?jsonp=?',
          ci:'Hudson'
        }, {
          name:'Filestore',
          url:'http://builder/job/PingFilestore/lastBuild/api/json?jsonp=?',
          ci:'Hudson'
        }
      ]
    }

# Trouble? Help out?

Send any feedback you have. Want to help? Fork!

* Email roy.kolak@gmail.com
* Or create an issue
