///////////////////////////////////////////////////////////////////////////////
// Party details sidebar

Template.details.loggedIn = function(){
  return Meteor.userId();
}

Template.details.all_parties = function () {
  return Parties.find({owner:Meteor.userId()});
};

Template.details.public_parties = function () {
  return Parties.find({public:true});
};

Template.details.anyParties = function () {
  return Parties.find().count() > 0;
};

Template.details.creatorName = function () {
  var owner = Meteor.users.findOne(this.owner);
  if (owner._id === Meteor.userId())
    return "me";
  return displayName(owner);
};

Template.details.canRemove = function () {
  return this.owner === Meteor.userId();
};

Template.details.events({
  'click .remove': function () {
    Parties.remove(this._id);
    return false;
  }
});

