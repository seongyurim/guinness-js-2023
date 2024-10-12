![Header](https://capsule-render.vercel.app/api?type=rect&color=341e11&text=Guinness&desc=바닐라%20자바스크립트로%20구현한%20기네스%20맥주%20소개%20앱&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
소개글

## 📍개발기간
2023.04.08 ~ 04.30 (3주)

## 📍기술스택
<div>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
	<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

## 📍주요기능

## 📍상세기능
### 1) 전역변수
- `yOffset`: `window.scrollY`
- `currentSection`: 현재 섹션
- `sectionYOffset`: `yOffset`의 스크롤 값을 섹션별로 초기화
- `sectionSet`: 섹션별 정보를 담은 배열

### 2) 함수
- `setLayout`: 각 섹션의 높이를 지정합니다.
- `makeLocalNavFixed`: 로컬 내비게이션을 특정 시점부터 고정합니다.
- `changeLocalNavColor`: 로컬 내비게이션의 컬러를 변경합니다.
- `backToTop`: 화살표 버튼을 클릭하면 최상단으로 이동합니다.
- `hideScrollBtn`: 화살표 버튼이 탑 섹션에 있을 때에만 숨깁니다.
- `sec0_subtitle_transY`: 탑 섹션의 부제목 트랜지션을 적용합니다.
- `getCurrentSection`: 현재 스크롤된 섹션이 어디인지 섹션 넘버를 반환합니다.
- `setBodyID`: body ID를 섹션에 맞게 변경합니다.
- `getPrevSecHeight`: 이전 섹션의 높이를 구합니다.
- `calcValue`: 스크롤 위치에 따라 애니메이션의 진행도를 계산하고 그에 맞는 중간값을 도출합니다.
- `playAnimation`: 섹션별로 애니메이션을 실행합니다.

### 3) 이벤트리스너
load, scroll

## 📍리팩토링
<details>
	<p><summary><strong>1) getCurrentSection()</strong></summary></p>

<p>1-1) BEFORE</p>
	
  ```javascript
  const getCurrentSectionOriginal = function() {
      let segment = [
          sectionSet[0].height,
          sectionSet[0].height + sectionSet[1].height,
          sectionSet[0].height + sectionSet[1].height + sectionSet[2].height,
          sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height,
          sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height + sectionSet[4].height
      ];

      let section = 0;

      if (yOffset <= segment[0]) {
          section = 0;
      } else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {
          section = 1;
      } else if ((yOffset > segment[1]) && (yOffset <= segment[2])) {
          section = 2;
      } else if ((yOffset > segment[2]) && (yOffset <= segment[3])) {
          section = 3;
      } else if ((yOffset > segment[3]) && (yOffset <= segment[4])) {
          section = 4;
      } else {
          console.error("[ERROR] getCurrentSection()");
      }
      return section;
  };
```

<p>1-2) AFTER</p>

  ```javascript
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
```
</details>
