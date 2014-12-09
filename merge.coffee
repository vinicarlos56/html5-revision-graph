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

window.Merge = Merge
