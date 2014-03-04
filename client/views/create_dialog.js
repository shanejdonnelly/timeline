///////////////////////////////////////////////////////////////////////////////
// Create Party dialog

var openCreateDialog = function () {
  Session.set("createError", null);
  Session.set("showCreateDialog", true);
};

Template.page.showCreateDialog = function () {
  return Session.get("showCreateDialog");
};





Template.createDialog.events({
  'click .save': function (event, template) {
    var title = template.find(".title").value;
    var description = template.find(".description").value;
    var date = new Date();
    var public = ! template.find(".private").checked;


    if (title.length && description.length) {
      var id = createParty({
        title: title,
        date: date,
        description: description, 
        public: public
      });

      Session.set("selected", id);
      Session.set("showCreateDialog", false);
    } else {
      Session.set("createError",
                  "It needs a title and a description, or why bother?");
    }
  },

  'click .cancel': function () {
    Session.set("showCreateDialog", false);
  },

  'click .date': function(e){
    var $this = e.target;
    console.log($this);
      $this.datepicker();
  }

});

Template.createDialog.error = function () {
  return Session.get("createError");
};


