package org.chimple.bali.operation;

import java.util.Date;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class OpState {
    private int retryCount;
    private int operationType;
    private Date createDate;

    public OpState() {
        createDate = new Date();
    }

    public OpState(int operationType) {
        this.operationType = operationType;
        createDate = new Date();
    }

    public int getRetryCount() {
        return retryCount;
    }

    public void setRetryCount(int retryCount) {
        this.retryCount = retryCount;
    }

    public int getOperationType() {
        return operationType;
    }

    public void setOperationType(int operationType) {
        this.operationType = operationType;
    }

    public void usedRetry() {
        retryCount--;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        return "OpState [retryCount=" + retryCount + ", operationType=" + operationType + ", createDate=" + createDate + "]";
    }
}
