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

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;

@Entity(tableName = "lessons",
        indices = @Index(value = "seq",
                unique = true
        )
)
public class Lesson {
    @PrimaryKey(autoGenerate = true)
    public long id;

    public String title;

    public int concept;

    public int seq;

    @Ignore
    public Lesson(String title, int concept, int seq) {
        this.title = title;
        this.concept = concept;
        this.seq = seq;
    }

    public Lesson() {
    }
}
