(function($){
	$.fn.extend({
		hgSlider:function(opt){
			var $this = $(this);
			var i = 0;
			$this.data("slides",opt.slides);
			$this.addClass("slide-container");
			$this.html("<div class='slide slide0 right'></div><div class='slide slide1'></div>");
			var func = function(){
				var slides = $this.data("slides");
				if(i == 0 && opt.onLoopFirst){
					opt.onLoopFirst.apply(this);
				}
				var $target = $this.find(".slide"+(i % 2));
				var $target2 = $this.find(".slide"+((i + 1)%2));
				var item = slides[i];
				if(item){
					$target.queue(function(next){
						if($target.hasClass("right")){
							$target2.addClass("left");
							$target.removeClass("right");
							$target.html(item.html);
						}else{
							$target.addClass("left");
							$target2.removeClass("right");
							$target2.html(item.html);
						}
						i = (i + 1) % slides.length;
						next();
					})
					.delay(1000)
					.queue(function(next){
						if($target.hasClass("left")){
							$target.removeClass("left");
							$target.addClass("right");
						}else{
							$target2.removeClass('left');
							$target2.addClass("right");
						}
						next();
					})
					.delay(100+item.time)
					.queue(function(next){
						func();
						next();
					});
				}
			}
			func();
		}
	});
})(jQuery);