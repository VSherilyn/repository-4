/**
 * Created by Vinea on 18.02.16.
 */

var inputs = [
    document.getElementById("in1"),
    document.getElementById("in2"),
    document.getElementById("in3")
];

inputs.forEach(function (el) {
    if (sessionStorage.getItem("forms")) {
       // el.value = sessionStorage.getItem(el.id);
        el.value = JSON.parse(sessionStorage.getItem("forms"))[el.id];
    }
});

function saveToLocalStorage() {
    var forms = {};
    inputs.forEach(function (el) {
        forms[el.id] = el.value;
    });
    sessionStorage.setItem("forms", JSON.stringify(forms));
}

window.onbeforeunload = saveToLocalStorage;
