/*eslint-disable*/
var accountSid = process.env.VUE_APP_TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.VUE_APP_TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.VUE_APP_SENDGRID_API_KEY);

// send bulk email
export const sendbulkemail = item => {
  const msg = {
    to: item.addresses,
    from: "crudavid36@gmail.com",
    subject: `${item.subject}`,
    text: `${item.content}`,
    html: `<html><body><div style="font-weight: 500; margin-bottom:10px">${item.title}<div><div>${item.content}</div></body></html>`
  };
  sgMail
  .send(msg)
 
};
// send bulk raw email
// Unfortunately you cant send attachment with Sendgrid
// You will have to use https://digioh.com/sendgrid
export const sendbulkRawemail = item => {
  //
};
// send bulk sms
export const sendbulksms = item => {
  client.messages
    .create({
      body: `${item.content}`,
      from: "+15329398499",
      to: `${item.addresses}`
    })
    .then(message => console.log(message.sid)).catch(Error => { console.log(Error)})
};

// ============================

// sort email addresses
export const sortsenderemail = item => {
  // this will hold our final items
  let array = [];
  // get the email and phone numbers and sort them
  const response = item.split(",");
  // loop through the response and check the validity of each email
  response.forEach(e => {
    let item = checkvalidityofemail(e);
    if (item === true) {
      // if email is valid send to array
      array.push(e.trim());
    }
  });
  // end
  // return array
  return array;
};

// sort phone numbers
export const sortsenderphone = item => {
  // this will hold our final items
  let array = [];
  // get the email and phone numbers and sort them
  const response = item.split(",");
  // loop through the response and check the validity of each email
  response.forEach(e => {
    let item = checkvalidityofphone(e);
    if (item === true) {
      // if email is valid send to array
      array.push(e.trim());
    }
  });
  // end
  // return array
  return array;
};

// This function checks the format of an email
// Those that wont pass will be eliminated
const checkvalidityofemail = item => {
  // eslint-disable-next-line no-useless-escape
  let pattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return pattern.test(item);
};

// This function checks the format of a phone number
// Those that wont pass will be elimited
const checkvalidityofphone = item => {
  // eslint-disable-next-line prettier/prettier
    let pattern = /^\+[1-9]\d{1,14}$/g;
  return pattern.test(item);
};
// ==================================
