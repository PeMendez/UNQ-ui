import Api.TwitterSystem.src.main.kotlin.org.TokenController
import io.javalin.http.*
import org.UserDTO
import org.UserLoginDTO
import org.unq.*
import java.lang.Exception
class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){
    fun login(ctx: Context){

        val userBody = ctx.bodyValidator<UserLoginDTO>()
        val user = twitterSystem.users.find{ it.username == userBody.username && it.password == userBody.password}?: throw UserExecption("Usuario no encontrado")
        ctx.header("Autheticator",tokenController.generateToken(user))
        ctx.json(user)
    }

    fun getLoguedUser(ctx: Context){
        val users = twitterSystem.users
        val user = users.find
    }
}

