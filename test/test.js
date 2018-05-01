/*jshint esversion: 6 */

describe('kr', function() {
    var selectors = [
        // test the selector parsing
        ['div', x => x.matches('div')],
        ['#id', x => x.matches('div#id')],
        ['.klass', x => x.matches('div.klass')],
        ['p#id', x => x.matches('p#id')],
        ['p#id.klass', x => x.matches('p.klass#id')],
        ['p.klass#id', x => x.matches('p.klass#id')],
        ['p.klass1.klass2#id', x => x.matches('p.klass1.klass2#id')],
    ];

    var children = [
        // check that normalisation of the child nodes works
        [['text'], x => x.textContent === 'text'],
        [[[['text']]], x => x.textContent === 'text'],
        [[kr('#ok')], x => x.children[0].matches('div#ok')],
        [[kr('.one'), kr('.two')], x => (x.children[0].matches('div.one') && x.children[1].matches('div.two'))],
        [['text', kr('#ok')], x => x.textContent === 'text' && x.children[0].matches('div#ok')],
    ];

    var attrs = [
        // check that attributes are added
        [{a: 1, b: 2, c: "cee"}, x => x.matches('[a="1"][b="2"][c=cee]')],
    ];

    var cases = [];
    selectors.forEach(([x, t1]) => {
        // test kr(x)
        cases.push([[x], t1]);

        children.forEach(([c, t2]) => {
            // test kr(x, c)
            cases.push([ [x].concat(c), e => t1(e) && t2(e) ]);
            attrs.forEach(([a, t3]) => {
                // test kr(x, a)
                cases.push([ [x, a], e => t1(e) && t3(e) ]);
                // test kr(x, a, c)
                cases.push([ [x, a].concat(c), e => t1(e) && t2(e) && t3(e) ]);
            });
        });
    });

    var i = 0;
    cases.forEach(([args, test]) => it(args, () => {
        i++;
        var el = kr.apply(null, args);
        try {
            var z = test(el);
            if (!z) {
                console.log("[" + i + "]");
                console.log(el);
            }
            assert(z, ""+i);
        } catch(err) {
            console.log("["+i+"]:");
            console.log(args);
            console.log(err);
            throw err;
        }
    }));
});
