package Api.TwitterSystem.src.main.kotlin.org

class TokenController (private  val users: List<User>){
    private val algorithm = Algorithm.HMAC256("grupo_04")
    private val verifier = JWT.require(algorithm).build()
    private val generator = JWTGenerator<User> {user: User, alg: Algorithm? ->
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("username", user.username)
        return token.sign(alg)
    }
    private val provider = JWTProvider(algorithm, generator, verifier)
    private val header = "Authorization"


    fun generateToken(user: User): String {
        return provider.generateToken(user)
    }

    fun validateToken(token: String) {
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
                    try { user = twitterSystem.getUser(userId) } catch(e:UserException) { throw ForbiddenResponse("Invalid token") }
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