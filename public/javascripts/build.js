function Build(name) {
  var buildElement = $(document.createElement('li')),
      nameElement = $(document.createElement('h3')),
      timeElement = $(document.createElement('p')),
      clearingElement = $(document.createElement('div'));

   $(buildElement).addClass('build');
   $(nameElement).addClass('name').text(name);
   $(timeElement).addClass('time');
   $(clearingElement).addClass('clear');
   $(buildElement).append(nameElement).append(timeElement).append(clearingElement);
   $('#builds').append(buildElement);
}