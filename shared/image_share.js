Images = new Mongo.Collection("images");

// setup security on Images Collection
Images.allow({
  insert:function(userId, doc) {
    console.log('testing security on image insert');
    if(Meteor.user()) {
      // force the image to be owned by the user
      doc.createdBy = userId;
      // user is messing around
      if(userId != doc.createdBy) {
        return false;
      } else { // the user is logged in and the image has the correct image id
        return true;
      }
    } else { // user not logged in
      return false;
    }
  },
  remove:function(userId, doc) {
    return true;
  }
});