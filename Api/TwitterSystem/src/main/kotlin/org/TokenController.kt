package org

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.*
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.TwitterSystem
import org.unq.User
import org.unq.UserException
import io.javalin.http.Context
import io.javalin.http.Handler
import io.javalin.http.UnauthorizedResponse



class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        return token.sign(alg)
    }
}

class TokenController<RouteRole>(private  val system : TwitterSystem){
    private val algorithm = Algorithm.HMAC256("grupo04")
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm, generator, verifier)
    private val header = "Authorization"


    fun generateToken(user: User): String {
        return provider.generateToken(user)
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
                    val user : User
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

}