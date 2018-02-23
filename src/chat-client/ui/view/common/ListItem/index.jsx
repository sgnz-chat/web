import React    from "react"
import match    from "chat-client/util/match"
import { Link } from "react-router-dom"

import classNames from "chat-client/ui/view/common/ListItem/classNames"

export default ({
    className,
    children,
    disabled,
    location,
    to,
    component = disabled ? "div"
              : to       ? Link
              :            "div",
    Component = component,
    selected = location && match({
        location          : location,
        locationDescriptor: to
    }),
    value,
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :            undefined,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
        children={
            React.Children.toArray(children).map(x =>
                typeof(x) == "string" ? x
              : typeof(x) == "number" ? x
              :                         React.cloneElement(
                    x,
                    {
                        selected: selected,
                    }
                )
            )
        }
        to={to}
        {...props}
    />
