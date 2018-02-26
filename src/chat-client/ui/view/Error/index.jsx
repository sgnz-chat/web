import React from "react"

const unknownError = "不明なエラーが発生しました。"

export default ({
    component = "span",
    Component = component,
    error
}) =>
    <Component>
        {(
            error instanceof Response ?
                error.status == 400 ? "不正なリクエスト(400)"
              : error.status == 401 ? "再ログインしてください(401)"
              : error.status == 403 ? "権限がありません(403)"
              : error.status == 404 ? "リソースが見つかりません(404)"
              : error.status == 405 ? "許可されてない操作です(405)"
              : error.status == 500 ? "サーバーエラー(500)"
              : error.status == 501 ? "開発中です(501)"
              : error.status == 502 ? "開発中です(502)"
              : error.status == 503 ? "機能メンテナンス中です(503)"
              : error.status == 504 ? "サーバーエラー(504)"
              :                       unknownError
              : error instanceof TypeError ? unknownError
              :                              unknownError
        )}
    </Component>
 