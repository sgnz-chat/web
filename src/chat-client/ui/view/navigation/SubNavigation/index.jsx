import React       from "react"

import classNames from "chat-client/ui/view/navigation/SubNavigation/classNames"

export default ({
    isView,
    className,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host,
                !isView ? classNames.Hide
              :           undefined
            ].join(" ")
        }
        {...props}
    />
