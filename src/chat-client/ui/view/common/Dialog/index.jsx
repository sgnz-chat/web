import React    from "react"
import Root     from "chat-client/ui/control/Root"

import classNames from "chat-client/ui/view/common/Dialog/classNames"

export default ({
    className,
    onCancel = () => undefined,
    onClick = e => undefined,
    isVisible,
    ...props
}) =>
    <Root
        className={isVisible ? classNames.Root : ""}
        onClick={onCancel}
    >
        <div
            className={
                [
                    className,
                    classNames.Host,
                    isVisible          ? classNames.Visible
                    :                      classNames.Hidden
                ].join(" ")
            }
            onClick={e => e.stopPropagation() && onClick(e)}
            {...props}
        />
    </Root>
