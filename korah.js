!function() {
    'use strict';

    var type = {}.toString,
        ARRAY  = '[object Array]',
        OBJECT = '[object Object]';

    function find_all(regexp, text) {
        var matches = [];
        var match;
        while ((match = regexp.exec(text)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    }

    function parseSelector(selector) {
        var tagName = selector.split(/\.|#/, 1)[0] || 'div';
        var classes = find_all(/\.([\w-]+)/g, selector);
        var id = find_all(/#([\w-]+)/g, selector);
        return {
            tagName: tagName,
            classes: classes,
            id: (id.length > 0) ? id[0] : null,
        };
    }

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
        var info = parseSelector(tag);
        var el = createNode(info.tagName, attrs, normalise(children || []));
        if (info.id) {
            el.id = info.id;
        }
        for (var i = 0; i < info.classes.length; i++) {
            el.classList.add(info.classes[i]);
        }
        return el;
    };
}();
