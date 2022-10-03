/**
    * @description      : 
    * @author           : ספיר
    * @group            : 
    * @created          : 09/09/2022 - 16:47:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/09/2022
    * - Author          : ספיר
    * - Modification    : 
**/
const express = require('express');
const app = express();
const port = 3000;
const admin = require('firebase-admin');

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL:  "********************************"
  });
  
const database = admin.firestore();
const usersCollection = database.collection('users');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('index');
});

app.post('/add', (req, res) => {
    const user = usersCollection.doc("user1");
    user.set({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age
    }, {merge: true})
    .then(() => {
        console.log('User has been added successfully !');
    })
    .catch(error => {
        console.error(error);
    })
});

app.put('/update', (req, res) => {
    usersCollection.doc(req.body.user_id).update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age
    });
  });

app.delete('/remove', (req, res) => {
    usersCollection.doc(req.body.user_id).delete();
});


app.post('/data', (req, res) => {
    // Get all data from usersCollection
    usersCollection.get()
    .then(snapshot => {
      snapshot.forEach(user => {
        console.log(user.id + ' => ', user.data());
      });
    })
    .catch(error => {
      console.error(error);
    });
  });
/*
app.post('/data', (req, res) => {
    // Get data of a specific document
    usersCollection.doc('user').get()
    .then(user => {
      console.log(user.id + ' => ', user.data());
    })
    .catch(error => {
      console.error(error);
    });
  });

// Database Querying
  app.post('/data', (req, res) => {
    const query = usersCollection.where('first_name', '==', 'han');
    query.get()
    .then(snapshot => {
      snapshot.forEach(user => {
        console.log(user.id + ' => ', user.data());
      });
    })
    .catch(error => {
      console.error(error);
    });
  });


app.post('/data', (req, res) => {
    const query = usersCollection.where('age', '>=', 12).where('age', '<', '40');
    query.get()
    .then(snapshot => {
      snapshot.forEach(user => {
        console.log(user.id + ' => ', user.data());
      });
    })
    .catch(error => {
      console.error(error);
    });
  });
*/

usersCollection.where('age', '==', 12).onSnapshot(snapshot => {
    snapshot.forEach(user => {
      console.log('Current data: ', user.data());
    }, error => {
      console.log(error);
    });
  });

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});

