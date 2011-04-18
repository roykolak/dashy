HudsonResponse = {
  singleCommit:{"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"This is the only commit message","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]},
  multipleCommits:{"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"changed checkbox observer to click","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"},{"date":"2010-12-28T15:34:49.960481Z","msg":"This is the most recent commit message","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]},
  noCommitMessage:{"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]},
  successBuild:{"actions":[{"causes":[{"shortDescription":"Started by an SCM change"}]},{},{},{}],"artifacts":[],"building":false,"description":null,"duration":150457,"fullDisplayName":"ArlisWebsite #188","id":"2010-12-28_11-01-08","keepLog":false,"number":188,"result":"SUCCESS","timestamp":1293555668000,"url":"http://builder.research/job/ArlisWebsite/188/","builtOn":"","changeSet":{"items":[{"date":"2010-12-28T15:34:49.960481Z","msg":"changed checkbox observer to click","paths":[{"editType":"edit","file":"/applications/development/arlis_website/trunk/public/javascripts/application.js"}],"revision":2732,"user":"rkolak"}],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[{"absoluteUrl":"http://builder.research/user/rkolak","fullName":"rkolak"}]},
  failureBuild:{"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userName":"anonymous"}]}],"artifacts":[],"building":false,"description":null,"duration":50000,"fullDisplayName":"eup #32","id":"2011-01-03_11-41-14","keepLog":false,"number":32,"result":"ABORTED","timestamp":1294076474309,"url":"http://builder.research/job/Eup/32/","builtOn":"","changeSet":{"items":[],"kind":null},"culprits":[{"absoluteUrl":"http://builder.research/user/Tom%20Kersten","fullName":"Tom Kersten"},{"absoluteUrl":"http://builder.research/user/Roy%20Kolak","fullName":"Roy Kolak"}]},
  buildingBuild:{"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userName":"anonymous"}]},{},{}],"artifacts":[],"building":true,"description":null,"duration":0,"fullDisplayName":"ArlisWebsite #189","id":"2011-01-06_14-44-58","keepLog":false,"number":189,"result":null,"timestamp":1294346698424,"url":"http://builder.research/job/ArlisWebsite/189/","builtOn":"","changeSet":{"items":[],"kind":"svn","revisions":[{"module":"https://svn.research/applications/development/arlis_website/trunk","revision":2732}]},"culprits":[]}
};

CustomResponse = {
  singleCommit:{
    commits:["This is the only commit message"]
  },
  multipleCommits: {
    commits:["This is the commit message", "This is the most recent commit message"]
  },
  noCommitMessage:{
    commits:[]
  },
  successBuild:{
    status:'success'
  },
  failureBuild:{
    status:'failure',
    duration:50000
  },
  buildingBuild:{
    status:'building'
  }
};
