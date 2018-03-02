$('#myBtn').on('click',function() {
    var val = $('#myInput').val();

    var reg = /^[0-9]+.?[0-9]*$/;

    if(val != '') {
        if(reg.test(val)) {
            createDiv(val);
            timer1 = setTimeout(function() {
                ajaxOk();
            },5000)
        }else {
            alert('请输入数字！')
        }
    }else {
        alert('输入不能为空！')
    }
})