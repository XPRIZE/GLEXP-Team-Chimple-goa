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
 
package org.chimple.bali.service;

import android.app.Service;
import android.arch.lifecycle.LifecycleService;
import android.arch.lifecycle.LiveData;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.support.annotation.Nullable;
import android.widget.Toast;

import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.repo.LessonRepo;

import java.util.List;

public class LessonService extends LifecycleService {
    public static final int MULTIPLE_CHOICE_QUIZ = 1;
    public static final int BAG_OF_CHOICES_QUIZ = 2;

    public static final String NUM_QUIZES = "numQuizes";
    public static final String NUM_CHOICES = "numChoices";
    public static final String NUM_BUNDLES = "numBundles";
    public static final String BUNDLE = "bundle";

    /**
     * Handler of incoming messages from clients.
     */
    class IncomingHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case MULTIPLE_CHOICE_QUIZ:
//                    Bundle obj = (Bundle) msg.obj;
//                    int numQuizes = obj.getInt(NUM_QUIZES);
//                    int numChoices = obj.getInt(NUM_CHOICES);
//                    List<MultipleChoiceQuiz> mcqs = LessonRepo.getMultipleChoiceQuizes(getApplicationContext(), numQuizes, numChoices, LessonRepo.ANY_FORMAT, LessonRepo.ANY_FORMAT);
//
//
//                        Messenger messenger = msg.replyTo;
//                        Message reply = Message.obtain(null, LessonService.MULTIPLE_CHOICE_QUIZ, 0, 0);
//
////                    MultipleChoiceQuiz[] mcqs = new MultipleChoiceQuiz[] {
////                            new MultipleChoiceQuiz("dummy help",
////                                    "A",
////                                    new String[]{"Apple", "Boy", "Cat", "Dog"},
////                                    0),
////                            new MultipleChoiceQuiz("Dogs go awalking",
////                                    "B",
////                                    new String[]{"Apple", "Boy", "Cat", "Dog"},
////                                    1)
////                    };
//
//                        Bundle bundle = new Bundle();
//                        reply.obj = bundle;
//
//                        bundle.putInt(NUM_BUNDLES, mcqs.size());
//                        for (int i = 0; i < mcqs.size(); i++) {
//                            bundle.putBundle("bundle" + i, mcqs.get(i).getBundle());
//                        }
//
//                        try {
//                            messenger.send(reply);
//                        } catch (RemoteException e) {
//                            e.printStackTrace();
//                        }
//
                    break;
                default:
                    super.handleMessage(msg);
            }
        }
    }

    /**
     * Target we publish for clients to send messages to IncomingHandler.
     */
    final Messenger mMessenger = new Messenger(new IncomingHandler());

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Toast.makeText(getApplicationContext(), "binding", Toast.LENGTH_SHORT).show();
        return mMessenger.getBinder();
    }
}
