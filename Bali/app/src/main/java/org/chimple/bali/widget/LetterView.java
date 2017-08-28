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

package org.chimple.bali.widget;

import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.StyleRes;
import android.support.design.widget.FloatingActionButton;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;

import java.io.IOException;

public class LetterView extends FrameLayout {
    private Unit mLetter;
    private FloatingActionButton mSoundFab;
    private Context mContext;

    private final View.OnClickListener mOnClickListener = new View.OnClickListener() {

        @Override
        public void onClick(View view) {
            MediaPlayer mediaPlayer = new MediaPlayer();
            try {
                AssetFileDescriptor afd = mContext.getAssets().openFd(mLetter.sound);
                mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(),
                        afd.getLength());
                afd.close();
                mediaPlayer.prepare();
                mediaPlayer.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    };
    public LetterView(@NonNull Context context, Unit letter) {
        super(context);
        initView(context, letter);
    }

    public LetterView(@NonNull Context context, @Nullable AttributeSet attrs, Unit letter) {
        super(context, attrs);
        initView(context, letter);
    }

    public LetterView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr, Unit letter) {
        super(context, attrs, defStyleAttr);
        initView(context, letter);
    }

    public LetterView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr, @StyleRes int defStyleRes, Unit letter) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initView(context, letter);
    }

    private void initView(Context context, Unit letter) {
        mContext = context;
        mLetter = letter;
        View view = inflate(getContext(), R.layout.letter, null);
        addView(view);
        TextView letterView = (TextView) findViewById(R.id.letter);
        letterView.setText(letter.name);
        mSoundFab = (FloatingActionButton) findViewById(R.id.soundFab);
        mSoundFab.setOnClickListener(mOnClickListener);
    }
}
