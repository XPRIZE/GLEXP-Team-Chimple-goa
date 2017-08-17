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

package org.chimple.bali.helper;

import android.arch.persistence.room.Room;
import android.content.Context;
import android.content.SharedPreferences;
import android.support.test.InstrumentationRegistry;
import android.support.test.filters.SmallTest;
import android.support.test.runner.AndroidJUnit4;

import org.chimple.bali.R;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(AndroidJUnit4.class)
@SmallTest

public class LessonHelperTest {
    private AppDatabase db;

    @Before
    public void createDatabase() {
//        db = Room.inMemoryDatabaseBuilder(InstrumentationRegistry.getTargetContext(),
//                AppDatabase.class).build();
        AppDatabase.switchToInMemory(InstrumentationRegistry.getTargetContext());
        db = AppDatabase.getInstance(InstrumentationRegistry.getTargetContext());
    }

    @After
    public void closeDatabase() throws IOException {
        db.close();
    }

    @Test
    public void basicMultipleChoiceQuizes() {
        Context context = InstrumentationRegistry.getTargetContext();

        Lesson lesson = new Lesson("alphabet", 1, 1);
        long lessonId = db.lessonDao().insertLesson(lesson);

        Unit subjectUnit = new Unit("a", 1, "file://test/test.png", "file://test/test.mp3", "file://test/testp.mp3");
        long subjectUnitId = db.unitDao().insertUnit(subjectUnit);

        Unit objectUnit = new Unit("apple", 2, "file://test/apple.png", "file://test/apple.mp3", "file://test/applep.mp3");
        long objectUnitId = db.unitDao().insertUnit(objectUnit);

        LessonUnit lessonUnit = new LessonUnit(lessonId, 1, subjectUnitId, objectUnitId, "a");
        db.lessonUnitDao().insertLessonUnit(lessonUnit);

        subjectUnit = new Unit("b", 1, "file://test/test.png", "file://test/test.mp3", "file://test/testp.mp3");
        subjectUnitId = db.unitDao().insertUnit(subjectUnit);

        objectUnit = new Unit("boy", 2, "file://test/apple.png", "file://test/apple.mp3", "file://test/applep.mp3");
        objectUnitId = db.unitDao().insertUnit(objectUnit);

        lessonUnit = new LessonUnit(lessonId, 2, subjectUnitId, objectUnitId, "a");
        db.lessonUnitDao().insertLessonUnit(lessonUnit);

        subjectUnit = new Unit("c", 1, "file://test/test.png", "file://test/test.mp3", "file://test/testp.mp3");
        subjectUnitId = db.unitDao().insertUnit(subjectUnit);

        objectUnit = new Unit("cat", 2, "file://test/apple.png", "file://test/apple.mp3", "file://test/applep.mp3");
        objectUnitId = db.unitDao().insertUnit(objectUnit);

        lessonUnit = new LessonUnit(lessonId, 3, subjectUnitId, objectUnitId, "a");
        db.lessonUnitDao().insertLessonUnit(lessonUnit);

        subjectUnit = new Unit("d", 1, "file://test/test.png", "file://test/test.mp3", "file://test/testp.mp3");
        subjectUnitId = db.unitDao().insertUnit(subjectUnit);

        objectUnit = new Unit("dog", 2, "file://test/apple.png", "file://test/apple.mp3", "file://test/applep.mp3");
        objectUnitId = db.unitDao().insertUnit(objectUnit);

        lessonUnit = new LessonUnit(lessonId, 4, subjectUnitId, objectUnitId, "a");
        db.lessonUnitDao().insertLessonUnit(lessonUnit);

        User user = new User("Bubbly", "file://test.png", lessonId, 0);
        Long userId = db.userDao().insertUser(user);

        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key),
                Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putLong(context.getString(R.string.user_id), userId);
        editor.commit();

        MultipleChoiceQuiz[] mcqs = LessonHelper.getMultipleChoiceQuizes(context,
                1, 4);
        assertThat(mcqs.length, is(1));
    }

}
