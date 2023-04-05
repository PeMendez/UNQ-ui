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

    fun search(ctx: Context) {
        try {
            val query = ctx.queryParam("searchText")
            val searchResult = tweetToSimpleTweet(twitterSystem.search(query!!))
            ctx.json(TweetResulDTO(searchResult))
        } catch (e: Exception) {
            throw BadRequestResponse("The searched text is not found")
        }
    }

    private fun tweetToSimpleTweet(list : List<Tweet>) : List<SimpleTweetDTO> {
        return list.map { t -> SimpleTweetDTO(t) }
    }

    fun getTrendingTopics(ctx: Context){
        val tweetResul = tweetToSimpleTweet(twitterSystem.getTrendingTopics())
        ctx.json(TweetResulDTO(tweetResul))
    }

    fun addNewTweet(ctx: Context){
        val draftTweet = ctx.bodyValidator<DraftTweet>()
            .check({ it.userId.isNotBlank() }, "Content cannot be empty")
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        val tweet = twitterSystem.addNewTweet(draftTweet)
        ctx.json(TweetDTO(tweet))
    }

    fun getTweet(ctx: Context){

        ctx.json(TweetDTO(tweetOrThrow(ctx)))
    }

    fun toggleLike(ctx: Context){
        var tweet = tweetOrThrow(ctx)
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        tweet = twitterSystem.toggleLike(tweet.id, user.id)
        ctx.json(TweetDTO(tweet))

    }

    fun addReTweet(ctx: Context){
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweet = tweetOrThrow(ctx)
        val reTweet = ctx.bodyValidator<DraftReTweet>()
            .check({ it.userId == user.id}, "You can't retweet your own tweet")
            .get()
        tweet = twitterSystem.addReTweet(reTweet)
        ctx.json(TweetDTO(tweet))

    }

    fun replyTweet(ctx: Context){
        val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweet = tweetOrThrow(ctx)
        val content = ctx.bodyValidator<DraftReplyTweet>()
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        tweet = twitterSystem.replyTweet(content)
        ctx.json(TweetDTO(tweet))
    }
}