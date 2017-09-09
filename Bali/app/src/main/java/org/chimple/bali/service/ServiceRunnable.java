package org.chimple.bali.service;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public abstract class ServiceRunnable implements Runnable {
    private static final String TAG = ServiceRunnable.class.getSimpleName();

    @Override
    public void run() {
        try {
            execute();
        } catch (Exception e) {
            e.printStackTrace();
            executeFailure(e);
        }
    }

    /**
     * Replaces run
     *
     * @throws Exception
     */
    public abstract void execute() throws Exception;

    /**
     * Called when an exception is thrown
     *
     * @param e
     */
    public abstract void executeFailure(Exception e);
}