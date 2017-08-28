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

import android.arch.lifecycle.LifecycleOwner;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.Transformations;
import android.content.Context;
import android.os.AsyncTask;

import org.chimple.bali.db.DatabaseCreator;
import org.chimple.bali.db.entity.UserLog;

import java.util.Date;

public class UserLogRepo {
    public static void logEntity(LifecycleOwner lifecycleOwner, int entityType, Long entityId, int event) {
        final DatabaseCreator databaseCreator = DatabaseCreator.getInstance();
        databaseCreator.isDatabaseCreated().observe(lifecycleOwner, isDatabaseCreated -> {
            if(isDatabaseCreated) {
                new AsyncTask<Void, Void, Void>() {
                    @Override
                    protected Void doInBackground(Void... voids) {
                        UserLog userLog = new UserLog(new Date(), entityType, entityId, event);
                        databaseCreator.getDatabase().userLogDao().insertUserLog(userLog);
                        return null;
                    }
                }.execute();
            }
        });
    }

    //TODO: for now a hack to do wothout observe
    public static void logEntity(int entityType, Long entityId, int event) {
        final DatabaseCreator databaseCreator = DatabaseCreator.getInstance();
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {
                UserLog userLog = new UserLog(new Date(), entityType, entityId, event);
                databaseCreator.getDatabase().userLogDao().insertUserLog(userLog);
                return null;
            }
        }.execute();
    }

}
