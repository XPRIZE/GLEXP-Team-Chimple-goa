/*
 * Copyright 2017, Team Chimple
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.maq.xprize.bali.model;

import android.os.Bundle;

import com.maq.xprize.bali.db.entity.Unit;

public class MultipleChoiceQuiz {
    public static final String HELP = "help";
    public static final String QUESTION = "question";
    public static final String ANSWERS = "answers";
    public static final String CORRECT_ANSWER = "correctAnswer";

    public String help;
    public String question;
    public String[] answers;
    public int correctAnswer;
    public Unit questionUnit;
    public Unit[] answerUnits;

    public MultipleChoiceQuiz(String help, Unit questionUnit, Unit[] answerUnits, int correctAnswer) {
        this.help = help;
        this.questionUnit = questionUnit;
        this.answerUnits = answerUnits;
        this.question = questionUnit.name;
        answers = new String[answerUnits.length];
        for(int i = 0; i < answerUnits.length; i++) {
            answers[i] = answerUnits[i].name;
        }
        this.correctAnswer = correctAnswer;
    }

//    public MultipleChoiceQuiz(Bundle bundle) {
//        this(bundle.getString(HELP), bundle.getString(QUESTION),
//                bundle.getStringArray(ANSWERS), bundle.getInt(CORRECT_ANSWER));
//    }
//
//    public Bundle getBundle() {
//        Bundle b = new Bundle();
//        b.putString(HELP, help);
//        b.putString(QUESTION, question);
//        b.putStringArray(ANSWERS, answers);
//        b.putInt(CORRECT_ANSWER, correctAnswer);
//        return b;
//    }

}
