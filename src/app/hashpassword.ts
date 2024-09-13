
const bcrypt = require('bcrypt');
const myPlaintextPassword = '...';
const saltRounds = 10;
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    console.log(hash)
});