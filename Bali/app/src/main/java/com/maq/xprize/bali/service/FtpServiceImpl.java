package com.maq.xprize.bali.service;

import android.util.Log;

import com.maq.xprize.bali.broadcasts.ConnectivityBroadcastReceiver;
import com.maq.xprize.bali.ftp.FtpManagerListener;
import com.maq.xprize.bali.operation.OpState;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class FtpServiceImpl extends BaseService {
    private static final String TAG = FtpServiceImpl.class.getName();
    public static final int DO_FTP_TRANSFER = 1;
    String host = null;
    int port = 21;
    String user = null;
    String password = null;

    public FtpServiceImpl(String host, String user, String password, int port) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.port = port;
    }
    @Override
    public void handleOperation(final OpState operationState) {

        if (operationState.getOperationType() == DO_FTP_TRANSFER) {
            perform(this.host, this.user, this.password, this.port, new ServiceListener() {
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

    private void perform(final String host, final String user, final String password, final int port, final ServiceListener listener) {
        runInBackground(new ServiceRunnable() {
            @Override
            public void execute() throws Exception {

                getFtpManager().uploadToFtp(host, user, password, port, new FtpManagerListener() {
                    @Override
                    public void onFtpUploadSuccess() {
                        Log.d(TAG, "ftp upload success");
                        getFtpManager().downloadBluetoothAddresses(host, user, password, port, new FtpManagerListener() {
                            @Override
                            public void onFtpUploadSuccess() {
                            }

                            @Override
                            public void onFtpUploadFailed(String message) {
                            }
                        });

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
