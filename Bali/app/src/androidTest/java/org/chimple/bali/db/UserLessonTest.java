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

import android.arch.persistence.room.Room;
import android.support.test.InstrumentationRegistry;
import android.support.test.filters.SmallTest;
import android.support.test.runner.AndroidJUnit4;

import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.db.entity.UserLesson;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;
import java.util.Date;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(AndroidJUnit4.class)
@SmallTest
public class UserLessonTest {
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
        User user = new User("Rafiki", "file://rafiki.png", null, 0);
        Long userId = db.userDao().insertUser(user);

        Lesson lesson = new Lesson("vowels", 1, 1);
        Long lessonId = db.lessonDao().insertLesson(lesson);

        UserLesson userLesson = new UserLesson(userId, lessonId, new Date(), null, 0);
        Long userLessonId = db.userLessonDao().insertUserLesson(userLesson);

        UserLesson[] dbUserLessons = db.userLessonDao().getUserLessonsByUserIdAndLessonId(userId, lessonId);
        assertThat(dbUserLessons.length, is(1));
        assertThat(dbUserLessons[0].userId, is(userId));
        assertThat(dbUserLessons[0].lessonId, is(lessonId));
    }

}
