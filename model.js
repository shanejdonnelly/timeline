//  Timeline entries -- data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Timeline

/*
  Each entry is represented by a document in the entries collection:
    owner: user id 
    date: Date
    title, description: String
    public: Boolean


*/
Entries = new Meteor.Collection("entries");

Entries.allow({
  insert: function (userId, entry) {
    return false; // no cowboy inserts -- use createentry method
  },
  update: function (userId, entry, fields, modifier) {
    if (userId !== entry.owner)
      return false; // not the owner

    var allowed = ["title", "description"];
    if (_.difference(fields, allowed).length)
      return false; // tried to write to forbidden field

    // A good improvement would be to validate the type of the new
    // value of the field (and if a string, the length.) In the
    // future Meteor will have a schema system to makes that easier.
    return true;
  },
  remove: function (userId, entry) {
    // You can only remove parties that you created and nobody is going to.
    return entry.owner === userId;
  }
});

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});

createEntry = function (options) {
  var id = Random.id();
  Meteor.call('createEntry', _.extend({ _id: id }, options));
  return id;
};

Meteor.methods({
  // options should include: title, description, public
  createEntry: function (options) {
    check(options, {
      title: NonEmptyString,
      description: NonEmptyString, 
      date: Date,
      public: Match.Optional(Boolean),
      _id: Match.Optional(NonEmptyString)
    });

    if (options.title.length > 100)
      throw new Meteor.Error(413, "Title too long");
    if (options.description.length > 1000)
      throw new Meteor.Error(413, "Description too long");
    if (! this.userId)
      throw new Meteor.Error(403, "You must be logged in");

    var id = options._id || Random.id();
    Entries.insert({
      _id: id,
      owner: this.userId, 
      title: options.title,
      date: options.date,
      description: options.description,
      public: !! options.public
    });
    return id;
  }
});

///////////////////////////////////////////////////////////////////////////////
// Users

displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};
