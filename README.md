```
   __                 __
  / /_____  _______ _/ /
 /  '_/ _ \/ __/ _ `/ _ \
/_/\_\\___/_/  \_,_/_//_/.js
```

Sane, lightweight (0.8kB minified), declarative and extensively tested DOM construction,
with syntax similar to hyperscript. Drop the `korah.js` file into your project, include
it in a script tag and you're done. Get off my lawn.

## `kr(tag, ...)`

Builds and returns a DOM element with tag = `tag`. `tag` can also be a selector in the form:

| selector     | result                      |
|--------------|-----------------------------|
| `#id`        | `<div id="id">`             |
| `.klass`     | `<div id="klass">`          |
| `p#id`       | `<p id="id">`               |
| `p.klass`    | `<p class="klass">`         |
| `p.klass#id` | `<p class="klass" id="id">` |
| `p.k1.k2#id` | `<p class="k1 k2" id="id">` |

For every argument onwards from the 1st, if it's an object it's keys will be used
as attributes set on the created element. Else it will be interpreted as children and
added accordingly. Any string / node / array of strings/nodes/array of (...) will be
flattened and added to the element appropriately.

```js
kr('p')                              // => <p>
kr('p', {a: "b"})                    // => <p a="b">
kr('p', "a")                         // => <p>a</p>
kr('p', ["a"])                       // => <p>a</p>
kr('p', {id: "one"}, ["a"])          // => <p id="one">a</p>
kr('p', [kr('b', 'bold'), ' text'])  // => <p><b>bold</b> text</p>
```

More complicated example:

```js
kr('#id', ['a'], 'b', kr('span', 'd'))
// <div id="id">
// a
// b
// <span>d</span>
// </div>
```

### Example:

```js
kr('#container', {'data-bind': 'bound'},
  kr('ul.wrapper',
    ['one', 'two', 'three'].map(x => kr('li', x))
))
```

generates the following:

```html
<div id='container' data-bind='bound'>
  <ul class='wrapper'>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
</div>
```
