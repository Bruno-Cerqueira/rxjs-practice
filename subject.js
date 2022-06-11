import { BehaviorSubject, ReplaySubject, Subject, observeOn, asyncScheduler } from 'rxjs'

const subject = new Subject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

// console.clear()

// Behavior //

const behavior = new BehaviorSubject([1]);
const addBehavior = (n) => {
  const value = behavior.value;
  if (value.length > 2) {
    value.shift();
    value.push(n)
  } else {
    value.push(n)
  }
  return value;
}

behavior.next(addBehavior(1))

behavior.subscribe({
  next: (v) => console.log(`behaviorA: ${v}`),
});

behavior.next(1)

behavior.subscribe({
  next: (v) => console.log(`behaviorB: ${v}`),
});

behavior.subscribe({
  next: (v) => console.log(`behaviorC: ${v}`),
});

console.clear();

//Replay //
const replay = new ReplaySubject(3);

replay.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

replay.next(1);
replay.next(2);
replay.next(3);
replay.next(4);

replay.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});



