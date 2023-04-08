package org

import io.javalin.http.*
import org.unq.*
import java.lang.Exception

class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){

    fun login(ctx: Context){
        val userBody = ctx.bodyValidator<UserLoginDTO>()
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.password.isNotBlank() },"Password cannot be empty")
            .get()
        val user = twitterSystem.users.find { it.username == userBody.username && it.password == userBody.password}?:
                    throw BadRequestResponse("Invalid username or password")
        ctx.header("Authenticator", tokenController.generateToken(user))
        val tweets = getLogedUserTweets(user)
        ctx.json(UserDTO(user, tweets))
    }

    fun register(ctx: Context){
        val userBody = ctx.bodyValidator<DraftUser>()//No sabemos si es lo mismo usar el DTO o no.
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.email.isNotBlank() }, "Email cannot be empty")
            .check({ it.password.isNotBlank() },"Password cannot be empty")
            .get()
        try {
            val user = twitterSystem.addNewUser(userBody)
            val tweets = getLogedUserTweets(user)
            ctx.json(UserDTO(user,tweets))
        } catch (e: UserException) {  //No lanza bien el error.
                throw UserException("User already exists")
        }

    }

    fun getLoguedUser(ctx: Context){
        //val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        val user = ctx.attribute<User>("user")!!
        val tweets = getLogedUserTweets(user)
        ctx.json(UserDTO(user,tweets))
    }
    fun getFollowingTweets(ctx: Context){
        //var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var user = userOrThrow(ctx)
        var tweets = tweetToSimpleTweet(twitterSystem.getFollowingTweets(user.id))
        ctx.json(TweetResulDTO(tweets))
    }

    fun usersToFollow(ctx: Context){
        //var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var user = userOrThrow(ctx)
        var users = userToSimpleUser(twitterSystem.getUsersToFollow(user.id))
        ctx.json(UsersResultDTO(users))
    }

    fun getUser(ctx: Context){
        val user = userOrThrow(ctx)
        val tweets = getLogedUserTweets(user)
        ctx.json(UserDTO(user,tweets))
    }

    fun getLogedUserTweets(user: User): List<Tweet>{
        return twitterSystem.tweets.filter { it.user == user }
    }

    fun toggleFollow(ctx: Context){
        //var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var user = userOrThrow(ctx)
        val userToFollow = userOrThrow(ctx)
        user = twitterSystem.toggleFollow(user.id, userToFollow.id)
        val tweets = getLogedUserTweets(user)
        ctx.json(UserDTO(user,tweets))
    }

    private fun userOrThrow(ctx: Context): User {// replicar con atribute
        try{
            //return twitterSystem.getUser(ctx.pathParam("id"))
            return twitterSystem.getUser(ctx.attribute<User>("user")!!.id)
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