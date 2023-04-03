import io.javalin.core.security.RouteRole

enum class Roles: RouteRole {
    ANYONE, USER
}