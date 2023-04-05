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
            val query = ctx.queryParam("searchText")
            val searchResult = twitterSystem.search(query!!)
            ctx.json(searchResult)
        } catch (e: Exception) {
            throw BadRequestResponse("The searched text is not found")
        }
    }

    fun getTrendingTopics(ctx: Context){
        tokenController.tokenToUser(ctx.header("Authorization")!!) //usaria validate token porque no necesito el usuario
        val simpleTweetsTrend: List<SimpleTweetDTO> = mutableListOf()
        val tweetResulDTO = twitterSystem.getTrendingTopics().stream()
            .forEach{t -> simpleTweetsTrend.add(SimpleTweetDTO(t))}
        ctx.json(tweetResulDTO)
    }

    fun addNewTweet(ctx: Context){
        tokenController.tokenToUser(ctx.header("Authorization")!!) //usaria validate token porque no necesito el usuario
        val draftTweet = ctx.bodyValidator<DraftTweet>()
            .check({ it.userId.isNotBlank() }, "Content cannot be empty")
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        val tweet = twitterSystem.addNewTweet(draftTweet)
        ctx.json(TweetDTO(tweet))
    }

    fun getTweet(ctx: Context){

        ctx.json(tweetOrThrow(ctx))
    }

    fun toggleLike(ctx: Context){
        var tweet = tweetOrThrow(ctx)
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        tweet = twitterSystem.toggleLike(tweet.id, user.id)
        ctx.json(tweet)

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