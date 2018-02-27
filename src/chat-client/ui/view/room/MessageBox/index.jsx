import React            from "react"
import TransmissionTime from  "chat-client/ui/view/room/TransmissionTime"

import classNames from "chat-client/ui/view/room/MessageBox/classNames"

export default ({
    position = "left",
    children,
    className,
    date,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host,
                position == "left" ? classNames.Left
            :                        classNames.Right
            ].join(" ")
        }
    >
        <div
            className={classNames.ArrowBox}
            {...props}
        >
            {children}
        </div>
        <TransmissionTime
            date={date}
        ></TransmissionTime>
    </div>
