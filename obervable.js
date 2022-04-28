import { Observable, of } from "rxjs";

// Observable pattern

let Subject = {
  _state: 0,
  _observers: [],
  add: function (observer) {
    this._observers.push(observer);
  },
  getState: function () {
    return this._state;
  },
  setState: function (value) {
    this._state = value;
    for (let i = 0; i < this._observers.length; i++) {
      this._observers[i].signal(this, this._observers[i].params);
    }
  },
  manipulateStateFromPipe: function (fn) {
    this._state = fn.getOutsideValue(this);
  },
  pipe: function (fn) {
    this.manipulateStateFromPipe(fn);
    return this;
  },
};

let DuplicateObserver = {
  getOutsideValue: (subject) => {
    return subject.getState() * 2;
  },
  signal: (subject, value) => {
    let currentValue = subject.getState() * value;
    console.log(currentValue);
  },
};

let Observer2 = {
  signal: (subject) => {
    let currentValue = subject.getState();
    console.log(currentValue);
  },
};

let pipe = function (fn) {
  fn.manipulateStateFromPipe();
  return Subject;
};

const pipe2 = function (...funs) {
  return function (number) {
    let result = number;
    for (let fun of funs) {
      result = fun(result);
    }

    return result;
  };
};

const som1 = (number) => number + 1;
const som2 = (number) => number + 2;
const som3 = (number) => number + 3;

const comp = pipe2(som1, som2, som3);

console.log("comp", comp(0));

Subject.add(Observer2);
Subject.setState(2);
console.log(Subject.pipe(DuplicateObserver).getState());

// Observable Rxjs

const obs = new Observable((s) => {
  s.next(1);
});
/* obs.subscribe((data) => {
  console.log(data);
}); */

/* \/ \/ Augusto playground \/ \/ */

const ONE_SECOND = 1000;
const obs2 = () => {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next("First observer");
    }, ONE_SECOND * 3);

    setTimeout(() => {
      observer.next("Second observable");
    }, ONE_SECOND);

    setTimeout(() => {
      observer.next("Third observable");
    }, ONE_SECOND * 5);
  });
};

/* obs2().subscribe((result) => {
  console.log(result);
});
 */
