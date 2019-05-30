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

package com.maq.xprize.bali.provider;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

import com.maq.xprize.bali.application.BaliApplication;
import com.maq.xprize.bali.db.entity.UserLog;
import com.maq.xprize.bali.model.BagOfChoiceQuiz;
import com.maq.xprize.bali.model.MultipleChoiceQuiz;
import com.maq.xprize.bali.repo.LessonRepo;
import com.maq.xprize.bali.repo.UserLogRepo;
import com.maq.xprize.bali.repo.UserRepo;

import java.util.List;

public class LessonContentProvider extends ContentProvider {
    /**
     * The authority of this content provider.
     */
    public static final String AUTHORITY = "com.maq.xprize.bali.provider";

    public static final String MULTIPLE_CHOICE_QUIZ = "MULTIPLE_CHOICE_QUIZ";
    public static final String COL_HELP = "help";
    public static final String COL_QUESTION = "question";
    public static final String COL_CORRECT_ANSWER = "correct_answer";
    public static final String COL_CHOICE = "choice_";
    /**
     * The URI for the Multiple Choice Quiz
     */
    public static final Uri URI_MULTIPLE_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + MULTIPLE_CHOICE_QUIZ);
    public static final String BAG_OF_CHOICE_QUIZ = "BAG_OF_CHOICE_QUIZ";
    public static final String COL_ANSWER = "answer";
    public static final String COL_NUM_ANSWERS = "num_answers";
    public static final String COL_NUM_OTHER_CHOICES = "num_other_choices";
    public static final Uri URI_BAG_OF_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + BAG_OF_CHOICE_QUIZ);
    public static final String COINS = "COINS";
    public static final String GAME_NAME = "GAME_NAME";
    public static final String GAME_LEVEL = "GAME_LEVEL";
    public static final String GAME_EVENT = "GAME_EVENT";
    /**
     * The URI for the Coin
     */
    public static final Uri URI_COIN = Uri.parse(
            "content://" + AUTHORITY + "/" + COINS);
    private static final int DEFAULT_NUM_QUIZES = 1;
    private static final int DEFAULT_NUM_CHOICES = 4;
    private static final int DEFAULT_ANSWER_FORMAT = LessonRepo.ANY_FORMAT;
    private static final int DEFAULT_CHOICE_FORMAT = LessonRepo.ANY_FORMAT;
    /**
     * The match code for next quiz
     */
    private static final int CODE_GET_MULTIPLE_CHOICE_QUIZ = 1;
    private static final int DEFAULT_MIN_ANSWERS = 3;
    private static final int DEFAULT_MAX_ANSWERS = 6;
    private static final int DEFAULT_MIN_CHOICES = 6;
    private static final int DEFAULT_MAX_CHOICES = 10;
    private static final boolean DEFAULT_ORDER = true;
    private static final int CODE_GET_BAG_OF_CHOICE_QUIZ = 3;
    /**
     * The match code for next quiz
     */
    private static final int CODE_ADD_COIN = 2;

    /**
     * The URI matcher.
     */
    private static final UriMatcher MATCHER = new UriMatcher(UriMatcher.NO_MATCH);

    static {
        MATCHER.addURI(AUTHORITY, MULTIPLE_CHOICE_QUIZ, CODE_GET_MULTIPLE_CHOICE_QUIZ);
        MATCHER.addURI(AUTHORITY, COINS, CODE_ADD_COIN);
        MATCHER.addURI(AUTHORITY, BAG_OF_CHOICE_QUIZ, CODE_GET_BAG_OF_CHOICE_QUIZ);
    }


    @Override
    public boolean onCreate() {
        return true;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection,
                        @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        final int code = MATCHER.match(uri);
        if (code == CODE_GET_MULTIPLE_CHOICE_QUIZ) {
            final Context context = getContext();
            if (context == null) {
                return null;
            }
            int numQuizes = DEFAULT_NUM_QUIZES;
            int numChoices = DEFAULT_NUM_CHOICES;
            int answerFormat = LessonRepo.UPPER_CASE_LETTER_FORMAT;
            int choiceFormat = DEFAULT_CHOICE_FORMAT;
            if (selectionArgs != null) {
                if (selectionArgs.length >= 1) {
                    try {
                        numQuizes = Integer.parseInt(selectionArgs[0]);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                    if (selectionArgs.length >= 2) {
                        try {
                            numChoices = Integer.parseInt(selectionArgs[1]);
                        } catch (NumberFormatException e) {
                            e.printStackTrace();
                        }
                        if (selectionArgs.length >= 3) {
                            try {
                                answerFormat = Integer.parseInt(selectionArgs[2]);
                            } catch (NumberFormatException e) {
                                e.printStackTrace();
                            }
                            if (selectionArgs.length >= 4) {
                                try {
                                    choiceFormat = Integer.parseInt(selectionArgs[3]);
                                } catch (NumberFormatException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                }
            }
            List<MultipleChoiceQuiz> mcqList = LessonRepo.getMultipleChoiceQuizes(context, numQuizes, numChoices, answerFormat, choiceFormat);
            String[] rowNames = new String[numChoices + 3];
            rowNames[0] = COL_HELP;
            rowNames[1] = COL_QUESTION;
            rowNames[2] = COL_CORRECT_ANSWER;
            for (int i = 0; i < numChoices; i++) {
                rowNames[3 + i] = COL_CHOICE + i;
            }
            MatrixCursor matrixCursor = new MatrixCursor(rowNames, numQuizes);
            for (MultipleChoiceQuiz mcq : mcqList) {
                MatrixCursor.RowBuilder rowBuilder = matrixCursor.newRow();
                rowBuilder.add(mcq.help).add(mcq.question).add(mcq.correctAnswer);
                for (String choice : mcq.answers) {
                    rowBuilder.add(choice);
                }
            }
            return matrixCursor;
        } else if (code == CODE_GET_BAG_OF_CHOICE_QUIZ) {
            final Context context = getContext();
            if (context == null) {
                return null;
            }
            int numQuizes = DEFAULT_NUM_QUIZES;
            int minAnswers = DEFAULT_MIN_ANSWERS;
            int maxAnswers = DEFAULT_MAX_ANSWERS;
            int minChoices = DEFAULT_MIN_CHOICES;
            int maxChoices = DEFAULT_MAX_CHOICES;
            boolean order = DEFAULT_ORDER;
            if (selectionArgs != null) {
                if (selectionArgs.length >= 1) {
                    try {
                        numQuizes = Integer.parseInt(selectionArgs[0]);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                    if (selectionArgs.length >= 2) {
                        try {
                            minAnswers = Integer.parseInt(selectionArgs[1]);
                        } catch (NumberFormatException e) {
                            e.printStackTrace();
                        }
                        if (selectionArgs.length >= 3) {
                            try {
                                maxAnswers = Integer.parseInt(selectionArgs[2]);
                            } catch (NumberFormatException e) {
                                e.printStackTrace();
                            }
                            if (selectionArgs.length >= 4) {
                                try {
                                    minChoices = Integer.parseInt(selectionArgs[3]);
                                } catch (NumberFormatException e) {
                                    e.printStackTrace();
                                }
                                if (selectionArgs.length >= 5) {
                                    try {
                                        maxChoices = Integer.parseInt(selectionArgs[4]);
                                    } catch (NumberFormatException e) {
                                        e.printStackTrace();
                                    }
                                }

                            }
                        }
                    }
                }
            }
            List<BagOfChoiceQuiz> bcqList = LessonRepo.getBagOfChoiceQuizes(context, numQuizes, minAnswers, maxAnswers, minChoices, maxChoices, order);
            String[] rowNames = new String[maxChoices + 4];
            int col = 0;
            rowNames[col++] = COL_HELP;
            rowNames[col++] = COL_ANSWER;
            rowNames[col++] = COL_NUM_ANSWERS;
            rowNames[col++] = COL_NUM_OTHER_CHOICES;

            for (int i = 0; i < maxChoices; i++) {
                rowNames[col++] = COL_CHOICE + i;
            }
            MatrixCursor matrixCursor = new MatrixCursor(rowNames, numQuizes);
            for (BagOfChoiceQuiz bcq : bcqList) {
                MatrixCursor.RowBuilder rowBuilder = matrixCursor.newRow();
                rowBuilder.add(bcq.help).add(bcq.answer).add(bcq.answers.length).add(bcq.otherChoices.length);
                for (String a : bcq.answers) {
                    rowBuilder.add(a);
                }
                for (String c : bcq.otherChoices) {
                    rowBuilder.add(c);
                }
            }
            return matrixCursor;

        } else {
            throw new IllegalArgumentException("Unknown URI: " + uri);
        }
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        switch (MATCHER.match(uri)) {
            case CODE_GET_MULTIPLE_CHOICE_QUIZ:
                return "vnd.android.cursor.dir/" + AUTHORITY + "." + MULTIPLE_CHOICE_QUIZ;
            case CODE_ADD_COIN:
                return "vnd.android.cursor.dir/" + AUTHORITY + "." + COINS;
            case CODE_GET_BAG_OF_CHOICE_QUIZ:
                return "vnd.android.cursor.dir/" + AUTHORITY + "." + BAG_OF_CHOICE_QUIZ;
            default:
                throw new IllegalArgumentException("Unknown URI: " + uri);
        }

    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues contentValues) {
        return null;
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String s, @Nullable String[] strings) {
        return 0;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues contentValues, @Nullable String s, @Nullable String[] strings) {
        switch (MATCHER.match(uri)) {
            case CODE_ADD_COIN:
                String gameName = contentValues.getAsString(GAME_NAME);
                int gameLevel = contentValues.getAsInteger(GAME_LEVEL);
                int gameEvent = contentValues.getAsInteger(GAME_EVENT);
                int coins = contentValues.getAsInteger(COINS);
                int updatedCoins = 0;

                /*Following try-catch block is a patch for Chimple application crash when launched for the first time*/
                try {
                    updatedCoins = UserRepo.updateCoins(getContext(), coins);

                } catch (NullPointerException npe) {
                    UserRepo.getCurrentLiveUser(getContext());
                    update(uri, contentValues, s, strings);
                }
                Log.d("LessonContentProvider", "adding coins: "
                        + coins
                        + " for total of: "
                        + updatedCoins);

                String coinMessage = "Added Coins:" + coins + " for total of: "
                        + updatedCoins;

                BaliApplication application = (BaliApplication) getContext().getApplicationContext();
                application.updateCoinNotifications("Coins:", coinMessage, updatedCoins);
                UserLogRepo.logEntity(getContext(), UserLog.GAME_TYPE, (long) gameLevel, gameEvent, gameName);
                return updatedCoins;
            default:
                throw new IllegalArgumentException("Unknown URI: " + uri);
        }
    }
}
