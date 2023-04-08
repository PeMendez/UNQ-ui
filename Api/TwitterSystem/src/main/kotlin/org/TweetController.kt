package org

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import org.unq.*
import java.time.LocalDateTime


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
        val tweetDTO = ctx.bodyValidator<AddTweetDTO>()
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        try {
            val user = tokenController.tokenToUser(ctx.header("Authorization")!!)
            val draftTweet = createDraftTweet(tweetDTO, user)
            val tweet = twitterSystem.addNewTweet(draftTweet)
            ctx.json(TweetDTO(tweet))
        } catch (e: Exception){
            throw UserException("User don´t exists")
        }

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
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        var tweet = tweetOrThrow(ctx)
        val reTweetDTO = ctx.bodyValidator<AddReTweetDTO>()
            .check({ it.content.isNotBlank()}, "Content cannot be empty")
            .get()
        val reTweet = createDraftReTweet(reTweetDTO, user, tweet)
        tweet = twitterSystem.addReTweet(reTweet)
        ctx.json(TweetDTO(tweet))

    }

    fun replyTweet(ctx: Context){//replantear
        var user = tokenController.tokenToUser(ctx.header("Authorization")!!)
        val originTweet = tweetOrThrow(ctx)
        val replyTweetDTO = ctx.bodyValidator<AddReplyTweetDTO>()
            .check({ it.content.isNotBlank() }, "Content cannot be empty")
            .get()
        val draftTweet = createDraftReplyTweet(replyTweetDTO, user, originTweet)
        val tweet = twitterSystem.replyTweet(draftTweet)
        ctx.json(TweetDTO(tweet))
    }
}