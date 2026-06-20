// ⚠️ 自動產生，請勿手動編輯。來源：tools/build-lectures.mjs
var LECTURE_PART_COUNT = 9;
var GUA_TO_PART = {"乾":1,"蒙":1,"坤":1,"艮":1,"需":2,"无妄":2,"觀":2,"隨":2,"復":2,"屯":2,"萃":3,"益":3,"夬":3,"小畜":3,"履":3,"家人":3,"豐":3,"訟":4,"豫":4,"賁":4,"大壯":4,"晉":4,"井":4,"渙":4,"恆":5,"睽":5,"姤":5,"大過":5,"升":5,"革":5,"坎":5,"蹇":5,"困":6,"蠱":6,"咸":6,"損":6,"噬嗑":6,"謙":6,"泰":6,"明夷":6,"遯":7,"頤":7,"歸妹":7,"同人":7,"離":7,"未濟":7,"大有":7,"漸":7,"小過":8,"臨":8,"比":8,"大畜":8,"否":8,"巽":8,"震":8,"剝":8,"解":8,"兌":9,"鼎":9,"旅":9,"師":9,"中孚":9,"節":9,"既濟":9};

// 依區塊編號取出該區塊的講稿物件（只載入需要的那一塊）
function _lecturePartByNum_(n) {
  switch (n) {
    case 1: return _lecturePart1_();
    case 2: return _lecturePart2_();
    case 3: return _lecturePart3_();
    case 4: return _lecturePart4_();
    case 5: return _lecturePart5_();
    case 6: return _lecturePart6_();
    case 7: return _lecturePart7_();
    case 8: return _lecturePart8_();
    case 9: return _lecturePart9_();
    default: return null;
  }
}
