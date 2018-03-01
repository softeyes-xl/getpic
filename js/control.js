$('#myBtn').on('click',function() {
    var val = $('#myInput').val();
    createDiv(val);
    timer1 = setTimeout(function() {
        ajaxOk();
    },1000)
})