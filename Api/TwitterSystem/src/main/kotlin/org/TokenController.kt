package org

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.core.security.RouteRole
import io.javalin.http.*
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException


class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("username", user.username)
        return token.sign(alg)
    }
}

class TokenController (private  val system : TwitterSystem){
    private val algorithm = Algorithm.HMAC256("grupo04")
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    //JWTGenerator<User> {user: User, alg: Algorithm? ->
    //val token: JWTCreator.Builder = JWT.create()
    //  .withClaim("username", user.username)
    private val provider = JWTProvider(algorithm, generator, verifier)
    private val header = "Authorization"
    private val users = system.users


    fun generateToken(user: User): String {
        return provider.generateToken(user)
    }

    fun validateToken(token: String) : User {
        val decodedJWT = provider.validateToken(token).orElseThrow {throw Exception("Usuario no encontrado")}
        val username = decodedJWT.getClaim("username").asString()
        return users.find{it.username == username} ?: throw Exception("No existe el usuario")
    }

    fun validate(handler: Handler, ctx: Context, permittedRoles: Set<RouteRole>) {
        val header = ctx.header(header)
        when {
            permittedRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
            header == null -> {
                throw UnauthorizedResponse("Invalid token")
            }
            else -> {
                val token = provider.validateToken(header)
                if (token.isPresent) {
                    val userId = token.get().getClaim("id").asString()
                    var user : User
                    try { user = system.getUser(userId) } catch(e: UserException) { throw ForbiddenResponse("Invalid token") }
                    if (permittedRoles.contains(Roles.USER)) {
                        ctx.attribute("user", user)
                        handler.handle(ctx)
                    } else {
                        throw ForbiddenResponse("Unauthourized resource.")
                    }
                } else {
                    throw UnauthorizedResponse("Invalid token")
                }
            }
        }
    }

    fun tokenToUser(token: String): User {
        val validateToken = provider.validateToken(token)
        val userId = validateToken.get().getClaim("id").asString()
        try {
            return system.getUser(userId)
        } catch (e: UserException) {
            throw NotFoundResponse("User not found.")
        }
    }
}