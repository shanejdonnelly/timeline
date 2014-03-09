// Entries -- server

Meteor.publish("entries", function () {
  return Entries.find(
    {$or: [{"public": true}, {invited: this.userId}, {owner: this.userId}]});
});
