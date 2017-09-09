package org.chimple.bali.operation;

import android.content.Context;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import org.chimple.bali.application.BaliContext;
import org.chimple.bali.broadcasts.ConnectivityBroadcastReceiver;
import org.chimple.bali.broadcasts.ConnectivityBroadcastReceiver.ConnectivityListener;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.FtpServiceImpl;
import org.chimple.bali.service.SimpleServiceRunnable;
import org.chimple.bali.service.ThreadManager;

import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.Queue;


/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class OperationManager implements ConnectivityListener {
    private static final String TAG = OperationManager.class.getName();
    private boolean isNotificationBeingHandled;
    private ThreadManager threadManager;
    private ConnectivityManager connectivityManager;
    private ConnectivityBroadcastReceiver connectivityBroadcastReceiver;
    private OperationListener listener;
    private Queue<OpState> queue;
    private static final String FTP_SYNC_JOB = "FTP_SYNC_JOB";
    private static final int THRESH_HOLD_JOB_TIME_IN_HOURS = 5;
    private Context context;

    private static final long INITIAL_NOTIFY_DELAY = 2000;
    private static final long NOTIFY_COOLDOWN = 10000;
    private static final int RETRY_COUNT = 5;
    private SharedPreferences sharedPreferences;

    public OperationManager(Context context, OperationListener listener, ThreadManager threadManager) {
        Log.d(TAG, "Initializing OperationManager");
        queue = new LinkedList<OpState>();
        this.threadManager = threadManager;
        this.listener = listener;
        this.context = context;
        sharedPreferences = context.getSharedPreferences(FTP_SYNC_JOB, Context.MODE_PRIVATE);

        connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        registerForBroadcasts(context);

    }

    private void unregisterForBroadcasts(Context context) {
        if (connectivityBroadcastReceiver != null) {
            context.unregisterReceiver(connectivityBroadcastReceiver);
        }
    }

    private void saveSyncTime() {
        try {
            SharedPreferences.Editor editor = sharedPreferences.edit();
            Calendar calendar = Calendar.getInstance();
            Date currentDate = calendar.getTime();
            editor.putLong(FTP_SYNC_JOB, currentDate.getTime());
            editor.apply();

            UserLogRepo.deleteAllUserLogs(this.context);

        } catch (Exception e) {

        }
    }

    private long getLastSyncTime() {
        long lastSyncTime = 0L;

        try {
            lastSyncTime = sharedPreferences.getLong(FTP_SYNC_JOB, 0L);
        } catch (Exception e) {
            // No-op
        }

        return lastSyncTime;
    }

    private void registerForBroadcasts(Context context) {
        unregisterForBroadcasts(context);

        connectivityBroadcastReceiver = new ConnectivityBroadcastReceiver(this);

        context.registerReceiver(connectivityBroadcastReceiver, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));
    }

    @Override
    public void onConnectionChanged(boolean connected) {
        if (connected) {
            Log.d(TAG, "Internet connection available, notifying listener");
            scheduleSyncJob();
            notifyListener();
        }
    }

    private void scheduleSyncJob() {
        long lastSyncTime = getLastSyncTime();
        if (lastSyncTime != 0L) {
            Date lastSyncDate = new Date(lastSyncTime);
            Calendar calendar = Calendar.getInstance();
            Date currentDate = calendar.getTime();

            long difference = (currentDate.getTime() - lastSyncDate.getTime()) / 1000;
            long hours = difference / 3600;

            difference = difference % 3600;
            long mins = difference / 60;
            //only for testing using min

            if (mins >= THRESH_HOLD_JOB_TIME_IN_HOURS) {
                OpState testFTP = new OpState(FtpServiceImpl.DO_FTP_TRANSFER);
                BaliContext.getInstance().getFtpService().getOperationManager().addOperation(testFTP);
            }
        } else {
            OpState testFTP = new OpState(FtpServiceImpl.DO_FTP_TRANSFER);
            BaliContext.getInstance().getFtpService().getOperationManager().addOperation(testFTP);
        }
    }

    private boolean isNetworkAvailable() {
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    private synchronized void notifyListener() {
        // NOTE: this runs in background based off of where it is called above

        // If the listener isn't busy, let them know that they should handle this operation...
        if (!isNotificationBeingHandled) {
            OpState state = queue.peek();

            if (state == null) {
                return;
            }

            if (!isNetworkAvailable()) {
                Log.d(TAG, "No internet connection, not notifying listener");
                return;
            }

            isNotificationBeingHandled = true;

            Log.d(TAG, "Notifying " + " " + state);

            listener.handleOperation(state);
        }
    }

    public synchronized void onSuccessfulComplete(final OpState opState) {
        if (opState == null) {
            return;
        }

        threadManager.runInBackground(new SimpleServiceRunnable() {
            @Override
            public void execute() throws Exception {
                Log.d(TAG, "Operation successful " + opState);

                isNotificationBeingHandled = false;
                saveSyncTime();
                deleteOperationState(opState);
                notifyListener();
            }
        });
    }

    private void deleteOperationState(OpState operationState) {
        if (!queue.isEmpty()) {
            queue.remove();
        }
    }

    public synchronized void onFailed(final OpState operationState) {
        if (operationState == null) {
            return;
        }

        threadManager.runInBackground(new SimpleServiceRunnable() {
            @Override
            public void execute() throws Exception {
                Log.d(TAG, "Operation failed " + operationState);

                isNotificationBeingHandled = false;

                operationState.usedRetry();

                if (operationState.getRetryCount() > 0) {
                    notifyListener(NOTIFY_COOLDOWN);
                } else {
                    Log.d(TAG, "No retries left " + operationState);

                    deleteOperationState(operationState);
                    notifyListener();
                }
            }
        });
    }


    private synchronized void notifyListener(long delay) {
        threadManager.runInBackground(new SimpleServiceRunnable() {
            @Override
            public void execute() throws Exception {
                notifyListener();
            }
        }, delay);
    }

    private void queueOperation(OpState operation) {
        operation.setRetryCount(RETRY_COUNT);
        if (!queue.contains(operation)) {
            queue.add(operation);
            Log.d(TAG, "Queuing operation state " + operation);
        } else {
            Log.d(TAG, "Queuing already had operation state " + operation);
        }
    }


    public void addOperation(OpState opState) {
        if (opState == null) {
            return;
        }

        threadManager.runInBackground(new SimpleServiceRunnable() {
            @Override
            public void execute() throws Exception {
                Log.d(TAG, "Saving state " + opState);

                queueOperation(opState);
                notifyListener();
            }
        });
    }
}
