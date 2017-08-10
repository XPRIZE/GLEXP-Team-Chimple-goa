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
 
package org.chimple.bali.db;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.Room;
import android.arch.persistence.room.RoomDatabase;
import android.content.Context;
import android.support.annotation.VisibleForTesting;

import org.chimple.bali.db.dao.LessonDao;
import org.chimple.bali.db.dao.LessonUnitDao;
import org.chimple.bali.db.dao.UnitDao;
import org.chimple.bali.db.dao.UnitPartDao;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UnitPart;

@Database(entities = {Lesson.class, LessonUnit.class, Unit.class, UnitPart.class},
        version = 1
)
public abstract class AppDatabase extends RoomDatabase {
    /** The only instance */
    private static AppDatabase sInstance;

    public abstract LessonDao lessonDao();

    public abstract LessonUnitDao lessonUnitDao();

    public abstract UnitDao unitDao();

    public abstract UnitPartDao unitPartDao();

    public static synchronized AppDatabase getInstance(Context context) {
        if (sInstance == null) {
            sInstance = Room
                    .databaseBuilder(context.getApplicationContext(), AppDatabase.class, "bali_db")
                    .build();
            //sInstance.populateInitialData();
        }
        return sInstance;
    }

    /**
     * Switches the internal implementation with an empty in-memory database.
     *
     * @param context The context.
     */
    @VisibleForTesting
    public static void switchToInMemory(Context context) {
        sInstance = Room.inMemoryDatabaseBuilder(context.getApplicationContext(),
                AppDatabase.class).build();
    }


}
