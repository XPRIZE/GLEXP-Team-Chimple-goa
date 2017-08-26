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

package org.chimple.bali.helper;

import android.content.Context;

import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.model.BagOfChoiceQuiz;
import org.chimple.bali.model.MultipleChoiceQuiz;

public class LessonHelper {
    public static MultipleChoiceQuiz[] getMultipleChoiceQuizes(Context context, int numQuizes, int numChoices) {
/*
        AppDatabase db = AppDatabase.getInstance(context);

        // Get the current user
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key),
                Context.MODE_PRIVATE);
        Long userId = sharedPref.getLong(context.getString(R.string.user_id), 0);
        // TODO: Handle no userId

        User user = db.userDao().getUserById(userId);
        //TODO: Handle no user

        Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
        //TODO: Handle no lesson

        FlashCard[] lucs = db.lessonUnitDao().getFlashCardArrayByLessonId(lesson.id);
        //TODO: Handle no lucs

        MultipleChoiceQuiz[] mcqs = new MultipleChoiceQuiz[numQuizes];
        for (int i = 0; i < numQuizes; i++) {
            int lucIndex = ThreadLocalRandom.current().nextInt(lucs.length);
            //TODO: do not repeat mcq
            FlashCard luc = lucs[lucIndex];
            String[] choices = new String[numChoices];
            int answerIndex = ThreadLocalRandom.current().nextInt(numChoices);
            //TODO: IF object is not there, put subject
            for (int c = 0; c < numChoices; c++) {
                if(c == answerIndex) {
                    choices[c] = luc.objectUnit.name;
                } else {
                    int randChoiceIndex = ThreadLocalRandom.current().nextInt(lucs.length - 1);
                    int randIndex = (randChoiceIndex + lucIndex + 1) % lucs.length;
                    //TODO: do not repeat choice
                    //TODO: preferably get choices seen by user before
                    choices[c] = lucs[randIndex].objectUnit.name;
                }
            }
            MultipleChoiceQuiz mcq = new MultipleChoiceQuiz("TODO: Dummy Help",
                    luc.subjectUnit.name, choices, answerIndex);
            mcqs[i] = mcq;
        }
        return mcqs;
*/
        return null;
    }

    public static BagOfChoiceQuiz[] getBagOfChoiceQuizes() {
        //TODO
        return null;
    }

    public static FlashCard[] getLessonUnits(Context context, Long lessonId) {
/*
        AppDatabase db = AppDatabase.getInstance(context);

        FlashCard[] lucs = db.lessonUnitDao().getFlashCardArrayByLessonId(lessonId);
        return lucs;
*/
        return null;
    }
}
