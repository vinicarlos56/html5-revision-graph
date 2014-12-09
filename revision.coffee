CIRCLE_RADIUS = 5
CIRCLE_HOVER_RADIUS = 10
over = false

class Revision
    constructor: (@branch,@y_position,@response) ->
        circle = @branch.paper.circle(@branch.x,@y_position,CIRCLE_RADIUS)

        circle.attr('fill',@branch.color)
        circle.attr('stroke',@branch.color)

        circle.mouseover -> 
            @animate({r:CIRCLE_HOVER_RADIUS},100)

        circle.mouseout ->
            @animate({r:CIRCLE_RADIUS},100)

        @circle = circle

        @register(@response)

    getNode: =>
        @circle.node

    register: (response) ->
        tip = $("#tip")
        node = @circle.node

        $(node).on('mouseenter', ->
            tip.html(response.message)
            tip.fadeIn()
            over = true
        ).on('mouseleave', ->
            tip.fadeOut(200)
            over = false
        )

window.Revision = Revision
