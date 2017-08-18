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

package org.chimple.bali.model;

import android.os.Parcel;
import android.os.Parcelable;

public class MultipleChoiceQuiz implements Parcelable {
    public String help;
    public String question;
    public String[] answers;
    public int correctAnswer;

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(help);
        parcel.writeString(question);
        parcel.writeStringArray(answers);
        parcel.writeInt(correctAnswer);
    }

    public static final Parcelable.Creator<MultipleChoiceQuiz> CREATOR
            = new Parcelable.Creator<MultipleChoiceQuiz>() {
        public MultipleChoiceQuiz createFromParcel(Parcel in) {
            return new MultipleChoiceQuiz(in);
        }

        public MultipleChoiceQuiz[] newArray(int size) {
            return new MultipleChoiceQuiz[size];
        }
    };

    private MultipleChoiceQuiz(Parcel in) {
        help = in.readString();
        question = in.readString();
        in.readStringArray(answers);
        correctAnswer = in.readInt();
    }

    public MultipleChoiceQuiz(String help, String question, String[] answers, int correctAnswer) {
        this.help = help;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}
