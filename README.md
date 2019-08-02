# memo-tempo
memoizer with a simple api for arg-level expiration

## Usage
```bash
npm install memo-tempo --save
```

```javascript
import memo from 'memo-tempo'
```
normal memoization
```javascript
const fib = memo(
    n => n < 2 ? n : fib(n - 1) + fib(n - 2)
)
// values of n memoized indefinitely
```
set a lifetime for memoized values
```javascript
const fact = memo(
    n => n < 2 ? 1 : n * fact(n - 1)
, 1000 * 60)
// values of n memoized for 1 minute
```
each arg can have a different lifetime
```javascript
const map = memo(
    (iteratee, array) => array.map(iteratee)
, 0, 1000 * 60)
// `iteratee` timeout of 0 indicates neverending memoization
// `array` will remain memoized for 1 minute
```
bonus: functions are auto-curried!
```javascript
const mapIds = map(({ id }) => id)
mapIds([
    { id: 1 },
    { id: 2 },
    { id: 3 },
])
//=> [1, 2, 3]
```
