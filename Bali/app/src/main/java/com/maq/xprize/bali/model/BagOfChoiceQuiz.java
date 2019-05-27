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

public class BagOfChoiceQuiz {
    public static final String HELP = "help";
    public static final String ANSWER = "answer";
    public static final String ANSWERS = "answers";
    public static final String OTHER_CHOICES = "otherChoices";

    public String help;
    public String answer;
    public String[] answers;
    public String[] otherChoices;

    public BagOfChoiceQuiz(String help, String answer, String[] answers, String[] otherChoices) {
        this.help = help;
        this.answer = answer;
        this.answers = answers;
        this.otherChoices = otherChoices;
    }

    public BagOfChoiceQuiz(Bundle bundle) {
        this(bundle.getString(HELP), bundle.getString(ANSWER),
                bundle.getStringArray(ANSWERS), bundle.getStringArray(OTHER_CHOICES));
    }

    public Bundle getBundle() {
        Bundle bundle = new Bundle();
        bundle.putString(HELP, help);
        bundle.putString(ANSWER, answer);
        bundle.putStringArray(ANSWERS, answers);
        bundle.putStringArray(OTHER_CHOICES, otherChoices);
        return bundle;
    }
}

