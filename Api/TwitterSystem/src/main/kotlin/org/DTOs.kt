package org

import org.unq.Tweet
import org.unq.User

class UserLoginDTO(val username: String, val password: String)
class DraftUserDTO(val usarme: String, val email: String, val password: String, val image: String, val backgroundImage: String)
class SimpleUserDTO(val id: String, val username: String)
class UserDTO(val id: String, val username: String, val email: String, val image: String, val backgroundImage: String,  var followers: List<SimpleUserDTO>, var following: List<SimpleUserDTO>, var tweets: List<SimpleTweetDTO>){
    constructor(user: User) : this(user.id, user.username, user.email, user.image, user.backgroundImage, listOf<SimpleUserDTO>(), listOf<SimpleUserDTO>(), listOf<SimpleTweetDTO>()) {
        this.followers = user.followers.map { f -> SimpleUserDTO(f.id, f.username) }
        this.following = user.following.map { f -> SimpleUserDTO(f.id, f.username) }

    }}

class TwitterTypeDTO(val tweet: SimpleTweetDTO, val image: String?)
class SimpleTweetDTO(val id: String, val type: TwitterTypeDTO, var user: SimpleUserDTO, val content: String, val date: String, val repliesAmount: Int, val reTweetAmount: Int, var likes: List<SimpleUserDTO>)//{
//constructor(tweet: Tweet): this(tweet.id, UserDTO.TwitterTypeDTO(this, null), SimpleUserDTO(tweet.user.id, tweet.user.username), tweet.content, tweet.date.toString(), tweet.replies.count(), tweet.reTweets.count(), listOf<SimpleUserDTO>()){
//  this.likes = tweet.likes.map { l -> SimpleUserDTO(l.id, l.username)}

//}
class TweetDTO(val id: String, val type: TwitterTypeDTO, var user: SimpleUserDTO, val content: String, val date: String, val replies: List<SimpleTweetDTO>, val reTweet: List<SimpleTweetDTO>, val likes: List<SimpleUserDTO>)//{

    //constructor(tweet: Tweet): this(tweet.id, tweet.type, tweet.user, tweet.content, tweet.date, listOf<SimpleTweetDTO>(), listOf<SimpleTweetDTO>(), listOf<SimpleUserDTO>() )
//}
class TweetResulDTO(val result: List<SimpleTweetDTO>)
class UsersResultDTO(val result: List<SimpleTweetDTO>)

class AddTweetDTO(val content: String, val image: String?)
class AddReTweetDTO(val content: String)
class AddReplyTweetDTO(val content: String, val image: String?)
class ErrorDTO(val message: String)

