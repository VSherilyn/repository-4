/**
 * Created by Vinea on 17.02.16.
 */

//json-server --watch file.json
//--------------------------------------------------------------------------

//var btn_del = document.getElementsByClassName("delete");
var head_in = document.getElementsByClassName("header_input1");
var post_in = document.getElementsByClassName("post_input1");
var comment_in = document.getElementsByClassName("comment_input1");
var head_in2 = document.getElementsByClassName("header_input2");
var post_in2 = document.getElementsByClassName("post_input2");
var comment_in2 = document.getElementsByClassName("comment_input2");
//var u = JSON.stringify(posts_obj);


function renderPosts(compFunction) {
    var html = '';
    request('http://localhost:3000/posts/', 'GET', null, function(posts_obj) {
            posts_obj.sort(compFunction);
            for (var i = 0; i < posts_obj.length; i++) {
                var comments = posts_obj[i].comment || [],
                    id = i+1;
                if (comments instanceof Array) {
                    comments = comments.map(function(value, index) {
                        return value + ' ' + '<button class="del_comm" onclick="deleteComm(' + id + ', ' + index + ')">Delete</button>'+ '<br/>';
                    });
                }
                html += '<div class="accordion" id="accordion' + id + '"> \
                            <div class="accordion-group"> \
                            <div class="accordion-heading"> \
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion' + id + '" href="#collapse' + id + '">\
                                    <h4 class="id" style="font-style: strong; margin: 0">' + "Post number " + posts_obj[i].id + '</h4> \
                                </a> \
                            </div> \
                        <div id="collapse'+id+'" class="accordion-body collapse"> \
                            <div class="accordion-inner">'
                     + '<div class="header">' + posts_obj[i].header + '</div>'
                     + '<div class="post">' + posts_obj[i].post + '</div>'
                     + '<div class="comment-text">' + comments + '</div>'
                     + '<input class="comment" type="text" placeholder="Comment this..."/>'
                     + '<input class="comment-button" type="button" value="Save comment" onclick="saveComment(' + id + ')"/> \
                     </div></div>';
            }
            document.getElementById('posts').innerHTML = html;
        });
}

/*function postAdded() {
    var np = document.createElement('div');
    np.classname = "npost";
    document.appendChild(np);
    request('http://localhost:3000/posts/', 'GET', null, function(posts_obj) {
        posts_obj.push();
    });
    $.ajax({
       url: "file.json",
       success: function(data) {
           posts_obj.push();
       },
       async: true
    });
} */

function compare(a, b) {
    return a.header.localeCompare(b.header);
}
function sorting() {
    renderPosts(compare);
}

function deleteComm(a, b) {

    request('http://localhost:3000/posts/' + a,  'GET', null, function(data) {
        console.log(data);
        data.comment.splice(b, 1);
        var w = JSON.stringify(data);
        request('http://localhost:3000/posts/' + a,  'PUT', w, renderPosts);
    });
}

function delete_post() {
    var t = parseInt(document.getElementsByClassName("del_p")[0].value);
    request('http://localhost:3000/posts/' + t,  'DELETE', null, function() {
        renderPosts();
    });
}
function edit_post() {
    var t = parseInt(document.getElementsByClassName("del_p")[0].value);
    var w = JSON.stringify({
        header: head_in2[0].value,
        post: post_in2[0].value,
        comment: comment_in2[0].value
    });
    request('http://localhost:3000/posts/' + t,  'PUT', w, function(data) {
        head_in2[0].value = data.header;
        post_in2[0].value = data.post;
        comment_in2[0].value = data.comment;
        renderPosts();
    });
}
function view_post() {
    var t = parseInt(document.getElementsByClassName("del_p")[0].value);
    request('http://localhost:3000/posts/' + t,  'GET', null, function(data) {
        head_in2[0].value = data.header;
        post_in2[0].value = data.post;
        comment_in2[0].value = data.comment;

    });
}
function addpost() {
    var w = JSON.stringify({
        header: head_in[0].value,
        post: post_in[0].value,
        comment: [comment_in[0].value]
    });
    head_in[0].value = null;
    post_in[0].value = null;
    comment_in[0].value = null;
    request('http://localhost:3000/posts/',  'POST', w, renderPosts);
}

function defineComments(arry, index) {
    arry = arry || [];
    arry.push(document.getElementsByClassName('comment')[index-1].value);
    return arry;
}

function saveComment(index) {
    request('http://localhost:3000/posts/' + index,  'GET', null, function(data) {
            console.log(data);
            var w = JSON.stringify({
            header: data.header,
            post: data.post,
            comment: defineComments(data.comment, index)

        });
        request('http://localhost:3000/posts/' + index,  'PUT', w, renderPosts);
    });
}

renderPosts();

function request(url, type, data, callback) {
var xhr = new XMLHttpRequest();
xhr.open(type, url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);
xhr.addEventListener("load", function () {
    if (xhr.status === 404) { // 304 - not modified
        document.innerHTML = xhr.status + ': ' + xhr.statusText;
    } else {
        if(callback) {
            callback(JSON.parse(xhr.responseText));
        }
    }
});
}
