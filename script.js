var CIRCLE_RADIUS = 5;
var CIRCLE_HOVER_RADIUS = 10;
var over=false;

jQuery(function() {  
    var paper = new Raphael(document.getElementById('canvas_container'), 600, 500);  
    var x_master = 450;
    var height = 500;

    // inicial da curva x=400 y=405
    // final da curva x=450 y=395

    var master = new Branch(paper,450,0,500,'red');
    master.draw();

    var left_branch = new Branch(paper,400,250,350,'blue'); //(paper,x,end,start,color)
    left_branch.draw();

    var right_branch = new Branch(paper,500,250,350,'green'); //(paper,x,end,start,color)
    right_branch.draw();

    new Path(paper,master,left_branch); // out of master left
    new Path(paper,left_branch,master); // into master left

    new Path(paper,master,right_branch); // out of master right 

    // var master = new Master(paper,450,500,'red');
    // master.draw();
    // var left_branch = new Branch(paper,400,350,'blue','left');
    // left_branch.draw();
    // var right_branch = new Branch(paper,500,250,'blue','right');
    // right_branch.draw();

   // var first_rev_master = new Revision(master,450);
   // first_rev_master.register('Teste');
   //
   // var sec_rev_master = new Revision(master,350);
   // sec_rev_master.register('teste 2');
   //
   // var thr_rev_master = new Revision(master,250);
   // thr_rev_master.register('teste 3');
   //
   // var fourth_rev_master = new Revision(master,150);
   // fourth_rev_master.register('teste 4');
   //
   // var q_rev_master = new Revision(master,50);
   // q_rev_master.register('teste 5');
   //
   // new Revision(left_branch,350);
   // new Revision(left_branch,250);
   // new Revision(left_branch,150);
   //
   // new Revision(right_branch,250);


});

$(document).mousemove(function(e){

   if (over){
      $('#tip').css("left", e.clientX+20).css("top", e.clientY+20);
    }
});

var Path = function(paper,branch_from, branch_to){

    this.paper = paper;
    this.branch_from = branch_from;
    this.branch_to = branch_to;

    if (this.branch_to.revision_start < this.branch_from.revision_start && this.branch_from.x > this.branch_to.x){
        var path = this.paper.path(
                "M "+ this.branch_to.x +" "+this.branch_to.revision_start+
                " V "+ this.branch_to.revision_start +
                " C "+ this.branch_to.x +" "+ (this.branch_to.revision_start + 55) +" "+ 
                (this.branch_to.x+50) +" "+ (this.branch_to.revision_start+45) +" "+ 
                (this.branch_to.x+50) +" "+ (this.branch_to.revision_start+100)
        );
    }

    if(this.branch_from.x < this.branch_to.x) {
        // var path = this.paper.path('M 400 250 V 250 C 400 250 425 200 450 150');
        var path = this.paper.path(
                "M "+ this.branch_from.x +" "+this.branch_from.revision_end+
                " V "+ this.branch_from.start+
                " C "+ this.branch_from.x +" "+ (this.branch_from.revision_end - 55) +" "+ 
                (this.branch_to.x) +" "+ (this.branch_from.revision_end-50) +" "+ 
                (this.branch_to.x) +" "+ (this.branch_from.revision_end-100)
        );
        // var path = this.paper.path('M 400 250 V 250 C 400 195 450 200 450 150');
    } 

    if (false){
        var path = this.paper.path(
                "M "+ this.branch_to.x +" "+this.branch_to.revision_start+
                " V "+ this.branch_to.revision_start +
                " C "+ this.branch_to.x +" "+ (this.branch_to.revision_start + 55) +" "+ 
                (this.branch_to.x-50) +" "+ (this.branch_to.revision_start+45) +" "+ 
                (this.branch_to.x-50) +" "+ (this.branch_to.revision_start+100)
        );
//    var path = this.paper.path("M "+ this.x +" 0 V "+ this.height +" C "+ this.x +" "+ (this.height + 55) +" "+ (this.x-50) +" "+ (this.height+45) +" "+ (this.x-50) +" "+ (this.height+100));
    }

    if (path != undefined) {
        path.attr("stroke", this.color);
        path.attr("stroke-width", "3");
    }


}

var Branch = function(paper,x,revision_end,revision_start,color){
    this.paper = paper;
    this.color = color;
    this.revision_end = revision_end;
    this.revision_start = revision_start;
    this.x = x;
}

Branch.prototype = {

    draw: function(){
    // C {x da linha para onde vai} {y do próximo nó + 55} {x do nó atual} {y do nó atual - 55} {x y de onde parte}
        var path = this.paper.path("M "+ this.x +" "+ this.revision_end +" V "+ this.revision_start);
        
        path.attr("stroke", this.color);
        path.attr("stroke-width", "3");
    }
}
// var Branch = function(paper,x,height,color,orientation){
//     this.paper = paper;
//     this.color = color;
//     this.height = height;
//     this.x = x;
//     this.orientation = orientation;
// }
//
// Branch.prototype = {
//
//     draw: function(){
//     // C {x da linha para onde vai} {y do próximo nó + 55} {x do nó atual} {y do nó atual - 55} {x y de onde parte}
//         if (this.orientation == 'left')
//             var path = this.paper.path("M "+ this.x +" 0 V "+ this.height +" C "+ this.x +" "+ (this.height + 55) +" "+ (this.x+50) +" "+ (this.height+45) +" "+ (this.x+50) +" "+ (this.height+100));
//
//         if (this.orientation == 'right')
//             var path = this.paper.path("M "+ this.x +" 0 V "+ this.height +" C "+ this.x +" "+ (this.height + 55) +" "+ (this.x-50) +" "+ (this.height+45) +" "+ (this.x-50) +" "+ (this.height+100));
//
//         path.attr("stroke", this.color);
//         path.attr("stroke-width", "3");
//     }
// }
//
// var Master = function(paper,x,height,color){
//     this.paper = paper;
//     this.x = x;
//     this.height = height;
//     this.color = color;
// }
//
// Master.prototype = {
//     draw: function () {
//
//         var path = this.paper.path("M "+ this.x +" 0 V "+ this.height);				
//
//         path.attr("stroke", this.color);
//         path.attr("stroke-width", "3");
//
//     }
// }
//
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

