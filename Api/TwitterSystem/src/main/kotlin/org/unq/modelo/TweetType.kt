package org.unq.modelo

open class TweetType(val tweet: Tweet?, val image: String?) {
    open fun isReTweet(): Boolean{ TODO()
    }
    open fun isReplayTweet(): Boolean{TODO()}
    open fun isNormalTweet(): Boolean{TODO()}
}

class ReTweet(tweet: Tweet) : TweetType(tweet, null)

class ReplayTweet(image: String?, tweet: Tweet): TweetType(tweet, image)

class NormalTweet(image: String?): TweetType(null, image)