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
import android.arch.persistence.room.TypeConverters;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.os.AsyncTask;
import android.support.annotation.VisibleForTesting;
import android.util.Log;

import org.chimple.bali.R;
import org.chimple.bali.db.converter.DateConverter;
import org.chimple.bali.db.dao.LessonDao;
import org.chimple.bali.db.dao.LessonUnitDao;
import org.chimple.bali.db.dao.UnitDao;
import org.chimple.bali.db.dao.UnitPartDao;
import org.chimple.bali.db.dao.UserDao;
import org.chimple.bali.db.dao.UserLessonDao;
import org.chimple.bali.db.dao.UserLogDao;
import org.chimple.bali.db.dao.UserUnitDao;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UnitPart;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.db.entity.UserLesson;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.entity.UserUnit;
import org.xml.sax.InputSource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Database(entities = {Lesson.class, LessonUnit.class, Unit.class, UnitPart.class,
        User.class, UserLesson.class, UserUnit.class, UserLog.class},
        version = 1
)
@TypeConverters(DateConverter.class)
public abstract class AppDatabase extends RoomDatabase {
    public static final String DATABASE_NAME = "bali-db";

    /**
     * The only instance
     */
    private static AppDatabase sInstance;

    public abstract LessonDao lessonDao();

    public abstract LessonUnitDao lessonUnitDao();

    public abstract UnitDao unitDao();

    public abstract UnitPartDao unitPartDao();

    public abstract UserDao userDao();

    public abstract UserLessonDao userLessonDao();

    public abstract UserUnitDao userUnitDao();

    public abstract UserLogDao userLogDao();

    public static synchronized AppDatabase getInstance(Context context) {
        if (sInstance == null) {
            sInstance = Room
                    .databaseBuilder(context.getApplicationContext(), AppDatabase.class, "bali_db")
                    .build();
            sInstance.populateInitialData(context);
        }
        return sInstance;
    }

    private void populateInitialData(Context context) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {

                if (lessonDao().count() == 0) {
                    AssetManager assetManager = context.getAssets();
                    InputStream inputStream = null;
                    try {
                        inputStream = assetManager.open("swa/database.csv");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

                    String line = "";
                    beginTransaction();
                    try {
                        while ((line = bufferedReader.readLine()) != null) {
                            String[] columns = line.split(",");
                            if (columns.length < 1) {
                                Log.d("AppDatabase", "Skipping bad row");
                            }
                            switch (columns[0]) {
                                case "Lesson":
                                    Lesson lesson = new Lesson(columns);
                                    Long lessonId = lessonDao().insertLesson(lesson);
//                                    Log.d("lesson", String.valueOf(lesson.id));
//                                    for (Lesson l : lessonDao().getLessons()) {
//                                        Log.d("lesson", String.valueOf(l.id));
//                                    }
                                    break;
                                case "Unit":
                                    Unit unit = new Unit(columns);
                                    unitDao().insertUnit(unit);
//                                    Log.d("unit", String.valueOf(unit.id));
                                    break;
                                case "UnitPart":
                                    UnitPart unitPart = new UnitPart(columns);
                                    unitPartDao().insertUnitPart(unitPart);
                                    break;
                                case "LessonUnit":
                                    LessonUnit lessonUnit = new LessonUnit(columns);
//                                    for (Lesson l : lessonDao().getLessons()) {
//                                        Log.d("lesson", String.valueOf(l.id));
//                                    }
//                                    Lesson lesson1 = lessonDao().getLessonById(lessonUnit.lessonId);
//                                    Unit unit1 = unitDao().getUnitById(lessonUnit.objectUnitId);
//                                    Unit unit2 = unitDao().getUnitById(lessonUnit.subjectUnitId);
                                    lessonUnitDao().insertLessonUnit(lessonUnit);
                                    break;
                                case "User":
                                    User user = new User(columns);
                                    userDao().insertUser(user);
                                    Log.d("User", "SERIAL UUID: " + user.uuid);
                                    SharedPreferences sharedPref = context.getSharedPreferences(
                                            context.getString(R.string.preference_file_key),
                                            Context.MODE_PRIVATE);
                                    SharedPreferences.Editor editor = sharedPref.edit();
                                    editor.putLong(context.getString(R.string.user_id), user.id);
                                    editor.commit();

                                    break;
                            }
                        }
                        setTransactionSuccessful();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } finally {
                        endTransaction();
                    }
                }
                return null;

            }
        }.execute(context.getApplicationContext());
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
