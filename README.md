# Korah.js

Simple microlibrary for a fresh take on declarative DOM
construction and templating, made for client-side Javascript.
Zero string parsing/with-statement hackery involved.

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
