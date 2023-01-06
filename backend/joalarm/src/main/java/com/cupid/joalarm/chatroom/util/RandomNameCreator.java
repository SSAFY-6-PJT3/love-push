package com.cupid.joalarm.chatroom.util;

import java.util.Arrays;
import java.util.List;
import java.util.StringJoiner;

public class RandomNameCreator {

    private RandomNameCreator() {
    }

    private static final List<String> FIRST =
            Arrays.asList("상큼하고", "산뜻하고", "활기차고", "발랄하고", "쾌활하고", "재치있고", "상냥하고");
    private static final List<String> MIDDLE =
            Arrays.asList("유머러스한", "용기있는", "성격좋은", "섬세한", "훈훈한", "웃음많은", "순수한",
                    "든든한", "명랑한", "다정한", "희망찬");
    private static final List<String> LAST =
            Arrays.asList("캥거루", "하마", "거북이", "얼룩말", "낙타", "물소", "고양이", "강아지", "기린", "호박벌",
                    "거위", "오리", "햄스터", "수달", "물개", "다람쥐", "순록", "사슴", "펭귄", "뻐꾸기",
                    "앵무새", "고슴도치", "사막여우", "타조", "돌고래", "양", "병아리", "갈매기", "백조", "꿀벌",
                    "두더지");

    public static String newName(int val) {
        return new StringJoiner(" ")
                .add(getFeature(FIRST, val))
                .add(getFeature(MIDDLE, val))
                .add(getFeature(LAST, val))
                .toString();
    }

    private static String getFeature(List<String> features, int val) {
        return features.get(val % features.size());
    }
}
