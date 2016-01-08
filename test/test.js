describe('Korah', function() {
  it('returns the element rendered by the template', function(done) {
    var template = Korah(function(tags, data) {
      done();
      assert(tags === Korah.tags);
      return tags.h1(data.title);
    });

    var h1 = template({title: '123'});
    assert(h1.tagName.toLowerCase() === 'h1');
    assert(h1.textContent === '123');
  });
});

describe('Korah.Tag', function() {
  it('works for no argument', function() {
    var tag = new Korah.Tag('h1');
    var h1  = tag.el;
    assert(!h1.childNodes.length);
  });

  it('works for strings', function() {
    var tag = new Korah.Tag('h1', ['123']);
    var h1  = tag.el;
    assert(h1.tagName.toLowerCase() === 'h1');
    assert(h1.textContent === '123');
  });

  it('works for arrays', function() {
    var tag = new Korah.Tag('h1', [['123', '456']]);
    var h1  = tag.el;
    assert(h1.childNodes.length === 2);
    assert(h1.children.length === 0); // appended as text nodes
  });

  it('works for tags', function() {
    var tag = new Korah.Tag('div', [
      new Korah.Tag('p', ['123']),
      new Korah.Tag('p', ['456']),
    ]);
    var div = tag.el;
    var nodes = [].slice.call(div.childNodes);
    assert(nodes.length === 2);
    nodes.forEach(function(p, idx) {
      var text = (idx === 1) ? '456' : '123';
      assert(p.textContent === text);
      assert(p.tagName.toLowerCase() === 'p');
    });
  });

  it('recursively handles arrays', function() { 
    var tag = new Korah.Tag('div', [[
      new Korah.Tag('p', '123'),
      456,
      '789',
    ]]);
    var div = tag.el;
    var nodes = [].slice.call(div.childNodes);
    var n1 = nodes[0];
    var n2 = nodes[1];
    var n3 = nodes[2];
    assert(n1.tagName.toLowerCase() === 'p');
    assert(n1.textContent === '123');
    assert(n2.textContent === '456');
    assert(n3.textContent === '789');
  });
});

describe('Korah.tag#attrs', function() {
  it('adds the properties to the element', function() {
    var tag = new Korah.Tag('h1');
    var el  = tag.el;
    tag.attrs({'class': 'klass', 'id': 'id'});
    assert(el.getAttribute('class') === 'klass');
    assert(el.getAttribute('id') === 'id');
  });

  it('returns the tag object for chaining', function() {
    var tag = new Korah.Tag('h1');
    assert(tag.attrs({}) === tag);
  });
});

describe('Korah.register', function() {
  it('registers the function on the tags object', function(done) {
    var name = 'not-an-elem'
    Korah.register(name, function(tags) {
      done();
      assert(tags === Korah.tags);
    });
    assert(Korah.tags[name]);
    Korah.tags[name]();
    delete Korah.tags[name];
  });
});

describe('Korah.addTag', function() {
  it('adds a tag to the Korah.tags object', function() {
    var name = 'faux-elem';
    Korah.addTag(name);
    assert(Korah.tags[name]);
    var t = Korah(function(t) {
      return t[name]();
    });
    var el = t();
    assert(el.tagName.toLowerCase() === name);
  });
});
