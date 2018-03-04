	function change() {	
		var native_width = 0;
		var native_height = 0;

		//开始创建鼠标事件函数
		$(".magnify").mousemove(function(e){
			//当用户将鼠标悬停在图像上，该脚本会先计算出小图像的尺寸。只有在小图像尺寸已知的情况下，该脚本才会显示缩放的版本。
			if(!native_width && !native_height)//表示图像的宽度和高度不为0的判断
			{
				//创建一个新的图像对象，并将小图像的url赋值给对象，从而获取小图片的高宽值。
				var image_object = new Image();
				image_object.src = $(".small").attr("src");
				
				//将对象的高度和宽度，赋值给全局变量。
				native_width = image_object.width;
				native_height = image_object.height;
			}
			else
			{
				//返回当前鼠标相对于窗口X/Y轴的位置，并处理放大镜跟随鼠标事件。
				var magnify_offset = $(this).offset();
				var mx = e.pageX - magnify_offset.left;
				var my = e.pageY - magnify_offset.top;
				
				//如果鼠标在容器之外，则隐藏，否则显示放大镜。
				if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
				{
					$(".large").fadeIn(100);
				}
				else
				{
					$(".large").fadeOut(100);
				}
				if($(".large").is(":visible"))//如果. large元素可见
				{
					//通过鼠标在小图像上的位置变化，改变大图像背景的位置。计算出鼠标指针下的像素比例，按照比例来调整大图像的位置。
					var rx = Math.round(mx/$(".small").width()*native_width - $(".large").width()/2)*-1;
					var ry = Math.round(my/$(".small").height()*native_height - $(".large").height()/2)*-1;
					var bgp = rx + "px " + ry + "px";
					
					//鼠标移动放大镜参数
					var px = mx - $(".large").width()/2;
					var py = my - $(".large").height()/2;
					//鼠标移动放大镜时，需要扣除一半的放大镜高度与宽度，才能保持鼠标处于放大镜的中间。
					
					//将计算结果输出到html，实现移动放大镜。
					$(".large").css({left: px, top: py, backgroundPosition: bgp});
				}
			}
		})
	}