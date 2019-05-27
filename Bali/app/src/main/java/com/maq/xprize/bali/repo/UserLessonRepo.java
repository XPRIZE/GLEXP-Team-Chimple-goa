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

package com.maq.xprize.bali.repo;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;

import com.maq.xprize.bali.R;
import com.maq.xprize.bali.db.AppDatabase;
import com.maq.xprize.bali.db.entity.User;
import com.maq.xprize.bali.db.entity.UserLesson;

import java.util.Date;

public class UserLessonRepo {
    public static void createOrUpdateUserLesson(Context context, Long lessonId, int score) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {
                Context context = params[0];
                final AppDatabase db = AppDatabase.getInstance(context);
                User user = UserRepo.getCurrentUser(context);
                if (user != null) {
                    Long userId = user.id;
                    Long computedLessonId = lessonId;
                    if(computedLessonId == 0) {
                        computedLessonId = user.currentLessonId;
                    }
                    UserLesson userLesson = db.userLessonDao().getUserLessonByUserIdAndLessonId(userId, computedLessonId);
                    if (userLesson == null) {
                        userLesson = new UserLesson(userId, computedLessonId, new Date(), 1, score == -1 ? 0 : score);
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
