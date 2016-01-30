describe('kr', function() {
  it('accepts the (tag) form', function() {
    var el = kr('p');
    assert(el.tagName.toLowerCase() === 'p');
  });

  it('accepts the (tag, attr) form', function() {
    var el = kr('p', {id: 'one'});
    assert(el.matches('p#one'));
  });

  it('accepts the (tag, children) form', function() {
    var divs = [
      kr('div', [kr('span')]),
      kr('div', kr('span')),
    ];
    divs.forEach(function(div) {
      var ch = [].slice.call(div.children);
      assert(ch[0].matches('span'),  'tagName is span');
    });
  });

  it('accepts the (tag, attr, children) form', function() {
    var attr = {id: 'one'};
    var divs = [
      kr('div', attr, [kr('span')]),
      kr('div', attr, kr('span')),
    ];
    divs.forEach(function(div) {
      var span = div.querySelector('span');
      assert(span.matches('div#one > span'));
    });
    assert(kr('div', attr, 'text').textContent === 'text');
  });
});
