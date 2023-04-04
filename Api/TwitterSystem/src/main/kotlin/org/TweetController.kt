package org

import io.javalin.http.Context
import org.unq.TwitterSystem


class TweetController(private val twitterSystem: TwitterSystem, private val tokenController: TokenController) {

    fun search(ctx: Context){

    }

    fun getTrendingTopics(ctx: Context){
        //falta la autorización
        val trends = twitterSystem.getTrendingTopics()
        ctx.json(trends)
    }

    fun addNewTweet(ctx: Context){
        //

    }

    fun getTweet(ctx: Context){

    }

    fun toggleLike(ctx: Context){

    }

    fun addReTweet(ctx: Context){

    }

    fun replyTweet(ctx: Context){

    }
}