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

const doNav = () => {
  //const navClassName = ".nav";
  //nav_(navClassName);
  const nav1 = "#nav1";
  new Nav(nav1);
};

const MVOTING_LAYOUT = {
  is_mobile: false,
  inint() {
    let window_width = $(window).width();
    this.mobile_check(window_width);
  },
  mobile_check(window_width) {
    if (window_width < 721) {
      this.is_mobile = true;
    } else {
      this.is_mobile = false;
    }
    //this.main_grid();
  },
};
// jQuery(".Page .main_menu>nav>ul").mouseleave(function () {
//   let no_delay = true;
//   //let menu_detail = null;
//   //KEAD_LAYOUT.header_enter = true;
//   KEAD_LAYOUT.mouse_prev = true;
//   KEAD_LAYOUT.hover_link = $(this).children("a");
//   KEAD_LAYOUT.menu_detail_prev = $(KEAD_LAYOUT.hover_link)
//     .closest("li")
//     .index();
//   //alert(KEAD_LAYOUT.menu_detail_prev);
//   KEAD_LAYOUT.close_menu_detail(false, no_delay);
// });
// jQuery(".Page .main_menu>nav>ul").mouseleave(function () {
//   KEAD_LAYOUT.close_menu_detail();
// });
// jQuery(".Page .main_menu>nav>ul>li").mouseenter(function () {
//   //console.log('123456');
//   let delay = true;
//   KEAD_LAYOUT.hover_link = $(this).children("a");
//   KEAD_LAYOUT.menu_detail_idx = $(KEAD_LAYOUT.hover_link).parent("li").index();
//   //alert(KEAD_LAYOUT.menu_detail_idx);
//   if (KEAD_LAYOUT.mouse_prev) {
//     KEAD_LAYOUT.header_enter = false;
//   } else {
//     KEAD_LAYOUT.header_enter = true;
//   }

//   if (KEAD_LAYOUT.header_enter) {
//     delay = true;
//   } else {
//     delay = false;
//   }

//   KEAD_LAYOUT.open_menu_detail(KEAD_LAYOUT.hover_link, delay);
// });
