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

package org.chimple.bali.db.dao;

import android.arch.paging.DataSource;
import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import org.chimple.bali.db.entity.Lesson;

import java.util.List;

@Dao
public interface LessonDao {
    @Query("SELECT * FROM Lesson WHERE id=:id")
    public Lesson getLessonById(Long id);

    @Query("SELECT * FROM Lesson WHERE seq=:seq")
    public Lesson getLessonBySeq(int seq);

    @Query("SELECT * FROM Lesson WHERE seq<=:seq AND concept in (:concepts)")
    public Lesson[] getLessonsBelowSeqAndByConcept(int seq, List<Integer> concepts);

    @Query("SELECT * FROM Lesson")
    public Lesson[] getLessons();

    @Query("SELECT COUNT(*) FROM Lesson")
    public int count();

    @Query("SELECT * FROM Lesson ORDER BY seq ASC")
    public abstract DataSource.Factory<Integer, Lesson> lessonsBySeq();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public Long insertLesson(Lesson lesson);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public Long[] insertLessons(Lesson... lessons);
}
