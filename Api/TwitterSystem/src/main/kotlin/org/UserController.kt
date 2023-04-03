class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){
    fun login(ctx:Context){
        val userBody = ctx.bodyValidator<User>().get()
        val user = users.find{ it.userName == userBody.userName && it.password == userBody.password}?: throw UserExecption("Usuario no encontrado")
        ctx.header("Autheticator",tokenController.createToken(user))
        ctx.jason(user)
    }

    fun getLoguedUser(ctx: Context){
        val users = twitterSystem.users
        val user = users.find
    }
}