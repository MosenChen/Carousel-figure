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
    len=imgs.length,
    menu=document.getElementById("menu_content"),
    menuitem=menu.getElementsByClassName("menu-item"),
    submenu=document.getElementById("sub-menu"),
    innerbox=submenu.getElementsByClassName("inner-box");
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
	//导航菜单
	//遍历主菜单，且绑定事件
	for(var m=0;m<menuitem.length;m++){
		menuitem[m].setAttribute("data-index",m);
		menuitem[m].onmouseover=function(){
           var idx=this.getAttribute("data-index");
           for(var t=0;t<innerbox.length;t++){
           	innerbox[t].style.display="none";
           	menuitem[t].style.background="none";
           }
           submenu.className="sub-menu";
           innerbox[idx].style.display="block";
           menuitem[idx].style.background="rgba(0,0,0,0.1)";
		}
	}
	menu.onmouseout=function(){
		submenu.className="sub-menu hide";
	}
	submenu.onmouseover=function(){
		this.className="sub-menu";
	}
	submenu.onmouseout=function(){
		this.className="sub-menu hide";
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