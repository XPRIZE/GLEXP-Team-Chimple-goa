package org.chimple.bali.ftp;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public interface FtpManagerListener {

    public void onFtpUploadSuccess();

    public void onFtpUploadFailed(String message);
}
