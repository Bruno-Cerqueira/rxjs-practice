// Iteration Pattern
function iteration(array) {
  let index = array.length - 1;

  return {
    next: () => {
      if (index >= 0) {
        console.log(index);
        return { value: array[index--], done: false };
      } else {
        return { done: true };
      }
    },
  };
}

const it = iteration(["three", "two", "one"]);
console.log(it.next().value);
console.log(it.next().value);
console.log(iteration(["three", "two", "one"]).next().value);
