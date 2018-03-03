$('#myBtn').on('click',function() {
    getMyId();
})

function getMyId() {
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
}

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==27){ // 按 Esc 
        //要做的事情
      }
    if(e && e.keyCode==113){ // 按 F2 
         //要做的事情
       }            
     if(e && e.keyCode==13){ // enter 键
         //要做的事情
         getMyId();
    }
}; 

function throttle(method,delay){
    var timer=null;
    return function(){
        var context=this, args=arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
            method.apply(context,args);
        },delay);
    }
}

$(window).resize(function() {
    for(var i=0; i<$('.mydiv').length; i++) {
        $('.mydiv')[i].style = '';
    }
    clearTimeout(reTimer);
    reTimer = setTimeout(function() {
        ajaxOk();     
    },500)

})
