var CIRCLE_RADIUS = 5;
var CIRCLE_HOVER_RADIUS = 10;
var over=false;

jQuery(function() {  
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    var x_master = 450;
    var height = 500;

    // inicial da curva x=400 y=405
    // final da curva x=450 y=395

    // C {x da linha para onde vai} {y do próximo nó + 55} {x do nó atual} {y do nó atual - 55} {x y de onde parte}

    var master = new Master(paper,450,height,'red');
    master.draw();
    var branch = new Branch(paper,400,350,'blue','left');
    branch.draw();
    var branch2 = new Branch(paper,500,350,'blue','right');
    branch2.draw();

   var first_rev_master = new Revision(master,450);
   first_rev_master.register('Teste');

   var sec_rev_master = new Revision(master,390);
   sec_rev_master.register('teste 2');

   new Revision(master,350);

   new Revision(branch,300);
   new Revision(branch,250);


});

$(document).mousemove(function(e){

   if (over){
      $('#tip').css("left", e.clientX+20).css("top", e.clientY+20);
    }
});

var Branch = function(paper,x,height,color,orientation){
    this.paper = paper;
    this.color = color;
    this.height = height;
    this.x = x;
    this.orientation = orientation;
}

Branch.prototype = {

    draw: function(){
        if (this.orientation == 'left')
            var path = this.paper.path("M "+ this.x +" 0 V "+ this.height +" C "+ this.x +" "+ (this.x+5) +" "+ (this.x+50) +" "+ (this.height+45) +" "+ (this.x+50) +" "+ (this.x+50));

        if (this.orientation == 'right')
            var path = this.paper.path("M "+ this.x +" 0 V "+ this.height +" C "+ this.x +" "+ (this.x-95) +" "+ (this.x-50) +" "+ (this.height+45) +" "+ (this.x-50) +" "+ (this.x-50));

        path.attr("stroke", this.color);
        path.attr("stroke-width", "3");
    }
}

var Master = function(paper,x,height,color){
    this.paper = paper;
    this.x = x;
    this.height = height;
    this.color = color;
}

Master.prototype = {
    draw: function () {

        var path = this.paper.path("M "+ this.x +" 0 V "+ this.height);				

        path.attr("stroke", this.color);
        path.attr("stroke-width", "3");

    }
}

var Revision = function(branch,y_position){

    var circle = branch.paper.circle(branch.x,y_position,CIRCLE_RADIUS);

    circle.attr('fill',branch.color);
    circle.attr('stroke',branch.color);

    circle.mouseover(function(){
        this.animate({r:CIRCLE_HOVER_RADIUS},100); 
    });
    circle.mouseout(function(){
        this.animate({r:CIRCLE_RADIUS},100); 
    });

    this.circle = circle;
}

Revision.prototype = {
    getNode: function(){
        return this.circle.node;
    },

    register: function(txt){

        var tip = $("#tip");
        var node = this.circle.node;

        $(node).on('mouseenter',function(){
            tip.html(txt);
            tip.fadeIn();
            over = true;
        }).on('mouseleave',function(){
            tip.fadeOut(200);
            over = false;
        });
    }
}

//Helper method to take x,y and r and return a path instruction string.
// x and y are center and r is the radius
function getCircletoPath(x , y, r)  {  
	return "M"+ x + "," + (y - r) + "A" + r + "," + r + ",0,1,1," + (x - 0.1) + "," + (y - r) +" z"; 
}

