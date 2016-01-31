```
   __                 __
  / /_____  _______ _/ /
 /  '_/ _ \/ __/ _ `/ _ \
/_/\_\\___/_/  \_,_/_//_/.js
```

-----

Sane, lightweight declarative DOM construction.

 - Weighs in at ~0.7kB minified with bindings.
 - Extensible with [bindings](bindings/) for HTML tags.
 - Fully ES5 compliant codebase.
 - No string parsing/hacks.

Works great with [evee.js](https://github.com/eugene-eeo/evee.js).

## Usage

```js
kr.div({id: 'container'}, kr.ul(
  ['one', 'two', 'three'].map(function(text) {
    return kr.li(text);
  })
));
```

Returns

```html
<div id='container'>
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
</div>
```

An exhaustive list of ways to use Korah:

```js
kr('div', {'id': 'one'}, 'text');
kr.div({'id': 'one'}, [
  kr.p([/* just children */]),
  kr.p({/* just attributes */}),
  kr.p('just text'),
  'text',
]);
```

If you want to extend the basic bindings you can do:

```js
kr.addTag('element');

kr.element = function(foo, bar) {
  return kr('element', [
    kr('span', foo),
    kr('span', bar)
  ]);
};
```

## Installation

```js
$ bower install eugene-eeo/korah.js
```
