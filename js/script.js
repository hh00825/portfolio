// AOS & gsap setting
AOS.init({
	once: true,
});
gsap.registerPlugin(ScrollTrigger);

//smooth scroll
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

//intro timeline
const introTl = gsap.timeline();
window.addEventListener('load', () => {
	introTl.to(".intro_title .tit_holder",{
		onStart: function(){
			document.querySelector(".intro_title").classList.add("active");
		}
	})
	.to("#intro .circle_01",{
		clipPath: "circle(100% at 50% 50%)",
		duration: 1.5,
	},"=+1.8")
	.to("#intro .circle_02",{
		clipPath: "circle(100% at 50% 50%)",
		duration: 1.8,
		onStart: function(){
			setTimeout(() => {
				document.querySelector("#intro").classList.add("out");
			}, 1400);
		},
		onComplete: function(){
			document.body.classList.remove("no_scroll");
		}
	},"<0.45")
});

//main haejin timeline
const mvTl = gsap.timeline({
	scrollTrigger: {
		trigger: "#main_haejin",
		start: "top top",
		pin: true,
		scrub: 0.5,
	}
})
mvTl.to("#main_haejin .text_01",{
	xPercent: -30,
},"text_moving")
.to("#main_haejin .text_02",{
	xPercent: 30,
},"text_moving")
.fromTo("#main_haejin .text_box_copy",{
	clipPath: "circle(0% at 0% 0%)"
},{
	clipPath: "circle(100% at 50% 50%)",
	backgroundColor: "#2367ff7a"
})
.to("#main_haejin .text_box_copy",{
	clipPath: "circle(3% at 50% 50%)"
})

//contact gsap
gsap.to("#contact .bg_text",{
	scrollTrigger: {
		trigger: "#contact .bg_text",
		start: "top 80%",
		toggleClass:"active"
	}
})

// works catecory tab
const worksBtn = $(".works_cate > button");
const worksItem = $(".works_list .item");
worksBtn.on( "click", function() {
	worksBtn.find(".current").removeClass("current");
	$(this).addClass("current");

	var thisFilter = $(this).data("filter");

	if(thisFilter == "all"){
		worksBtn.removeClass("current");
		$(this).addClass("current");
		worksItem.removeClass("hide");
	}else{
		worksBtn.removeClass("current");
		$(this).addClass("current");

		worksItem.addClass("hide");
		$(".works_list .item."+thisFilter).removeClass("hide");
	}
});

onElementHeightChange(document.body, function(){
	AOS.refresh();
	ScrollTrigger.refresh();
});
  
function onElementHeightChange(elm, callback) {
	var lastHeight = elm.clientHeight
	var newHeight;

	(function run() {
		newHeight = elm.clientHeight;      
		if (lastHeight !== newHeight) callback();
		lastHeight = newHeight;

		if (elm.onElementHeightChangeTimer) {
			clearTimeout(elm.onElementHeightChangeTimer); 
		}

		elm.onElementHeightChangeTimer = setTimeout(run, 200);
	})();
}
