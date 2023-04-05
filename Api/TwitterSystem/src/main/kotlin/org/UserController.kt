package org

import io.javalin.http.*
import org.unq.*
import java.lang.Exception

class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){

    fun login(ctx: Context){
        //falta bad request
        val userBody = ctx.bodyValidator<UserLoginDTO>().get()
        val user = twitterSystem.users.find { it.username == userBody.username && it.password == userBody.password}?: throw UserException("Usuario no encontrado")
        ctx.header("Authenticator", tokenController.generateToken(user))
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
        var tweets = tweetToSimpleTweet(twitterSystem.getFollowingTweets(user.id))
        ctx.json(TweetResulDTO(tweets))
    }
    private fun tweetToSimpleTweet(list : List<Tweet>) : List<SimpleTweetDTO> {
        return list.map { t -> SimpleTweetDTO(t) }
    }

    fun register(ctx: Context){

    }

    private fun userToSimpleUser(list : List<User>) : List<SimpleUserDTO> {
        return list.map { u -> SimpleUserDTO(u.id, u.username) }
    }
    fun usersToFollow(ctx: Context){
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var users = userToSimpleUser(twitterSystem.getUsersToFollow(user.id))
        ctx.json(UsersResultDTO(users))
    }

    fun getUser(ctx: Context){
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        ctx.json(UserDTO(user))
    }

    fun toggleFollow(ctx: Context){

    }
}