/*
 * MIT License. Copyright 2016 Arnab Chakraborty. http://arnab.ch
 *
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

package org.chimple.bali.launcher;

import android.app.AlertDialog;
import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.Loader;
import android.view.View;
import android.widget.GridView;

import org.chimple.bali.R;
import org.chimple.bali.activity.LessonActivity;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.repo.UserLogRepo;

import java.util.ArrayList;

import static org.chimple.bali.provider.LessonContentProvider.COINS;
import static org.chimple.bali.provider.LessonContentProvider.GAME_EVENT;
import static org.chimple.bali.provider.LessonContentProvider.GAME_LEVEL;
import static org.chimple.bali.provider.LessonContentProvider.GAME_NAME;
import static org.chimple.bali.provider.LessonContentProvider.URI_COIN;

public class AppsGridFragment extends GridFragment implements LoaderManager.LoaderCallbacks<ArrayList<AppModel>> {

    AppListAdapter mAdapter;

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        setEmptyText("No Applications");

        mAdapter = new AppListAdapter(getActivity());
        setGridAdapter(mAdapter);

        // till the data is loaded display a spinner
        setGridShown(false);

        // create the loader to load the apps list in background
        getLoaderManager().initLoader(0, null, this);
    }

    @Override
    public Loader<ArrayList<AppModel>> onCreateLoader(int id, Bundle bundle) {
        return new AppsLoader(getActivity());
    }

    @Override
    public void onLoadFinished(Loader<ArrayList<AppModel>> loader, ArrayList<AppModel> apps) {
        mAdapter.setData(apps);

        if (isResumed()) {
            setGridShown(true);
        } else {
            setGridShownNoAnimation(true);
        }
    }

    @Override
    public void onLoaderReset(Loader<ArrayList<AppModel>> loader) {
        mAdapter.setData(null);
    }

    @Override
    public void onGridItemClick(GridView g, View v, int position, long id) {
        AppModel app = (AppModel) getGridAdapter().getItem(position);
        if (app != null) {
            if(app.getEnabled()) {
                new AlertDialog.Builder(getContext())
                        .setTitle("Launch application")
                        .setMessage("One coin will be subtracted. Is it OK?")
                        .setNegativeButton(android.R.string.no, null)
                        .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface arg0, int arg1) {
                                new AsyncTask<Context, Void, Void>() {
                                    @Override
                                    protected Void doInBackground(Context... contexts) {
                                        Context context1 = contexts[0];
                                        ContentValues contentValues = new ContentValues(1);
                                        contentValues.put(COINS, -1);
                                        contentValues.put(GAME_NAME, app.getApplicationPackageName());
                                        contentValues.put(GAME_LEVEL, -1);
                                        contentValues.put(GAME_EVENT, UserLog.START_EVENT);
                                        int coins = context1.getContentResolver().update(
                                                URI_COIN,
                                                contentValues,
                                                null,
                                                null
                                        );
                                        return null;
                                    }
                                }.execute(getContext());

                                Intent intent = getActivity().getPackageManager().getLaunchIntentForPackage(app.getApplicationPackageName());
                                UserLogRepo.logEntity(getContext(), UserLog.GAME_TYPE, (long) 0, UserLog.START_EVENT, app.getApplicationPackageName());
                                if (intent != null) {
                                    startActivity(intent);
                                }
                            }
                        }).create().show();
            }
        }
    }
}