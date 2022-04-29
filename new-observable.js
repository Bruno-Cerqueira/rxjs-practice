let Subject = {
  _baseFunctions: [],
  _state: 0,
  _observers: [],
  subscribe: function (observer) {
    this._observers.push(observer);
  },
  getState: function () {
    return this._state;
  },
  callSubscribers: function (value) {
    this._state = value;
    for (let i = 0; i < this._observers.length; i++) {
      this._baseFunctions[0](this)
      this._observers[i].next(this);
    }
  },
  pipe: function (baseFunction) {
    this._baseFunctions.push(baseFunction);
    return this;
  },
};

// BaseFunctions
const map = (fn) => {
  return function(subject) {
    /* console.log(value) */
    subject._state = fn(subject.getState())
  }
}

// SpecificFunctions
//
let Observer = {
  next: (subject) => {
    let currentValue = subject.getState();
    console.log(currentValue)
  },
};

Subject.pipe(map((data) => {
  return data / 100;
})).subscribe(Observer)

Subject.callSubscribers(2);

/*take = function(fn) {
   return (number) =>{
    console.log(number)
  }
} */
