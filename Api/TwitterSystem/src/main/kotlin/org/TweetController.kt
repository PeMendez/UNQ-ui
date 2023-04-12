package org

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.*
import java.time.LocalDateTime


class TweetController(private val twitterSystem: TwitterSystem) {

    fun search(ctx: Context) {
        try {
            val query = ctx.queryParam("searchText")
            val searchResult = tweetToSimpleTweet(twitterSystem.search(query!!))
            ctx.json(TweetResulDTO(searchResult))
        } catch (e: Exception) {
            throw BadRequestResponse("Invalid query")
        }
    }

    fun getTrendingTopics(ctx: Context){
        val tweetResul = tweetToSimpleTweet(twitterSystem.getTrendingTopics())
        ctx.json(TweetResulDTO(tweetResul))
    }

    fun addNewTweet(ctx: Context){
        val tweetDTO = ctx.bodyValidator<AddTweetDTO>()
            //.check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
            if (tweetDTO.content == "") throw BadRequestResponse("Content cannot be empty")
            val user = getUserByAttribute(ctx)
            val draftTweet = createDraftTweet(tweetDTO, user)
            val tweet = twitterSystem.addNewTweet(draftTweet)
            ctx.json(TweetDTO(tweet))
    }
    fun getTweet(ctx: Context){

        ctx.json(TweetDTO(tweetOrThrow(ctx)))
    }

    fun toggleLike(ctx: Context){
        var tweet = tweetOrThrow(ctx)
        val user = getUserByAttribute(ctx)
        tweet = twitterSystem.toggleLike(tweet.id, user.id)
        ctx.json(TweetDTO(tweet))

    }

    fun addReTweet(ctx: Context){
        var user = getUserByAttribute(ctx)
        var tweet = tweetOrThrow(ctx)
        if (ctx.body().isBlank()) throw BadRequestResponse("Body cannot be empty")
        val reTweetDTO = ctx.bodyValidator<AddReTweetDTO>()
            //.check({ it.content.isNotBlank()}, "Content cannot be empty")
            .get()
            if (reTweetDTO.content == "") throw BadRequestResponse("Content cannot be empty")
        val reTweet = createDraftReTweet(reTweetDTO, user, tweet)
        try {
            tweet = twitterSystem.addReTweet(reTweet)
            ctx.json(TweetDTO(tweet))
        } catch (e: Exception){
            throw BadRequestResponse("Can not retweet your own tweet")
        }
    }

    fun replyTweet(ctx: Context){
        var user = getUserByAttribute(ctx)
        val originTweet = tweetOrThrow(ctx)
        if (ctx.body().isBlank()) throw BadRequestResponse("Body cannot be empty")
        val replyTweetDTO = ctx.bodyValidator<AddReplyTweetDTO>()
            //.check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        if (replyTweetDTO.content == "") throw BadRequestResponse("Content cannot be empty")
        val draftTweet = createDraftReplyTweet(replyTweetDTO, user, originTweet)
        val tweet = twitterSystem.replyTweet(draftTweet)
        ctx.json(TweetDTO(tweet))
    }

    private fun tweetOrThrow(ctx: Context): Tweet {
        try {
            return twitterSystem.getTweet(ctx.pathParam("id"))
        } catch(e: TweetException) {
            throw BadRequestResponse("Tweet not found")
        }
    }

    private fun getUserByAttribute(ctx: Context) : User {
        return ctx.attribute<User>("user")!!
    }
    private fun createDraftTweet(tweetDTO: AddTweetDTO, user: User ) : DraftTweet {

        return DraftTweet(user.id, tweetDTO.content, tweetDTO.image, LocalDateTime.now())
    }
    private fun createDraftReTweet(tweetDTO: AddReTweetDTO, user: User, originTweet: Tweet) : DraftReTweet {

        return DraftReTweet(user.id, originTweet.id, tweetDTO.content, LocalDateTime.now())
    }
    private fun createDraftReplyTweet(tweetDTO: AddReplyTweetDTO, user: User, originTweet: Tweet ) : DraftReplyTweet {

        return DraftReplyTweet(user.id, originTweet.id, tweetDTO.content, tweetDTO.image, LocalDateTime.now())
    }
    private fun tweetToSimpleTweet(list : List<Tweet>) : List<SimpleTweetDTO> {
        return list.map { t -> SimpleTweetDTO(t) }
    }

}