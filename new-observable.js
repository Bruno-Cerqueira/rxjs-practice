let subject = () => {
  return { 
    _baseFunctions: [],
    _state: 0,
    _observers: [],
    _takes: 0,
    _limit: false,
    subscribe: function (observer) {
      this._observers.push(observer);
    },
    getState: function () {
      return this._state;
    },
    callSubscribers: function (value) {
      this._state = value;
      for (let i = 0; i < this._observers.length; i++) {
        this.executeBaseFunctions();
        if(this._takes > 0) this._takes--;
        this._observers[i].next(this);
        if(this._takes === 0 && this._limit) this._observers = [];
      }
    },
    pipe: function (...baseFunction) {
      this._baseFunctions.push(...baseFunction);
      return this;
    },
    executeBaseFunctions: function() {
      this._baseFunctions.map(baseFunction => {
        baseFunction(this);
      })
    }
  }
};

// BaseFunctions
const map = (fn) => {
  return function(subject) {
    subject._state = fn(subject.getState())
  }
}

const take = (number) => {
  return function(subject) {
    if(!subject._limit) {
      subject._takes = number;
      subject._limit = true;
    }
  }
}

// SpecificFunctions




// Execute code
let Observer = {
  next: (subject) => {
    let currentValue = subject.getState();
    console.log(currentValue)
  },
};
const stream = subject();

stream.pipe(
  map((data) =>  data / 100),
  map((data) =>  data * 1000),
  take(2)
).subscribe(Observer);

stream.callSubscribers(2);
stream.callSubscribers(2);
stream.callSubscribers(3);



/*take = function(fn) {
   return (number) =>{
    console.log(number)
  }
} */
