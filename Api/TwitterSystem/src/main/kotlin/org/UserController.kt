package org

import io.javalin.http.*
import org.unq.*
import java.lang.Exception

class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){

    fun login(ctx: Context){
        val userBody = ctx.bodyValidator<UserLoginDTO>().get()
        val user = twitterSystem.users.find { it.username == userBody.username && it.password == userBody.password}?: throw UserException("Usuario no encontrado")
        ctx.header("Authenticator", tokenController.generateToken(user))
        ctx.json(UserDTO(user))
    }

    fun getLoguedUser(ctx: Context){
        val users = twitterSystem.users
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        ctx.json(UserDTO(user))
    }

    private fun userOrThrow(ctx: Context): User {
        try{
            return twitterSystem.getUser(ctx.pathParam("id"))
        } catch (e: Exception){
            throw NotFoundResponse("User with given id not found")
        }
    }
    fun getFollowingTweets(ctx: Context){
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        val usuario = userOrThrow(ctx)

    }

    fun register(ctx: Context){

    }

    fun usersToFollow(ctx: Context){

    }

    fun getUser(ctx: Context){

    }

    fun toggleFollow(ctx: Context){

    }
}