const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageScheme = mongoose.Schema({
   otp: String,
   userId: {type: Schema.Types.ObjectId, ref: 'user'},
   createdDate: {
      type: Date,
      default: () => {
         return new Date();
      }
   }
}, {
   collection : 'message'
});

module.exports = mongoose.model('message', messageScheme);