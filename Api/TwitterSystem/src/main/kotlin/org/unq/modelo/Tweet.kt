package org.unq.modelo

import java.time.LocalDateTime

open class Tweet(
    val id: String,
    val type: TweetType,
    val user: User,
    val content: String,
    val date: LocalDateTime = LocalDateTime.now(),
    val replies: MutableList<Tweet> = mutableListOf(),
    val reTweets:  MutableList<Tweet> = mutableListOf(),
    val likes: MutableList<User> = mutableListOf(),
)