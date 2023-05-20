
import { getCache } from "@/utils"
import { Navigate } from "react-router-dom"

function AuthComponment ({ children }) {
 const hasLogin = getCache("UFO_TOKEN")
 if (hasLogin !== null && hasLogin !== "") {
  return <>{children}</>
 } else {
  return <Navigate to="/login" replace />
 }
}

export default AuthComponment