// Generated by CoffeeScript 1.8.0
(function() {
  var Branch,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Branch = (function() {
    function Branch(paper, x, revision_end, revision_start, color) {
      this.paper = paper;
      this.x = x;
      this.revision_end = revision_end;
      this.revision_start = revision_start;
      this.color = color;
      this.getLastRevision = __bind(this.getLastRevision, this);
      this.draw = __bind(this.draw, this);
      this.revisions = [];
    }

    Branch.prototype.draw = function() {
      var path;
      path = this.paper.path("M " + this.x + " " + this.revision_end + " V " + this.revision_start);
      path.attr('stroke', this.color);
      return path.attr('stroke-width', '3');
    };

    Branch.prototype.addRevision = function(revision) {
      this.revision = revision;
      return this.revisions.push(this.revision);
    };

    Branch.prototype.getLastRevision = function() {
      return this.revisions[this.revisions.length - 1];
    };

    return Branch;

  })();

  window.Branch = Branch;

}).call(this);
