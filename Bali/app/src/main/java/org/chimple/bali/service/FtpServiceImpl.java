package org.chimple.bali.service;

import org.chimple.bali.ftp.FtpManagerListener;
import org.chimple.bali.operation.OpState;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class FtpServiceImpl extends BaseService {
    public static final int DO_FTP_TRANSFER = 1;

    @Override
    public void handleOperation(final OpState operationState) {

        if (operationState.getOperationType() == DO_FTP_TRANSFER) {
            perform("", new ServiceListener() {
                @Override
                public void onSuccess() {
                    getOperationManager().onSuccessfulComplete(operationState);
                }

                @Override
                public void onFailure() {
                    getOperationManager().onFailed(operationState);
                }
            });
        }
    }

    private void perform(final String endPoint, final ServiceListener listener) {
        runInBackground(new ServiceRunnable() {
            @Override
            public void execute() throws Exception {
                getFtpManager().uploadToFtp("test", new FtpManagerListener() {
                    @Override
                    public void onFtpUploadSuccess() {
                        runOnMainThread(new Runnable() {
                            @Override
                            public void run() {
                                listener.onSuccess();
                            }
                        });
                    }

                    @Override
                    public void onFtpUploadFailed(String message) {
                        runOnMainThread(new Runnable() {
                            @Override
                            public void run() {
                                listener.onFailure();
                            }
                        });
                    }
                });
            }

            @Override
            public void executeFailure(final Exception e) {
                runOnMainThread(new Runnable() {
                    @Override
                    public void run() {
                        listener.onFailure();
                    }
                });
            }

        });
    }
}
