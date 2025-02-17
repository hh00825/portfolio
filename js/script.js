// AOS & gsap setting
AOS.init({
	once: true,
});
gsap.registerPlugin(ScrollTrigger);


//smooth scroll
const lenis = new Lenis();
function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


//intro timeline
const introTl = gsap.timeline();
window.addEventListener('load', () => {
	const introElement = document.querySelector("#intro");
	const introTitle = document.querySelector(".intro_title");

	introTl.to(".intro_title .tit_holder",{
		onStart: function(){
			introTitle.classList.add("active");
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
function tabFnc(){
	const worksBtns = document.querySelectorAll(".works_cate > button");
	const worksItems = document.querySelectorAll(".works_list .item");

	worksBtns.forEach(worksBtn => {
		worksBtn.addEventListener("click", () => {			
			const filterValue = worksBtn.dataset.filter;
			
			worksBtns.forEach(btn => btn.classList.remove("current"));
			worksBtn.classList.add("current");

			worksItems.forEach(worksItem => {
				if(filterValue === "all" || worksItem.classList.contains(filterValue)){
					worksItem.classList.remove("hide");
				}else{
					worksItem.classList.add("hide");
				}
			});
		});
	});
}
tabFnc();


onElementHeightChange(document.body, function(){
	AOS.refresh();
	ScrollTrigger.refresh();
});

function onElementHeightChange(elm, callback) {
	let lastHeight = elm.clientHeight
	let newHeight;

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
