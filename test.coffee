CIRCLE_RADIUS = 5
CIRCLE_HOVER_RADIUS = 10
over = false

class Branch
    constructor: (@paper,@x,@revision_end,@revision_start,@color) ->
        @revisions = []

    draw: =>
        path = @paper.path "M #{@x} #{@revision_end} V #{@revision_start}"

        path.attr('stroke',@color) 
        path.attr('stroke-width','3') 

    addRevision: (@revision) ->
        @revisions.push(@revision)

    getLastRevision: =>
        @revisions[@revisions.length-1]



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

class Merge
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

        if  @branch_to.revision_start < @branch_from.revision_start and @branch_to.x > @branch_from.x 
            path = @paper.path(
                "M #{@branch_to.x} #{@branch_to.revision_start}
                 V #{@branch_to.revision_start} 
                 C #{@branch_to.x} #{@branch_to.revision_start+55}
                 #{@branch_from.x} #{@branch_to.revision_start+50}
                 #{@branch_from.x} #{@branch_to.revision_start+100}"
            )

        if path != undefined 
            path.attr("stroke", @color)
            path.attr("stroke-width", "3")


window.App = Ember.Application.create()
App.Commit = Ember.Object.extend()
App.ListCommits = Ember.ArrayController.create {}

owner = 'vinicarlos56'
repo = 'html5-revision-graph'

get = (sha,master) -> 
    $.getJSON("https://api.github.com/repos/#{owner}/#{repo}/git/commits/#{sha}").then( 
        (response) ->
            App.ListCommits.pushObject(App.Commit.create(response))

            if typeof master.getLastRevision() isnt "undefined"
                master.addRevision(new Revision(master, master.getLastRevision().y_position - 50))
            else
                master.addRevision(new Revision(master, 500))

            if typeof response.parents[0] isnt "undefined"
                get(response.parents[0].sha, master)
    )

$(document).ready(->

    canvas_container = document.getElementById 'canvas_container'
    paper = new Raphael(canvas_container, 600, 500)
    x_master = 450
    height = 500

    master = new Branch(paper, 450, 0, 500, 'red')
    master.draw()

    get('717e721cf1b5255938e930af4872135601f8d841',master)

)

return
jQuery ->
    canvas_container = document.getElementById 'canvas_container'
    paper = new Raphael(canvas_container, 600, 500)
    x_master = 450
    height = 500

    master = new Branch(paper, 450, 0, 500, 'red')
    master.draw()

    # blue_branch = new Branch(paper, 400, 250, 350, 'blue')
    # blue_branch.draw()
    #
    # green_branch = new Branch(paper, 500, 250, 350, 'green')
    # green_branch.draw()
    #
    # purple_branch = new Branch(paper, 350, 50, 150, 'purple')
    # purple_branch.draw()
    #
    #
    # new Merge(paper, master, blue_branch)
    # new Merge(paper, blue_branch, purple_branch) 
    # new Merge(paper, green_branch, master)
    # new Merge(paper, master, green_branch)

    rev = new Revision(master, 450)
    master.addRevision(rev)
    console.log master.getLastRevision()
    # new Revision(blue_branch, 350)
    # new Revision(blue_branch, 250)
    # new Revision(green_branch, 350)
    # new Revision(green_branch, 250)
    # new Revision(master, 150)

    return
