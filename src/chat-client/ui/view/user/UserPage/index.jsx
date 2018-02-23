import React       from "react"
import queryString from "query-string"
import UserManager from "chat-client/ui/view/user/UserManager"

export default ({
    databaseApi: {
        userApi
    },
    user,
    ...props
}) =>
    <div>
        <UserManager
            user={user}
            userApi={userApi}
        />
    </div>
    
