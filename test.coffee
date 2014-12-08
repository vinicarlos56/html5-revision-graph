CIRCLE_RADIUS = 5
CIRCLE_HOVER_RADIUS = 10
over = false

class Branch
    constructor: (@paper,@x,@revision_end,@revision_start,@color) ->

    draw: =>
        path = @paper.path "M #{@x} #{@revision_end} V #{@revision_start}"

        path.attr('stroke',@color) 
        path.attr('stroke-width','3') 

class Revision
    constructor: (@branch,@y_position) ->
        circle = @branch.paper.circle(@branch.x,@y_position,CIRCLE_RADIUS)

        circle.attr('fill',@branch.color)
        circle.attr('stroke',@branch.color)

        circle.mouseover -> 
            @animate({r:CIRCLE_HOVER_RADIUS},100)

        circle.mouseout ->
            @animate({r:CIRCLE_RADIUS},100)

        @circle = circle

    getNode: =>
        @circle.node

    register: (txt) ->
        tip = $("#tip")
        node = @circle.node

        $(node).on('mouseenter', ->
            tip.html(txt)
            tip.fadeIn()
            over = true
        ).on('mouseleave', ->
            tip.fadeOut(200)
            over = false
        )

class Path
    constructor: (@paper,@branch_from,@branch_to) ->
        if @branch_to.revision_start < @branch_from.revision_start and @branch_from.x > @branch_to.x

           path = @paper.path(
                "M #{@branch_to.x} #{@branch_to.revision_start}
                 V #{@branch_to.revision_start}
                 C #{@branch_to.x} #{@branch_to.revision_start + 55}
                 #{@branch_to.x+50} #{@branch_to.revision_start+45} 
                 #{@branch_to.x+50} #{@branch_to.revision_start+100}"
           )

        if @branch_from.x < @branch_to.x 
            path = @paper.path(
                "M #{@branch_from.x} #{@branch_from.revision_end}
                 V #{@branch_from.start}
                 C #{@branch_from.x} #{@branch_from.revision_end-55}
                 #{@branch_to.x} #{@branch_from.revision_end-50}
                 #{@branch_to.x} #{@branch_from.revision_end-100}"
            )

        # check why changing V anything changes
        if @branch_to.revision_start > @branch_from.revision_start and @branch_from.x > @branch_to.x 
            path = @paper.path(
                "M #{@branch_from.x} #{@branch_from.revision_end}
                 V #{@branch_from.revision_end} 
                 C #{@branch_from.x} #{@branch_from.revision_end-55}
                 #{@branch_to.x} #{@branch_from.revision_end-50}
                 #{@branch_to.x} #{@branch_from.revision_end-100}"
            )

        if false
            path = @paper.path(
                "M #{@branch_to.x} #{@branch_to.revision_start}
                 V #{@branch_to.revision_start}
                 C #{@branch_to.x} #{@branch_to.revision_start+55}
                 #{@branch_to.x-50} #{@branch_to.revision_start+45} 
                 #{@branch_to.x-50} #{@branch_to.revision_start+100}"
            )


        if path != undefined 
            path.attr("stroke", @color)
            path.attr("stroke-width", "3")

        console.log path


jQuery ->
    canvas_container = document.getElementById 'canvas_container'
    paper = new Raphael(canvas_container, 600, 500)
    x_master = 450
    height = 500

    master = new Branch(paper, 450, 0, 500, 'red')
    master.draw()

    left_branch = new Branch(paper, 400, 250, 350, 'blue')
    left_branch.draw()

    right_branch = new Branch(paper, 500, 250, 350, 'green')
    right_branch.draw()

    new Path(paper, master, left_branch)
    new Path(paper, left_branch, master) 
    new Path(paper, right_branch, master)

    new Revision(master, 450)
    new Revision(left_branch, 350)
    new Revision(left_branch, 250)
    new Revision(right_branch, 350)
    new Revision(right_branch, 250)
    new Revision(master, 150)

    return
