///////////////////////////////////////////////////////////////////////////////
// Years header
//
 
Template.page.visible_years = [
     '1989',
     '1990',
     '1991',
     '1992',
     '1993',
     '1994',
     '1995',
     '1996',
     '1997',
     '1998',
     '1999',
     '2000'
];

///////////////////////////////////////////////////////////////////////////////
// Map display

Template.page.events({
  'click .add': function (event, template) {
    if (! Meteor.userId()) // must be logged in to create events
      return;

      Session.set("showCreateDialog", true);
  
  }
});

