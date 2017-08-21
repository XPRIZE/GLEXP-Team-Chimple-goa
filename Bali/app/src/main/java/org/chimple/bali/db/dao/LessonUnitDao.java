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

import android.arch.lifecycle.LiveData;
import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;

import org.chimple.bali.db.entity.LessonUnit;
import org.chimple.bali.db.pojo.FlashCard;

import java.util.List;

@Dao
public interface LessonUnitDao {
    @Query("SELECT * FROM LessonUnit WHERE lessonId=:lessonId ORDER BY seq ASC")
    public LessonUnit[] getLessonUnitsByLessonId(Long lessonId);

    @Query("SELECT lu.*, "
            + "su.id AS su_id, su.name AS su_name, su.type AS su_type, su.picture AS su_picture, "
            + "su.sound AS su_sound, su.phonemeSound AS su_phonemeSound, "
            + "ou.id AS ou_id, ou.name AS ou_name, ou.type AS ou_type, ou.picture AS ou_picture, "
            + "ou.sound AS ou_sound, ou.phonemeSound AS ou_phonemeSound "
            + "FROM LessonUnit lu, Unit su, Unit ou "
            + "WHERE lu.lessonId = :lessonId "
            + "AND lu.subjectUnitId = su.id "
            + "AND lu.objectUnitId = ou.id")
    public LiveData<List<FlashCard>> getFlashCardsByLessonId(Long lessonId);

    @Query("SELECT lu.*, "
            + "su.id AS su_id, su.name AS su_name, su.type AS su_type, su.picture AS su_picture, "
            + "su.sound AS su_sound, su.phonemeSound AS su_phonemeSound, "
            + "ou.id AS ou_id, ou.name AS ou_name, ou.type AS ou_type, ou.picture AS ou_picture, "
            + "ou.sound AS ou_sound, ou.phonemeSound AS ou_phonemeSound "
            + "FROM LessonUnit lu, Unit su, Unit ou "
            + "WHERE lu.subjectUnitId = su.id "
            + "AND lu.objectUnitId = ou.id")
    public LiveData<List<FlashCard>> getFlashCards();

    @Query("SELECT lu.*, "
            + "su.id AS su_id, su.name AS su_name, su.type AS su_type, su.picture AS su_picture, "
            + "su.sound AS su_sound, su.phonemeSound AS su_phonemeSound, "
            + "ou.id AS ou_id, ou.name AS ou_name, ou.type AS ou_type, ou.picture AS ou_picture, "
            + "ou.sound AS ou_sound, ou.phonemeSound AS ou_phonemeSound "
            + "FROM LessonUnit lu, Unit su, Unit ou "
            + "WHERE lu.lessonId = :lessonId "
            + "AND lu.subjectUnitId = su.id "
            + "AND lu.objectUnitId = ou.id")
    public FlashCard[] getFlashCardArrayByLessonId(Long lessonId);

    @Query("SELECT lu.*, "
            + "su.id AS su_id, su.name AS su_name, su.type AS su_type, su.picture AS su_picture, "
            + "su.sound AS su_sound, su.phonemeSound AS su_phonemeSound, "
            + "ou.id AS ou_id, ou.name AS ou_name, ou.type AS ou_type, ou.picture AS ou_picture, "
            + "ou.sound AS ou_sound, ou.phonemeSound AS ou_phonemeSound "
            + "FROM LessonUnit lu, Unit su, Unit ou "
            + "WHERE lu.lessonId = :lessonId "
            + "AND lu.seq = :seq "
            + "AND lu.subjectUnitId = su.id "
            + "AND lu.objectUnitId = ou.id")
    public FlashCard getFlashCardByLessonIdAndSeq(Long lessonId, int seq);

    @Query("SELECT COUNT(*) FROM LessonUnit")
    public int count();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public Long insertLessonUnit(LessonUnit lessonUnit);
}
