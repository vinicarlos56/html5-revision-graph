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

window.Branch = Branch
