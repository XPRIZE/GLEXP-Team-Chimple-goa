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

package com.maq.xprize.bali.widget;

import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.graphics.drawable.Drawable;
import android.media.MediaPlayer;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.StyleRes;
import android.support.design.widget.FloatingActionButton;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.maq.xprize.bali.R;
import com.maq.xprize.bali.db.entity.Unit;

import java.io.IOException;
import java.io.InputStream;

public class SentenceView extends FrameLayout{
    private Unit mSentence;
    private FloatingActionButton mSoundFab;
    private Context mContext;

    private final View.OnClickListener mOnClickListener = new View.OnClickListener() {

        @Override
        public void onClick(View view) {
            MediaPlayer mediaPlayer = new MediaPlayer();
            try {
                AssetFileDescriptor afd = mContext.getAssets().openFd(mSentence.sound);
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
    public SentenceView(@NonNull Context context, Unit sentence) {
        super(context);
        initView(context, sentence);
    }

    public SentenceView(@NonNull Context context, @Nullable AttributeSet attrs, Unit sentence) {
        super(context, attrs);
        initView(context, sentence);
    }

    public SentenceView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr, Unit sentence) {
        super(context, attrs, defStyleAttr);
        initView(context, sentence);
    }

    public SentenceView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr, @StyleRes int defStyleRes, Unit sentence) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initView(context, sentence);
    }

    private void initView(Context context, Unit sentence) {
        mContext = context;
        mSentence = sentence;
        View view = inflate(getContext(), R.layout.sentence, null);
        addView(view);
        TextView sentenceView = (TextView) findViewById(R.id.sentence);
        sentenceView.setText(sentence.name);

        ImageView imageView = (ImageView) findViewById(R.id.imageView);
        try
        {
            InputStream inputStream = mContext.getAssets().open(sentence.picture);
            Drawable d = Drawable.createFromStream(inputStream, null);
            imageView.setImageDrawable(d);
            inputStream.close();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }

        mSoundFab = (FloatingActionButton) findViewById(R.id.soundFab);
        mSoundFab.setOnClickListener(mOnClickListener);
    }

}
