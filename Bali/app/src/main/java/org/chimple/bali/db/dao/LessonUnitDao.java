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

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.pojo.LessonUnitComposite;

@Dao
public interface LessonUnitDao {
    @Query("SELECT * FROM lessons_units WHERE lesson_id=:lessonId ORDER BY seq ASC")
    public LessonUnit[] getLessonUnitsByLessonId(long lessonId);

    @Query("SELECT lu.*, "
            + "su.id AS su_id, su.name AS su_name, su.type AS su_type, su.picture AS su_picture, "
            + "su.sound AS su_sound, su.phoneme_sound AS su_phoneme_sound, "
            + "ou.id AS ou_id, ou.name AS ou_name, ou.type AS ou_type, ou.picture AS ou_picture, "
            + "ou.sound AS ou_sound, ou.phoneme_sound AS ou_phoneme_sound "
            + "FROM lessons_units lu, units su, units ou "
            + "WHERE lu.lesson_id = :lessonId "
            + "AND lu.seq = :seq "
            + "AND lu.subject_unit_id = su.id "
            + "AND lu.object_unit_id = ou.id")
    public LessonUnitComposite getLessonUnitCompositeByLessonIdAndSeq(long lessonId, int seq);

    @Query("SELECT COUNT(*) FROM lessons_units")
    public int count();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertLessonUnit(LessonUnit lessonUnit);
}
