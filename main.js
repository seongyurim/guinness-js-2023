(() => {

    ////// 전역변수 ////////////////////////////////////////////////////////////////////

    // Scroll-Y 값
    let yOffset = 0;

    // 현재 섹션
    let currentSection = 0;

    // yOffset의 스크롤값을 섹션별로 초기화
    let sectionYOffset = 0;
    
    
    
    ////// 함수 ////////////////////////////////////////////////////////////////////////

    //// 섹션별 정보를 담은 배열 -------------------------------------------
    const sectionSet = [
    
      // section_0 : 탑 비디오 영역
      {
        height : 0,
        hMultiple : 1,
        objs : {
          container : document.querySelector("#section_0"),
        },
        vals : {}
      },
  
      // section_1 : 인트로 스크롤 영역
      {
        height : 0,
        hMultiple : 4,
        objs : {
          container : document.querySelector("#section_1"),
          messageA : document.querySelector(".sec1_msg.a"),
          messageB : document.querySelector(".sec1_msg.b"),
          messageC : document.querySelector(".sec1_msg.c"),
          messageD : document.querySelector(".sec1_msg.d"),
          messageE : document.querySelector(".sec1_msg.e"),
          imagePint : document.querySelector(".sec1_img"),
        },
        vals : {
          messageA_fade_in :       [0, 1,     {start: 0.02, end: 0.08}],
          messageA_fade_out :      [1, 0,     {start: 0.10, end: 0.16}],
          messageA_transY_in :     [10, -10,  {start: 0.02, end: 0.08}],
          messageA_transY_out :    [-10, -30, {start: 0.10, end: 0.16}],
  
          messageB_fade_in :       [0, 1,     {start: 0.18, end: 0.24}],
          messageB_fade_out :      [1, 0,     {start: 0.26, end: 0.32}],
          messageB_transY_in :     [10, -10,  {start: 0.18, end: 0.24}],
          messageB_transY_out :    [-10, -30, {start: 0.26, end: 0.32}],
  
          messageC_fade_in :       [0, 1,     {start: 0.34, end: 0.40}],
          messageC_fade_out :      [1, 0,     {start: 0.42, end: 0.48}],
          messageC_transY_in :     [10, -10,  {start: 0.34, end: 0.40}],
          messageC_transY_out :    [-10, -30, {start: 0.42, end: 0.48}],
  
          messageD_fade_in :       [0, 1,     {start: 0.50, end: 0.56}],
          messageD_fade_out :      [1, 0,     {start: 0.58, end: 0.64}],
          messageD_transY_in :     [10, -10,  {start: 0.50, end: 0.56}],
          messageD_transY_out :    [-10, -30, {start: 0.58, end: 0.64}],
  
          messageE_fade_in :       [0, 1,     {start: 0.66, end: 0.72}],
          messageE_fade_out :      [1, 0,     {start: 0.74, end: 0.85}],
          messageE_transY_in :     [10, -10,  {start: 0.66, end: 0.72}],
          messageE_transY_out :    [-10, -30, {start: 0.74, end: 0.85}],

          imagePint_fade_in :      [0, 1,     {start: 0.00, end: 0.80}],
          imagePint_transY :       [0, -30,   {start: 0.05, end: 0.84}],
          imagePint_fade_out :     [1, 0,     {start: 0.74, end: 1.00}],
        }
      },
  
      // section_2 : 기네스 가이드 제목 영역
      {
        height : 0,
        hMultiple : 1.5,
        objs : {
          container : document.querySelector("#section_2"),
          titleA : document.querySelector(".sec2_title_eng_p1"),
          titleB : document.querySelector(".sec2_title_eng_p2"),
          titleC : document.querySelector(".sec2_title_eng_p3"),
        },
        vals : {
          titleA_transX : [0, 10,  {start: 0.00, end: 0.70}],
          titleB_transX : [0, 20,  {start: 0.00, end: 0.70}],
          titleC_transX : [0, -20, {start: 0.00, end: 0.70}],
        }
      },

      // section_3 : 기네스 가이드 본문 영역
      {
        height : 0,
        hMultiple : 2.85,
        objs : {
          container : document.querySelector("#section_3"),
          guideA : document.querySelector(".guide_box.guide1"),
          guideB : document.querySelector(".guide_box.guide2"),
          guideC : document.querySelector(".guide_box.guide3"),
          guideD : document.querySelector(".guide_box.guide4")
        },
        vals : {}
      },

      // section_4 : 오프라인 매장 안내
      {
        height : 0,
        hMultiple : 1.4,
        objs : {
          container : document.querySelector("#section_4"),
          info_title : document.querySelector('.info_title'),
          info_subtitle : document.querySelector('.info_subtitle'),
          info_map : document.querySelector('.map_img'),
        },
        vals : {}
      }
    ];


    ////// 각 섹션의 높이 지정 -------------------------------------------------------------------------------
    const setLayout = function() {
      let height = 0;

      // 뷰포트 높이가 500px보다 작은 경우는 강제로 500px으로 설정
      if (window.innerHeight < 500) {
        height = 500;
      } else {
        height = window.innerHeight;
      }

      // 각 섹션의 높이 지정
      for (let i = 0; i < sectionSet.length; i++) {
        sectionSet[i].height = height * sectionSet[i].hMultiple;
        sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
      }
    }


    ////// 로컬 내비게이션을 특정 시점부터 고정 ---------------------------------------------------------------
    const makeLocalNavFixed = function() {
      if (yOffset > 44) {
        // 고정시키기
        document.body.classList.add('local_nav_fixed');
      } else {
        // 되돌리기
        document.body.classList.remove('local_nav_fixed');
      }
    }


    ////// 로컬 내비게이션 컬러 변경 ----------------------------------------------------------------------
    const changeLocalNavColor = function() {
        const $localNav = document.querySelector(".local_nav");

        if (currentSection > 0) {
            $localNav.classList.add('local_nav_overSec0');
        } else {
            $localNav.classList.remove('local_nav_overSec0');
        }
    }


    // ////// 섹션0의 타이틀에 트랜지션 부여 ---------------------------------------------------------------------
    // const setTitleTransY = function() {
    //     const $titleTransY = document.querySelector(".sec0_txt_inner");
    //     $titleTransY.setAttribute('class', 'sec0_txt_inner_transY');
    // }


    ////// 화살표 버튼을 클릭하면 최상단으로 스크롤 -----------------------------------------------------------
    const $scrollBtn = document.querySelector('.scrollToTop');

    const backToTop = function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }


    ////// 화살표 버튼이 섹션0(탑)에 있을 때만 안보이게 --------------------------------------------------------
    const hideScrollBtn = function() {
        if (yOffset > 0) {
            $scrollBtn.style.opacity = 1;
        } else {
            $scrollBtn.style.opacity = 0;
        }
    }


    ////// 부제목 트랜지션 ------------------------------------------------------------------------------------
    const sec0_subtitle_transY = function() {
        const $subtitle_left = document.querySelector(".sec0_txt_subtitle_left");
        const $subtitle_right = document.querySelector(".sec0_txt_subtitle_right");
        $subtitle_left.classList.add('sec0_txt_subtitle_left_transY');
        $subtitle_right.classList.add('sec0_txt_subtitle_right_transY');
    }



    ////// 스크롤된 시점의 섹션명 도출 ------------------------------------------------------------------------
    const getCurrentSectionOriginal = function() {
        let segment = [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height + sectionSet[4].height
        ]

        let section = 0;

        if (yOffset <= segment[0]) {
            section = 0;
        }
        else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {
            section = 1;
        }
        else if ((yOffset > segment[1]) && (yOffset <= segment[2])) {
            section = 2;
        }
        else if ((yOffset > segment[2]) && (yOffset <= segment[3])) {
            section = 3;
        }
        else if ((yOffset > segment[3]) && (yOffset <= segment[4])) {
            section = 4;
        }
        else {
            // 발생할 일이 없지만~
            console.error("[ERROR] getCurrentSection()");
        }
        return section;
    }

    ////// [수정: getCurrentSection] 반복되는 코드 리팩토링 ---------------------------------------------------
    const getCurrentSection = function() {
      const segment = [];
      let accumulatedHeight = 0;

      // 각 섹션의 높이를 누적하여 segment 배열에 추가
      for (let i = 0; i < sectionSet.length; i++) {
        accumulatedHeight += sectionSet[i].height;
        segment.push(accumulatedHeight);
      }

      // 현재 yOffset이 어느 섹션에 해당하는지 판별
      for (let i = 0; i < segment.length; i++) {
        if (yOffset <= segment[i]) {
          return i;
        }
      }

      // 발생할 일이 없지만~
      console.error("[ERROR] getCurrentSection()");
      return -1; // 유효하지 않은 값 반환
    }



    ////// body ID를 섹션에 맞게 변경 -----------------------------------------------------------------------
    // [이유]
    const setBodyID = function(section) {
        document.body.setAttribute("id", `show_section${section}`);
    }


    ////// 이전 섹션의 높이 구하기 --------------------------------------------------------------------------
    // [이유]
    const getPrevSecHeight = function() {
        let prevHeight = 0;

        for (let i = 0; i < currentSection; i++) {
            prevHeight = prevHeight + sectionSet[i].height;
        }
        return prevHeight;
    }


    ////// 애니메이션 범위 할당 ----------------------------------------------------------------------------
    const calcValue = function(values) {
        let result = 0; // 결과(CSS값)
        let ratio = 0;  // 비율

        // 부분 애니메이션 계산 시 필요한 변수
        let partStart = 0;
        let partEnd = 0;
        let partDistance = 0;

        // 현재 섹션의 높이
        const curHeight = sectionSet[currentSection].height;

        // [1, 0];
        if (values.length === 2) {
          // 비율 구하기
          ratio = sectionYOffset / curHeight;

          // 비율에 따른 CSS값 구하기
          result = ((values[1] - values[0]) * ratio) + values[0];
        }

        // [1, 0, {start, end}]
        else if (values.length === 3) {
            partStart = values[2].start * curHeight;
            partEnd = values[2].end * curHeight;
            partDistance = partEnd - partStart;

            if (sectionYOffset < partStart) {
              result = values[0];
            } else if (sectionYOffset > partEnd) {
              result = values[1];
            } else {
              ratio = (sectionYOffset - partStart) / partDistance;
              result = ((values[1] - values[0]) * ratio) + values[0];
            }
        }
        return result;
    }


    ////// 섹션별 애니메이션 실행 -------------------------------------------------------------------
    const playAnimation = function() {
        let opacity = 0;
        let translateX = 0;
        let translateY = 0;
        let scrollRate = sectionYOffset / sectionSet[currentSection].height; // 0~1 사이의 값 도출

        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        switch(currentSection) {
        // 현재 스크롤된 위치가 어느 섹션인가?

          case 0:
            // console.log("0번 섹션 애니메이션 실행중");
            break;
              
          case 1:
            // 스크롤업 시 투명도 0%
            objects.messageA.style.opacity = 0;
            objects.messageB.style.opacity = 0;
            objects.messageC.style.opacity = 0;
            objects.messageD.style.opacity = 0;
            objects.messageE.style.opacity = 0;
            objects.imagePint.style.opacity = 0;

            // // 이미지
            // if ((scrollRate >= 0.20)) {

            //     opacity = calcValue(values.imagePint_fade_in);
            //     objects.imagePint.style.opacity = opacity;

            // } else if ((scrollRate >= 0.22) && (scrollRate < 0.78)) {
            //     translateY = calcValue(values.imagePint_transY);
            //     objects.imagePint.style.transform = `translateY(${translateY}%)`;

            // } else if ((scrollRate >= 0.80) && (scrollRate <= 1.00)) {
            //     opacity = calcValue(values.imagePint_fade_out);
            //     objects.imagePint.style.opacity = opacity;
            // }

            translateY = calcValue(values.imagePint_transY);
            objects.imagePint.style.transform = `translateY(${translateY}%)`;

            if ((scrollRate >= 0.10) && (scrollRate <= 0.74)) {
                objects.imagePint.style.opacity = 1;
            }
            
            
            if (scrollRate < 0.10) {                                        // messageA

              opacity = calcValue(values.messageA_fade_in);
              objects.messageA.style.opacity = opacity;
              objects.imagePint.style.opacity = opacity;

              translateY = calcValue(values.messageA_transY_in);
              objects.messageA.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.10) && (scrollRate < 0.18)) {

              opacity = calcValue(values.messageA_fade_out);
              objects.messageA.style.opacity = opacity;

              translateY = calcValue(values.messageA_transY_out);
              objects.messageA.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.18) && (scrollRate < 0.26)) {       // messageB

              opacity = calcValue(values.messageB_fade_in);
              objects.messageB.style.opacity = opacity;

              translateY = calcValue(values.messageB_transY_in);
              objects.messageB.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.26) && (scrollRate < 0.34)) {

              opacity = calcValue(values.messageB_fade_out);
              objects.messageB.style.opacity = opacity;

              translateY = calcValue(values.messageB_transY_out);
              objects.messageB.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.34) && (scrollRate < 0.42)) {       // messageC

              opacity = calcValue(values.messageC_fade_in);
              objects.messageC.style.opacity = opacity;

              translateY = calcValue(values.messageC_transY_in);
              objects.messageC.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.42) && (scrollRate < 0.50)) {

              opacity = calcValue(values.messageC_fade_out);
              objects.messageC.style.opacity = opacity;

              translateY = calcValue(values.messageC_transY_out);
              objects.messageC.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.50) && (scrollRate < 0.58)) {       // messageD

              opacity = calcValue(values.messageD_fade_in);
              objects.messageD.style.opacity = opacity;

              translateY = calcValue(values.messageD_transY_in);
              objects.messageD.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.58) && (scrollRate < 0.66)) {

              opacity = calcValue(values.messageD_fade_out);
              objects.messageD.style.opacity = opacity;

              translateY = calcValue(values.messageD_transY_out);
              objects.messageD.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.66) && (scrollRate < 0.74)) {       // messageE

              opacity = calcValue(values.messageE_fade_in);
              objects.messageE.style.opacity = opacity;

              translateY = calcValue(values.messageE_transY_in);
              objects.messageE.style.transform = `translateY(${translateY}%)`;

            } else if ((scrollRate >= 0.74) && (scrollRate < 0.87)) {

              opacity = calcValue(values.messageE_fade_out);
              objects.messageE.style.opacity = opacity;
              objects.imagePint.style.opacity = opacity;

              translateY = calcValue(values.messageE_transY_out);
              objects.messageE.style.transform = `translateY(${translateY}%)`;
            }
            // console.log("1번 섹션 애니메이션 실행중");
            break;

          case 2:
            translateX = calcValue(values.titleA_transX);
            objects.titleA.style.transform = `translateX(${translateX}%)`;

            translateX = calcValue(values.titleB_transX);
            objects.titleB.style.transform = `translateX(${translateX}%)`;

            translateX = calcValue(values.titleC_transX);
            objects.titleC.style.transform = `translateX(${translateX}%)`;

            // console.log("2번 섹션 애니메이션 실행중");
            break;

          case 3:
            if (scrollRate > 0.1) {
              objects.guideA.classList.add('on');
              objects.guideB.classList.add('on');
            } else {
              objects.guideA.classList.remove('on');
              objects.guideB.classList.remove('on');
            }

            if (scrollRate > 0.4) {
              objects.guideC.classList.add('on');
              objects.guideD.classList.add('on');
            } else {
              objects.guideC.classList.remove('on');
              objects.guideD.classList.remove('on');
            }


            const $info_title = document.querySelector('.info_title');
            const $info_subtitle = document.querySelector('.info_subtitle');
            const $info_map = document.querySelector('.sec4_map');

            if (scrollRate > 0.65) {
              $info_title.classList.add('on');
              $info_subtitle.classList.add('on');
              $info_map.classList.add('on');
            } else {
              $info_title.classList.remove('on');
              $info_subtitle.classList.remove('on');
              $info_map.classList.remove('on');
            }
            // console.log("3번 섹션 애니메이션 실행중");
            break;

          case 4:
            // console.log("4번 섹션 애니메이션 실행중");
            break;

          default:
            console.error("[ERROR] playAnimation()");
            break;
        }
    }
    







    ////// 이벤트리스너 ////////////////////////////////////////////////////////////////

    window.addEventListener('scroll', () => {

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // 스크롤 버튼이 섹션0(탑)에서만 안보이게
        hideScrollBtn();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();
        // console.log(currentSection);

        // 섹션별 스크롤값 초기화
        sectionYOffset = yOffset - getPrevSecHeight();

        // CSS 변경..
        setBodyID(currentSection);
        changeLocalNavColor();

        // 애니메이션 실행
        playAnimation();

    });


    window.addEventListener('load', () => {

        // 레이아웃 설정
        setLayout();

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // // 탑 텍스트 트랜지션
        // setTitleTransY();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // CSS 변경..
        setBodyID(currentSection);
        sec0_subtitle_transY();

    });


    window.addEventListener('resize', () => {

        // 레이아웃 재설정
        setLayout();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // 섹션별 스크롤값 초기화
        sectionYOffset = yOffset - getPrevSecHeight();

        // CSS 변경
        makeLocalNavFixed();
        sec0_subtitle_transY();


        setBodyID(currentSection);

    });



    // 화살표 버튼을 클릭하면 최상단으로 스크롤
    $scrollBtn.addEventListener('click', backToTop);
    
})();