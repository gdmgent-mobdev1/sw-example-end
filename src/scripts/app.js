import '../styles/main.css';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import dv from '../images/dv.jpeg';

/**
 * A Constructor Function
 */

/* function MovieCharacter(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = () => `${this.firstName} ${this.lastName}`;
} */

function MovieCharacter() {
}

/**
 * Extend via Prototypes
 */
// eslint-disable-next-line no-extend-native
Array.prototype.hasNumber = function (number) {
  return this.filter((currentNumber) => number === currentNumber).length > 0;
};

window.addEventListener('load', () => {
  // set the image
  document.getElementById('myImage').setAttribute('src', dv);

  /**
   * The Service Worker init
   */

  if ('serviceWorker' in navigator) {
    runtime.register();
  }

  /**
   * The Constructor Function
   */

  // create new movie characters
  // const character1 = new MovieCharacter('Clark', 'Kent');
  // const character2 = new MovieCharacter('Bruce', 'Wayne');
  // console.log(character1);
  // console.log(character2);

  // log out the MovieCharacter Prototype
  // console.log(MovieCharacter.prototype);

  /**
   * Adding properties
   */
  MovieCharacter.prototype.name = 'Forrest';
  console.log(MovieCharacter.prototype.name); // will output "Forrest"

  MovieCharacter.prototype.city = 'Alabama';
  console.log(MovieCharacter.prototype.city); // will output "Alabama"

  console.log(MovieCharacter.prototype);

  /**
   * Adding properties and functions
   */
  MovieCharacter.prototype.firstName = 'Forrest';
  MovieCharacter.prototype.lastName = 'Gump';
  MovieCharacter.prototype.fullName = function () { return `${this.firstName} ${this.lastName}`; };

  // create a new instance
  const runningMan = new MovieCharacter();

  // output the firstName
  console.log(runningMan.fullName()); // will output "Forrest Gump"

  /**
   * Changing Native Behaviour
   */

  // Updating and using prototype of array
  const numbers = [5, 6, 7, 8];
  console.log(numbers.hasNumber(5));
});
