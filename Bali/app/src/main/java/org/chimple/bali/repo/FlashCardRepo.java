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

package org.chimple.bali.repo;

import android.arch.core.util.Function;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.Transformations;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;

import org.chimple.bali.R;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.DatabaseCreator;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.db.pojo.FlashCard;

import java.util.List;

public class FlashCardRepo {
    private static final MutableLiveData ABSENT = new MutableLiveData();
    {
        //noinspection unchecked
        ABSENT.setValue(null);
    }

    public static LiveData<List<FlashCard>> getFlashCards(Context context) {
        final DatabaseCreator databaseCreator = DatabaseCreator.getInstance();
        MutableLiveData<List<FlashCard>> flashCards = ABSENT;
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                AppDatabase db = databaseCreator.getDatabase();
                // Get the current user
                SharedPreferences sharedPref = context.getSharedPreferences(
                        context.getString(R.string.preference_file_key),
                        Context.MODE_PRIVATE);
                Long userId = sharedPref.getLong(context.getString(R.string.user_id), -1);
                if (userId != -1) {
                    User user = db.userDao().getUserById(userId);
                    //TODO: Handle no user

                    Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
                    //TODO: Handle no lesson

                    List<FlashCard> flashCardList = db.lessonUnitDao().getFlashCardsByLessonId(lesson.id);

                    flashCards.postValue(flashCardList);
                }
                return null;
            }
        }.execute();
        return flashCards;
    }
}
