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

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import android.arch.persistence.room.Room;
import android.support.test.InstrumentationRegistry;
import android.support.test.filters.SmallTest;
import android.support.test.runner.AndroidJUnit4;

import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.pojo.LessonUnitComposite;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;


@RunWith(AndroidJUnit4.class)
@SmallTest
public class LessonUnitTest {
    private AppDatabase db;

    @Before
    public void createDatabase() {
        db = Room.inMemoryDatabaseBuilder(InstrumentationRegistry.getTargetContext(),
                AppDatabase.class).build();
    }

    @After
    public void closeDatabase() throws IOException {
        db.close();
    }

    @Test
    public void insertAndGetComposite() {
        assertThat(db.lessonUnitDao().count(), is(0));
        Lesson lesson = new Lesson("vowels", 1, 1);
        long lessonId = db.lessonDao().insertLesson(lesson);

        Unit subjectUnit = new Unit("a", 1, "file://test/test.png", "file://test/test.mp3", "file://test/testp.mp3");
        long subjectUnitId = db.unitDao().insertUnit(subjectUnit);

        Unit objectUnit = new Unit("apple", 2, "file://test/apple.png", "file://test/apple.mp3", "file://test/applep.mp3");
        long objectUnitId = db.unitDao().insertUnit(objectUnit);

        LessonUnit lessonUnit = new LessonUnit(lessonId, 1, subjectUnitId, objectUnitId, "a");
        db.lessonUnitDao().insertLessonUnit(lessonUnit);

        LessonUnitComposite luc = db.lessonUnitDao().getLessonUnitCompositeByLessonIdAndSeq(lessonId, 1);
        assertThat(luc.subjectUnit.name, is("a"));
        assertThat(luc.objectUnit.name, is("apple"));
    }

}
