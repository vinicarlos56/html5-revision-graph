var CIRCLE_RADIUS = 5;
var CIRCLE_HOVER_RADIUS = 10;

jQuery(function() {  
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    var x_master = 450;
    var height = 500;

    // inicial da curva x=400 y=405
    // final da curva x=450 y=395
    // C {x da linha para onde vai} {y do próximo nó + 55} {x do nó atual} {y do nó atual - 55} {x y de onde parte}
    var master = new Branch(paper,height,x_master,'red');
    var branch = paper.path("M 400 0 V 350 C 400 405 450 395 450 450");				
    branch.attr("stroke", "blue");
    branch.attr("stroke-width", "3");
    console.log(master.get('color'));
   var revision = new Revision(master,350);

    var circle2 = paper.circle(x_master,450,CIRCLE_RADIUS);
    circle2.attr('fill','blue');
    circle2.attr('stroke','blue');
    circle2.mouseover(function(){
	this.animate({r:CIRCLE_HOVER_RADIUS},100); 
    });
    circle2.mouseout(function(){
	this.animate({r:CIRCLE_RADIUS},100); 
    });

    var circle3 = paper.circle(400,350,CIRCLE_RADIUS);
    circle3.attr('fill','blue');
    circle3.attr('stroke','blue');

});

function Branch(paper,height,x,color){
    this.paper = paper;
    this.x = x;
    this.color = color;
    
    function get(attr){
        return this.attr;
    }

    var path = paper.path("M "+ x +" 0 V "+ height);				
    path.attr("stroke", color);
    path.attr("stroke-width", "3");
    return path;
}

function Revision(branch,y_position){
    console.log(branch.color,y_position);
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

