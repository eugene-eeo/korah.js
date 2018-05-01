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
        return nodes.reduce(function(rv, e) {
            return rv.concat((type.call(e) === ARRAY)
                ? normalise(e)
                : (e.nodeType
                    ? [e]
                    : [document.createTextNode(e)]));
        }, []);
    }

    function createNode(selector, attrs, children) {
        var info = parseSelector(selector);
        if (info.id) {
            attrs.id = info.id;
        }
        var node = document.createElement(info.tagName);
        for (var i = 0; i < children.length; i++) {
            node.appendChild(children[i]);
        }
        for (var k in attrs) {
            node.setAttribute(k, attrs[k]);
        }
        for (var i = 0; i < info.classes.length; i++) {
            node.classList.add(info.classes[i]);
        }
        return node;
    }

    window.kr = function(selector) {
        var attrs = {};
        var children = [];
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (type.call(o) === OBJECT) {
                for (var k in o) attrs[k] = o[k];
                continue;
            }
            children.push(o);
        }
        return createNode(selector, attrs, normalise(children));
    };
}();
