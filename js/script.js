//封装getElementById()的方法
// function byId(id){
// 	typeof(id)==="string"?document.getElementById(id):id;
// }
var index=0,
    timer=null,
    imgs=document.getElementById("banner_img").getElementsByTagName("img"),
    dots=document.getElementById("dots").getElementsByTagName("span"),
    prev=document.getElementById("prev"),
    next=document.getElementById("next"),
    len=imgs.length;
function slideImg(){
	var banner=document.getElementById("banner");
	//滑过清除定时器，离开继续
	banner.onmouseover=function(){
      if(timer){
      	clearInterval(timer);
      }
	}
	banner.onmouseout=function(){
         timer=setInterval(function(){
              index++;
              if(index>=len){
              	index=0;
              }
              //切换图片
              console.log(index);
              changeImg();
         },2000);
	}
	banner.onmouseout();  //自动触发
	//遍历所有点击，点击圆点切换图片
	for(var j=0;j<len;j++){
		dots[j].id=j;
		dots[j].onclick=function(){
			//改变index为当前span索引
			index=this.id;
			changeImg();
		}
	}
	next.onclick=function(){
		index++;
		if(index>=len){
			index=0;
		}
		changeImg();
	}
	prev.onclick=function(){
		index--;
		if(index<0){
			index=len-1;
		}
		changeImg();
	}
}

function changeImg(){
	//遍历banner下所有的div，将其隐藏
	for(var i=0;i<len;i++){
		imgs[i].style.display="none";
		dots[i].className="";
	}
	imgs[index].style.display='block';
	dots[index].className="active";
}
slideImg();