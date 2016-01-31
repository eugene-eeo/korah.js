!function() {
  'use strict';

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
    normalise(children).forEach(node.appendChild.bind(node));
    for (var i in attrs)
      node.setAttribute(i, attrs[i]);
    return node;
  }

  window.kr = function(tag, attrs, children) {
    if (attrs && {}.toString.call(attrs) !== '[object Object]') {
      children = attrs;
      attrs = {};
    }
    return createNode(tag, attrs, children
      ? Array.isArray(children)
        ? children
        : [children]
      : []);
  };

  kr.addTag = function(tag) {
    kr[tag] = function(attrs, children) {
      return kr(tag, attrs, children);
    };
  }
}();
