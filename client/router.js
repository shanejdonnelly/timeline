Router.map(function () {

  this.route('user', {
    path: '/user/:user_name',
    template: 'page'
  });

  this.route('/', {
    template: 'home'
  });

});


