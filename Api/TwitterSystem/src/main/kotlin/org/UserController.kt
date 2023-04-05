package org

import io.javalin.http.*
import org.unq.*
import java.lang.Exception

class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){

    fun login(ctx: Context){
        //falta bad request
        val userBody = ctx.bodyValidator<UserLoginDTO>()
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.password.isNotBlank() },"Password cannot be empty")
            .get()
        val user = twitterSystem.users.find { it.username == userBody.username && it.password == userBody.password}?: throw BadRequestResponse("Usuario no encontrado")
        ctx.header("Authenticator", tokenController.generateToken(user))
        val tweets = twitterSystem.tweets.filter { it.user == user }
        ctx.json(UserDTO(user, tweets))
    }

    fun register(ctx: Context){
        val userBody = ctx.bodyValidator<DraftUser>()
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.email.isNotBlank() }, "Email cannot be empty")
            .check({ it.password.isNotBlank() },"Password cannot be empty")
            .get()
        try {
            val user = twitterSystem.addNewUser(userBody)
            //ctx.json(UserDTO(user))
        } catch (e: UserException) {
                throw UserException("El usuario ya existe")
        }

    }

    fun getLoguedUser(ctx: Context){
        val user = ctx.attribute<User>("user")!!
        //ctx.json(UserDTO(user))
    }
    fun getFollowingTweets(ctx: Context){
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweets = tweetToSimpleTweet(twitterSystem.getFollowingTweets(user.id))
        ctx.json(TweetResulDTO(tweets))
    }

    fun usersToFollow(ctx: Context){
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var users = userToSimpleUser(twitterSystem.getUsersToFollow(user.id))
        ctx.json(UsersResultDTO(users))
    }

    fun getUser(ctx: Context){
        val user = userOrThrow(ctx)
        //ctx.json(UserDTO(user))
    }

    fun toggleFollow(ctx: Context){
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        val userToFollow = userOrThrow(ctx)
        user = twitterSystem.toggleFollow(user.id, userToFollow.id)
        //ctx.json(UserDTO(user))
    }

    private fun userOrThrow(ctx: Context): User {// replicar con atribute
        try{
            return twitterSystem.getUser(ctx.pathParam("id"))
        } catch (e: Exception){
            throw NotFoundResponse("User with given id not found")
        }
    }
    private fun tweetToSimpleTweet(list : List<Tweet>) : List<SimpleTweetDTO> {
        return list.map { t -> SimpleTweetDTO(t) }
    }

    private fun userToSimpleUser(list : List<User>) : List<SimpleUserDTO> {
        return list.map { u -> SimpleUserDTO(u.id, u.username) }
    }
}