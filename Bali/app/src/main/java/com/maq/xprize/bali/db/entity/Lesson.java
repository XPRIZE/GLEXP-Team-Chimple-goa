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

package com.maq.xprize.bali.db.entity;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;

@Entity(indices = @Index(value = "seq",
                unique = true
        )
)
public class Lesson {
    @Ignore
    public static final int LETTER_CONCEPT = 1;
    @Ignore
    public static final int UPPER_CASE_TO_LOWER_CASE_CONCEPT = 2;
    @Ignore
    public static final int LETTER_TO_WORD_CONCEPT = 3;
    @Ignore
    public static final int SYLLABLE_TO_WORD_CONCEPT = 4;
    @Ignore
    public static final int UPPER_CASE_LETTER_TO_WORD_CONCEPT = 5;

    @PrimaryKey(autoGenerate = true)
    public Long id;

    public String title;

    public int concept;

    public int seq;

    @Ignore
    public Lesson(String title, int concept, int seq) {
        this.title = title;
        this.concept = concept;
        this.seq = seq;
    }

    @Ignore
    public Lesson(String[] columns) {
        if(columns.length < 5) {
            throw new IllegalArgumentException("Lesson: Column length lesser than expected");
        }
        if(!columns[0].equals("Lesson")) {
            throw new IllegalArgumentException("Lesson: table name is not Lesson");
        }
        try {
            id = Long.parseLong(columns[1]);
            title = columns[2];
            concept = Integer.parseInt(columns[3]);
            seq = Integer.parseInt(columns[4]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Lesson: Failed parsing string to number");
        }
    }

    public Lesson() {
    }
}
