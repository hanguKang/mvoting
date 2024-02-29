/**
 * 한국장애인고용공단 Lyout 관련 공통 기능
 * coForward :2022-11-17
 */
<<<<<<< HEAD
jQuery(function () {
  KEAD_LAYOUT.init();

  /*header 색상변경*/
});

var KEAD_LAYOUT = {
  focusedElementBeforeModal: null,
  menu_detail_idx: 0,
  header_enter: true,
  mouse_prev: false, //이전에 마우스에서 마우스로 이동한 것 확인
  menu_detail_prev: 0,
  zoom_level: 100,
  hover_link: false,
  interval_main_silde: false,
  is_mobile: false,
  main_grid_width: 480,
  init: function () {
    //전자점자 view 페이지
    //전자점자 view페이지 속성 넣기
    if ($(".board_view").length > 0) {
      let rowCnt = 0;
      let colCnt = 0;
      let board_view = $(".board_view").eq(0);
      //console.log(board_view);
      board_view.attr({ "data-brl-use": "TH", "data-brl-tbltype": 4 });

      if (board_view.children("header").children("dl").length > 0) {
        colCnt = board_view.children("header").children("dl").children().length;
        board_view
          .children("header")
          .children("dl")
          .children()
          .each(function () {
            console.log($(this).prop("tagName"));
            if (
              $(this).prop("tagName") == "DT" ||
              $(this).prop("tagName") == "dt"
            ) {
              $(this).attr("data-brl-flag", 5);
            } else if (
              $(this).prop("tagName") == "DD" ||
              $(this).prop("tagName") == "dd"
            ) {
              $(this).attr("data-brl-flag", 6);
            }
          });
      }

      rowCnt += board_view.children("header").children().length;
      rowCnt += board_view.children(".body").children().length;

      board_view.attr({
        "data-brl-rowsize": rowCnt,
        "data-brl-colsize": colCnt,
      });
      board_view
        .children("header")
        .children("h1")
        .attr({ "data-brl-colspan": colCnt, "data-brl-flag": 1 });

      if (board_view.children(".body").children(".main_text").length > 0) {
        board_view
          .children(".body")
          .children(".main_text")
          .each(function () {
            $(this).attr({ "data-brl-colspan": colCnt, "data-brl-flag": 7 });
          });
      }
      if (board_view.children(".body").children(".file_list").length > 0) {
        board_view
          .children(".body")
          .children(".file_list")
          .attr({ "data-brl-colspan": colCnt, "data-brl-flag": 8 });
      }

      if (board_view.children(".body").children(".thumbImg").length > 0) {
        board_view
          .children(".body")
          .children(".thumbImg")
          .attr({ "data-brl-colspan": colCnt, "data-brl-flag": 7 });
      }
    }

    //모바일 체크
    let window_width = jQuery(window).width();
    KEAD_LAYOUT.mobile_check(window_width);

    jQuery(window).on("resize", function () {
      let window_width = jQuery(window).width();
      KEAD_LAYOUT.mobile_check(window_width);
    });
    jQuery(window).on("scroll", function () {
      let scroll_hight = jQuery(window).scrollTop();
      if (scroll_hight > 20) {
        jQuery(".Page.main >header").addClass("scroll");
      } else {
        jQuery(".Page.main >header").removeClass("scroll");
      }
    });

    //blocking_layer 추가
    jQuery(".Page").append('<div class="blocking_layer on"></div>');
    //메인 페이지 팝업
    jQuery(".main_popup .btn_close").on("click", function () {
      jQuery(".main_popup").remove();
    });
    KEAD_LAYOUT.ini_main_popup();

    //메인페이지 블럭
    jQuery(".main_indicator button").on("click", function () {
      KEAD_LAYOUT.main_block(this);
    });
    //메인슬라이더
    KEAD_LAYOUT.init_main_silder();
    //슬라이더 기능
    let slider = jQuery(".slider,.slider_div,.president_slide");
    if (slider.length > 0) {
      this.init_slider(slider[0]);
    }
    //검색버튼 기능
    jQuery(".Page .main_menu .btn_search").on("click", function () {
      KEAD_LAYOUT.search_layer(this);
    });
    jQuery(".main_menu .btn_search").on("focus", function () {
      KEAD_LAYOUT.close_menu_detail();
    });
    //전체메뉴 기능
    jQuery(".main_menu .btn_all_menu").on("click", function () {
      KEAD_LAYOUT.open_all_menu();
    });
    jQuery(".Page>.all_menu button").on("click", function () {
      KEAD_LAYOUT.close_all_menu();
    });
    //서브메뉴기능
    jQuery(".Page .main_menu>nav>ul>li").mouseenter(function () {
      //console.log('123456');
      let delay = true;
      KEAD_LAYOUT.hover_link = $(this).children("a");
      KEAD_LAYOUT.menu_detail_idx = $(KEAD_LAYOUT.hover_link)
        .parent("li")
        .index();
      //alert(KEAD_LAYOUT.menu_detail_idx);
      if (KEAD_LAYOUT.mouse_prev) {
        KEAD_LAYOUT.header_enter = false;
      } else {
        KEAD_LAYOUT.header_enter = true;
      }

      if (KEAD_LAYOUT.header_enter) {
        delay = true;
      } else {
        delay = false;
      }

      KEAD_LAYOUT.open_menu_detail(KEAD_LAYOUT.hover_link, delay);
    });
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
    jQuery(".Page .main_menu>nav>ul").mouseleave(function () {
      KEAD_LAYOUT.close_menu_detail();
    });

    //화면 어디를 클릭해도 하단 메뉴 닫히기
    $(document).on("click", function (e) {
      let targetElm = e.target;
      let container = $(".Page");

      if (!$(targetElm).hasClass("btm_btn")) {
        //alert(1234);
        if (
          $(targetElm).closest(container).length > 0 &&
          $(".Page>footer .relevant_link ul").hasClass("open")
        ) {
          KEAD_LAYOUT.relevant_link_close(
            $(".Page>footer .relevant_link button.open")
          );
        }
      }
    });

    //        jQuery('.Page>header>nav').mouseleave(function(){
    //        	KEAD_LAYOUT.header_enter = false;
    //        	KEAD_LAYOUT.hover_link=false;
    //        	KEAD_LAYOUT.close_menu_detail(this);
    //        });

    jQuery(".Page .main_menu>nav>ul>li>a").on("focus", function () {
      KEAD_LAYOUT.open_menu_detail(this);
    });
    jQuery(".Page .menu_detail").mouseleave(function () {
      KEAD_LAYOUT.close_menu_detail(this);
      KEAD_LAYOUT.mouse_prev = false;
    });
    //현재경로 기능
    jQuery(".now_path button").on("click", function () {
      KEAD_LAYOUT.now_path(this);
    });
    jQuery(".Page>main").on("click", function () {
      KEAD_LAYOUT.now_path_close();
    });
    //화면크기 기능
    jQuery(".Page .sub_menu_div .btn_plus").on("click", function () {
      KEAD_LAYOUT.zoom("in");
    });
    jQuery(".Page .sub_menu_div .btn_minus").on("click", function () {
      KEAD_LAYOUT.zoom("out");
    });
    jQuery(".Page .sub_menu_div .btn_reset").on("click", function () {
      KEAD_LAYOUT.zoom("reset");
    });
    //Quick menu 기능
    jQuery(".quick_menu button").on("click", function () {
      if (jQuery(this).hasClass("open")) {
        jQuery(this).removeClass("open");
        jQuery(".quick_menu ul").slideUp();
      } else {
        jQuery(this).addClass("open");
        jQuery(".quick_menu ul").slideDown();
      }
    });
    jQuery(window).on("scroll", function () {
      let now_top = parseInt(jQuery(".quick_menu").css("top"));
      let new_top = 60 + jQuery(document).scrollTop();
      jQuery(".quick_menu").css({ top: new_top });
    });

    //공유버튼 레이어기능
    jQuery(".Page header .btn_share").on("click", function () {
      KEAD_LAYOUT.focusedElementBeforeModal = document.activeElement;
      KEAD_LAYOUT.share_layer();
    });
    //삭제버튼 레이어기능
    jQuery(".Page .delete_div .btn_delete").on("click", function () {
      KEAD_LAYOUT.delete_layer();
    });

    //레이어 닫기
    jQuery(".Page .layer_div .btn_close").on("click", function () {
      KEAD_LAYOUT.close_layer(this);
    });

    //공시송달 레이어 입력타입 선택
    jQuery('.Page .layer_div.public_notice input[type="radio"]').on(
      "change",
      function () {
        KEAD_LAYOUT.public_notice_type(this);
      }
    );

    //공시송달 레이어 표시
    jQuery(".Page .board_table.public_notice button").on("click", function () {
      KEAD_LAYOUT.public_notice_layer(this);
    });

    //Q&A 리스트 기능
    jQuery(".Page .board_qa>dt>button,.Page .board_dl>dt>button").on(
      "click",
      function () {
        KEAD_LAYOUT.qa_board($(this).parent("dt"));
      }
    );
    //jQuery('.Page .board_qa>dt>button,.Page .board_dl>dt>button').on('keydown',function(e){
    //e.preventDefault();
    //    if(e.keyCode==13 || e.keyCode==32){
    //    	KEAD_LAYOUT.qa_board( $(this).parent('dt') );
    //    }
    //});
    //찾아오시는길 리스트
    jQuery(".board_table.directions button").on("click", function () {
      let target_tr = jQuery(this).parents("tr").next();
      if (jQuery(this).hasClass("open")) {
        jQuery(this).removeClass("open");
        $(".hiddenMap").attr("aria-hidden", "false");
        target_tr.find("td, ul, p").slideUp(300);
      } else {
        jQuery(this).addClass("open");
        $(".hiddenMap").attr("aria-hidden", "true");
        target_tr.find("td, ul, p").slideDown(300);
      }
    });

    //자가진단 영상리스트 레이어 표시
    jQuery('button[data-popup="popu1"]').on("click", function () {
      KEAD_LAYOUT.open_movie_list();
    });
    //jQuery('').on('click',function(){KEAD_LAYOUT.open_movie_list()})
    //jQuery('article.movie_list button').on('click',function(){KEAD_LAYOUT.close_movie_list()})

    //하단 연관기관 셀렉터
    jQuery(".Page>footer .relevant_link button").on("click", function () {
      if (jQuery(this).hasClass("open")) {
        KEAD_LAYOUT.relevant_link_close(this);
      } else {
        KEAD_LAYOUT.relevant_link_open(this);
      }
    });

    //역대이사장 상세 이미지 뷰어
    jQuery(".president_slide a").on("click", function () {
      KEAD_LAYOUT.president_slide(this);
      return false;
    });
    jQuery(".Page").on("click", ".image_view_layer button", function () {
      jQuery(this).parents(".image_view_layer").remove();
      KEAD_LAYOUT.blocking_layer(false);
    });

    //직업능력개발원 맵 툴팁 표시기능
    jQuery(".Job_skill.main_map area").on("mouseover", function () {
      KEAD_LAYOUT.map_title(this);
    });
    jQuery(".Job_skill.main_map area").on("mouseleave", function () {
      KEAD_LAYOUT.map_title_remove();
    });
    jQuery(".Job_skill.main_map .list a").on("mouseover", function () {
      KEAD_LAYOUT.map_info(this);
    });
    jQuery(".Job_skill.main_map .list a").on("focus", function () {
      KEAD_LAYOUT.map_info(this);
    });
    jQuery(".Job_skill.main_map .list").on("mouseleave", function () {
      KEAD_LAYOUT.map_title_remove();
      jQuery(".Job_skill.main_map .list article").slideUp();
    });
    jQuery(".Job_skill.main_map .list article").on("mouseleave", function () {
      jQuery(this).slideUp();
      jQuery(".Job_skill.main_map .list a").removeClass("hover");
    });

    //개인정보 처리방침 내부 링크
    jQuery(".privacy_label a,.privacy_content a").on("click", function () {
      let target_id = jQuery(this).attr("href");
      let pos = jQuery(target_id).offset();
      jQuery(window).scrollTop(pos.top - 210);
      return false;
    });

    //header 색상
    //#1. 공단에서 흰색에서 배경없음 > #2. 공단에서 다시 흰색 > #3. 공단에서. 변경사항이 자주 나옴.
    KEAD_LAYOUT.init_header_color();
    //#커튼 클릭하면
    jQuery(".Page .blocking_layer").on("click", function () {
      jQuery(".Page .main_menu .btn_search").trigger("click");
      KEAD_LAYOUT.blocking_layer(false);
    });
  },
  mobile_check(window_width) {
    if (window_width < 800) {
      this.is_mobile = true;
    } else {
      this.is_mobile = false;
    }
    this.main_grid();
  },

  ini_main_popup() {
    let item_cnt = jQuery(".popup_slider li").length;
    let indicator_button = "";
    jQuery(".popup_slider").attr("data-slide_item", item_cnt);
    for (let i = 0; i < item_cnt; i++) {
      indicator_button += `<button>${i + 1}</button>`;
    }
    jQuery(".popup_slider .indicator").append(indicator_button);
    jQuery(".popup_slider .indicator").on("click", "button", function () {
      let act_number = jQuery(this).text();
      console.log(act_number);
      KEAD_LAYOUT.main_popup_number(act_number);
    });
    jQuery(".popup_slider>button").on("click", function () {
      if (jQuery(this).hasClass("btn_close")) {
        return false;
      }
      let now_number = parseInt(
        jQuery(".popup_slider .indicator button.act").text()
      );
      let item_cnt = jQuery(".popup_slider").attr("data-slide_item");
      let new_number;
      if (jQuery(this).hasClass("btn_pre")) {
        new_number = now_number - 1;
      } else if (jQuery(this).hasClass("btn_next")) {
        new_number = now_number + 1;
      }
      if (new_number < 1 || new_number > item_cnt) {
        return false;
      }
      KEAD_LAYOUT.main_popup_number(new_number);
    });
    this.main_popup_number(1);
  },
  main_popup_number(number) {
    jQuery(`.popup_slider .indicator button`).removeClass("act");
    jQuery(`.popup_slider .indicator button:nth-of-type(${number})`).addClass(
      "act"
    );
    let new_left = -992 * (number - 1);
    jQuery(`.popup_slider ul`).animate({ left: new_left }, 300);
  },

  main_grid() {
    let main_grid_width = parseInt(
      jQuery(".main_grid .grid_body").css("width")
    );
    if (isNaN(main_grid_width)) {
      return false;
    }
    if (this.is_mobile) {
      this.main_grid_width = main_grid_width;
    } else {
      this.main_grid_width = 480;
    }
    //console.log(this.main_grid_width);
    jQuery(".main_grid .slider_box_big .slider_content ul>li").css({
      width: `${main_grid_width}px`,
    });
    jQuery(".main_grid .slider_box ul li").css({
      width: `${main_grid_width / 2}px`,
    });
    let btn = jQuery(".main_grid .main_indicator button.act");

    let slider = jQuery(".main_grid .slider.act");
    KEAD_LAYOUT.main_slider_number(slider, 1, "now");

    this.main_block(btn, "now");
  },

  main_block(btn, delay) {
    let animation_time = delay == "now" ? 0 : 300;
    jQuery(".main_indicator button").removeClass("act");
    jQuery(btn).addClass("act");
    let number = jQuery(btn).attr("data-num");
    let new_left = (-this.main_grid_width / 2) * (number - 1);
    jQuery(".main_grid .slider_box ul").animate(
      { left: new_left },
      animation_time
    );
    //jQuery('.main_grid .slider_box_big>ul').animate({left:new_left_big},300);
    //let act_slide=jQuery(`.main_grid .slider_box_big>ul>li:nth-of-type(${number})`);
    //this.main_slider_auto(act_slide);

    //메인 배경이미지
    jQuery(".Page").attr("data-bg", number);
  },
  init_main_silder() {
    //메인 배너 슬라이더 - khk
    let slider = jQuery(".main_grid .slider");
    //console.log(slider);
    let slider_cnt = slider.length;
    let _$lefts = [];
    let _last = $("div.slider.act>div.slider_content>ul>li").length - 1;
    let _trailer = document.querySelector("#trackter");

    for (let i = 0; i < slider_cnt; i++) {
      let items = jQuery(slider[i]).find(".slider_content li");
      item_cnt = items.length;
      let indicator = jQuery(slider[i]).find(".sub_indicator ul");
      indicator.empty();
      let indicator_item = "";
      for (j = 0; j < item_cnt; j++) {
        indicator_item +=
          '<li><button tabindex="-1">' + (j + 1) + "</button></li>";
      }
      indicator.append(indicator_item);
    }
    let act_slider = slider[0];
    this.main_slider_auto(act_slider);

    //메인배너 슬라이더 불릿 버튼 클릭 - khk
    jQuery(".main_grid .sub_indicator ul>li>button").on("click", function () {
      //console.log('kekekeke');
      if (KEAD_LAYOUT.interval_main_silde) {
        clearInterval(KEAD_LAYOUT.interval_main_silde);
      }

      jQuery(this)
        .parents("div.sub_indicator")
        .find("button.autoplay")
        .removeClass("on")
        .addClass("off")
        .attr("title", "자동 배너 재생 시작");

      let act_number = jQuery(this).text() * 1;
      //console.log('!!!!!!!!');
      //console.log(act_number);
      let slider = jQuery(".main_grid .slider.act");
      KEAD_LAYOUT.main_slider_number(slider, act_number);

      return false;
    });

    //메인배너 슬라이더 자동재생버튼 - khk
    $(".main_grid .sub_indicator>button.autoplay").on("click", function () {
      //alert(1234);
      if (jQuery(this).hasClass("on")) {
        if (KEAD_LAYOUT.interval_main_silde) {
          clearInterval(KEAD_LAYOUT.interval_main_silde);
        }
        jQuery(this).removeClass("on").addClass("off");
        jQuery(this).attr("title", "메인 배너 자동 재생 시작");
        jQuery(this).children("span").text("메인 배너 자동 재생 시작");
      } else {
        let slider = jQuery(".main_grid .slider.act");
        jQuery(this).removeClass("off").addClass("on");
        jQuery(this).attr("title", "메인 배너 자동 재생 멈춤");
        jQuery(this).children("span").text("메인 배너 자동 재생 멈춤");
        KEAD_LAYOUT.main_slider_auto(slider);
      }
    });

    // 메인 배너 이전 버튼 클릭 - khk
    $(".btn_main.btn_main_prev").on("click", "button", function () {
      if ($(".autoplay").hasClass("on")) $(".autoplay").trigger("click");
      let idx = $(".main_grid .sub_indicator>ul>li>button.act")
        .parent()
        .index();
      idx -= 1;
      if (idx < 0) {
        alert("배너 처음 페이지입니다.");
        return false;
      } else {
        //_trailer.addEventListener('scroll',()=>{
        //	this.scrollLeft = _$lefts[idx];
        //});
        $(".main_grid .sub_indicator>ul>li")
          .eq(idx)
          .children("button")
          .trigger("click");
      }
    });
    // 메인 배너 다음 버튼 클릭 - khk
    $(".btn_main.btn_main_next").on("click", "button", function () {
      //alert(123456);
      if ($(".autoplay").hasClass("on")) $(".autoplay").trigger("click");
      let _length = $("div.slider.act>div.slider_content>ul>li").length;
      let idx = $(".main_grid .sub_indicator>ul>li>button.act")
        .parent()
        .index();
      idx += 1;
      //alert(idx);
      if (idx > _length - 1) {
        alert("배너 마지막 페이지입니다.");
        return false;
      } else {
        //_trailer.addEventListener('scroll',()=>{
        //	this.scrollLeft = _$lefts[idx];
        //});
        $(".main_grid .sub_indicator>ul>li")
          .eq(idx)
          .children("button")
          .trigger("click");
      }
    });

    // 메인배너 슬라이드 focus - khk
    $("div.slider.act>div.slider_content>ul>li").each(function (idx, val) {
      _$lefts.push(-idx * KEAD_LAYOUT.main_grid_width); //왼쪽으로 이동할 값 넣기

      $(this)
        .children("a")
        .focus(function () {
          if ($(".autoplay").hasClass("on")) {
            $(".autoplay").trigger("click");
          }

          let _idx = idx;
          let _lastCnt =
            $("div.slider.act>div.slider_content>ul>li").length - 1;

          let cnt = $(this).parent("li").index();

          $(".main_grid .sub_indicator>ul>li>button.act").removeClass("act");
          $(".main_grid .sub_indicator>ul>li")
            .eq(cnt)
            .children("button")
            .addClass("act");

          if (_idx == 0) {
            console.log("처음");
            console.log(_idx);
            $("div.slider.act>div.slider_content>ul").css("left", 0);

            return false;
          } else if (_idx != 0 && _idx != _lastCnt) {
            console.log("중간");
            console.log(_idx);
            _trailer.addEventListener("scroll", function (e) {
              console.log(e.type);
              console.log("hehehehe");
=======
jQuery(function(){
  KEAD_LAYOUT.init();
  
  /*header 색상변경*/
  

})

var KEAD_LAYOUT={
focusedElementBeforeModal:null,
menu_detail_idx:0,
header_enter:true,
mouse_prev:false, //이전에 마우스에서 마우스로 이동한 것 확인
menu_detail_prev:0,
  zoom_level:100,
  hover_link:false,
  interval_main_silde:false,
  is_mobile:false,
  main_grid_width:480,
  init:function(){
    
    //전자점자 view 페이지
    //전자점자 view페이지 속성 넣기
    if($('.board_view').length>0){
      let rowCnt = 0;
        let colCnt = 0;
        let board_view = $('.board_view').eq(0);
        //console.log(board_view);
        board_view.attr({'data-brl-use':'TH','data-brl-tbltype':4});
        
        if(	board_view.children('header').children('dl').length > 0 ){
          colCnt = board_view.children('header').children('dl').children().length;
          board_view.children('header').children('dl').children().each(function(){
            console.log($(this).prop('tagName'));
            if($(this).prop('tagName') == 'DT' || $(this).prop('tagName') == 'dt' ) {
              $(this).attr('data-brl-flag',5)
            }else if($(this).prop('tagName') == 'DD' || $(this).prop('tagName') == 'dd' ) {
              $(this).attr('data-brl-flag', 6);
            }
          });
        }		
        
        rowCnt += board_view.children('header').children().length;
        rowCnt += board_view.children('.body').children().length;
        
        board_view.attr({'data-brl-rowsize':rowCnt, 'data-brl-colsize':colCnt});
        board_view.children('header').children('h1').attr({'data-brl-colspan':colCnt, 'data-brl-flag':1});
        
        if(board_view.children('.body').children('.main_text').length>0){
          board_view.children('.body').children('.main_text').each(function(){
            $(this).attr({'data-brl-colspan': colCnt, 'data-brl-flag':7});
          })
        }
        if(board_view.children('.body').children('.file_list').length>0){
          board_view.children('.body').children('.file_list').attr({'data-brl-colspan': colCnt, 'data-brl-flag':8});
        } 
        
        if(board_view.children('.body').children('.thumbImg').length>0){
          board_view.children('.body').children('.thumbImg').attr({'data-brl-colspan': colCnt, 'data-brl-flag':7});
        } 
        
        
    }
    
    
    
    
    
      //모바일 체크
      let window_width=jQuery(window).width();
      KEAD_LAYOUT.mobile_check(window_width);
  
      jQuery(window).on('resize',function(){
          let window_width=jQuery(window).width();
          KEAD_LAYOUT.mobile_check(window_width);
      })
      jQuery(window).on('scroll',function(){
          let scroll_hight=jQuery(window).scrollTop();
          if(scroll_hight>20){
              jQuery('.Page.main >header').addClass('scroll');
          }else{
              jQuery('.Page.main >header').removeClass('scroll');
          }
      });

      //blocking_layer 추가
      jQuery('.Page').append('<div class="blocking_layer on"></div>');
      //메인 페이지 팝업
      jQuery('.main_popup .btn_close').on('click',function(){jQuery('.main_popup').remove();});
      KEAD_LAYOUT.ini_main_popup();
      
      //메인페이지 블럭
      jQuery('.main_indicator button').on('click',function(){
          KEAD_LAYOUT.main_block(this);
      })
      //메인슬라이더
      KEAD_LAYOUT.init_main_silder();
      //슬라이더 기능
      let slider=jQuery('.slider,.slider_div,.president_slide');
      if(slider.length>0){
          this.init_slider(slider[0]);
      }
      //검색버튼 기능
      jQuery('.Page .main_menu .btn_search').on('click',function(){KEAD_LAYOUT.search_layer(this)});
      jQuery('.main_menu .btn_search').on('focus',function(){KEAD_LAYOUT.close_menu_detail()});
      //전체메뉴 기능
      jQuery('.main_menu .btn_all_menu').on('click',function(){KEAD_LAYOUT.open_all_menu()});
      jQuery('.Page>.all_menu button').on('click',function(){KEAD_LAYOUT.close_all_menu()});
      //서브메뉴기능
      jQuery('.Page .main_menu>nav>ul>li').mouseenter(function(){
        //console.log('123456');
        let delay = true;
        KEAD_LAYOUT.hover_link=$(this).children('a');
        KEAD_LAYOUT.menu_detail_idx = $(KEAD_LAYOUT.hover_link).parent('li').index();
        //alert(KEAD_LAYOUT.menu_detail_idx);
        if(KEAD_LAYOUT.mouse_prev){
          KEAD_LAYOUT.header_enter = false;
        }else{
          KEAD_LAYOUT.header_enter = true;
        }        	
        
                  
        if(KEAD_LAYOUT.header_enter){
          delay = true;
        }else{
          delay = false;
        }
        
          
          
          KEAD_LAYOUT.open_menu_detail( KEAD_LAYOUT.hover_link, delay);
      });
      jQuery('.Page .main_menu>nav>ul').mouseleave(function(){
        let no_delay = true;
        //let menu_detail = null;
        //KEAD_LAYOUT.header_enter = true;
        KEAD_LAYOUT.mouse_prev = true;
        KEAD_LAYOUT.hover_link=$(this).children('a'); 
        KEAD_LAYOUT.menu_detail_prev = $(KEAD_LAYOUT.hover_link).closest('li').index();
        //alert(KEAD_LAYOUT.menu_detail_prev);
        KEAD_LAYOUT.close_menu_detail(false, no_delay);
      });
      jQuery('.Page .main_menu>nav>ul').mouseleave(function(){
        KEAD_LAYOUT.close_menu_detail();
      });
      
      //화면 어디를 클릭해도 하단 메뉴 닫히기 
      $(document).on('click',function(e){
        
        let targetElm = e.target;        	
        let container = $('.Page'); 
                  
        if( !$(targetElm).hasClass('btm_btn') ){
          //alert(1234);
          if( $(targetElm).closest(container).length>0 && $('.Page>footer .relevant_link ul').hasClass('open')){
              
              KEAD_LAYOUT.relevant_link_close( $('.Page>footer .relevant_link button.open') );
              
            }	
        }
        
        
      });
      
//        jQuery('.Page>header>nav').mouseleave(function(){
//        	KEAD_LAYOUT.header_enter = false; 
//        	KEAD_LAYOUT.hover_link=false; 
//        	KEAD_LAYOUT.close_menu_detail(this);
//        });
      

      jQuery('.Page .main_menu>nav>ul>li>a').on('focus',function(){KEAD_LAYOUT.open_menu_detail(this)});
      jQuery('.Page .menu_detail').mouseleave(function(){ 
        KEAD_LAYOUT.close_menu_detail(this);
        KEAD_LAYOUT.mouse_prev = false; 
      });
      //현재경로 기능
      jQuery('.now_path button').on('click',function(){KEAD_LAYOUT.now_path(this)});
      jQuery('.Page>main').on('click',function(){KEAD_LAYOUT.now_path_close();});
      //화면크기 기능
      jQuery('.Page .sub_menu_div .btn_plus').on('click',function(){KEAD_LAYOUT.zoom('in');});
      jQuery('.Page .sub_menu_div .btn_minus').on('click',function(){KEAD_LAYOUT.zoom('out');});
      jQuery('.Page .sub_menu_div .btn_reset').on('click',function(){KEAD_LAYOUT.zoom('reset');});
      //Quick menu 기능
      jQuery('.quick_menu button').on('click',function(){
          if(jQuery(this).hasClass('open')){
              jQuery(this).removeClass('open');
              jQuery('.quick_menu ul').slideUp();
          }else{
              jQuery(this).addClass('open');
              jQuery('.quick_menu ul').slideDown();
          }
      });
      jQuery(window).on('scroll',function(){
          let now_top=parseInt(jQuery('.quick_menu').css('top'));
          let new_top=60+jQuery(document).scrollTop();
          jQuery('.quick_menu').css({top:new_top});
      })
      
      
      //공유버튼 레이어기능
      jQuery('.Page header .btn_share').on('click',function(){
        KEAD_LAYOUT.focusedElementBeforeModal = document.activeElement;
        KEAD_LAYOUT.share_layer()
      });
      //삭제버튼 레이어기능
      jQuery('.Page .delete_div .btn_delete').on('click',function(){KEAD_LAYOUT.delete_layer()})

      //레이어 닫기
      jQuery('.Page .layer_div .btn_close').on('click',function(){KEAD_LAYOUT.close_layer(this)})
      
      //공시송달 레이어 입력타입 선택
      jQuery('.Page .layer_div.public_notice input[type="radio"]').on('change',function(){KEAD_LAYOUT.public_notice_type(this)});

      //공시송달 레이어 표시
      jQuery('.Page .board_table.public_notice button').on('click',function(){KEAD_LAYOUT.public_notice_layer(this)});
      

      //Q&A 리스트 기능
      jQuery('.Page .board_qa>dt>button,.Page .board_dl>dt>button').on('click',function(){KEAD_LAYOUT.qa_board( $(this).parent('dt') ) });
      //jQuery('.Page .board_qa>dt>button,.Page .board_dl>dt>button').on('keydown',function(e){
        //e.preventDefault();
      //    if(e.keyCode==13 || e.keyCode==32){
      //    	KEAD_LAYOUT.qa_board( $(this).parent('dt') );
      //    }
      //});
      //찾아오시는길 리스트
      jQuery('.board_table.directions button').on('click',function(){
          let target_tr=jQuery(this).parents('tr').next();
          if(jQuery(this).hasClass('open')){
              jQuery(this).removeClass('open');
              $('.hiddenMap').attr('aria-hidden','false');
              target_tr.find('td, ul, p').slideUp(300);
          }else{
              jQuery(this).addClass('open');
              $('.hiddenMap').attr('aria-hidden','true');
              target_tr.find('td, ul, p').slideDown(300);
          }
      });

      //자가진단 영상리스트 레이어 표시
      jQuery('button[data-popup="popu1"]').on('click',function(){KEAD_LAYOUT.open_movie_list()});
      //jQuery('').on('click',function(){KEAD_LAYOUT.open_movie_list()})
      //jQuery('article.movie_list button').on('click',function(){KEAD_LAYOUT.close_movie_list()})

      //하단 연관기관 셀렉터
      jQuery('.Page>footer .relevant_link button').on('click',function(){
          if(jQuery(this).hasClass('open')){
              KEAD_LAYOUT.relevant_link_close(this);
          }else{
              KEAD_LAYOUT.relevant_link_open(this);
          }
      });

      //역대이사장 상세 이미지 뷰어
      jQuery('.president_slide a').on('click',function(){
          KEAD_LAYOUT.president_slide(this);
          return false;
      })
      jQuery('.Page').on('click','.image_view_layer button',function(){
          jQuery(this).parents('.image_view_layer').remove();
          KEAD_LAYOUT.blocking_layer(false);    
      })

      //직업능력개발원 맵 툴팁 표시기능
      jQuery('.Job_skill.main_map area').on('mouseover',function(){
          KEAD_LAYOUT.map_title(this);
      })
      jQuery('.Job_skill.main_map area').on('mouseleave',function(){
          KEAD_LAYOUT.map_title_remove();
      })
      jQuery('.Job_skill.main_map .list a').on('mouseover',function(){
          KEAD_LAYOUT.map_info(this);
      })
      jQuery('.Job_skill.main_map .list a').on('focus',function(){
          KEAD_LAYOUT.map_info(this);
      })
      jQuery('.Job_skill.main_map .list').on('mouseleave',function(){
          KEAD_LAYOUT.map_title_remove();
          jQuery('.Job_skill.main_map .list article').slideUp();
      })
      jQuery('.Job_skill.main_map .list article').on('mouseleave',function(){
          jQuery(this).slideUp();
          jQuery('.Job_skill.main_map .list a').removeClass('hover');
      })
  
      //개인정보 처리방침 내부 링크
      jQuery('.privacy_label a,.privacy_content a').on('click',function(){
          let target_id=jQuery(this).attr('href');
          let pos=jQuery(target_id).offset();
          jQuery(window).scrollTop(pos.top-210);
          return false;
      });

      //header 색상
      //#1. 공단에서 흰색에서 배경없음 > #2. 공단에서 다시 흰색 > #3. 공단에서. 변경사항이 자주 나옴.
      KEAD_LAYOUT.init_header_color();
      //#커튼 클릭하면
      jQuery('.Page .blocking_layer').on('click',function(){
        jQuery('.Page .main_menu .btn_search').trigger('click');
        KEAD_LAYOUT.blocking_layer(false);
      });
  
  },
  mobile_check(window_width){
      if(window_width<800){
          this.is_mobile=true;
      }else{
          this.is_mobile=false;
      }
      this.main_grid();
  },
 
  ini_main_popup(){
      let item_cnt=jQuery('.popup_slider li').length;
      let indicator_button='';
      jQuery('.popup_slider').attr('data-slide_item',item_cnt);
      for(let i=0;i<item_cnt;i++){
          indicator_button+=`<button>${i+1}</button>`
      }
      jQuery('.popup_slider .indicator').append(indicator_button);
      jQuery('.popup_slider .indicator').on('click','button',function(){
          let act_number=jQuery(this).text();
          console.log(act_number);
          KEAD_LAYOUT.main_popup_number(act_number)
      })
      jQuery('.popup_slider>button').on('click',function(){
          if(jQuery(this).hasClass('btn_close')){return false;}
          let now_number=parseInt(jQuery('.popup_slider .indicator button.act').text());
          let item_cnt=jQuery('.popup_slider').attr('data-slide_item');
          let new_number;
          if(jQuery(this).hasClass('btn_pre')){
              new_number=now_number-1;
          }else if(jQuery(this).hasClass('btn_next')){
              new_number=now_number+1
          }
          if(new_number<1 || new_number>item_cnt){
              return false;
          }
          KEAD_LAYOUT.main_popup_number(new_number);
      })
      this.main_popup_number(1);
  },
  main_popup_number(number){
      jQuery(`.popup_slider .indicator button`).removeClass('act');
      jQuery(`.popup_slider .indicator button:nth-of-type(${number})`).addClass('act');
      let new_left=-992*(number-1);
      jQuery(`.popup_slider ul`).animate({left:new_left},300);
  },

  main_grid(){
      let main_grid_width=parseInt(jQuery('.main_grid .grid_body').css('width'));
      if(isNaN(main_grid_width)){
          return false;
      } 
      if(this.is_mobile){
          this.main_grid_width=main_grid_width;
      }else{
          this.main_grid_width=480;
      }
      //console.log(this.main_grid_width);
      jQuery('.main_grid .slider_box_big .slider_content ul>li').css({'width':`${main_grid_width}px`});
      jQuery('.main_grid .slider_box ul li').css({'width':`${main_grid_width/2}px`});
      let btn=jQuery('.main_grid .main_indicator button.act');

      let slider=jQuery('.main_grid .slider.act');
      KEAD_LAYOUT.main_slider_number(slider,1,'now');

      this.main_block(btn,'now');
  },

  main_block(btn,delay){
      let animation_time=(delay=='now')?0:300;
      jQuery('.main_indicator button').removeClass('act');
      jQuery(btn).addClass('act');
      let number=jQuery(btn).attr('data-num');
      let new_left=-this.main_grid_width/2*(number-1);
      jQuery('.main_grid .slider_box ul').animate({left:new_left},animation_time);
      //jQuery('.main_grid .slider_box_big>ul').animate({left:new_left_big},300);
      //let act_slide=jQuery(`.main_grid .slider_box_big>ul>li:nth-of-type(${number})`);
      //this.main_slider_auto(act_slide);
      
      //메인 배경이미지
      jQuery('.Page').attr('data-bg',number);
  },
  init_main_silder(){ //메인 배너 슬라이더 - khk
      let slider=jQuery('.main_grid .slider');
      //console.log(slider);
      let slider_cnt=slider.length;
      let _$lefts = []; 
      let _last = $('div.slider.act>div.slider_content>ul>li').length - 1;
      let _trailer = document.querySelector("#trackter");
      
              
      for(let i=0;i<slider_cnt;i++){
        let items=jQuery(slider[i]).find('.slider_content li');
          item_cnt=items.length;
          let indicator=jQuery(slider[i]).find('.sub_indicator ul');
          indicator.empty();
          let indicator_item='';
          for(j=0;j<item_cnt;j++){
              indicator_item+='<li><button tabindex="-1">'+(j+1)+'</button></li>';
          }
          indicator.append(indicator_item);
      }
      let act_slider=slider[0];
      this.main_slider_auto(act_slider);
      
      //메인배너 슬라이더 불릿 버튼 클릭 - khk
      jQuery('.main_grid .sub_indicator ul>li>button').on('click', function(){
        //console.log('kekekeke');
        if(KEAD_LAYOUT.interval_main_silde){
          clearInterval(KEAD_LAYOUT.interval_main_silde);
        }
          
          jQuery(this).parents('div.sub_indicator').find('button.autoplay').removeClass('on').addClass('off').attr('title','자동 배너 재생 시작');
                      
          let act_number=jQuery(this).text()*1;
          //console.log('!!!!!!!!');
          //console.log(act_number);
          let slider=jQuery('.main_grid .slider.act');
          KEAD_LAYOUT.main_slider_number(slider,act_number);
          
          return false;
      });
      
      
      
      //메인배너 슬라이더 자동재생버튼 - khk
      $('.main_grid .sub_indicator>button.autoplay').on('click',function(){
        //alert(1234);
      if(jQuery(this).hasClass('on')){
        if(KEAD_LAYOUT.interval_main_silde){
              clearInterval(KEAD_LAYOUT.interval_main_silde);
            }
              jQuery(this).removeClass('on').addClass('off');                
              jQuery(this).attr('title','메인 배너 자동 재생 시작');
              jQuery(this).children('span').text('메인 배너 자동 재생 시작');
          }else{
            let slider=jQuery('.main_grid .slider.act');
            jQuery(this).removeClass('off').addClass('on');	            
            jQuery(this).attr('title','메인 배너 자동 재생 멈춤');
            jQuery(this).children('span').text('메인 배너 자동 재생 멈춤');
            KEAD_LAYOUT.main_slider_auto(slider);
          }
      });
      
      // 메인 배너 이전 버튼 클릭 - khk
      $('.btn_main.btn_main_prev').on('click','button',function(){
        if( $('.autoplay').hasClass('on') )  $('.autoplay').trigger('click');
        let idx = $('.main_grid .sub_indicator>ul>li>button.act').parent().index();
        idx -= 1;
        if(idx < 0 ){ 
          alert('배너 처음 페이지입니다.');
          return false; 
        }else{
          //_trailer.addEventListener('scroll',()=>{
          //	this.scrollLeft = _$lefts[idx];
          //});
          $('.main_grid .sub_indicator>ul>li').eq(idx).children('button').trigger('click');
        }
      });
      // 메인 배너 다음 버튼 클릭 - khk
      $('.btn_main.btn_main_next').on('click','button',function(){
        //alert(123456);
        if( $('.autoplay').hasClass('on') )  $('.autoplay').trigger('click');
        let _length = $('div.slider.act>div.slider_content>ul>li').length;        	
        let idx = $('.main_grid .sub_indicator>ul>li>button.act').parent().index();
        idx += 1;
        //alert(idx);
        if(idx > (_length-1) ){ 
          alert('배너 마지막 페이지입니다.');
          return false; 
        }else{
          //_trailer.addEventListener('scroll',()=>{
          //	this.scrollLeft = _$lefts[idx];
          //});
          $('.main_grid .sub_indicator>ul>li').eq(idx).children('button').trigger('click');
        }
      });
      
      // 메인배너 슬라이드 focus - khk
      $('div.slider.act>div.slider_content>ul>li').each(function(idx, val){
        _$lefts.push( -idx*KEAD_LAYOUT.main_grid_width );//왼쪽으로 이동할 값 넣기 
        
        $(this).children('a').focus(function(){
           
          if( $('.autoplay').hasClass('on') ) { $('.autoplay').trigger('click'); } 
          
          let _idx = idx;
          let _lastCnt = $('div.slider.act>div.slider_content>ul>li').length-1;
                                  
          let cnt = $(this).parent('li').index();
          
                      
          $('.main_grid .sub_indicator>ul>li>button.act').removeClass('act');
          $('.main_grid .sub_indicator>ul>li').eq(cnt).children('button').addClass('act');
          
          if(_idx == 0 ){
            
            console.log('처음');
            console.log(_idx);
            $('div.slider.act>div.slider_content>ul').css('left', 0);
            
            return false;
            
          }else if(_idx !=0 && _idx != _lastCnt ){
            
            console.log('중간');    
            console.log(_idx);
            _trailer.addEventListener('scroll',function(e){
              console.log(e.type);
              console.log('hehehehe');
              console.log(_$lefts[idx]);
              _trailer.scrollLeft = _$lefts[idx];
              return false;
            }); 
            _trailer.removeEventListener('scroll', function(e){
              console.log(e.type);
              console.log('hohoho');
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> 6e49eea249cc3c6f4c82cc9e36d13a21ce67c2aa
>>>>>>> main
              console.log(_$lefts[idx]);
              _trailer.scrollLeft = _$lefts[idx];
              return false;
            });
<<<<<<< HEAD
            _trailer.removeEventListener("scroll", function (e) {
              console.log(e.type);
              console.log("hohoho");
              console.log(_$lefts[idx]);
              _trailer.scrollLeft = _$lefts[idx];
              return false;
            });
            $("div.slider.act>div.slider_content>ul").css(
              "left",
              -1 * _idx * KEAD_LAYOUT.main_grid_width
            );
          } else if (_idx == _lastCnt) {
            console.log("마지막");
            console.log(_idx);
            console.log(_$lefts[idx]);
            $("div.slider.act>div.slider_content>ul").css(
              "left",
              -1 * _lastCnt * KEAD_LAYOUT.main_grid_width
            );
            return false;
          }
        });
    });
  },
  main_slider_auto(slider) {
    //메인배너 자동슬라이더 - khk
    //alert(KEAD_LAYOUT.interval_main_silde);
    if (KEAD_LAYOUT.interval_main_silde) {
      clearInterval(KEAD_LAYOUT.interval_main_silde);
    }
    KEAD_LAYOUT.main_slider_number(slider, 1);
    jQuery(".main_grid .slider").removeClass("act");
    jQuery(".main_grid .slider").removeAttr("data-direction");
    jQuery(slider).attr("data-direction", "forward");
    jQuery(slider).addClass("act");
    KEAD_LAYOUT.interval_main_silde = setInterval(function () {
      let slider = jQuery(".main_grid .slider.act");
      let direction = jQuery(slider).attr("data-direction");
      let item_cnt = slider.find(".sub_indicator ul li").length;
      let act_number = parseInt(
        slider.find(".sub_indicator ul li button.act").text()
      );
      if (item_cnt == 1) {
        return false;
      }
      if (direction == "forward") {
        act_number++;
      } else if (direction == "reverse") {
        act_number--;
      }
      if (act_number > item_cnt) {
        act_number = act_number - 2;
        slider.attr("data-direction", "reverse");
      } else if (act_number < 1) {
        act_number = act_number + 2;
        slider.attr("data-direction", "forward");
      }
      if (!isNaN(act_number)) {
        KEAD_LAYOUT.main_slider_number(slider, act_number);
      } else {
        return false;
      }
    }, 3000);
  },
  main_slider_number(slider, number, time) {
    //메인배너 슬라이더 - khk

    //
    let _left = $(slider).find(".slider_content>ul").css("left");
    //alert(_left);

    let animation_time = time == "now" ? 0 : 150;

    jQuery(slider).find(`.sub_indicator button`).removeClass("act");
    jQuery(slider)
      .find(`.sub_indicator ul li`)
      .eq(number - 1)
      .children("button")
      .addClass("act");

    let new_left = this.main_grid_width * (number - 1) * -1;
    //console.log(new_left);
    //console.log('left!!!!!!!');
    //console.log(new_left);
    jQuery(slider)
      .find(".slider_content>ul")
      .stop(true, true)
      .animate({ left: new_left + "px" }, animation_time);
  },
  init_slider(slider) {
    //
    const item = jQuery(slider).find("li");
    const gap = parseInt(jQuery(slider).find("ul").css("gap"));
    const ul_width = parseInt(jQuery(slider).find("ul").css("width"));
    const item_width = parseInt(item.css("width"));
    const display_width = parseInt(
      jQuery(slider).find(".display_area").css("width")
    );
    const item_cnt = item.length;
    let slide_step = item_width + gap;
    let slide_limit = (ul_width - display_width + gap) * -1;

    //좌우, 자동버튼 클릭
    jQuery(slider)
      .find("button")
      .on("click", function (e) {
        //서브메인 슬라이드처리
        let ul01 = jQuery(slider).find('ul[data-block="1"]');
        let ul02 = jQuery(slider).find('ul[data-block="2"]');

        //불릿
        let indicator = jQuery(slider).find(".indicator");
        if (jQuery(e.target).hasClass("next")) {
          if (ul01.hasClass("act")) {
            ul01.animate({ left: "-100%" }, 300);
            ul02.animate({ left: "0%" }, 300);
            ul02.addClass("act");
            indicator.find('div[data-block="1"]').removeClass("act");
            indicator.find('div[data-block="2"]').addClass("act");
          }
          return false;
        } else if (jQuery(e.target).hasClass("pre")) {
          if (ul02.hasClass("act")) {
            ul01.animate({ left: "0%" }, 300);
            ul02.animate({ left: "100%" }, 300);
            ul01.addClass("act");
            indicator.find('div[data-block="1"]').addClass("act");
            indicator.find('div[data-block="2"]').removeClass("act");
          }
          return false;
        }

        //공통슬라이드 처리
        let now_left = parseInt(jQuery(slider).find("ul").css("left"));
        let new_left;
        if (jQuery(e.target).hasClass("btn_next")) {
          new_left = now_left - slide_step;
          if (new_left < slide_limit) {
            alert("마지막 배너입니다.");
            return false;
          }
        } else {
          new_left = now_left + slide_step;
          if (new_left > 0) {
            alert("처음 배너입니다.");
            new_left = 0;
          }
        }
        jQuery(slider).find("ul").animate({ left: new_left }, 300);
      });
    //console.log(display_width+'|'+item_width+'|'+gap+'|'+ul_width);
  },
  president_slide(link) {
    if (this.is_mobile) {
      console.log("모바일임!!!");
      return false;
    }
    let src = jQuery(link).find("img").attr("src");
    let alt = jQuery(link).find("img").attr("alt");
    let str = $(link).text();
    console.log(src + "|" + alt);

    let code = `<figure class="image_view_layer"><img src="${src}" alt="${alt}" /><figcaption>${str}</figcaption><button>닫기</button></figure>`;
    this.blocking_layer(true);
    jQuery(".Page").append(code);
  },
  search_layer: function (btn) {
    if (jQuery(".Page").hasClass("open_all_menu")) {
      this.close_all_menu();
    }
    if (jQuery(btn).hasClass("open")) {
      jQuery(btn).removeClass("open");
      jQuery(".Page>header .search").slideUp();
      setTimeout(function () {
        jQuery(".Page.main>header").removeClass("search");
      }, 300);
      this.blocking_layer(false);
      //            try{
      //            	if(fn_setWhiteSet){
      //                	fn_setWhiteSet();
      //    	        }
      //            }catch (e) {
      //
      //			}
    } else {
      jQuery(btn).addClass("open");
      jQuery(".Page.main>header").addClass("search");
      jQuery(".Page>header .search").slideDown();
      jQuery(".Page>header .search input")[0].focus();
      this.close_menu_detail();
      this.blocking_layer(true);
      //            try{
      //            	if(fn_setBlueSet){
      //                	fn_setBlueSet();
      //    	        }
      //            }catch(error){
      //
      //            }
    }
  },
  open_menu_detail: function (_link, delay) {
    if (jQuery(".Page").hasClass("open_all_menu")) {
      return false;
    }
    var link = _link;
    if (delay) {
      setTimeout(function () {
        //console.log('열렸다.');
        let link = KEAD_LAYOUT.hover_link; //li>a:mouseenter 이벤트로 open_menu_detail 할때는  a링크
        if (link) {
          jQuery(".menu_detail").removeClass("open"); //현재 열려는 것 이전에 열려있는 것 삭제
          jQuery(".Page.main>header").addClass("act");
          const target = jQuery(link).parent("li").find(".menu_detail");
          target.addClass("open"); //내가 열려는 요소에 open클래스 적용
          jQuery(".menu_detail:not(.open)").css("display", "none");
          //                    try{
          //                    	if(fn_setBlueSet){
          //                        	fn_setBlueSet();
          //                        }
          //                    }catch (e) {
          //
          //					}

          jQuery(link).parent("li").find(".menu_detail").slideDown(300);

          KEAD_LAYOUT.blocking_layer(true);
          //$(".depth1Class").css("color", "#000000"); 네비게이터 depth1 색상 검정색
          $(link).css("color", "#016FF3");
        }
        return false;
      }, 300);
    } else {
      //console.log('여기야.');
      jQuery(".menu_detail").removeClass("open");
      jQuery(".Page.main>header").addClass("act");
      const target = jQuery(link).parent("li").find(".menu_detail");
      target.addClass("open");
      jQuery(".menu_detail:not(.open)").css("display", "none");

      //li부분으로 mouseleave인지, 서브네비게이터 상자에서 mouse가 떠난건지 판별
      if (KEAD_LAYOUT.mouse_prev) {
        let prev_height = $(".menu_detail")
          .eq(KEAD_LAYOUT.menu_detail_prev)
          .css("height");
        //console.log(prev_height);
        jQuery(target)
          .css({ display: "block", height: prev_height })
          .animate(
            { height: menu_detail_heights[KEAD_LAYOUT.menu_detail_idx] },
            100
          );
      } else {
        jQuery(target).slideDown(300);
      }

      this.blocking_layer(true);

      $(".depth1Class").css("color", "#000000");
      $(link).css("color", "#016FF3");
    }
  },
  close_menu_detail: function ($_this, no_delay) {
    //console.log($_this);
    //console.log('닫혔음');

    let $_menu_detail = `.Page .menu_detail`;
    let $_wait = 200;

    if ($_this) {
      $_menu_detail = $_this;
    }
    if (no_delay) {
      $_wait = 0;
      $(KEAD_LAYOUT.hover_link).css("color", "#000000");
    }

    jQuery($_menu_detail).slideUp($_wait, function () {
      //console.log('닫혔다.');
      //        	if($("section.main").length == 1){ //메인페이지 일 때만 작동
      //            	$(".depth1Class").css("color", "#fff");
      //            }else{
      //            	$(".depth1Class").css("color", "#000000");
      //            }

      //            try{
      //            	if(fn_setWhiteSet){
      //                	fn_setWhiteSet();
      //                }
      //            }catch (e) {
      //
      //    		}
      //닫힐 때 모두 검정색
      $(".depth1Class").css("color", "#000000");
    });
    jQuery(`.Page .menu_detail`).removeClass("open");
    //        setTimeout(function(){
    //        	jQuery('.Page.main>header').removeClass('act');
    //        },$_wait);

    jQuery(".Page.main>header").removeClass("act");
    this.blocking_layer(false);
  },
  now_path: function (btn) {
    let media_1 = window.matchMedia("only screen and ( max-width: 800px )"),
      media_2 = window.matchMedia("only screen and (pointer:coarse)");
    //console.log(media_1, media_2);

    if (media_1.matches || media_2.matches) {
      //console.log(123456);
      $(btn).siblings("ul").slideDown(200);
      $(btn)
        .closest(".content_width")
        .find("button")
        .not(btn)
        .each(function () {
          $(this).removeClass("open");
          $(this).siblings("ul").slideUp(100);
        });
    } else {
      //console.log(987654);
      if (jQuery(btn).hasClass("open")) {
        $(btn).removeClass("open");
        $(btn).siblings("ul").slideUp(100);
      } else {
        $(btn).addClass("open");
        $(btn).siblings("ul").slideDown(200);
      }
    }
  },
  now_path_close: function () {
    jQuery(".now_path button").removeClass("open");
    jQuery(".now_path div ul").slideUp();
  },
  share_layer: function () {
    let modal = document.querySelector(".layer_div.share");

    let focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
    let focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
    //getElementsByClassName, getElementsByTagName 등은 htmlCollection으로 반환하고
    //querySelectorAll은 nodeList로 반환하다.
    //둘의 차이점은 HTMLCollection의 항목은 name, id 속성으로도 접근이 가능하지만, NodeList의 항목은 인덱스 번호로만 접근이 가능하다.

    //console.log(focusableElements); //노드목록으로만 반환
    focusableElements = Array.prototype.slice.call(focusableElements); //노드 목록을 어레이로 변환, 변환하지 않아도 firstTabStop, lastTabStop 값 가져올 수 있음
    //console.log(focusableElements); //노드 목록을 Array로 변환하면서 새로운 배열로 반환
    let firstTabStop = focusableElements[0];
    let lastTabStop = focusableElements[focusableElements.length - 1];

    firstTabStop.focus();
    jQuery(".Page main header .share").slideDown();
  },
  delete_layer: function () {
    jQuery(".Page .delete_div .layer_div").slideDown();
  },
  close_layer: function (btn) {
    jQuery(btn)
      .parent(".layer_div")
      .slideUp(100, function () {
        //console.log(222222);
        //console.log(KEAD_LAYOUT.focusedElementBeforeModal);
        KEAD_LAYOUT.focusedElementBeforeModal.focus();
      });
    jQuery(btn).parent(".layer_div").find("form")[0].reset();
  },
  public_notice_type(input) {
    const input_id = jQuery(input).attr("id");
    if (input_id == "type_corporation") {
      jQuery(".layer_div.public_notice .corporation").slideDown();
      jQuery(".layer_div.public_notice .individuals").slideUp();
    } else {
      jQuery(".layer_div.public_notice .corporation").slideUp();
      jQuery(".layer_div.public_notice .individuals").slideDown();
    }
  },
  public_notice_layer(btn) {
    KEAD_LAYOUT.focusedElementBeforeModal = document.activeElement;
    //console.log(1111111);
    //console.log(KEAD_LAYOUT.focusedElementBeforeModal);
    let pos = jQuery(btn).offset();
    //console.log(pos);
    let top = pos["top"] - 190;
    jQuery(".layer_div.public_notice")
      .css({ top: top + "px" })
      .slideDown();
    $(".check_div").find("input[type=radio]").eq(0).focus();
  },
  relevant_link_open: function (btn) {
    jQuery(".relevant_link>div>ul").stop(true, true).slideUp(200);
    jQuery(".relevant_link>div>button").removeClass("open");
    jQuery(btn).addClass("open");
    jQuery(btn)
      .siblings("ul")
      .stop(true, true)
      .slideDown(200, function () {
        $(this).addClass("open");
      });
  },
  relevant_link_close: function (btn) {
    jQuery(btn).removeClass("open");
    jQuery(btn)
      .siblings("ul")
      .stop(true, true)
      .slideUp(200, function () {
        $(this).removeClass("open");
      });
  },
  zoom: function (dir) {
    switch (dir) {
      case "in":
        this.zoom_level = this.zoom_level + 10;
        break;
      case "out":
        this.zoom_level = this.zoom_level - 10;
        break;
      case "reset":
        this.zoom_level = 100;
        break;
    }
    if (this.zoom_level < 100) {
      alert("더이상 축소 할 수 없습니다.");
      this.zoom_level = 100;
      return false;
    }
    if (this.zoom_level > 200) {
      alert("더이상 확대 할 수 없습니다.");
      this.zoom_level = 200;
      return false;
    }
    jQuery("body").css({ zoom: `${this.zoom_level}%` });
  },
  open_all_menu: function () {
    const btn = jQuery(".Page>header .btn_search");
    if (jQuery(btn).hasClass("open")) {
      jQuery(btn).removeClass("open");
      jQuery(".Page>header .search").slideUp(0);
    }
    jQuery(`.Page .menu_detail`).slideUp(0);
    this.blocking_layer(false);

    jQuery(".Page").addClass("open_all_menu");
    jQuery(".now_path, #main_content").slideUp(0);
    jQuery(".all_menu").slideDown();
    jQuery(".all_menu h1")[0].focus();
    jQuery(".Page.main>header").addClass("open");
    //        try{
    //        	if(fn_setBlueSet){
    //            	fn_setBlueSet();
    //            }
    //        }catch (e) {
    //
    //		}
  },
  close_all_menu: function () {
    jQuery(".Page").removeClass("open_all_menu");
    jQuery(".now_path, #main_content").slideDown(0);
    jQuery(".all_menu").slideUp(0);
    jQuery(".main_menu .btn_all_menu")[0].focus();
    jQuery(".Page.main>header").removeClass("open");
    //        try{
    //        	if(fn_setWhiteSet){
    //            	fn_setWhiteSet();
    //            }
    //        }catch (e) {
    //
    //		}
  },
  qa_board: function (dt) {
    const dd = jQuery(dt).next();
    if (jQuery(dt).hasClass("open")) {
      jQuery(dt).removeClass("open");
      jQuery(dt).children("button").attr("aria-expanded", false);
      jQuery(dd).attr("aria-hidden", true).slideUp(100);
    } else {
      jQuery(dt).addClass("open");
      jQuery(dt).children("button").attr("aria-expanded", true);
      jQuery(dd).attr("aria-hidden", false).slideDown(100);
    }
  },
  blocking_layer: function (act) {
    if (act) {
      jQuery(".Page .blocking_layer").slideDown(0);
    } else {
      jQuery(".Page .blocking_layer").slideUp(0);
    }
  },
  open_movie_list: function () {
    //this.blocking_layer(true);

    let focusedElementBeforeModal;
    let modal = document.querySelector(".modal"); //모달창
    let modalOverlay = document.querySelector(".modal-overlay"); //모달 배경레이어
    let modalToggle = document.querySelector(".modal-toggle"); //버튼
    let modalClose = document.querySelector(".btn-modal-close"); // 닫기 버튼

    //modalToggle.addEventListener('click', openModal);
    openModal();
    function openModal() {
      //display:none에서 block처리가 되면 기본적으로 내부에서 focus될 요소로 자동 이동
      focusedElementBeforeModal = document.activeElement; // focus된게 아니라 'active'된 el.
      // 현재 포커스된 요소를 반환 여기서는
      // '열기'버튼을 클릭하자마자 함수 실행이기에
      // 버튼을 가리킨다.

      modal.addEventListener("keydown", trapTabKey); // key를 누르고 있을때
      modalOverlay.addEventListener("click", closeModal);
      modalClose.addEventListener("click", closeModal);

      let focusableElementsString =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
      let focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
      //getElementsByClassName, getElementsByTagName 등은 htmlCollection으로 반환하고
      //querySelectorAll은 nodeList로 반환하다.
      //둘의 차이점은 HTMLCollection의 항목은 name, id 속성으로도 접근이 가능하지만, NodeList의 항목은 인덱스 번호로만 접근이 가능하다.

=======
            $('div.slider.act>div.slider_content>ul').css('left', -1*_idx*KEAD_LAYOUT.main_grid_width);
            
          }else if(_idx == _lastCnt ) { 
            console.log('마지막');
            console.log(_idx);
            console.log(_$lefts[idx]);
            $('div.slider.act>div.slider_content>ul').css('left', -1*_lastCnt*KEAD_LAYOUT.main_grid_width); 
            return false; 
          }
        });
        
        
      });
  },
  main_slider_auto(slider){ //메인배너 자동슬라이더 - khk
    //alert(KEAD_LAYOUT.interval_main_silde);
    if(KEAD_LAYOUT.interval_main_silde){
      clearInterval(KEAD_LAYOUT.interval_main_silde);
    }
    KEAD_LAYOUT.main_slider_number(slider,1);
      jQuery('.main_grid .slider').removeClass('act');
      jQuery('.main_grid .slider').removeAttr('data-direction');
      jQuery(slider).attr('data-direction','forward');
      jQuery(slider).addClass('act');
      KEAD_LAYOUT.interval_main_silde=setInterval(function(){
        
          let slider=jQuery('.main_grid .slider.act');
          let direction=jQuery(slider).attr('data-direction');
          let item_cnt=slider.find('.sub_indicator ul li').length;
          let act_number=parseInt(slider.find('.sub_indicator ul li button.act').text());
          if(item_cnt==1){return false;}
          if(direction=='forward'){
              act_number++;
          }else if(direction=='reverse'){
              act_number--;
          }
          if(act_number>item_cnt){
              act_number=act_number-2;
              slider.attr('data-direction','reverse');
          }else if(act_number<1){
              act_number=act_number+2;
              slider.attr('data-direction','forward');
          }
          if(!isNaN(act_number)){
            KEAD_LAYOUT.main_slider_number(slider, act_number);
          }else{
            return false;
          }
          
      },3000)
  },
  main_slider_number(slider, number, time){//메인배너 슬라이더 - khk
    
    //
    let _left = $(slider).find('.slider_content>ul').css('left');
    //alert(_left);
    
      let animation_time=(time=='now')? 0 : 150;
      
      jQuery(slider).find(`.sub_indicator button`).removeClass('act');
      jQuery(slider).find(`.sub_indicator ul li`).eq(number-1).children('button').addClass('act');
      
      let new_left= this.main_grid_width*(number-1)*-1;
      //console.log(new_left);
      //console.log('left!!!!!!!');
      //console.log(new_left);
      jQuery(slider).find('.slider_content>ul').stop(true, true).animate({left:new_left+"px"},animation_time);
  },
  init_slider(slider){//
      const item=jQuery(slider).find('li');
      const gap=parseInt(jQuery(slider).find('ul').css('gap'));
      const ul_width=parseInt(jQuery(slider).find('ul').css('width'));
      const item_width=parseInt(item.css('width'));
      const display_width=parseInt(jQuery(slider).find('.display_area').css('width'));
      const item_cnt=item.length;
      let slide_step=item_width+gap;
      let slide_limit=((ul_width-display_width+gap))*-1;
      
      //좌우, 자동버튼 클릭
      jQuery(slider).find('button').on('click',function(e){
          //서브메인 슬라이드처리
          let ul01=jQuery(slider).find('ul[data-block="1"]');
          let ul02=jQuery(slider).find('ul[data-block="2"]');
          
          //불릿
          let indicator=jQuery(slider).find('.indicator');
           if(jQuery(e.target).hasClass('next')){
              if(ul01.hasClass('act')){
                  ul01.animate({'left':'-100%'},300);
                  ul02.animate({'left':'0%'},300);
                  ul02.addClass('act');
                  indicator.find('div[data-block="1"]').removeClass('act');
                  indicator.find('div[data-block="2"]').addClass('act');
              }
              return false;
          }else if(jQuery(e.target).hasClass('pre')){
              if(ul02.hasClass('act')){
                  ul01.animate({'left':'0%'},300);
                  ul02.animate({'left':'100%'},300);
                  ul01.addClass('act');
                  indicator.find('div[data-block="1"]').addClass('act');
                  indicator.find('div[data-block="2"]').removeClass('act');
              }
              return false;
          }

          //공통슬라이드 처리
          let now_left= parseInt(jQuery(slider).find('ul').css('left'));
          let new_left
          if(jQuery(e.target).hasClass('btn_next')){
              new_left=now_left-slide_step;
              if(new_left<slide_limit){
                  alert('마지막 배너입니다.');
                  return false;
              }
          }else{
              new_left=now_left+slide_step;
              if(new_left>0){
                  alert('처음 배너입니다.');
                  new_left=0;
              }
          }
          jQuery(slider).find('ul').animate({'left':new_left},300);
      })        
      //console.log(display_width+'|'+item_width+'|'+gap+'|'+ul_width);
     
  },
  president_slide(link){
      if(this.is_mobile){
          console.log('모바일임!!!');
          return false;
      }
      let src=jQuery(link).find('img').attr('src');
      let alt=jQuery(link).find('img').attr('alt');
      let str = $(link).text();
      console.log(src+'|'+alt);
      
      let code=`<figure class="image_view_layer"><img src="${src}" alt="${alt}" /><figcaption>${str}</figcaption><button>닫기</button></figure>`;
      this.blocking_layer(true);
      jQuery('.Page').append(code);
  },
  search_layer:function(btn){
    
          
      if(jQuery('.Page').hasClass('open_all_menu')){
          this.close_all_menu();
      }
      if(jQuery(btn).hasClass('open')){
          jQuery(btn).removeClass('open');
          jQuery('.Page>header .search').slideUp();
          setTimeout(function(){jQuery('.Page.main>header').removeClass('search');},300);
          this.blocking_layer(false);
//            try{
//            	if(fn_setWhiteSet){
//                	fn_setWhiteSet();
//    	        }	
//            }catch (e) {
//
//			}
          
      }else{
          jQuery(btn).addClass('open');
          jQuery('.Page.main>header').addClass('search');
          jQuery('.Page>header .search').slideDown();
          jQuery('.Page>header .search input')[0].focus();
          this.close_menu_detail();
          this.blocking_layer(true);
//            try{
//            	if(fn_setBlueSet){
//                	fn_setBlueSet();
//    	        }	
//            }catch(error){
//            	
//            }
          
      }
  },
  open_menu_detail:function(_link, delay){
    
      if(jQuery('.Page').hasClass('open_all_menu')){ return false;}
      var link=_link;        
      if(delay){
          setTimeout(function(){
            //console.log('열렸다.');
              let link=KEAD_LAYOUT.hover_link; //li>a:mouseenter 이벤트로 open_menu_detail 할때는  a링크
              if(link){
                  jQuery('.menu_detail').removeClass('open');//현재 열려는 것 이전에 열려있는 것 삭제
                  jQuery('.Page.main>header').addClass('act');
                  const target=jQuery(link).parent('li').find('.menu_detail');
                  target.addClass('open');//내가 열려는 요소에 open클래스 적용
                  jQuery('.menu_detail:not(.open)').css('display','none');
//                    try{
//                    	if(fn_setBlueSet){
//                        	fn_setBlueSet();
//                        }	
//                    }catch (e) {
//						
//					}
                  
                  jQuery(link).parent('li').find('.menu_detail').slideDown(300);
                  
                  
                  KEAD_LAYOUT.blocking_layer(true);
                  //$(".depth1Class").css("color", "#000000"); 네비게이터 depth1 색상 검정색
                  $(link).css("color", "#016FF3");
              }
              return false;    
          }, 300);
      }else{
        //console.log('여기야.');
          jQuery('.menu_detail').removeClass('open');
          jQuery('.Page.main>header').addClass('act');
          const target=jQuery(link).parent('li').find('.menu_detail');
          target.addClass('open')
          jQuery('.menu_detail:not(.open)').css('display','none');
          
          //li부분으로 mouseleave인지, 서브네비게이터 상자에서 mouse가 떠난건지 판별
          if( KEAD_LAYOUT.mouse_prev ){
            let prev_height = $('.menu_detail').eq( KEAD_LAYOUT.menu_detail_prev ).css('height');
            //console.log(prev_height);
            jQuery(target).css({'display':'block','height': prev_height}).animate({'height': menu_detail_heights[KEAD_LAYOUT.menu_detail_idx]}, 100);
          }else{
            jQuery(target).slideDown(300);
          }
          
          this.blocking_layer(true);
          
        $(".depth1Class").css("color", "#000000");
          $(link).css("color", "#016FF3");
      }
  },
  close_menu_detail:function($_this, no_delay){
    //console.log($_this);
    //console.log('닫혔음');
 
    let $_menu_detail = `.Page .menu_detail`;
    let $_wait = 200;
    
    if($_this){ $_menu_detail = $_this;  }    	
    if(no_delay){ 
      $_wait = 0;
      $(KEAD_LAYOUT.hover_link).css("color", "#000000");
    }
    
      jQuery($_menu_detail).slideUp($_wait, function(){
        //console.log('닫혔다.');
//        	if($("section.main").length == 1){ //메인페이지 일 때만 작동
//            	$(".depth1Class").css("color", "#fff");	
//            }else{
//            	$(".depth1Class").css("color", "#000000");
//            }
        
//            try{
//            	if(fn_setWhiteSet){
//                	fn_setWhiteSet();
//                }	
//            }catch (e) {
//
//    		}
        //닫힐 때 모두 검정색
        $(".depth1Class").css("color", "#000000");
      });
      jQuery(`.Page .menu_detail`).removeClass('open');
//        setTimeout(function(){
//        	jQuery('.Page.main>header').removeClass('act');        
//        },$_wait);
      
      jQuery('.Page.main>header').removeClass('act');
      this.blocking_layer(false);
      
      
    
      
  },
  now_path:function(btn){
    let media_1 = window.matchMedia('only screen and ( max-width: 800px )'),
    media_2 = window.matchMedia('only screen and (pointer:coarse)');
    //console.log(media_1, media_2);
    
    if(media_1.matches || media_2.matches){
      //console.log(123456);    		
      $(btn).siblings('ul').slideDown(200);
      $(btn).closest('.content_width').find('button').not(btn).each(function(){
        
        $(this).removeClass('open');
              $(this).siblings('ul').slideUp(100);
      });
      
    }else{
      //console.log(987654);
      if(jQuery(btn).hasClass('open')){
              $(btn).removeClass('open');
              $(btn).siblings('ul').slideUp(100);
          }else{
              $(btn).addClass('open');
              $(btn).siblings('ul').slideDown(200);
          }
    }
      
  },
  now_path_close:function(){
      jQuery('.now_path button').removeClass('open');
      jQuery('.now_path div ul').slideUp();
  },
  share_layer:function(){
    
    let modal = document.querySelector('.layer_div.share');
    
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
      let focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
      //getElementsByClassName, getElementsByTagName 등은 htmlCollection으로 반환하고 
      //querySelectorAll은 nodeList로 반환하다. 
      //둘의 차이점은 HTMLCollection의 항목은 name, id 속성으로도 접근이 가능하지만, NodeList의 항목은 인덱스 번호로만 접근이 가능하다.
      
      
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> 6e49eea249cc3c6f4c82cc9e36d13a21ce67c2aa
>>>>>>> main
      //console.log(focusableElements); //노드목록으로만 반환
      focusableElements = Array.prototype.slice.call(focusableElements); //노드 목록을 어레이로 변환, 변환하지 않아도 firstTabStop, lastTabStop 값 가져올 수 있음
      //console.log(focusableElements); //노드 목록을 Array로 변환하면서 새로운 배열로 반환
      let firstTabStop = focusableElements[0];
      let lastTabStop = focusableElements[focusableElements.length - 1];
<<<<<<< HEAD

      modal.style.display = "block";
      modalOverlay.style.display = "block";

      firstTabStop.focus();

      function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9) {
          //탭키

          // SHIFT + TAB
          if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
              e.preventDefault();
              lastTabStop.focus();
            }

            // TAB
          } else {
            if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop.focus();
            }
          }
        }

        // ESCAPE  esc키
        if (e.keyCode === 27) {
          closeModal();
        }
      }
    }

    function closeModal(e) {
      //e.preventDefault();
      //modalClose.focus();

      //alert(1234);
      //console.log(e.type);

      modal.style.display = "none";
      modalOverlay.style.display = "none";
      //console.log(focusedElementBeforeModal);
      //setTimeout(function(){
      //alert(1234);
      focusedElementBeforeModal.focus();

      //alert(1234);
    }

    /*
        let btn = $(this);

        lp.slideDown();
        */
  }, // 팝업 End
  close_movie_list: function () {
    this.blocking_layer(false);
    let btn = $(this);
    let lp = jQuery("article.movie_list");
    lp.slideUp();
  },
  map_title(area) {
    jQuery(".Job_skill.main_map .list a").removeClass("hover");
    jQuery(".Job_skill.main_map .list article").slideUp(0);
    let content = jQuery(area).attr("alt");
    let left = jQuery(area).attr("data-left");
    let top = jQuery(area).attr("data-top");
    let link_id = jQuery(area).attr("data-id");
    let link = jQuery(`#${link_id}`);
    jQuery(link).parent("li").find("article").slideDown();
    jQuery(link).addClass("hover");

    let code = `<div class="map_title_div" style="top:${top}px;left:${left}px">${content}</div>`;
    jQuery(".map_area.type02").append(code);
  },
  map_title_remove() {
    jQuery(".Job_skill.main_map .list a").removeClass("hover");
    jQuery(".map_area.type02 .map_title_div").remove();
  },
  map_info(link) {
    this.map_title_remove();
    jQuery(".Job_skill.main_map .list article").slideUp(0);

    let id = jQuery(link).attr("id");
    let area = jQuery(`area[data-id="${id}"]`);
    this.map_title(area);

    let article = jQuery(link).parent("li").find("article").slideDown();
  },
  init_header_color: function () {
    //alert(1234);
    try {
      fn_setBlueSet();
    } catch (e) {}

    $(".depth1Class").css("color", "#000000");
  },
};
=======
      
      firstTabStop.focus();
      jQuery('.Page main header .share').slideDown();
  },
  delete_layer:function(){
    
      jQuery('.Page .delete_div .layer_div').slideDown();
  },
  close_layer:function(btn){
      jQuery(btn).parent('.layer_div').slideUp(100, function (){
        //console.log(222222);
        //console.log(KEAD_LAYOUT.focusedElementBeforeModal);
        KEAD_LAYOUT.focusedElementBeforeModal.focus();

      });
      jQuery(btn).parent('.layer_div').find('form')[0].reset();
  },
  public_notice_type(input){
      const input_id=jQuery(input).attr('id');
      if(input_id=='type_corporation'){
          jQuery('.layer_div.public_notice .corporation').slideDown();
          jQuery('.layer_div.public_notice .individuals').slideUp();
      }else{
          jQuery('.layer_div.public_notice .corporation').slideUp();
          jQuery('.layer_div.public_notice .individuals').slideDown();
      }
  },
  public_notice_layer(btn){
    KEAD_LAYOUT.focusedElementBeforeModal = document.activeElement;
    //console.log(1111111);
    //console.log(KEAD_LAYOUT.focusedElementBeforeModal);
      let pos=jQuery(btn).offset();
      //console.log(pos);
      let top=pos['top']-190;
      jQuery('.layer_div.public_notice').css({top:top+'px'}).slideDown();
      $('.check_div').find('input[type=radio]').eq(0).focus();
  },
  relevant_link_open:function(btn){
      jQuery('.relevant_link>div>ul').stop(true,true).slideUp(200);
      jQuery('.relevant_link>div>button').removeClass('open');
      jQuery(btn).addClass('open');
      jQuery(btn).siblings('ul').stop(true,true).slideDown(200, function(){        	
          $(this).addClass('open');            
      });
  },
  relevant_link_close:function(btn){
      jQuery(btn).removeClass('open');        
      jQuery(btn).siblings('ul').stop(true, true).slideUp(200, function(){
        $(this).removeClass('open');
      });
  },
  zoom:function(dir){
      switch (dir) {
          case 'in':
              this.zoom_level=this.zoom_level+10;
              break;
          case 'out':
              this.zoom_level=this.zoom_level-10;
              break;
          case 'reset':
              this.zoom_level=100;
              break;
      }
      if(this.zoom_level<100){
          alert('더이상 축소 할 수 없습니다.');
          this.zoom_level=100;
          return false;
      }
      if(this.zoom_level>200){
          alert('더이상 확대 할 수 없습니다.');
          this.zoom_level=200;
          return false;
      }
      jQuery('body').css({zoom:`${this.zoom_level}%`});
  },
  open_all_menu:function(){
      const btn=jQuery('.Page>header .btn_search');
      if(jQuery(btn).hasClass('open')){
          jQuery(btn).removeClass('open');
          jQuery('.Page>header .search').slideUp(0);
      }
      jQuery(`.Page .menu_detail`).slideUp(0);
      this.blocking_layer(false);
      
      jQuery('.Page').addClass('open_all_menu');
      jQuery('.now_path, #main_content').slideUp(0);
      jQuery('.all_menu').slideDown();
      jQuery('.all_menu h1')[0].focus();
      jQuery('.Page.main>header').addClass('open');
//        try{
//        	if(fn_setBlueSet){
//            	fn_setBlueSet();
//            }	
//        }catch (e) {
//			
//		}
      
  },
  close_all_menu:function(){
      jQuery('.Page').removeClass('open_all_menu');
      jQuery('.now_path, #main_content').slideDown(0);
      jQuery('.all_menu').slideUp(0);
      jQuery('.main_menu .btn_all_menu')[0].focus();
      jQuery('.Page.main>header').removeClass('open');
//        try{
//        	if(fn_setWhiteSet){
//            	fn_setWhiteSet();
//            }	
//        }catch (e) {
//
//		}
      
  },
  qa_board:function(dt){
      const dd=jQuery(dt).next();
      if(jQuery(dt).hasClass('open')){
          jQuery(dt).removeClass('open');
          jQuery(dt).children('button').attr('aria-expanded',false);
          jQuery(dd).attr('aria-hidden',true).slideUp(100);
      }else{
          jQuery(dt).addClass('open');
          jQuery(dt).children('button').attr('aria-expanded',true);
          jQuery(dd).attr('aria-hidden',false).slideDown(100);
      }
      
  },
  blocking_layer:function(act){
      if(act){
          jQuery('.Page .blocking_layer').slideDown(0);
      }else{
          jQuery('.Page .blocking_layer').slideUp(0);
      }
  },
  open_movie_list:function(){
    
      //this.blocking_layer(true);
      
      let focusedElementBeforeModal;
      let modal = document.querySelector('.modal'); //모달창
      let modalOverlay = document.querySelector('.modal-overlay'); //모달 배경레이어
      let modalToggle = document.querySelector('.modal-toggle'); //버튼
      let modalClose = document.querySelector('.btn-modal-close'); // 닫기 버튼
      
      //modalToggle.addEventListener('click', openModal);
      openModal();
      function openModal() {
        //display:none에서 block처리가 되면 기본적으로 내부에서 focus될 요소로 자동 이동
        focusedElementBeforeModal = document.activeElement;// focus된게 아니라 'active'된 el.
                                                           // 현재 포커스된 요소를 반환 여기서는
                                                           // '열기'버튼을 클릭하자마자 함수 실행이기에
                                                           // 버튼을 가리킨다. 

        modal.addEventListener('keydown', trapTabKey);// key를 누르고 있을때
        modalOverlay.addEventListener('click', closeModal);
        modalClose.addEventListener('click', closeModal);
        
        let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
        let focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
        //getElementsByClassName, getElementsByTagName 등은 htmlCollection으로 반환하고 
        //querySelectorAll은 nodeList로 반환하다. 
        //둘의 차이점은 HTMLCollection의 항목은 name, id 속성으로도 접근이 가능하지만, NodeList의 항목은 인덱스 번호로만 접근이 가능하다.
        
        
        //console.log(focusableElements); //노드목록으로만 반환
        focusableElements = Array.prototype.slice.call(focusableElements); //노드 목록을 어레이로 변환, 변환하지 않아도 firstTabStop, lastTabStop 값 가져올 수 있음
        //console.log(focusableElements); //노드 목록을 Array로 변환하면서 새로운 배열로 반환
        let firstTabStop = focusableElements[0];
        let lastTabStop = focusableElements[focusableElements.length - 1];

        modal.style.display = 'block';
        modalOverlay.style.display = 'block';

        firstTabStop.focus();

        function trapTabKey(e) {
          // Check for TAB key press
          if (e.keyCode === 9) { //탭키 

            // SHIFT + TAB
            if (e.shiftKey) { 
              if (document.activeElement === firstTabStop) {
              e.preventDefault();
              lastTabStop.focus();
              }

            // TAB
            } else {
              if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop.focus();
              }
            }
          }

          // ESCAPE  esc키
          if (e.keyCode === 27) {
            closeModal();
          }
        }
      }

      function closeModal(e) {
        //e.preventDefault();
        //modalClose.focus();
        
        //alert(1234);
        //console.log(e.type);
        
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        //console.log(focusedElementBeforeModal);
        //setTimeout(function(){
          //alert(1234);
        focusedElementBeforeModal.focus();
        
        
        
        //alert(1234);
      }
      
      /*
      let btn = $(this);

      lp.slideDown();
      */
      
  }, // 팝업 End 
  close_movie_list:function(){
      this.blocking_layer(false);
      let btn = $(this);
      let lp = jQuery('article.movie_list');
      lp.slideUp();
  },
  map_title(area){
      jQuery('.Job_skill.main_map .list a').removeClass('hover');
      jQuery('.Job_skill.main_map .list article').slideUp(0);
      let content=jQuery(area).attr('alt');
      let left=jQuery(area).attr('data-left');
      let top=jQuery(area).attr('data-top');
      let link_id=jQuery(area).attr('data-id');
      let link=jQuery(`#${link_id}`);
      jQuery(link).parent('li').find('article').slideDown();
      jQuery(link).addClass('hover');
      
      let code=`<div class="map_title_div" style="top:${top}px;left:${left}px">${content}</div>`;
      jQuery('.map_area.type02').append(code);
  },
  map_title_remove(){
      jQuery('.Job_skill.main_map .list a').removeClass('hover');
      jQuery('.map_area.type02 .map_title_div').remove();
  },
  map_info(link){
      this.map_title_remove();
      jQuery('.Job_skill.main_map .list article').slideUp(0);
      
      let id=jQuery(link).attr('id');
      let area=jQuery(`area[data-id="${id}"]`);
      this.map_title(area);
      
      let article=jQuery(link).parent('li').find('article').slideDown();
  }
  ,init_header_color: function(){
    //alert(1234);
    try{
      fn_setBlueSet();
    }catch (e) {

  }
    
      $(".depth1Class").css("color", "#000000");
  }
}
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> 6e49eea249cc3c6f4c82cc9e36d13a21ce67c2aa
>>>>>>> main
