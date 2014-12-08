// Generated by CoffeeScript 1.8.0
(function() {
  var Branch, CIRCLE_HOVER_RADIUS, CIRCLE_RADIUS, Path, Revision, over,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CIRCLE_RADIUS = 5;

  CIRCLE_HOVER_RADIUS = 10;

  over = false;

  Branch = (function() {
    function Branch(paper, x, revision_end, revision_start, color) {
      this.paper = paper;
      this.x = x;
      this.revision_end = revision_end;
      this.revision_start = revision_start;
      this.color = color;
      this.draw = __bind(this.draw, this);
    }

    Branch.prototype.draw = function() {
      var path;
      path = this.paper.path("M " + this.x + " " + this.revision_end + " V " + this.revision_start);
      path.attr('stroke', this.color);
      return path.attr('stroke-width', '3');
    };

    return Branch;

  })();

  Revision = (function() {
    function Revision(branch, y_position) {
      var circle;
      this.branch = branch;
      this.y_position = y_position;
      this.getNode = __bind(this.getNode, this);
      circle = this.branch.paper.circle(this.branch.x, this.y_position, CIRCLE_RADIUS);
      circle.attr('fill', this.branch.color);
      circle.attr('stroke', this.branch.color);
      circle.mouseover(function() {
        return this.animate({
          r: CIRCLE_HOVER_RADIUS
        }, 100);
      });
      circle.mouseout(function() {
        return this.animate({
          r: CIRCLE_RADIUS
        }, 100);
      });
      this.circle = circle;
    }

    Revision.prototype.getNode = function() {
      return this.circle.node;
    };

    Revision.prototype.register = function(txt) {
      var node, tip;
      tip = $("#tip");
      node = this.circle.node;
      return $(node).on('mouseenter', function() {
        tip.html(txt);
        tip.fadeIn();
        return over = true;
      }).on('mouseleave', function() {
        tip.fadeOut(200);
        return over = false;
      });
    };

    return Revision;

  })();

  Path = (function() {
    function Path(paper, branch_from, branch_to) {
      var path;
      this.paper = paper;
      this.branch_from = branch_from;
      this.branch_to = branch_to;
      if (this.branch_to.revision_start < this.branch_from.revision_start && this.branch_from.x > this.branch_to.x) {
        path = this.paper.path("M " + this.branch_to.x + " " + this.branch_to.revision_start + " V " + this.branch_to.revision_start + " C " + this.branch_to.x + " " + (this.branch_to.revision_start + 55) + " " + (this.branch_to.x + 50) + " " + (this.branch_to.revision_start + 45) + " " + (this.branch_to.x + 50) + " " + (this.branch_to.revision_start + 100));
      }
      if (this.branch_from.x < this.branch_to.x) {
        path = this.paper.path("M " + this.branch_from.x + " " + this.branch_from.revision_end + " V " + this.branch_from.start + " C " + this.branch_from.x + " " + (this.branch_from.revision_end - 55) + " " + this.branch_to.x + " " + (this.branch_from.revision_end - 50) + " " + this.branch_to.x + " " + (this.branch_from.revision_end - 100));
      }
      if (this.branch_to.revision_start > this.branch_from.revision_start && this.branch_from.x > this.branch_to.x) {
        path = this.paper.path("M " + this.branch_from.x + " " + this.branch_from.revision_end + " V " + this.branch_from.revision_end + " C " + this.branch_from.x + " " + (this.branch_from.revision_end - 55) + " " + this.branch_to.x + " " + (this.branch_from.revision_end - 50) + " " + this.branch_to.x + " " + (this.branch_from.revision_end - 100));
      }
      if (this.branch_to.revision_start < this.branch_from.revision_start && this.branch_to.x > this.branch_from.x) {
        path = this.paper.path("M " + this.branch_to.x + " " + this.branch_to.revision_start + " V " + this.branch_to.revision_start + " C " + this.branch_to.x + " " + (this.branch_to.revision_start + 55) + " " + this.branch_from.x + " " + (this.branch_to.revision_start + 50) + " " + this.branch_from.x + " " + (this.branch_to.revision_start + 100));
      }
      if (false) {
        path = this.paper.path("M " + this.branch_to.x + " " + this.branch_to.revision_start + " V " + this.branch_to.revision_start + " C " + this.branch_to.x + " " + (this.branch_to.revision_start + 55) + " " + (this.branch_to.x - 50) + " " + (this.branch_to.revision_start + 45) + " " + (this.branch_to.x - 50) + " " + (this.branch_to.revision_start + 100));
      }
      if (path !== void 0) {
        path.attr("stroke", this.color);
        path.attr("stroke-width", "3");
      }
      console.log(path);
    }

    return Path;

  })();

  jQuery(function() {
    var canvas_container, height, left_branch, master, paper, right_branch, x_master;
    canvas_container = document.getElementById('canvas_container');
    paper = new Raphael(canvas_container, 600, 500);
    x_master = 450;
    height = 500;
    master = new Branch(paper, 450, 0, 500, 'red');
    master.draw();
    left_branch = new Branch(paper, 400, 250, 350, 'blue');
    left_branch.draw();
    right_branch = new Branch(paper, 500, 250, 350, 'green');
    right_branch.draw();
    new Path(paper, master, left_branch);
    new Path(paper, left_branch, master);
    new Path(paper, right_branch, master);
    new Path(paper, master, right_branch);
    new Revision(master, 450);
    new Revision(left_branch, 350);
    new Revision(left_branch, 250);
    new Revision(right_branch, 350);
    new Revision(right_branch, 250);
    new Revision(master, 150);
  });

}).call(this);
