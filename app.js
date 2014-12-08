// Setup a global namespace for our code.
App = Ember.Application.create();
App.Commit = Ember.Object.extend();
App.ListCommits = Ember.ArrayController.create({});

var owner = 'vinicarlos56';
var repo = 'html5-revision-graph';

function get (sha) {
    $.getJSON("https://api.github.com/repos/"+owner+"/"+repo+"/git/commits/"+sha).then(
        function(response) {

            App.ListCommits.pushObject(App.Commit.create(response));

            if (typeof response.parents[0] !== "undefined") {
                var sha = response.parents[0].sha;

                get(sha);
            }
        }
    );
}

$(document).ready(function(){
    get('717e721cf1b5255938e930af4872135601f8d841');
});
