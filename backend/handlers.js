'use strict';

const admin = require('firebase-admin');

require('dotenv').config();



admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: "https://up-next-c62cb.firebaseio.com",
});



const db = admin.database();



const queryDatabase = async (key) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    'value',
    (snapshot) => {
      data = snapshot.val();
    },
    (err) => {
      console.log(err);
    }
  );

  return data;
};

const getUserByEmail = async (email) => {
  const data = (await queryDatabase(`appUsers`)) || {};
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);

  return dataValue || false;

};

const createUser = async (req, res) => {
  const returningUser = (await getUserByEmail(req.body.email));
  console.log(returningUser);
  if (returningUser) {
    res
      .status(200)
      .json({ status: 200, data: req.body, message: 'returning user' });
    return;
  } else {
    const appUsersRef = db.ref('appUsers');
    appUsersRef.push(req.body).then(() => {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: 'new user',
      })
    })
  }
};

const handleUpdateUser = async (req, res) => {

  // const userId = (await getUser(req.body.currentUserId));

  // admin.auth().getUser(uid)
  //   .then(function (userRecord) {
  //     // See the UserRecord reference doc for the contents of userRecord.
  //     console.log('Successfully fetched user data:', userRecord.toJSON());
  //   })
  //   .catch(function (error) {
  //     console.log('Error fetching user data:', error);
  //   });




  const { currentUserId } = req.body;
  const userData = (await getUserByEmail(req.body.email))

  // console.log(currentUserId, "user id");
  // console.log(userData, 'userdata by email');

  // db.ref('appUsers/' + currentUserId).update({
  //   ...userData,
  //   newData: "try again!!!!"

  // });


}

module.exports = {
  createUser,
  getUserByEmail,
  handleUpdateUser,
};
