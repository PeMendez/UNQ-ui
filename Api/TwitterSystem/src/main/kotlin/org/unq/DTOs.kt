package org.unq


class UserLoginDTO(val username: String, val password: String)
class DraftUserDTO(val usarme: String, val email: String, val password: String, val image: String, val backgroundImage: String)
class SimpleUserDTO(val id: String, val username: String)
class UserDTO(val id: String, val username: String, val email: String, val image: String, val backgroundImage: String,  var followers: List<SimpleUserDTO>, var following: List<SimpleUserDTO>, var tweets: List<SimpleTweetDTO>)

class TwitterTypeDTO(val tweet: SimpleTweetDTO, val image: String?)
class SimpleTweetDTO(val id: String, val type: TwitterTypeDTO,  var user: SimpleUserDTO, val content: String, val date: String, val repliesAmount: Integer, val reTweetAmount: Integer, val likes: List<SimpleUserDTO>)
class TweetDTO(val id: String, val type: TwitterTypeDTO, var user: SimpleUserDTO, val content: String, val date: String, val replies: List<SimpleTweetDTO>, val reTweet: List<SimpleTweetDTO>, val likes: List<SimpleUserDTO>)

class TweetResulDTO(val result: List<SimpleTweetDTO>)
class UsersResultDTO(val result: List<SimpleTweetDTO>)

class AddTweetDTO(val content: String, val image: String?)
class AddReTweetDTO(val content: String)
class AddReplyTweetDTO(val content: String, val image: String?)
class ErrorDTO(val message: String)