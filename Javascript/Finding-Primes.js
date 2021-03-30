function getPrimeHasar(num) {
  let primeList = [];

  // base case
  if (num == 2) {
    primeList.push(2);
    return primeList;
  }

  // recursion
  if (!primeList.length)
    primeList = getPrimeHasar(num - 1);

  let isPrime = true;
  primeList.forEach((prime) => {
    if (num % prime == 0)
      isPrime = false;
  });

  if (isPrime)
    primeList.push(num);

  return primeList;
}

function getPrimesInRange(lower, upper) {
  if (upper < lower) {
    return console.error("the first argument has to be smaller than the second");
  }

  let primeListFound = [];
  let sqrtUsed = 0;
  let sqrtNew = 0;
  for (let num = upper; num >= lower; num--) {
    absNum = Math.abs(num);

    if (!num || absNum == 1)
      continue;

    // if num is divisible by all primes smaller than its sqrt then it's prime
    // [optimization] if new sqrt is smaller than old, then there is no need to update prime list again
    sqrtNew = Math.sqrt(absNum);
    if (sqrtNew > sqrtUsed) {
      checkingPrimes = getPrimeHasar(Math.floor(sqrtNew));
      sqrtUsed = sqrtNew;
    }

    isPrime = true;
    checkingPrimes.forEach((prime) => {
      if (num % prime == 0 && num != prime)
        isPrime = false;
    });

    if (isPrime)
      primeListFound.push(num);
  }
  return primeListFound.reverse();
}

function getPrimeEratosthenes(value) {
    let primes = [];
    for(let i = 2; i < value; i++) {
        primes[i] = true;
    }
    let limit = Math.sqrt(value);
    for(let i = 2; i < limit; i++) {
        if(primes[i] === true) {
            for(let j = i * i; j < value; j += i) {
                primes[j] = false;
            }
        }
    }

    let primeList = [];
    primes.forEach((isPrime, i) => {
      if(isPrime)
        primeList.push(i);
    });
    return primeList;
}



// demo
const t0 = performance.now();
console.log(getPrimesInRange(0,10000000));
const t1 = performance.now();
console.log(t1 - t0);

const t2 = performance.now();
console.log(getPrimeHasar(1000));
const t3 = performance.now();
console.log(t3 - t2);

const t4 = performance.now();
console.log(getPrimeEratosthenes(10000000));
const t5 = performance.now();
console.log(t5 - t4);
