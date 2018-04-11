
function resize(height) {
    var clientH=document.documentElement.clientHeight;

    var bili=clientH/height;

    document.querySelector("html").style.fontSize=bili*100+"px"
}
document.addEventListener("DOMContentLoaded",function () {
        resize(1156)
})

window.onresize=function () {

    resize(1156)
}