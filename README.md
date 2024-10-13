![Header](https://capsule-render.vercel.app/api?type=rect&color=341e11&text=Guinness&desc=바닐라%20자바스크립트로%20구현한%20기네스%20맥주%20소개%20앱&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
외부 라이브러리나 프레임워크 없이 바닐라 자바스크립트로 구현한 기네스 맥주 소개 앱입니다. 콘텐츠에 따라 섹션을 구분하고 각 섹션에 애니메이션을 동작시켜 사용자가 흥미롭게 정보를 탐색할 수 있도록 구성했습니다.

## 📍개발기간
2023.04.08 ~ 04.30 (3주)

## 📍기술스택
<div>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
	<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

## 📍주요기능
- **사용자가 위치한 섹션 정의**: 사용자의 위치를 감지하여 해당 섹션에 맞는 애니메이션을 실행합니다.
- **스크롤 애니메이션**: 스크롤 시 텍스트가 하나씩 나타나고 사라지며, 배경 이미지는 천천히 스크롤됩니다.
- **애니메이션 범위 할당**: 스크롤 위치에 따라 애니메이션 진행 비율을 계산하고, 이를 바탕으로 CSS 값의 중간값을 동적으로 도출하는 함수를 통해 다양한 애니메이션 효과를 구현합니다.
- **섹션 정보 데이터**: 각 섹션의 구성 요소를 배열에 정의하여 동적으로 생성함으로써 가독성과 유지보수성을 향상시킵니다.
- **다양한 소개 콘텐츠**: 기네스에 대한 정보(개요, 마시는 방법, 이벤트)를 제공하여 사용자의 흥미를 유발하고 이해를 돕습니다.

## 📍상세기능
### 1) 섹션 구성
- section0: 탑 배너(비디오) 영역
- section1: 기네스 소개 스크롤 애니메이션 영역
- section2: 기네스 가이드 제목 영역
- section3: 기네스 가이드 본문 영역
- section4: 매장 안내 영역

### 2) 전역변수
- `yOffset`: `window.scrollY`
- `currentSection`: 현재 섹션
- `sectionYOffset`: `yOffset`의 스크롤 값을 섹션별로 초기화
- `sectionSet`: 섹션별 정보를 담은 배열

### 3) 주요함수
#### 3-1) `calcValue`: 스크롤 위치에 따라 애니메이션의 진행도를 계산하고 그에 맞는 중간값 도출
<details>
	<p><summary><strong>전체코드</strong></summary></p>

```javascript
const calcValue = function (values) {
  let result = 0; // 결과(CSS값)
  let ratio = 0; // 비율

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
    result = (values[1] - values[0]) * ratio + values[0];
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
      result = (values[1] - values[0]) * ratio + values[0];
    }
  }
  return result;
};
```
</details>

- `sectionSet` 배열에 정의해둔 `vals` 정보 중 하나를 매개변수로 받습니다.
- 그 정보는 `[1, 0, { start: 0.10, end: 0.16 }]` 형식으로 저장되어 있습니다.
- 각 인덱스는 트랜지션의 시작값, 종료값, 시작되는 곳의 비율, 종료되는 곳의 비율입니다.
- 섹션 높이와 스크롤 위치를 기반으로 애니메이션 시작과 끝 값을 비율에 맞게 계산하여 적절한 값을 반환합니다.
- 값 배열 형태에 따라 단순 비율 계산 또는 특정 구간에서의 애니메이션 값을 처리합니다.
<img width="1133" alt="GuinnessCalcValue" src="https://github.com/user-attachments/assets/cc901336-91cf-4477-ae67-bcbf85a7a6d5">

#### 3-2) `playAnimation`: 섹션별로 애니메이션 실행
- switch문을 사용하여 섹션별 애니메이션 블록을 구분합니다.
- 스크롤 위치에 따라 애니메이션을 적용하여 사용자 경험을 향상시킵니다.
- 사용자가 현재 위치한 지점의 스크롤 비율(`scrollRate`)을 받아 애니메이션의 실행 여부를 결정합니다.
- 특정 스크롤 비율에 도달했을 때 각 DOM 요소의 CSS 값을 직접 변경하거나 선택자를 추가합니다.
- 애니메이션은 제목, 부제목, 지도 이미지 등 다양한 요소에 적용됩니다.
- `scrollRate` 및 `sectionSet.vals` 값에 따라 부드러운 애니메이션 효과로 화면이 자연스럽게 전환됩니다.

#### 3-3) `getCurrentSection`: 현재 스크롤된 섹션의 넘버값 반환
<details>
	<p><summary><strong>전체코드 및 리팩토링</strong></summary></p>

<p>반복되는 코드를 for 반복문을 통해 간소화하여 섹션 높이를 누적 계산하고, 현재 yOffset에 해당하는 섹션을 보다 효율적으로 판별합니다.</p>

<p>▿BEFORE</p>
	
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

<p>▿AFTER</p>

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

- 각 섹션의 높이를 누적산한 값을 하나씩 `segment` 배열에 추가합니다.
- `segment` 배열의 길이만큼 순회하는 반복문을 만듭니다.
- `yOffset`이 `segment[i]`와 작거나 같다면 그 `i`값을 반환합니다.
- 예외 경우는 발생할 일이 없지만 `console.error`처리하고 -1을 반환하여 대응합니다.

### 4) 기타함수
#### 4-1) `setLayout`: 각 섹션의 높이 지정
- 뷰포트 높이가 500px보다 작으면 500px로, 그렇지 않으면 `window.innerHeight`로 지정합니다.
- 지정한 높이 값에 `hMultiple`을 곱한 값을 `sectionSet`의 `height`에 저장합니다.
- 그 저장된 값을 각 섹션의 container DOM 요소의 높이 값으로도 지정합니다.

#### 4-2) `makeLocalNavFixed`: 로컬 내비게이션을 특정 시점부터 고정
- `yOffset`이 일정 높이(44px)를 넘어가면 CSS 선택자를 추가합니다.
- 그렇지 않으면 선택자를 제거하여 속성을 되돌립니다.

#### 4-3) `changeLocalNavColor`: 로컬 내비게이션 컬러를 변경
- 내비게이션은 첫번째 섹션에서 흰색 텍스트로 표시됩니다.
- 하지만 다음 섹션부터는 검정색으로 표시되어야 가시성을 확보할 수 있습니다.
- 이에 따라 `currentSection`이 0보다 큰 경우 CSS 선택자를 추가합니다.

#### 4-4) `backToTop`: 화살표 버튼을 클릭하면 최상단으로 스크롤
- 화살표 버튼을 클릭하면 `window.scrollTo` 메서드로 `top: 0`으로 이동합니다.

#### 4-5) `hideScrollBtn`: 화살표 버튼이 탑 섹션에 있을 때에만 숨기기
- `yOffset`이 0보다 크면 스크롤 버튼 DOM 요소의 `opacity` 값을 1로 변경합니다.

#### 4-6) `sec0_subtitle_transY`: 탑 섹션의 부제목 트랜지션
- 이벤트리스너를 통해 페이지가 로드되었을 때, 리사이징되었을 때 실행되도록 클래스를 추가합니다.
- 트랜지션이 적용된 클래스가 적용됩니다.

#### 4-7) `setBodyID`: body ID를 섹션에 맞게 변경
- html에 설정해두었던 `body` 태그의 `id="show_section0"`을 섹션에 맞게 변경합니다.
- section1에서 기네스 소개 문구를 선택자로 지정하여 `sticky`로 처리하기 위한 방법입니다.
- `#show_section1 .sticky_element`로 지정할 수 있습니다.
- 실행시점: scroll, load, resize 이벤트

#### 4-8) `getPrevSecHeight`: 이전 섹션의 높이 계산
- `sectionYOffset = yOffset - getPrevSecHeight();`
- 섹션별 스크롤값 초기화(`sectionYOffset`)를 계산하기 위해 필요한 함수입니다.
- 현재 섹션을 제외한 이전 섹션들의 누적산된 높이를 제거함으로써 현재 섹션에서의 스크롤값만 알아낼 수 있습니다.
- 실행시점: scroll, resize 이벤트

### 3) 이벤트리스너
#### 3-1) scroll
- `yOffset`: `scrollY` 값을 스크롤 이벤트가 일어날 때마다 저장합니다.
- `sectionYOffset`: 전체 스크롤 위치가 아닌 섹션 내부에서의 스크롤 위치를 저장합니다.
- `makeLocalNavFixed`: 로컬 내비게이션을 특정 위치부터 고정시킵니다.
- `hideScrollBtn`: 화살표 버튼이 section0에서만 보이지 않게 숨깁니다.
- `currentSection`: `getCurrentSection` 함수를 통해 현재 사용자가 위치한 섹션 넘버를 반환합니다.
- `setBodyID`: `body`태그의 `id`를 동적으로 설정하여 특정 `id`에 CSS 선택자를 반영합니다.
- `changeLocalNavColor`: section0을 벗어나면 내비게이션 색상을 변경합니다.
- `playAnimation`: 애니메이션을 실행합니다.

#### 3-2) load
- `setLayout`: 각 섹션의 높이값을 할당합니다.
- `sec0_subtitle_transY`: section0 부제목의 트랜지션을 설정합니다.
- `yOffset`
- `makeLocalNavFixed`
- `currentSection`
- `setBodyID`

#### 3-3) resize
- `setLayout`
- `currentSection`
- `sectionYOffset`
- `makeLocalNavFixed`
- `sec0_subtitle_transY`
- `setBodyID`

#### 3-4) click
- backToTop: 화살표 버튼을 클릭하면 페이지 최상단으로 이동합니다.
