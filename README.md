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


## 📍리팩토링
<details>
	<summary>getCurrentSection()</summary>

  ```javascript
  //// BEFORE
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

  //// AFTER
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
