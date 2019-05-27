package com.maq.xprize.bali.service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import android.os.Handler;
import android.os.Looper;


/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class ThreadManager {
    private ScheduledExecutorService scheduledExecutorService;
    private ExecutorService executorService;
    private Handler handler;

    public ThreadManager() {
        scheduledExecutorService = Executors.newScheduledThreadPool(10);
        executorService = Executors.newFixedThreadPool(20);
        handler = new Handler(Looper.getMainLooper());
    }

    public void runOnMainThread(Runnable runnable) {
        handler.post(runnable);
    }

    public void runInBackground(ServiceRunnable runnable) {
        executorService.submit(runnable);
    }

    public void runInBackground(ServiceRunnable runnable, long delay) {
        scheduledExecutorService.schedule(runnable, delay, TimeUnit.MILLISECONDS);
    }

}
