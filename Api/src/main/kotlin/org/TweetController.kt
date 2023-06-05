package org

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.bodyValidator
import org.unq.*
import java.time.LocalDateTime


class TweetController(private val twitterSystem: TwitterSystem) {

    fun search(ctx: Context) {

        val query = ctx.queryParam("searchText").orEmpty()
        if (query.isBlank()){
            throw BadRequestResponse("Invalid query")
        }
        val searchResult = tweetToSimpleTweet(twitterSystem.search(query))
        ctx.json(TweetResulDTO(searchResult))
    }

    fun getTrendingTopics(ctx: Context){

        val tweetResul = tweetToSimpleTweet(twitterSystem.getTrendingTopics())

        ctx.json(TweetResulDTO(tweetResul))
    }

    fun addNewTweet(ctx: Context){
        val tweetDTO = ctx.bodyValidator<AddTweetDTO>()
            .check( {it.content.isNotBlank()}, "Content cannot be empty")
            .getOrThrow { throw BadRequestResponse("Content cannot be empty") }
        val user = getUserByAttribute(ctx)
        val draftTweet = createDraftTweet(tweetDTO, user)
        val tweet = twitterSystem.addNewTweet(draftTweet)

        ctx.json(TweetDTO(tweet, isLiked(ctx, tweet)))
    }
    fun getTweet(ctx: Context){
        val tweet = tweetOrThrow(ctx)
        ctx.json(TweetDTO(tweet, isLiked(ctx, tweet)))
    }

    fun toggleLike(ctx: Context){

        var tweet = tweetOrThrow(ctx)
        val user = getUserByAttribute(ctx)
        tweet = twitterSystem.toggleLike(tweet.id, user.id)

        ctx.json(TweetDTO(tweet, isLiked(ctx, tweet)))
    }

    fun addReTweet(ctx: Context){

        val user = getUserByAttribute(ctx)
        var tweet = tweetOrThrow(ctx)
        val reTweetDTO = ctx.bodyValidator<AddReTweetDTO>()
            .check( {it.content.isNotBlank()}, "Content cannot be empty")
            .getOrThrow { throw BadRequestResponse("Content cannot be empty") }
        val reTweet = createDraftReTweet(reTweetDTO, user, tweet)
        try {
            tweet = twitterSystem.addReTweet(reTweet)
            ctx.json(TweetDTO(tweet, isLiked(ctx, tweet)))
        } catch (e: TweetException){
            throw BadRequestResponse("Can not retweet your own tweet")
        }
    }

    fun replyTweet(ctx: Context){

        val user = getUserByAttribute(ctx)
        val originTweet = tweetOrThrow(ctx)
        val replyTweetDTO = ctx.bodyValidator<AddReplyTweetDTO>()
            .check( {it.content.isNotBlank()}, "Content cannot be empty")
            .getOrThrow { throw BadRequestResponse("Content cannot be empty") }
        val draftTweet = createDraftReplyTweet(replyTweetDTO, user, originTweet)
        val tweet = twitterSystem.replyTweet(draftTweet)

        ctx.json(TweetDTO(tweet, isLiked(ctx, tweet)))
    }

    private fun tweetOrThrow(ctx: Context): Tweet {
        try {
            return twitterSystem.getTweet(ctx.pathParam("id"))
        } catch(e: TweetException) {
            throw BadRequestResponse("Tweet not found")
        }
    }

    fun isLiked(ctx: Context, tweetDTO: Tweet): Boolean{
        val user = getUserByAttribute(ctx)
        return tweetDTO.likes.contains(user)
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