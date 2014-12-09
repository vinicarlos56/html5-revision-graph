window.App = Ember.Application.create()
App.Commit = Ember.Object.extend()
App.ListCommits = Ember.ArrayController.create {}

owner = 'vinicarlos56'
repo = 'html5-revision-graph'
over = true

get = (sha,master) -> 
    $.getJSON("https://api.github.com/repos/#{owner}/#{repo}/git/commits/#{sha}").then( 
        (response) ->
            # App.ListCommits.pushObject(App.Commit.create(response))

            if typeof master.getLastRevision() isnt "undefined"
                master.addRevision(new Revision(master, master.getLastRevision().y_position - 50, response))
            else
                master.addRevision(new Revision(master, 500, response))

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

    $(document).mousemove( (e) ->
        if over
            $('#tip').css("left", e.clientX+20).css("top", e.clientY+20)
    )
    

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
