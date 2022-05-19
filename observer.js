import {
  map,
  Observable,
  of,
  zip,
} from "rxjs";
// https://rxjs.dev/guide/observer

const obs = new Observable((observer) => {
  observer.next("next1");
  observer.next("next2");
}).pipe(
  map((err) => {
    // console.log("dentro map", err);

    // return throwError(() => new Error("error rxjs"));
    throw new Error("errors");
  })
);

// timer(1000, 1000).subscribe(console.log);

const age$ = of(27, 25, 29);
const name$ = of("Foo", "Bar", "Beer").pipe(
  map(() => {
    // return throwError(() => new Error("error rxjs"));
    throw new Error("ERROR");
  })
);
const isDev$ = of(true, true, false);

zip(age$, name$, isDev$)
  .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
  .subscribe(
    (x) => console.log(x),
    (err) => console.log("errs", err)
  );

// obs.subscribe(
//   (response) => {
//     console.log("next", response);
//   },
//   (err) => {
//     console.log("Deu erro");
//   },
//   (comp) => console.log("complete")
// );

// sub.next("add");
// sub.complete();
// sub.error("error");
