var CIRCLE_RADIUS = 5;
var CIRCLE_HOVER_RADIUS = 10;

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

   var revision = new Revision(master,450);

    // var circle2 = paper.circle(x_master,450,CIRCLE_RADIUS);
    // circle2.attr('fill','blue');
    // circle2.attr('stroke','blue');
    // circle2.mouseover(function(){
	// this.animate({r:CIRCLE_HOVER_RADIUS},100); 
    // });
    // circle2.mouseout(function(){
	// this.animate({r:CIRCLE_RADIUS},100); 
    // });
    //
    // var circle3 = paper.circle(400,350,CIRCLE_RADIUS);
    // circle3.attr('fill','blue');
    // circle3.attr('stroke','blue');

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

    return circle;
}
    
//Helper method to take x,y and r and return a path instruction string.
// x and y are center and r is the radius
function getCircletoPath(x , y, r)  {  
	return "M"+ x + "," + (y - r) + "A" + r + "," + r + ",0,1,1," + (x - 0.1) + "," + (y - r) +" z"; 
}

