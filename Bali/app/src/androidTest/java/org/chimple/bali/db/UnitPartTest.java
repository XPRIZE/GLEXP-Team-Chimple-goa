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

import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UnitPart;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Date;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class UnitPartTest {
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
        Unit unit = new Unit("an", 2, "file://A.png", "file://A.mp3", null);
        Long unitId = db.unitDao().insertUnit(unit);

        Unit partUnit = new Unit("a", 1, "file://a.png", "file://a.mp3", null);
        Long partUnitId = db.unitDao().insertUnit(partUnit);

        Unit partUnitN = new Unit("n", 1, "file://n.png", "file://n.mp3", null);
        Long partUnitIdN = db.unitDao().insertUnit(partUnitN);

        UnitPart unitPart = new UnitPart(unitId, partUnitId, 1, 1);
        db.unitPartDao().insertUnitPart(unitPart);

        UnitPart unitPart2 = new UnitPart(unitId, partUnitIdN, 1, 2);
        db.unitPartDao().insertUnitPart(unitPart2);

        UnitPart[] dbUnitParts = db.unitPartDao().getUnitPartsByUnitIdAndType(unitId, 1);
        assertThat(dbUnitParts.length, is(2));
        assertThat(dbUnitParts[0].unitId, is(unitId));
        assertThat(dbUnitParts[0].type, is(1));
        assertThat(dbUnitParts[0].partUnitId, is(partUnitId));
        assertThat(dbUnitParts[1].unitId, is(unitId));
        assertThat(dbUnitParts[1].type, is(1));
        assertThat(dbUnitParts[1].partUnitId, is(partUnitIdN));
    }
    
}
