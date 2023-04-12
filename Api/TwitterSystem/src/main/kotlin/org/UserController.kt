package org

import io.javalin.http.*
import org.unq.*
import java.lang.*

class UserController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController){

    fun login(ctx: Context){
        val userBody = ctx.bodyValidator<UserLoginDTO>().get()
            if (userBody.username == "") throw BadRequestResponse("Username cannot be empty")
            if (userBody.password == "") throw BadRequestResponse("Password cannot be empty")

        val user = twitterSystem.users.find { it.username == userBody.username && it.password == userBody.password}?:
                    throw NotFoundResponse("Invalid username or password")
        ctx.header("Authorization", tokenController.generateToken(user))
        val tweets = getLogedUserTweets(user)

        ctx.json(UserDTO(user, tweets))
    }

    fun register(ctx: Context){
        val userBody = ctx.bodyValidator<DraftUserDTO>().get()
            if (userBody.username == "") throw BadRequestResponse("Username cannot be empty")
            if (userBody.email == "") throw BadRequestResponse("Email cannot be empty")
            if (userBody.password == "") throw BadRequestResponse("Password cannot be empty")
            if (userBody.image == "") throw BadRequestResponse("Image cannot be empty")
            if (userBody.backgroundImage == "") throw BadRequestResponse("Background Image cannot be empty")

        try {
            val user = twitterSystem.addNewUser(draftDTOtoDraft(userBody))
            val tweets = getLogedUserTweets(user)
            ctx.json(UserDTO(user,tweets))
        } catch (e: UserException) {
                throw BadRequestResponse("User already exists")
        }
    }

    fun getLoguedUser(ctx: Context){

        val user = getUserByAttribute(ctx)
        val tweets = getLogedUserTweets(user)

        ctx.json(UserDTO(user,tweets))
    }
    fun getFollowingTweets(ctx: Context){

        var user = getUserByAttribute(ctx)
        var tweets = tweetToSimpleTweet(twitterSystem.getFollowingTweets(user.id))

        ctx.json(TweetResulDTO(tweets))
    }

    fun usersToFollow(ctx: Context){

        var user = getUserByAttribute(ctx)
        var users = userToSimpleUser(twitterSystem.getUsersToFollow(user.id))

        ctx.json(UsersResultDTO(users))
    }

    fun getUser(ctx: Context){

        val user = userOrThrow(ctx)
        val tweets = getLogedUserTweets(user)

        ctx.json(UserDTO(user,tweets))
    }

    fun toggleFollow(ctx: Context){

        var user = getUserByAttribute(ctx)
        val userToFollow = userOrThrow(ctx)
        try {
            user = twitterSystem.toggleFollow(user.id, userToFollow.id)
        } catch (e: UserException){
            throw BadRequestResponse("Can not follow to yourself")
        }
        val tweets = getLogedUserTweets(user)

        ctx.json(UserDTO(user,tweets))
    }

    private fun getLogedUserTweets(user: User): List<Tweet>{

        return twitterSystem.tweets.filter { it.user == user }
    }

    private fun userOrThrow(ctx: Context): User {

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

    private fun getUserByAttribute(ctx: Context) : User {

        return ctx.attribute<User>("user")!!
    }

    private fun draftDTOtoDraft(draftDTO : DraftUserDTO) : DraftUser{

        return DraftUser(draftDTO.username, draftDTO.email, draftDTO.password, draftDTO.image, draftDTO.backgroundImage )
    }
}