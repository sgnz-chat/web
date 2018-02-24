import React from "react"

import classNames from "chat-client/ui/view/setting/SettingPage/classNames"

export default ({
    databaseApi,
    user,
    ...props
}) => 
    <div
        className={classNames.Host}
    >
        {user.id}
    </div>
