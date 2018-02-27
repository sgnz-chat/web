import React from "react"

import classNames from "chat-client/ui/view/room/TransmissionTime/classNames"

export default ({
    date,
    className,
    ...props
}) => {
    if (!date)
        date = new Date()

    let today = new Date()

    let year  = date.getYear()
    let month = date.getMonth() + 1
    let day   = date.getDate()
    let hour  = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let min   = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    let result = month + '/' + day + ' ' + hour + ':' + min

    if (today.getYear() == date.getYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate() ) 
        result =  hour + ':' + min

    return (
        <p
            className={
                [
                    className,
                    classNames.Host
                ].join(" ")
            }
        >
            {result}
        </p>
    )
}