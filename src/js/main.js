import { random } from "./util";
import _ from "lodash";
import $ from "jquery";
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";

const rOne = random(10);
const rTwo = random(20);

console.log(`${rOne} ${rTwo}`);

function component() {
  //alert('test');
  let element = document.createElement("div");

  /* lodash */
  element.innerHTML = _.join(["Hello", "gulp"], " "); //lodash는 명시적으로 _로 바인딩한다.
  return element;
}

document.body.appendChild(component());

$(function () {
  //carousel
  const carousel = new bootstrapMin.Carousel("#myCarousel");

  //modal
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
});
