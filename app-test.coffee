window.App = Ember.Application.create()
App.Commit = Ember.Object.extend()
App.ListCommits = Ember.ArrayController.create {}

owner = 'vinicarlos56'
repo = 'html5-revision-graph'

get = (sha) -> 
    $.getJSON("https://api.github.com/repos/#{owner}/#{repo}/git/commits/#{sha}").then( 
        (response) ->
            App.ListCommits.pushObject(App.Commit.create(response))

            if typeof response.parents[0] isnt "undefined"
                get response.parents[0].sha
    )

$(document).ready(->
    get('717e721cf1b5255938e930af4872135601f8d841')
)

