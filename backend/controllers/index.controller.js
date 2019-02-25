const user = require('../models/user.model');
const message = require('../models/message.model');
const Nexmo = require('nexmo');
// Twilio Credentials
const accountSid = 'AC448d5352005a3845e03ca002c4d98cc4';
const authToken = '52dfb8360bf1b20ebc4ab2dd0ceb34b8';

const SendOtp = require('sendotp');
const sendOtp = new SendOtp('264037ATV7kXc15c6e2d35');

exports.createContact = (req, res, next) => {
   console.log(req.body);
   try {
      let contact = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         phoneNumber: req.body.phoneNumber
      }
      console.log(contact);
      user(contact).save()
         .then(result => {
            res.json({
               status: 200,
               message: 'success',
               data: result
           })
         })
         .catch(err => {
            res.json({
               status: 403,
               message: 'Error',
               data: err
           })
         })

   } catch(exception) {
      // return an error message describing the reason.
      throw Error("Error while getting data");
  }
}

exports.getAllContacts = (req, res, next) => {
   try {
      user.find()
         .then(result => {
            res.json({
               status: 200,
               message: 'success',
               data: result
           })
         })
         .catch(err => {
            res.json({
               status: 403,
               message: 'Error',
               data: err
           })
         })

   } catch(exception) {
      // return an error message describing the reason.
      throw Error("Error while getting data");
  }
}

exports.getOneContact = (req, res, next) => {
   try {
      user.findById(req.params.id)
         .then(result => {
            res.json({
               status: 200,
               message: 'success',
               data: result
           })
         })
         .catch(err => {
            res.json({
               status: 403,
               message: 'Error',
               data: err
           })
         })

   } catch(exception) {
      // return an error message describing the reason.
      throw Error("Error while getting data");
  }
}

exports.sendMessage = function (req, res, next) {
   try {
      const reqBody = req.body.text;
      const bodyArr = reqBody.split(" ");
      const otp = bodyArr[bodyArr.length-1];

      const obj = {
         otp: otp,
         userId: req.body.id
      }

      message(obj).save()
         .then(result => {
            user.findById(req.body.id)
               .then(result => {
                  sendOtp.send(result.phoneNumber, "PRIIND", otp, function (error, data) {
                     console.log(data);
               }).catch(err => {
                  res.json({
                     status: 403,
                     message: 'Error',
                     data: err
                 })
               });
            
             });
            res.json({
               status: 200,
               message: 'success',
               data: result
           })
         })
         .catch(err => {
            res.json({
               status: 403,
               message: 'Error',
               data: err
           })
         })
      // const nexmo = new Nexmo({
      //    apiKey: 'd53fa303',
      //    apiSecret: 'ndx7j4YyCntRGRBh'
      //  });

      //  const from1 = 'Kisan';
      //  const to = '7876877477';
      //  const text = 'A text message sent using the Nexmo SMS API';
      //  console.log('hios')
      //  res.send('hiii')
      //  nexmo.message.sendSms(
      //    from1, to, text,
      //      (err, responseData) => {
      //        if (err) {
      //          console.log('Error',err);
      //        } else {
      //          console.log('Response',responseData);
      //        }
      //      }
      //   );

      // require the Twilio module and create a REST client
      // const client = require('twilio')(accountSid, authToken);

      // client.messages.create(
      // {
      //    to: '+919714474767',
      //    from: '+13234981790',
      //    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      // },
      // (err, message) => {
      //    console.log(message);
      // }
      // );
        
    } catch (exception) {
        // return an error message describing the reason.
        throw Error("Error while getting data");
    }
  
}

exports.getMessageDetails = (req, res, next) => {
   try {
      message.find().populate('userId')
         .then(result => {
            res.json({
               status: 200,
               message: 'success',
               data: result
           })
         })
         .catch(err => {
            res.json({
               status: 403,
               message: 'Error',
               data: err
           })
         })

   } catch(exception) {
      // return an error message describing the reason.
      throw Error("Error while getting data");
  }
}



