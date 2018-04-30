```
   __                 __
  / /_____  _______ _/ /
 /  '_/ _ \/ __/ _ `/ _ \
/_/\_\\___/_/  \_,_/_//_/.js
```

Sane, lightweight (0.8kB minified), declarative and extensively tested DOM construction.
Drop the `korah.js` file into your project, include it in a script tag and you're done.
It exposes a single global, `kr`.

## `kr(tag, attrs, children)`

 - Builds and returns a DOM element with tag = `tag`. `tag` can also be a selector in the form:

   | selector     | result                      |
   |--------------|-----------------------------|
   | `#id`        | `<div id="id">`             |
   | `.klass`     | `<div id="klass">`          |
   | `p#id`       | `<p id="id">`               |
   | `p.klass`    | `<p class="klass">`         |
   | `p.klass#id` | `<p class="klass" id="id">` |
   | `p.k1.k2#id` | `<p class="k1 k2" id="id">` |

 - `attrs` is an object whose keys will be used as attributes and will be added to the
   created element. If `attrs` is to be used as the second argument it needs to be an
   object. Else the `attrs` argument willbe interpreted as `children`. For instance:

   ```js
   kr('p', {"a": "b"}) // => <p a="b">
   kr('p', ["a"])      // => <p>a</p>
   ```

 - `children` can be either a string, a node, or an array of strings / nodes / array of (...).
   If `children` is given, it will be recursively flattened and it's contents are added
   to the element appropriately.

An (almost) exhaustive list of ways to use `kr`:

```js
kr('div')
kr('div.klass', kr('p'))
kr('div.klass', {attr: "something"})
kr('div.klass#id', "text")
kr('#id', {"data-bind": "data"}, [
    [ /* more children */ ],
    kr('span.klass'), // child element
    "text",           // text
]);
```

### Example:

```js
kr('#container',
  kr('ul.wrapper',
    ['one', 'two', 'three'].map(x => kr('li', x))
))
```

generates the following:

```html
<div id='container'>
  <ul class='wrapper'>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
</div>
```
