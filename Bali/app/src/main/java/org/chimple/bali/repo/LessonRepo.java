package org.chimple.bali.repo;
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

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;

import org.chimple.bali.R;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.model.BagOfChoiceQuiz;
import org.chimple.bali.model.MultipleChoiceQuiz;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class LessonRepo {
    private static final MutableLiveData ABSENT = new MutableLiveData();
    {
        //noinspection unchecked
        ABSENT.setValue(null);
    }

    public static void markNextLesson(Context context) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {
                Context context1 = params[0];
                AppDatabase db = AppDatabase.getInstance(context1);
                SharedPreferences sharedPref = context1.getSharedPreferences(
                        context.getString(R.string.preference_file_key),
                        Context.MODE_PRIVATE);
                Long userId = sharedPref.getLong(context.getString(R.string.user_id), -1);
                if (userId != -1) {
                    User user = db.userDao().getUserById(userId);
                    //TODO: Handle no user

                    Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
                    Lesson newLesson = db.lessonDao().getLessonBySeq(lesson.seq + 1);
                    if (newLesson != null) {
                        user.currentLessonId = newLesson.id;
                        db.userDao().updateUser(user);
                    }
                }
                return null;
            }
        }.execute(context);
    }

    public static List<MultipleChoiceQuiz> getMultipleChoiceQuizes(Context context, int numQuizes, int numChoices) {
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

        List<MultipleChoiceQuiz> mcqs = new ArrayList<MultipleChoiceQuiz>(numQuizes);
        for (int i = 0; i < numQuizes; i++) {
            int lucIndex = ThreadLocalRandom.current().nextInt(lucs.length);
            //TODO: do not repeat mcq
            FlashCard luc = lucs[lucIndex];
            String[] choices = new String[numChoices];
            int answerIndex = ThreadLocalRandom.current().nextInt(numChoices);
            //TODO: IF object is not there, put subject
            for (int c = 0; c < numChoices; c++) {
                if (c == answerIndex) {
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
            mcqs.add(mcq);
        }
        return mcqs;
    }

    public static BagOfChoiceQuiz[] getBagOfChoiceQuizes() {
        //TODO
        return null;
    }

}
