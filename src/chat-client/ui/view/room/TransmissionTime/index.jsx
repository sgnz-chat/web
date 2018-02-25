import React from "react"

import classNames from "chat-client/ui/view/room/TransmissionTime/classNames"

export default ({
    timestamp,
    className,
    ...props
}) =>
    <p
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
    >
        {
          (_ => {
              let d     = new Date(timestamp)
              let today = new Date()

              let year  = d.getYear()
              let month = d.getMonth() + 1
              let day   = d.getDate()
              let hour  = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
              let min   = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

              let result = month + '/' + day + ' ' + hour + ':' + min

              if (today.getYear() == d.getYear() && today.getMonth() == d.getMonth() && today.getDate() == d.getDate() ) 
                  result =  hour + ':' + min

              return result
          })()
        }
    </p>
