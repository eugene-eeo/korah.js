# Korah.js

Simple microlibrary for declarative DOM construction
and templating, made for client-side Javascript.

```js
var template = Korah(function(t, data) {
  return t.div(
    t.h1(data.title),
    t.h2('Features'),
    t.ul(data.content.map(function(text) {
      return t.li(text);
    }))
  ).attrs({'class': 'klass'});
});

template({ title: 'Korah', content: ['simple', 'lightweight'] });
// <div>
//   <h1>Korah</h1>
//   <h2>Features</h2>
//   <ul>
//     <li>Simple</li>
//   </ul>
// </div>
```

Registering your own tags:

```js
Korah.register('user', function(t, user) {
  return t.div(
    t.span('@' + user.username),
    t.p(user.about_me)
  );
});

var template = Korah(function(t, data) {
  return t.user(data.user);
});
```

Missing a tag? File a PR if it's commonly used and you want it
in the library, else register your own:

```js
Korah.addTag('tag-name');
```
