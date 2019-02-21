const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   phoneNumber: Number,
   createdDate: {
      type: Date,
      default: () => {
         return new Date();
      }
   }
}, {
   collection: 'user'
});

module.exports = mongoose.model('user', userSchema);