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

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;

import org.chimple.bali.R;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.entity.UserLesson;

import java.util.Date;

public class UserLessonRepo {
    public static void createOrUpdateUserLesson(Context context, Long lessonId, int score) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {
                Context context = params[0];
                final AppDatabase db = AppDatabase.getInstance(context);
                SharedPreferences sharedPref = context.getSharedPreferences(
                        context.getString(R.string.preference_file_key),
                        Context.MODE_PRIVATE);
                Long userId = sharedPref.getLong(context.getString(R.string.user_id), -1);
                if (userId != -1) {
                    UserLesson userLesson = db.userLessonDao().getUserLessonByUserIdAndLessonId(userId, lessonId);
                    if (userLesson == null) {
                        userLesson = new UserLesson(userId, lessonId, new Date(), 1, score == -1 ? 0 : score);
                        db.userLessonDao().insertUserLesson(userLesson);
                    } else {
                        userLesson.seenCount++;
                        userLesson.lastSeenAt = new Date();
                        if(score != -1) {
                            userLesson.score = score;
                        }
                        db.userLessonDao().updateUserLesson(userLesson);
                    }
                }
                return null;
            }
        }.execute(context);
    }
}
