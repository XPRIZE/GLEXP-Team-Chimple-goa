package org.chimple.bali.db;
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

import android.content.Context;
import android.content.SharedPreferences;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.User;

public class DatabaseInitUtil {
    static void initializeDb(AppDatabase db, Context context) {
        if(db.lessonDao().count() == 0) {
            db.beginTransaction();
            try {
                Lesson lesson = new Lesson("vowels", 1, 1);
                long lessonId = db.lessonDao().insertLesson(lesson);

                Unit subjectUnit = new Unit("a", 1, "swa/image/a.png", "swa/audio/a.mp3", "file://test/testp.mp3");
                long subjectUnitId = db.unitDao().insertUnit(subjectUnit);

                Unit objectUnit = new Unit("apple", 4, "swa/image/apple.jpg", "swa/audio/a.mp3", "file://test/applep.mp3");
                long objectUnitId = db.unitDao().insertUnit(objectUnit);

                LessonUnit lessonUnit = new LessonUnit(lessonId, 1, subjectUnitId, objectUnitId, "a");
                db.lessonUnitDao().insertLessonUnit(lessonUnit);

                subjectUnit = new Unit("b", 1, "swa/image/b.png", "swa/audio/b.mp3", "file://test/testp.mp3");
                subjectUnitId = db.unitDao().insertUnit(subjectUnit);

                objectUnit = new Unit("b", 1, "swa/image/bat.png", "swa/audio/bat.mp3", "file://test/applep.mp3");
                objectUnitId = db.unitDao().insertUnit(objectUnit);

                lessonUnit = new LessonUnit(lessonId, 2, subjectUnitId, objectUnitId, "b");
                db.lessonUnitDao().insertLessonUnit(lessonUnit);

                User user = new User("test", "test.png", lessonId, 5);
                long userId = db.userDao().insertUser(user);
                SharedPreferences sharedPref = context.getSharedPreferences(
                        context.getString(R.string.preference_file_key),
                        Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPref.edit();
                editor.putLong(context.getString(R.string.user_id), userId);
                editor.commit();

                lesson = new Lesson("alphabets", 1, 2);
                lessonId = db.lessonDao().insertLesson(lesson);

                subjectUnit = new Unit("c", 1, "swa/image/a.png", "swa/audio/a.mp3", "file://test/testp.mp3");
                subjectUnitId = db.unitDao().insertUnit(subjectUnit);

                objectUnit = new Unit("cat", 4, "swa/image/apple.jpg", "swa/audio/a.mp3", "file://test/applep.mp3");
                objectUnitId = db.unitDao().insertUnit(objectUnit);

                lessonUnit = new LessonUnit(lessonId, 1, subjectUnitId, objectUnitId, "c");
                db.lessonUnitDao().insertLessonUnit(lessonUnit);

                subjectUnit = new Unit("d", 1, "swa/image/b.png", "swa/audio/b.mp3", "file://test/testp.mp3");
                subjectUnitId = db.unitDao().insertUnit(subjectUnit);

                objectUnit = new Unit("d", 1, "swa/image/bat.png", "swa/audio/bat.mp3", "file://test/applep.mp3");
                objectUnitId = db.unitDao().insertUnit(objectUnit);

                lessonUnit = new LessonUnit(lessonId, 2, subjectUnitId, objectUnitId, "d");
                db.lessonUnitDao().insertLessonUnit(lessonUnit);


                db.setTransactionSuccessful();
            } finally {
                db.endTransaction();
            }
        }
    }
}
