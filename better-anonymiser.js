const Account = (() => {
  const SEQUENCE_LENGTH = 16;
  const DEFAULT_ERROR_MESSAGE = "Invalid Password";
  let usersData = {};

  function randomChar() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  function anonymise() {
    let sequence = "";

    for (let count = 0; count < SEQUENCE_LENGTH; count += 1) {
      sequence += randomChar();
    }

    return sequence;
  }

  function validPassword(password, user) {
    return usersData[user].password === password;
  }

  function setState(currentDisplayName, newDisplayName) {
    const currentUserData = usersData[currentDisplayName];
    const filteredData = {};
    for (let user in usersData) {
      if (user !== currentDisplayName) {
        filteredData[user] = usersData[user];
      }
    }
  
    usersData = Object.assign(filteredData, { [newDisplayName]: currentUserData});
  }

  function getData(user, prop) {
    return usersData[user][prop];
  }

  return {
    init(email, password, firstName, lastName) {
      this.displayName = anonymise();

      usersData[this.displayName] = {
        email,
        password,
        firstName,
        lastName
      }

      return this;
    },

    firstName(password) {
      if (validPassword(password, this.displayName)) {
        return getData(this.displayName, 'firstName');
      } else {
        return DEFAULT_ERROR_MESSAGE;
      }
    },

    lastName(password) {
      if (validPassword(password, this.displayName)) {
        return getData(this.displayName, 'lastName');
      } else {
        return DEFAULT_ERROR_MESSAGE;
      }
    },

    email(password) {
      if (validPassword(password, this.displayName)) {
        return getData(this.displayName, 'email');
      } else {
        return DEFAULT_ERROR_MESSAGE;
      }
    },

    resetPassword(currentPassword, newPassword) {
      if (validPassword(currentPassword, this.displayName)) {
        usersData[this.displayName].password = newPassword;
        return true;
      } else {
        return DEFAULT_ERROR_MESSAGE;
      }
    },

    reanonymise(password) {
      if (validPassword(password, this.displayName)) {
        let currentDisplayName = this.displayName;

        this.displayName = anonymise();
       setState(currentDisplayName, this.displayName);

        return true;
      } else {
        return DEFAULT_ERROR_MESSAGE;
      }
    }
  }
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymise('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

console.log("has own property ---------------");
console.log(fooBar.hasOwnProperty('firstName')); // true