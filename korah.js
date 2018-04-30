!function() {
    'use strict';

    var type = {}.toString,
        ARRAY  = '[object Array]',
        OBJECT = '[object Object]';

    function normalise(nodes) {
        nodes = (type.call(nodes) === ARRAY) ? nodes : [nodes];
        return nodes.reduce(function(rv, e) {
            return rv.concat((type.call(e) === ARRAY)
                ? normalise(e)
                : (e.nodeType
                    ? [e]
                    : [document.createTextNode(e)]));
        }, []);
    }

    function createNode(tag, attrs, children) {
        var node = document.createElement(tag);
        children.forEach(node.appendChild.bind(node));
        for (var i in attrs)
            node.setAttribute(i, attrs[i]);
        return node;
    }

    window.kr = function(tag, attrs, children) {
        if (attrs && type.call(attrs) !== OBJECT) {
            children = attrs;
            attrs = {};
        }
        return createNode(
            tag,
            attrs,
            normalise(children || [])
        );
    };

    kr.addTag = function(tag) {
        kr[tag] = function(attrs, children) {
            return kr(tag, attrs, children);
        };
    };
}();
