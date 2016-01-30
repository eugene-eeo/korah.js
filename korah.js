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
    if (attrs && (
      typeof attrs == 'string'
        || Array.isArray(attrs)
        || attrs.nodeType)) {
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
