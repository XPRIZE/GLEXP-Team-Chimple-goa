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

package org.chimple.bali.provider;

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

import org.chimple.bali.model.BagOfChoiceQuiz;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.repo.LessonRepo;
import org.chimple.bali.repo.UserRepo;

import java.util.List;

public class LessonContentProvider extends ContentProvider {
    /** The authority of this content provider. */
    public static final String AUTHORITY = "org.chimple.bali.provider";

    public static final String MULTIPLE_CHOICE_QUIZ = "MULTIPLE_CHOICE_QUIZ";

    private static final int DEFAULT_NUM_QUIZES = 1;
    private static final int DEFAULT_NUM_CHOICES = 4;

    public static final String COL_HELP = "help";
    public static final String COL_QUESTION = "question";
    public static final String COL_CORRECT_ANSWER = "correct_answer";
    public static final String COL_CHOICE = "choice_";

    /** The URI for the Multiple Choice Quiz */
    public static final Uri URI_MULTIPLE_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + MULTIPLE_CHOICE_QUIZ);

    /** The match code for next quiz */
    private static final int CODE_GET_MULTIPLE_CHOICE_QUIZ = 1;


    public static final String BAG_OF_CHOICE_QUIZ = "BAG_OF_CHOICE_QUIZ";

    private static final int DEFAULT_MIN_ANSWERS = 3;
    private static final int DEFAULT_MAX_ANSWERS = 6;
    private static final int DEFAULT_MIN_CHOICES = 6;
    private static final int DEFAULT_MAX_CHOICES = 10;
    private static final boolean DEFAULT_ORDER = true;

    public static final String COL_ANSWER = "answer";
    public static final String COL_NUM_ANSWERS = "num_answers";
    public static final String COL_NUM_OTHER_CHOICES = "num_other_choices";

    public static final Uri URI_BAG_OF_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + BAG_OF_CHOICE_QUIZ);

    private static final int CODE_GET_BAG_OF_CHOICE_QUIZ = 3;

    public static final String COINS = "COINS";

    /** The URI for the Coin */
    public static final Uri URI_COIN = Uri.parse(
            "content://" + AUTHORITY + "/" + COINS);

    /** The match code for next quiz */
    private static final int CODE_ADD_COIN = 2;

    /** The URI matcher. */
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
        if(code == CODE_GET_MULTIPLE_CHOICE_QUIZ) {
            final Context context = getContext();
            if (context == null) {
                return null;
            }
            int numQuizes = DEFAULT_NUM_QUIZES;
            int numChoices = DEFAULT_NUM_CHOICES;
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
                    }
                }
            }
            List<MultipleChoiceQuiz> mcqList = LessonRepo.getMultipleChoiceQuizes(context, numQuizes, numChoices);
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
        } else if(code == CODE_GET_BAG_OF_CHOICE_QUIZ) {
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
                for (String a: bcq.answers) {
                    rowBuilder.add(a);
                }
                for (String c: bcq.otherChoices) {
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
                int coins = contentValues.getAsInteger(COINS);
                int updatedCoins = UserRepo.updateCoins(getContext(), coins);
                Log.d("LessonContentProvider", "adding coins: "
                        + String.valueOf(coins)
                        + " for total of: "
                        + String.valueOf(updatedCoins));
                //TODO: Display notification on coins
                return updatedCoins;
            default:
                throw new IllegalArgumentException("Unknown URI: " + uri);
        }
    }
}
