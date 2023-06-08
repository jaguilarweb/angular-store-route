const { Observable  } = require('rxjs');
const { filter } = require('rxjs/operators');

//Una vez enviado no se puede cancelar
const doSomething = () => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve('valor 3');
    }, 3000)
  });
}

//Principal ventaja observable, permite transmitir muchos datos.
//Una vez enviado si se puede cancelar.
//Puedo ejecutar transformaciones con pipes.
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $')
    }, 5000)
    setTimeout(() => {
      observer.next(null);
    }, 8000)
    setTimeout(() => {
      observer.next('valor 5');
    }, 10000)
  });
}


(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();
