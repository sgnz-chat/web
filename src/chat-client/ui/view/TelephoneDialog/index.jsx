import React            from "react"
import Avatar           from "chat-client/ui/view/common/Avatar"
import Button           from "chat-client/ui/view/common/Button"
import Dialog           from "chat-client/ui/view/common/Dialog"
import DialogBody       from "chat-client/ui/view/common/DialogBody"
import DialogFooter     from "chat-client/ui/view/common/DialogFooter"
import DialogHeader     from "chat-client/ui/view/common/DialogHeader"

import classNames from "chat-client/ui/view/TelephoneDialog/classNames"

export default ({
    isCalling,
    isVisible,
    isTalking,
    type,
    user,
    onAnswerButtonClick = e => undefined,
    onCloseButtonClick = e => undefined,
    ...props
}) => 
    <Dialog
        isVisible={isVisible}
        {...props}
    >
        <DialogHeader>着信中</DialogHeader>
        <DialogBody>
            <div
                className={classNames.UserContent}
            >
                <Avatar
                    src={isVisible ? user.avatarUrl : ""}
                />
                <div>
                    {isVisible && user.displayName}
                </div>
                <div>
                    {isVisible && user.statusMessage}
                </div>
                {isCalling && "呼び出し中..."}
                <div>
                    {!isTalking && !isCalling ? [
                        <Button
                            color="BlueGrey"
                            key="rejectButton"
                            onClick={onCloseButtonClick}
                        >
                            拒否
                        </Button>,
                        <Button
                            key="answerButton"
                            onClick={onAnswerButtonClick}
                        >
                            応答
                        </Button>
                    ]   
                  :     <Button
                            onClick={onCloseButtonClick}
                        >
                            終了
                        </Button>
                    }
                </div>
            </div>
        </DialogBody>
    </Dialog>
