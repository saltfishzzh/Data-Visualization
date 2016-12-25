var Slider = function (ing) {
	this.block = document.getElementById("sliderBlock");
	this.value = 0;
  	this.value = 0;
  	this.ing = ing;
  	this.init();
}
Slider.prototype.init = function () {
	var _sx = 0;
	var _cx = 0;
  	var o = this.block;
  	var me = this;
  	o.onmousedown = function(e){
		var e = window.event || e;
        _sx = o.offsetLeft;
        _cx = e.clientX-_sx;
        document.body.onmousemove = move;
        document.body.onmouseup = up;	
  	};
  	function move (e) {
	  	var e = window.event || e;
		var pos_x = e.clientX - _cx;
   		pos_x = pos_x < 13 ? 13 : pos_x;
	   	pos_x = pos_x > 257+15-50 ? 257+15-50 : pos_x;
    	o.style.left =  pos_x+"px";
  		me.value=(pos_x-13);
        me.ing(me.value);        
  }
  function up () {
	document.body.onmousemove = function(){};
    document.body.onmouseup = function(){};	
  }
}