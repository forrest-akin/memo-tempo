const memo = (f, timeout, ...timeouts) => {
    const mem = Mem (timeout)

    return (arg, ...args) => {
        const key = serialize (arg)

        const memx = mem.has (key)
            ? mem.get (key)
            : mem.set (key) (
                args.length
                ? memo (f.bind (undefined, arg), ...timeouts)
                : f (arg)
            )

        return args.length ? memx (...args) : memx
    }
}

const Mem = (timeout, mem = {}) => ({
    has: has (mem),
    get: get (mem),
    set: withTimeout (set (mem), unmemo (mem), timeout),
})

const has = source => key => source.hasOwnProperty (key)
const get = source => key => source[key]
const set = source => key => value => source[key] = value

const withTimeout = (f, onTimeout, timeout) => x => (
    (timeout && setTimeout (() => onTimeout (x), timeout)),
    f (x)
)

const unmemo = mem => key => delete mem[key]

const or2 = f => g => x => some (apply (x)) (Array.of (f, g))
const some = predicate => array => array.some (predicate)
const apply = x => f => f (x)

const eq = x => y => x === y
const eqFunction = eq ('function')
const eqObject = eq ('object')

const pipe3 = f => g => h => x => h (g (f (x)))
const typeOf = x => typeof x
const not = x => !x

const isPrimitive = pipe3 (typeOf) (or2 (eqFunction) (eqObject)) (not)

const ifThenElse = _if => _then => _else => x => _if (x) ? _then (x) : _else (x)
const identity = x => x
const serialize = ifThenElse (isPrimitive) (identity) (JSON.stringify)

export default memo
