package org

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import org.unq.*


class TweetController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController) {

    private fun tweetOrThrow(ctx: Context): Tweet {
        try {
            return twitterSystem.getTweet(ctx.pathParam("id"))
        } catch(e: TweetException) {
            throw NotFoundResponse("Tweet not found")
        }
    }

    private fun tweetOrThrowBySameId(ctx: Context) { // no sé acá tiré cualquiera.
      val tweet = twitterSystem.getTweet(ctx.pathParam("id"))
        val user =  tokenController.tokenToUser(ctx.header("Authorization")!!)
        if (tweet.user.id == user.id) {
            throw NotFoundResponse("No podés hacer retweet de tu propio tweet")
        }
    }
    fun search(ctx: Context) {
        try {
            val text = ctx.pathParam("searchText")
            val searchResult = twitterSystem.search(text!!)
            ctx.json(searchResult)
        } catch (e: Exception) {
            throw BadRequestResponse("The searched text is not found")
        }
    }

    fun getTrendingTopics(ctx: Context){
        //falta la autorización
        val trends = twitterSystem.getTrendingTopics()
        ctx.json(trends)
    }

    fun addNewTweet(ctx: Context){
        //le falta la autorización
        val user =  tokenController.tokenToUser(ctx.header("Authorization")!!)
        //val tweet = twitterSystem.addNewTweet(ctx.)

    }

    fun getTweet(ctx: Context){

    }

    fun toggleLike(ctx: Context){

    }

    fun addReTweet(ctx: Context){
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweet = tweetOrThrow(ctx)
        val reTweet = ctx.bodyValidator<DraftReTweet>()
            .check({ it.userId == user.id}, "You can't retweet your own tweet")
            .get()
        tweet = twitterSystem.addReTweet(reTweet)
        ctx.json(tweet)

    }

    fun replyTweet(ctx: Context){
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweet = tweetOrThrow(ctx)
        val content = ctx.bodyValidator<DraftReplyTweet>()
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        tweet = twitterSystem.replyTweet(content)
        ctx.json(tweet)
    }
}