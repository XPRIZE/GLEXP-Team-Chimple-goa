package com.maq.xprize.bali.repo;
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
import android.content.Context;
import android.content.SharedPreferences;

import com.maq.xprize.bali.R;
import com.maq.xprize.bali.db.AppDatabase;
import com.maq.xprize.bali.db.dao.UserDao;
import com.maq.xprize.bali.db.entity.User;

public class UserRepo {
    public static int updateCoins(Context context, int coins) {
        AppDatabase db = AppDatabase.getInstance(context);
        User user = getCurrentUser(context);
        user.coins = Math.max(0, user.coins + coins);
        db.userDao().updateUser(user);
        return user.coins;
    }

    public static User getCurrentUser(Context context) {
        AppDatabase db = AppDatabase.getInstance(context);

        // Get the current user
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key),
                Context.MODE_PRIVATE);
        Long userId = sharedPref.getLong("user_id", 0);
        User user = db.userDao().getUserById(userId);
        return user;
    }

    public static LiveData<User> getCurrentLiveUser(Context context) {
        AppDatabase db = AppDatabase.getInstance(context);

        // Get the current user
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key),
                Context.MODE_PRIVATE);
        Long userId = sharedPref.getLong("user_id", 0);
        LiveData<User> user = db.userDao().getLiveUserById(userId);
        return user;
    }
}
