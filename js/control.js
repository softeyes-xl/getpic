$('#myBtn').on('click',function() {
    haveId = false;
    getId = null;
    clearTimeout(loadTimer);
    var val = $('#myInput').val();
    var reg = /^[0-9]+.?[0-9]*$/;
    if(lastId == val) {
        //null;
    }else {
        lastId = val;
        if(val != '') {
            if(val.substring(0,5) == 'https' || val.substring(0,4) == 'http') {
                var arr = [];
                arr = val.split('&');              
                for(var i=0; i<arr.length; i++) {
                    if(arr[i].substring(0,3) == 'id=') {
                       getId = arr[i].substring(3);
                       haveId = true;
                    }
                }
                if(haveId) {
                    // alert('成功获取id');
                    $('.lds-css').fadeIn();
                    createDiv(getId); 
                }else if(!haveId){
                    alert('没有获取到id')
                }
            }else {
                if(reg.test(val)) {
                    $('.lds-css').fadeIn();
                    getId = val;
                    createDiv(getId);               
                    
                }else {
                    alert('请输入数字！')
                }
            }
        }else {
            alert('输入不能为空！')
        }

    }
})

$(window).resize(function() {
    ajaxOk();
})
