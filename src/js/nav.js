// const nav_ = (navList) => {
//   const nv = document.querySelector(navList).children;

//   const removeClass = (className) => {
//     for (let nvItem of nv) {
//       nvItem.classList.remove(className);
//     }
//   };

//   if (nv) {
//     for (let nvItem of nv) {
//       nvItem.addEventListener("click", function (e) {
//         let navItem_this = e.currentTarget;
//         let navItem_this_class = navItem_this.classList;
//         removeClass("active");

//         e.preventDefault();

//         navItem_this_class.add("active");
//         // const this_nav = document.getElementsByTagName(e.target.getAttribute('class'));
//         // this_nav.classList.add = "acitve";
//       });
//     }
//   } else {
//     return;
//   }
// };
class Nav {
  constructor(elem) {
    let $_this = this;
    $_this._elem = document.querySelector(elem);
    //console.log(this._elem);
    //$_this._elem.addEventListener('click', $_this.on_Event.bind($_this) ); // this.onClick은 this에 바인딩했다. 이렇게 하지 않으면 this는 Nav Class가 아닌 DOM 요소(elem)- 즉, 현재 class를 참조하게 된다. 이렇게 하지 않으면 this[action]에서 원하는 것을 얻지 못한다.
    //console.dir(this._elem.querySelectorAll("a")); //nodeList를 return
    $_this._descendants_a = Array.prototype.slice.call(
      //arrayList를 return
      $_this._elem.querySelectorAll("a")
    );
    //console.dir(this._descendants_a);
    $_this._descendants_a.forEach(function (descendant) {
      descendant.addEventListener("focus", $_this.on_Event.bind($_this));
      descendant.addEventListener("mouseenter", $_this.on_Event.bind($_this));
    });
  }

  addClass(targetElm) {
    //console.dir(targetElm.classList);
    targetElm.classList.add("active");
    let siblings = (t) =>
      [...t.parentElement.children].filter((e) => {
        if (e != t) {
          e.classList.remove("active");
        }
      });

    siblings(targetElm); //li요소
  }

  save() {
    alert("저장하기");
  }

  load() {
    alert("불러오기");
  }

  search() {
    alert("검색하기");
  }

  on_Event(event) {
    //console.log("inininin");
    //console.log(this);
    event.preventDefault();
    console.dir(event.target.parentElement.tagName);
    if (event.target.parentElement.tagName == "LI") {
      //alert(11111);
      let targetElm = event.target.parentElement;
      let action = targetElm.dataset.action; //this의 자식 요소에게 각각 다른 이멘트를 매칭하고 싶을 때 this의 각 자식 요소의 data-action="save" .. 등 속성을 지정하고 사용해서 Nav 클래스에 미리 만둘어둔 save, load, search등을 사용할 수 있다.
      //console.log(action);
      if (action) {
        //this[action]();
        this[action](targetElm);
      }
    }
  }
}

//export { nav_ };
export { Nav };
