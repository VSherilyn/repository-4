/**
 * Created by Vinea on 01.03.16.
 */
function create_cls() {
    var html= '', content='',
        cols = parseInt(document.getElementsByClassName("cols")[0].value),
        num = parseInt(document.getElementsByClassName("num")[0].value);

    for (var i = 0; i < num; i++) {
        for (var j = 0; j < cols; j++) {
            content += "<td>"
                + "ghbdtn"
                + "</td>";

        }
        html += "<tr>"
            + content
            + "</tr>";
        cols = 0;
    }


    document.getElementById("table").innerHTML = html;
}