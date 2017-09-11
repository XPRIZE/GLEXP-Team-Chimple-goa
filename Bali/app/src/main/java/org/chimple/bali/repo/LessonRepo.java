package org.chimple.bali.repo;
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

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;

import org.chimple.bali.R;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UnitPart;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.db.pojo.EagerUnitPart;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.model.BagOfChoiceQuiz;
import org.chimple.bali.model.MultipleChoiceQuiz;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

public class LessonRepo {
    public static final int ANY_FORMAT = 0;

    public static final int UPPER_CASE_LETTER_FORMAT = 1;

    private static final MutableLiveData ABSENT = new MutableLiveData();

    {
        //noinspection unchecked
        ABSENT.setValue(null);
    }

    public static void markNextLesson(Context context) {
        new AsyncTask<Context, Void, Void>() {
            @Override
            protected Void doInBackground(Context... params) {
                Context context1 = params[0];
                AppDatabase db = AppDatabase.getInstance(context1);
                User user = UserRepo.getCurrentUser(context1);
                    //TODO: Handle no user

                Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
                Lesson newLesson = db.lessonDao().getLessonBySeq(lesson.seq + 1);
                if (newLesson != null) {
                    user.currentLessonId = newLesson.id;
                    db.userDao().updateUser(user);
                }
                return null;
            }
        }.execute(context);
    }

    public static List<MultipleChoiceQuiz> getMultipleChoiceQuizes(Context context, int numQuizes
            , int numChoices, int answerFormat, int choiceFormat) {
        AppDatabase db = AppDatabase.getInstance(context);
        User user = UserRepo.getCurrentUser(context);
        Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
        List<FlashCard> lucs = null;
        boolean answerCaseParticular = (answerFormat == UPPER_CASE_LETTER_FORMAT);
        if((answerFormat == ANY_FORMAT
                || (answerFormat == UPPER_CASE_LETTER_FORMAT
                    && (lesson.concept == Lesson.LETTER_CONCEPT
                        || lesson.concept == Lesson.UPPER_CASE_TO_LOWER_CASE_CONCEPT
                        || lesson.concept == Lesson.LETTER_TO_WORD_CONCEPT)))
            &&(choiceFormat == ANY_FORMAT
                || (choiceFormat == UPPER_CASE_LETTER_FORMAT
                    && (lesson.concept == Lesson.LETTER_CONCEPT
                        || lesson.concept == Lesson.UPPER_CASE_TO_LOWER_CASE_CONCEPT)))) {
            lucs = db.lessonUnitDao().getFlashCardsByLessonId(lesson.id);
            convertToUniqueSubjects(lucs, answerCaseParticular);
            if(lucs.size() < numQuizes) {
                lucs = db.lessonUnitDao().getFlashCardArrayBelowSeqAndByConcept(lesson.seq, lesson.concept);
                convertToUniqueSubjects(lucs, answerCaseParticular);
            }
        } else {
            List<Integer> formats = new LinkedList<Integer>();
            formats.add(Lesson.LETTER_CONCEPT);
            formats.add(Lesson.UPPER_CASE_TO_LOWER_CASE_CONCEPT);
            if(choiceFormat == ANY_FORMAT) {
                formats.add(Lesson.LETTER_TO_WORD_CONCEPT);
            }
            Lesson[] lessons = db.lessonDao().getLessonsBelowSeqAndByConcept(lesson.seq, formats);
            int lessonIndex = ThreadLocalRandom.current().nextInt(lessons.length);
            lucs = db.lessonUnitDao().getFlashCardsByLessonId(lessons[lessonIndex].id);
            convertToUniqueSubjects(lucs, answerCaseParticular);
            if(lucs.size() < numQuizes) {
                lucs = db.lessonUnitDao().getFlashCardArrayBelowSeqAndByConcept(lesson.seq, lessons[lessonIndex].concept);
                convertToUniqueSubjects(lucs, answerCaseParticular);
            }

        }
        List<MultipleChoiceQuiz> mcqs = new ArrayList<MultipleChoiceQuiz>(numQuizes);

        ArrayList<Integer> quizList = new ArrayList<Integer>();
        for (int i = 0; i < lucs.size(); i++) {
            quizList.add(i);
        }
        Collections.shuffle(quizList);

        for (int i = 0; i < numQuizes; i++) {
            int lucIndex = quizList.get(Math.min(i, quizList.size() - 1));
            FlashCard luc = lucs.get(lucIndex);
            String[] choices = new String[numChoices];

            ArrayList<Integer> choiceList = new ArrayList<Integer>();
            for (int j = 0; j < lucs.size(); j++) {
                if (!luc.subjectUnit.name.equals(lucs.get(j).subjectUnit.name)) {
                    choiceList.add(j);
                }
            }
            Collections.shuffle(choiceList);

            int answerIndex = ThreadLocalRandom.current().nextInt(numChoices);
            for (int c = 0; c < numChoices; c++) {
                if (c == answerIndex) {
                    choices[c] = luc.objectUnit.name;
                } else {
                    int randIndex = choiceList.get(Math.min(c, choiceList.size() - 1));
                    choices[c] = lucs.get(randIndex).objectUnit.name;
                }
            }
            String answer = luc.subjectUnit.name;
            if(answerFormat == UPPER_CASE_LETTER_FORMAT) {
                answer = luc.subjectUnit.name.toUpperCase();
            }
            if(choiceFormat == UPPER_CASE_LETTER_FORMAT) {
                for(int c = 0; c < choices.length; c++) {
                    //TODO: Handle unicode
                    choices[c] = choices[c].substring(0, 1).toUpperCase();
                }
            }
            MultipleChoiceQuiz mcq = new MultipleChoiceQuiz("TODO: Dummy Help",
                    answer, choices, answerIndex);
            mcqs.add(mcq);
        }
        return mcqs;
    }

    private static void convertToUniqueSubjects(List<FlashCard> lucs, boolean caseInvariant) {
        Set<String> subjectSet = new HashSet<String>(lucs.size());
        for(Iterator<FlashCard> iter = lucs.iterator(); iter.hasNext(); ) {
            FlashCard luc = iter.next();
            String compareStr = luc.subjectUnit.name;
            if(caseInvariant) {
                compareStr = compareStr.toUpperCase();
            }
            if(!subjectSet.contains(compareStr)) {
                subjectSet.add(compareStr);
            } else {
                iter.remove();
            }
        }
    }

    public static List<BagOfChoiceQuiz> getBagOfChoiceQuizes(Context context, int numQuizes
            , int minAnswers, int maxAnswers, int minChoices, int maxChoices, boolean order) {
        //TODO: for now assume order is true
        AppDatabase db = AppDatabase.getInstance(context);
        User user = UserRepo.getCurrentUser(context);
        Lesson lesson = db.lessonDao().getLessonById(user.currentLessonId);
        FlashCard[] lucs = db.lessonUnitDao().getFlashCardArrayByLessonId(lesson.id);

        List<BagOfChoiceQuiz> bcqs = new ArrayList<BagOfChoiceQuiz>(numQuizes);

        if (lesson.concept == Lesson.LETTER_TO_WORD_CONCEPT) {
            ArrayList<Integer> quizList = new ArrayList<Integer>();
            Set<String> choiceSet = new HashSet<String>(lucs.length);
            Map<String, String[]> wordMap = new HashMap<String, String[]>(lucs.length);
            fillChoicesWithWords(minAnswers, maxAnswers, lucs, quizList, choiceSet, wordMap);
            if(quizList.size() == 0) {
                fillChoicesWithWords(minAnswers, maxChoices, lucs, quizList, choiceSet, wordMap);
            }
            if(quizList.size() == 0) {
                fillChoicesWithWords(minChoices, maxChoices, lucs, quizList, choiceSet, wordMap);
            }
            Collections.shuffle(quizList);

            for (int i = 0; i < numQuizes; i++) {
                int lucIndex = quizList.get(Math.min(i, quizList.size() - 1));
                FlashCard luc = lucs[lucIndex];
                String answer = luc.objectUnit.name;
                String[] answers = wordMap.get(answer);
                Set<String> choiceCloneSet = new HashSet<String>(choiceSet);
                for (int a = 0; a < answers.length; a++) {
                    choiceCloneSet.remove(answers[a]);
                }
                List<String> choiceList = new LinkedList<String>(choiceCloneSet);
                Collections.shuffle(choiceList);

                String[] choices = new String[maxChoices - answers.length];
                for (int c = 0; c < choices.length; c++) {
                    choices[c] = choiceList.get(Math.min(c, choiceList.size() - 1));
                }

                BagOfChoiceQuiz bcq = new BagOfChoiceQuiz("TODO: Dummy Help"
                        , answer
                        , answers
                        , choices);

                bcqs.add(bcq);
            }
        } else if (lesson.concept == Lesson.SYLLABLE_TO_WORD_CONCEPT) {
            ArrayList<Integer> quizList = new ArrayList<Integer>();
            Map<Unit, EagerUnitPart[]> unitMap = new HashMap<Unit, EagerUnitPart[]>(lucs.length);
            Set<String> choiceSet = new HashSet<String>(lucs.length);
            fillChoicesWithSyllables(minAnswers, maxAnswers, db, lucs, quizList, unitMap, choiceSet);
            if(quizList.size() == 0) {
                fillChoicesWithSyllables(minAnswers, maxChoices, db, lucs, quizList, unitMap, choiceSet);
            }
            if(quizList.size() == 0) {
                fillChoicesWithSyllables(minChoices, maxChoices, db, lucs, quizList, unitMap, choiceSet);
            }
            Collections.shuffle(quizList);

            for (int i = 0; i < numQuizes; i++) {
                int lucIndex = quizList.get(Math.min(i, quizList.size() - 1));
                FlashCard luc = lucs[lucIndex];
                EagerUnitPart[] unitParts = unitMap.get(luc.objectUnit);
                String[] answers = new String[unitParts.length];
                Set<String> choiceCloneSet = new HashSet<String>(choiceSet);
                for (int a = 0; a < unitParts.length; a++) {
                    answers[a] = unitParts[a].partUnit.name;
                    choiceCloneSet.remove(answers[a]);
                }
                List<String> choiceList = new LinkedList<String>(choiceCloneSet);
                Collections.shuffle(choiceList);

                String[] choices = new String[maxChoices - answers.length];
                for (int c = 0; c < choices.length; c++) {
                    choices[c] = choiceList.get(Math.min(c, choiceList.size() - 1));
                }

                BagOfChoiceQuiz bcq = new BagOfChoiceQuiz("TODO: Dummy Help"
                        , luc.objectUnit.name
                        , answers
                        , choices);

                bcqs.add(bcq);
            }
        } else {
            ArrayList<Integer> quizList = new ArrayList<Integer>();
            for (int i = 0; i < lucs.length; i++) {
                quizList.add(new Integer(i));
            }
            Collections.shuffle(quizList);

            for (int i = 0; i < numQuizes; i++) {
                int lucIndex = quizList.get(Math.min(i, quizList.size() - 1));
                FlashCard luc = lucs[lucIndex];
                List<String> answers = new LinkedList<String>();
                List<String> choices = new LinkedList<String>();

                ArrayList<Integer> choiceList = new ArrayList<Integer>();
                for (int j = 0; j < lucs.length; j++) {
                    if (!luc.subjectUnit.name.equals(lucs[j].subjectUnit.name)) {
                        choiceList.add(new Integer(j));
                    }
                }
                Collections.shuffle(choiceList);

                for (int a = 0; a < maxAnswers; a++) {
                    answers.add(luc.subjectUnit.name);
                }

                for (int c = 0; c < maxChoices - maxAnswers; c++) {
                    int randIndex = choiceList.get(Math.min(c, choiceList.size() - 1));
                    choices.add(lucs[randIndex].subjectUnit.name);
                }

                BagOfChoiceQuiz bcq = new BagOfChoiceQuiz("TODO: Dummy Help"
                        , luc.subjectUnit.name
                        , answers.toArray(new String[0])
                        , choices.toArray(new String[0]));

                bcqs.add(bcq);
            }

        }
        return bcqs;
    }

    private static void fillChoicesWithSyllables(int minAnswers, int maxAnswers, AppDatabase db, FlashCard[] lucs, ArrayList<Integer> quizList, Map<Unit, EagerUnitPart[]> unitMap, Set<String> choiceSet) {
        for (int i = 0; i < lucs.length; i++) {
            EagerUnitPart[] unitParts = db.unitPartDao().getEagerUnitPartsByUnitIdAndType(
                    lucs[i].objectUnit.id, Unit.SYLLABLE_TYPE);
            for (EagerUnitPart unitPart : unitParts) {
                choiceSet.add(unitPart.partUnit.name);
            }
            if (unitParts.length >= minAnswers && unitParts.length <= maxAnswers) {
                quizList.add(new Integer(i));
                unitMap.put(lucs[i].objectUnit, unitParts);
            }
        }
    }

    private static void fillChoicesWithWords(int minAnswers, int maxAnswers, FlashCard[] lucs, ArrayList<Integer> quizList, Set<String> choiceSet, Map<String, String[]> wordMap) {
        for (int i = 0; i < lucs.length; i++) {
            String word = lucs[i].objectUnit.name;
            String[] letters = new String[word.length()];
            for (int s = 0; s < word.length(); s++) {
                //TODO: handle unicode and code points
                String letter = word.substring(s, s+1);
                choiceSet.add(letter);
                letters[s] = letter;
            }
            if (word.length() >= minAnswers && word.length() <= maxAnswers) {
                quizList.add(new Integer(i));
                wordMap.put(word, letters);
            }
        }
    }

}
