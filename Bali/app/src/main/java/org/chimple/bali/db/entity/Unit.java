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
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.widget.ImageView;

import org.chimple.bali.R;

import java.io.IOException;
import java.io.InputStream;

@Entity
public class Unit {
    @Ignore
    public static final int LETTER_TYPE = 1;
    @Ignore
    public static final int PHONETIC_TYPE = 2;
    @Ignore
    public static final int SYLLABLE_TYPE = 3;
    @Ignore
    public static final int WORD_TYPE = 4;
    @Ignore
    public static final int SENTENCE_TYPE = 5;

    @PrimaryKey(autoGenerate = true)
    public Long id;

    public String name;

    public int type;

    public String picture;

    public String sound;

    public String phonemeSound;

    @Ignore
    public Unit(String name, int type, String picture, String sound, String phonemeSound) {
        this.name = name;
        this.type = type;
        this.picture = picture;
        this.sound = sound;
        this.phonemeSound = phonemeSound;
    }

    @Ignore
    public Unit(String[] columns) {
        if(columns.length < 7) {
            throw new IllegalArgumentException("Unit: Column length lesser than expected");
        }
        if(!columns[0].equals("Unit")) {
            throw new IllegalArgumentException("Unit: table name is not Unit");
        }
        try {
            id = Long.parseLong(columns[1]);
            name = columns[2];
            type = Integer.parseInt(columns[3]);
            picture = columns[4];
            sound = columns[5];
            phonemeSound = columns[6];
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Unit: Failed parsing string to number");
        }
    }

    public Unit() {
    }

    @Ignore
    public Drawable getPictureDrawable(Context context) {
        Drawable d = null;
        try
        {
            if(picture != null) {
//            InputStream inputStream = mContext.getAssets().open(word.picture);
                InputStream inputStream = context.getAssets().open("swa/image/apple.jpg");
                d = Drawable.createFromStream(inputStream, null);
                inputStream.close();
            }
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        return d;
    }
}
