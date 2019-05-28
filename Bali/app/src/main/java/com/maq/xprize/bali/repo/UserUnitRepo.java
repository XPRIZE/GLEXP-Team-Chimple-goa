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
import com.maq.xprize.bali.db.entity.UserUnit;

import java.util.Date;

public class UserUnitRepo {
    public static void createOrUpdateUserUnit(Context context, Long unitId, int score) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {
                Context context1 = params[0];
                final AppDatabase db = AppDatabase.getInstance(context1);
                User user = UserRepo.getCurrentUser(context1);
                if (user != null) {
                    Long userId = user.id;
                    UserUnit userUnit = db.userUnitDao().getUserUnitByUserIdAndUnitId(userId, unitId);
                    if (userUnit == null) {
                        userUnit = new UserUnit(userId, unitId, new Date(), 1, score == -1 ? 0 : score);
                        db.userUnitDao().insertUserUnit(userUnit);
                    } else {
                        userUnit.seenCount++;
                        userUnit.seenAt = new Date();
                        if(score != -1) {
                            userUnit.score = score;
                        }
                        db.userUnitDao().updateUserUnit(userUnit);
                    }
                }
                return null;
            }
        }.execute(context);
    }

}
