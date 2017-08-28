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

package org.chimple.bali.db.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.ForeignKey;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;

@Entity(indices = {@Index(value = {"lessonId", "seq"}, unique = true)},
        foreignKeys = {
                @ForeignKey(entity = Lesson.class,
                        parentColumns = "id",
                        childColumns = "lessonId"
                ),
                @ForeignKey(entity = Unit.class,
                        parentColumns = "id",
                        childColumns = "subjectUnitId"
                ),
                @ForeignKey(entity = Unit.class,
                        parentColumns = "id",
                        childColumns = "objectUnitId"
                )
        }
)
public class LessonUnit {
    @PrimaryKey(autoGenerate = true)
    public Long id;

    public Long lessonId;

    public int seq;

    public Long subjectUnitId;

    public Long objectUnitId;

    //TODO: Maybe add non associated object unit id

    public String highlight;

    @Ignore
    public LessonUnit(long lessonId, int seq, Long subjectUnitId, Long objectUnitId, String highlight) {
        this.lessonId = lessonId;
        this.seq = seq;
        this.subjectUnitId = subjectUnitId;
        this.objectUnitId = objectUnitId;
        this.highlight = highlight;
    }

    public LessonUnit() {
    }
}
