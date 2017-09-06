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

import org.chimple.bali.db.entity.UnitPart;
import org.chimple.bali.db.pojo.EagerUnitPart;

@Dao
public interface UnitPartDao {
    @Query("SELECT * FROM UnitPart WHERE unitId=:unitId AND type=:type ORDER BY seq ASC")
    public UnitPart[] getUnitPartsByUnitIdAndType(Long unitId, int type);

    @Query("SELECT up.*, "
            + "u.id AS u_id, u.name AS u_name, u.picture AS u_picture, u.sound AS u_sound, u.phonemeSound AS u_phonemeSound, "
            + "p.id AS p_id, p.name AS p_name, p.picture AS p_picture, p.sound AS p_sound, p.phonemeSound AS p_phonemeSound "
            + "FROM UnitPart up, Unit u, Unit p "
            + "WHERE up.unitId = :unitId "
            + "AND up.type = :type "
            + "AND up.unitId = u.id "
            + "AND up.partUnitId = p.id")
    public EagerUnitPart[] getEagerUnitPartsByUnitIdAndType(Long unitId, int type);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertUnitPart(UnitPart unitPart);
}
