import React        from "react"
import Button       from "chat-client/ui/view/common/Button"
import Dialog       from "chat-client/ui/view/common/Dialog"
import DialogBody   from "chat-client/ui/view/common/DialogBody"
import DialogFooter from "chat-client/ui/view/common/DialogFooter"
import DialogHeader from "chat-client/ui/view/common/DialogHeader"
import ImageInput   from "chat-client/ui/view/common/ImageInput"

import classNames from "chat-client/ui/view/common/SendImageDialog/classNames"

export default ({
    children,
    name,
    onCancel = e => undefined,
    title,
    ...props
}) =>
    <Dialog
        component="form"
        {...props}
    >
        <DialogHeader>
            {title}
        </DialogHeader>
        <DialogBody>
            <ImageInput
                className={classNames.ImageInput}
                labelText="クリックして選択"
                name={name}
                height="300"
                width="300"
            />
            {children}
        </DialogBody>
        <DialogFooter
            className={classNames.DialogFooter}
        >
            <Button
                type="flat"
                onClick={onCancel}
            >
                キャンセル
            </Button>
            <Button
                component="button"
                type="flat"
            >
                送信
            </Button>
        </DialogFooter>
    </Dialog>
