!function() {
  function normalise(nodes) {
    return nodes.reduce(function(rv, e) {
      return rv.concat(Array.isArray(e)
        ? normalise(e)
        : e.nodeType
          ? [e]
          : [document.createTextNode(e)]);
    }, []);
  }

  function isObject(obj) {
    return {}.toString.call(obj) === '[object Object]'
  }

  function createNode(tag, attrs, children) {
    var node = document.createElement(tag);
    normalise(children).forEach(function(el) {
      node.appendChild(el);
    });
    for (var i in attrs)
      node.setAttribute(i, attrs[i]);
    return node;
  }

  window.kr = function(tag, attrs, children) {
    if (attrs && !isObject(attrs)) {
      children = attrs;
      attrs = {};
    }
    children = children
      ? Array.isArray(children)
        ? children
        : [children]
      : [];
    return createNode(tag, attrs || {}, children);
  };

  kr.addTag = function(tag) {
    kr[tag] = function(attrs, children) {
      return kr(tag, attrs, children);
    };
  }
}();
