function showresult() {
    var url = location.href;
    var tmp1 = url.split("?")[1];
    var tmp2 = tmp1.split("&")[0];
    var tmp3 = tmp2.split("=")[1];
    var param1 = tmp3;
    document.getElementById('value').innerHTML = decodeURI(param1);
}

window.addEventListener('load', showresult);
