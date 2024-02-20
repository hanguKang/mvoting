import { random } from "./util";
//import { nav_ } from "./nav";
import { Nav } from "./nav";
import _ from "lodash";
import $ from "jquery";
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";

// const rOne = random(10);
// const rTwo = random(20);

// console.log(`${rOne} ${rTwo}`);

// function component() {
//   //alert('test');
//   let element = document.createElement("div");

//   /* lodash */
//   element.innerHTML = _.join(["Hello", "gulp"], " "); //lodash는 명시적으로 _로 바인딩한다.
//   return element;
// }

// document.body.appendChild(component());

$(function () {
  MVOTING_LAYOUT.init();
  //carousel
  const carousel = new bootstrapMin.Carousel("#myCarousel");
  //modal
  modal();
  //nav
  doNav();
});

//모달
const modal = () => {
  const tsch_layer_popup = document.getElementById("tsch_layer_popup");
  const tSchType2 = document.getElementById("tSchType2");

  tsch_layer_popup.addEventListener("shown.bs.modal", () => {
    tSchType2.focus();
  });

  $("a.btn.head_common_btn.btn_detail_search.btn-primary").on(
    "click",
    function (e) {
      e.preventDefault();
    }
  );
};
//네비게이터
const doNav = () => {
  //const navClassName = ".nav";
  //nav_(navClassName);
  const nav_web = "#common_menu_left";
  new Nav(nav_web);
};

const MVOTING_LAYOUT = {
  header_enter: true,
  is_mobile: false,
  mouse_prev: false,
  hover_link: false,
  menu_detail_idx: 0,
  menu_detail_prev: false,
  init() {
    //alert(1111);
    let window_width = $(window).width();
    this.mobile_check(window_width);
    // nav > ul
    document.querySelector(".Page .main_menu>.nav>.nav_list").onmouseleave = () => {
      //----- MVOTING_LAYOUT.close_menu_detail();
    };
    // nav > ul > li
    document
      .querySelectorAll(".Page .main_menu>.nav>ul.nav_list>li.nav_item").forEach((elem)=>{
        elem.addEventListener("mouseenter", (e) => {
          let delay = true,
          cur_li = e.currentTarget;
          MVOTING_LAYOUT.hover_link = Array.prototype.filter.call(cur_li.children, x=> {
            if (x.tagName == "A") return x;
          })[0];
          // console.log('========');
          // console.dir(MVOTING_LAYOUT.hover_link);
          MVOTING_LAYOUT.menu_detail_idx = Array.prototype.findIndex.call( MVOTING_LAYOUT.hover_link.closest("ul").children, x => x == cur_li )
          console.log(MVOTING_LAYOUT.menu_detail_idx);
          //alert(MVOTING_LAYOUT.menu_detail_idx);
          if (MVOTING_LAYOUT.mouse_prev) {
            MVOTING_LAYOUT.header_enter = false;
          } else {
            MVOTING_LAYOUT.header_enter = true;
          }
  
          if (MVOTING_LAYOUT.header_enter) {
            delay = true;
          } else {
            delay = false;
          }
  
          MVOTING_LAYOUT.open_menu_detail(MVOTING_LAYOUT.hover_link, delay);
        });
      }); // forEach End
      
  },
  mobile_check(window_width) {
    if (window_width < 721) {
      this.is_mobile = true;
    } else {
      this.is_mobile = false;
    }
    //this.main_grid();
  },
  // close_menu_detail: function ($_this, no_delay) {
  //   //console.log($_this);
  //   //console.log('닫혔음');

  //   let $_menu_detail = `.Page .menu_detail`;
  //   let $_wait = 200;

  //   if ($_this) {
  //     $_menu_detail = $_this;
  //   }
  //   if (no_delay) {
  //     $_wait = 0;
  //     $(MVOTING_LAYOUT.hover_link).css("color", "#000000");
  //   }

  //   jQuery($_menu_detail).slideUp($_wait, function () {
  //     //console.log('닫혔다.');
  //     //        	if($("section.main").length == 1){ //메인페이지 일 때만 작동
  //     //            	$(".depth1Class").css("color", "#fff");
  //     //            }else{
  //     //            	$(".depth1Class").css("color", "#000000");
  //     //            }

  //     //            try{
  //     //            	if(fn_setWhiteSet){
  //     //                	fn_setWhiteSet();
  //     //                }
  //     //            }catch (e) {
  //     //
  //     //    		}
  //     //닫힐 때 모두 검정색
  //     $(".depth1Class").css("color", "#000000");
  //   });
  //   jQuery(`.Page .menu_detail`).removeClass("open");
  //   //        setTimeout(function(){
  //   //        	jQuery('.Page.main>header').removeClass('act');
  //   //        },$_wait);

  //   jQuery(".Page.main>header").removeClass("act");
  //   this.blocking_layer(false);
  // }, //close_menu_detail() End
  open_menu_detail: function (_link, delay) {
    // if ( document.querySelector(".Page").classList.contains("open_all_menu") ) {
    //   return false;
    // }
    let link = _link;
    let nxtElm = false;
    if(link.nextElementSibling) nxtElm = link.nextElementSibling;
    document.querySelector(".menu_detail").classList.remove("open");
    //jQuery(".menu_detail:not(.open)").css("display", "none");
    document.querySelector(".Page.main>header").classList.add("act");
    if (delay) {
      setTimeout(function () {
        //li:mouseenter 이벤트로 자식요소 a를 return  / open_menu_detail 할때는  a링크
        
        if (link && nxtElm && nxtElm.classList.contains(".menu_detail") ) {
          const target = nxtElm;
          target.classList.add("open"); //내가 열려는 요소에 open클래스 적용
          
          //try{
          //     	if(fn_setBlueSet){
          //         fn_setBlueSet();
          //      }
          //}catch (e) {
          //
          //}

          $(target).slideDown(300);

          MVOTING_LAYOUT.blocking_layer(true);
          //$(".depth1Class").css("color", "#000000"); 네비게이터 depth1 색상 검정색
          link.style.color = "#016FF3";
        }
        return false;
      }, 300);
    } else {
      //console.log('여기야.');
      
      const target = nxtElm;
      target.classList.add("open");

      //li부분으로 mouseleave인지, 서브네비게이터 상자에서 mouse가 떠난건지 판별
      if (MVOTING_LAYOUT.mouse_prev) {
        let prev_height = $(".menu_detail")
          .eq(MVOTING_LAYOUT.menu_detail_prev)
          .css("height");
        //console.log(prev_height);
        jQuery(target)
          .css({ display: "block", height: prev_height })
          .animate(
            { height: menu_detail_heights[MVOTING_LAYOUT.menu_detail_idx] },
            100
          );
      } else {
        jQuery(target).slideDown(300);
      }

      this.blocking_layer(true);

      $(".depth1Class").css("color", "#000000");
      $(link).css("color", "#016FF3");
    }
  }, //open_menu_detail() End
  blocking_layer: function (act) {
    if (act) {
      jQuery(".Page .blocking_layer").slideDown(0);
    } else {
      jQuery(".Page .blocking_layer").slideUp(0);
    }
  }, // blocking_layer() End
};
