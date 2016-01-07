Korah = (function() {
  'use strict';
  function toNodes(args) {
    return args.reduce(function(ns, arg) {
      if (arg instanceof Tag)      ns.push(arg.el);
      else if (Array.isArray(arg)) ns = ns.concat(toNodes(arg));
      else if (arg.nodeType)       ns.push(arg);
      else                         ns.push(document.createTextNode(arg));
      return ns;
    }, []);
  };

  function Tag(tag, nodes) {
    var el = this.el = document.createElement(tag);
    toNodes(nodes).forEach(el.appendChild.bind(el));
  };

  Tag.prototype.attrs = function(obj) {
    for (var name in obj)
      this.el.setAttribute(name, obj[name]);
    return this;
  };

  var tags = {};
  var fn = function(fn) {
    return function(data) {
      return fn(tags, data).el;
    };
  };
  fn.Tag = Tag;
  fn.tags = tags;
  fn.register = function(name, fn) {
    tags[name] = fn.bind(null, tags);
  };
  fn.addTag = function(tag) {
    tags[tag] = function() {
      return new Tag(tag, [].slice.call(arguments));
    };
  };
  return fn;
})();
