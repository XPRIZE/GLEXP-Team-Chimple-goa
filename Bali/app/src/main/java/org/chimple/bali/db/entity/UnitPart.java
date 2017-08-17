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

@Entity(primaryKeys = {"unitId", "type", "seq"},
        foreignKeys = {
                @ForeignKey(entity = Unit.class,
                        parentColumns = "id",
                        childColumns = "unitId"
                ),
                @ForeignKey(entity = Unit.class,
                        parentColumns = "id",
                        childColumns = "partUnitId"
                )
        },
        indices = @Index("partUnitId")
)
public class UnitPart {
    @ColumnInfo(name = "unitId")
    public Long unitId;

    public Long partUnitId;

    public int type;

    public int seq;

    @Ignore
    public UnitPart(Long unitId, Long partUnitId, int type, int seq) {
        this.unitId = unitId;
        this.partUnitId = partUnitId;
        this.type = type;
        this.seq = seq;
    }

    public UnitPart() {

    }
}
