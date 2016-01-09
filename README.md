# Korah.js

Sane, lightweight declarative DOM construction.

 - Weighs in at ~0.8kB minified with bindings.
 - Extensible with [bindings](bindings/) for HTML tags.
 - Fully ES5 compliant codebase.
 - No string parsing/hacks.

Works great with [evee.js](https://github.com/eugene-eeo/evee.js).

## Usage

```js
var template = Korah(function(t, data) {
  return t.div(
    t.h1(data.title).attrs({id: 'title'}),
    t.ul(data.features.map(function(text) {
      return t.li(text);
    }))
  );
});
document.body.appendChild(template({
  title: 'Korah',
  features: ['simple', 'brain-dead easy']
}));
```

```html
<div>
  <h1 id='title'></h1>
  <ul>
    <li>simple</li>
    <li>brain-dead easy</li>
  </ul>
</div>
```

Adding your own custom tags:

```js
Korah.register('user', function(t, user) {
  return t.div(
    t.h2('@' + user.username),
    t.p(user.biography),
  ).attrs({'class': 'user'});
});

Korah.addTag('custom_elem');

var template = Korah(function(t, data) {
  return t.div(
    t.custom_elem(),
    t.user(data)
  );
});
```

## Installation

```js
$ bower install eugene-eeo/korah.js
```
