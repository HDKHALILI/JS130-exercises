const Account = {
  init(userEmail, userPassword, userFirstName, userLastName) {
    function randomLetterAndInteger() {
      const alphabets = "abcdefghijklmnopqrstuvwxyz";
      let sequence = "";

      let randomIndex = Math.floor(Math.random() * alphabets.length);
      let randomInteger = Math.floor(Math.random() * 10);
      sequence += `${alphabets[randomIndex]}${randomInteger}`;
    
      return sequence;
    }

    function anonymise() {
      let sequence = "";
      for (let count = 0; count < 8; count += 1) {
        sequence += randomLetterAndInteger();
      }

      return sequence;
    }

    function validPassword(password) {
      return userData.password === password;
    }

    const userData = {
      email: userEmail,
      password: userPassword,
      firstName: userFirstName,
      lastName: userLastName
    }

    this.firstName = function(password) {
      if (validPassword(password)) {
        return userData.firstName;
      } else {
        return "Invalid password";
      }
    }

    this.lastName = function(password) {
      if (validPassword(password)) {
        return userData.lastName;
      } else {
        return "Invalid password";
      }
    }

    this.email = function(password) {
      if (validPassword(password)) {
        return userData.email;
      } else {
        return "Invalid password";
      }
    }

    this.resetPassword = function(currentPassword, newPassword) {
      if (validPassword(currentPassword)) {
        userData.password = newPassword;
        return true;
      } else {
        return "Invalid password";
      }
    }

    this.displayName = anonymise(16);

    this.reanonymise = function(password) {
      if (validPassword(password)) {
        this.displayName = anonymise(16);
        return true;
      } else {
        return "Invalid password";
      }
    }

    return this;
  }

}

console.log(Account.init);

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymise('abc'));                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

console.log("---------------");
let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

console.log("---------------");
console.log(fooBar.hasOwnProperty('firstName')); // true