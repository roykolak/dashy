function Build(name) {
  var buildElement = $(document.createElement('li')),
      nameElement = $(document.createElement('h3')),
      timeElement = $(document.createElement('p'));

   $(buildElement).addClass('build');
   $(nameElement).addClass('name').text(name);
   $(timeElement).addClass('time');
   $(buildElement).append(nameElement).append(timeElement);
   $('#builds').append(buildElement);
}