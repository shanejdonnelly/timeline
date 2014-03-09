///////////////////////////////////////////////////////////////////////////////
// Party details sidebar

Template.details.loggedIn = function(){
  return Meteor.userId();
}

Template.details.all_entries = function () {
  return Entries.find({owner:Meteor.userId()});
};

Template.details.public_entries = function () {
  return Entries.find({public:true});
};

Template.details.anyEntries = function () {
  return Entries.find().count() > 0;
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
    Entries.remove(this._id);
    return false;
  }
});

