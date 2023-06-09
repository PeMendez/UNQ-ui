package org

import org.unq.*

class UserLoginDTO(val username: String, val password: String)
class DraftUserDTO(val username: String, val email: String, val password: String, val image: String, val backgroundImage: String)
class SimpleUserDTO(val id: String, val username: String, val image: String)
class UserDTO(val id: String, val username: String, val email: String, val image: String, val backgroundImage: String,  var followers: List<SimpleUserDTO>, var following: List<SimpleUserDTO>, var tweets: List<SimpleTweetDTO>){
    constructor(user: User, tweets: List<Tweet>) : this(user.id, user.username, user.email, user.image, user.backgroundImage, listOf<SimpleUserDTO>(), listOf<SimpleUserDTO>(), listOf<SimpleTweetDTO>()) {
        this.followers = user.followers.map { f -> SimpleUserDTO(f.id, f.username, f.image) }
        this.following = user.following.map { f -> SimpleUserDTO(f.id, f.username, f.image) }
        this.tweets = tweets.map { t ->  SimpleTweetDTO(t)}

    }}

class TwitterTypeDTO(tweetType: TweetType) {
    val image = tweetType.image
    val tweet = if (tweetType.tweet == null) null else SimpleTweetDTO(tweetType.tweet!!)

}
class SimpleTweetDTO(val id: String, val type: TwitterTypeDTO, val typeAsString: String,  var user: SimpleUserDTO, val content: String, val date: String, val repliesAmount: Int, val reTweetAmount: Int, var likes: List<SimpleUserDTO>){
    constructor(tweet: Tweet): this(tweet.id, TwitterTypeDTO(tweet.type), typeAsString(tweet.type), SimpleUserDTO(tweet.user.id, tweet.user.username, tweet.user.image), tweet.content, tweet.date.toString(), tweet.replies.size, tweet.reTweets.size, listOf<SimpleUserDTO>()){
        this.likes = tweet.likes.map { l -> SimpleUserDTO(l.id, l.username, l.image) }
    }
}
class TweetDTO(val id: String, val isLiked: Boolean, val type: TwitterTypeDTO,val typeAsString: String, var user: SimpleUserDTO, val content: String, val date: String, var replies: List<SimpleTweetDTO>, var reTweet: List<SimpleTweetDTO>, var likes: List<SimpleUserDTO>){
    constructor(tweet: Tweet, isLike: Boolean): this(tweet.id,
                                    isLike,
                                    TwitterTypeDTO(
                                        tweet.type),
                                    typeAsString(tweet.type),
                                    SimpleUserDTO(
                                        tweet.user.id,
                                        tweet.user.username,
                                        tweet.user.image),
                                    tweet.content,
                                    tweet.date.toString(),
                                    listOf<SimpleTweetDTO>(),
                                    listOf<SimpleTweetDTO>(),
                                    listOf<SimpleUserDTO>()){
        this.reTweet = tweet.reTweets.map { r -> SimpleTweetDTO(r) }
        this.replies = tweet.replies.map { r -> SimpleTweetDTO(r) }
        this.likes = tweet.likes.map { l -> SimpleUserDTO(l.id, l.username, l.image)}
}}
class TweetResulDTO(val result: List<SimpleTweetDTO>)
class UsersResultDTO(val result: List<SimpleUserDTO>)

class AddTweetDTO(val content: String, val image: String?)
class AddReTweetDTO(val content: String)
class AddReplyTweetDTO(val content: String, val image: String?)
class ErrorDTO(val message: String)

fun typeAsString(type: TweetType): String{
    return if(type.isReTweet()){
        "ReTweet"
    } else if (type.isReplayTweet()){
        "Reply"
    } else {
        "NormalTweet"
    }
}
