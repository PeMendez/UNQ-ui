package org.unq

class TwitterSystem {
    val users = mutableListOf<User>()
    val tweets = mutableListOf<Tweet>()

    /**
     * Crea un usuario nuevo.
     * @throws UserException
     *   El email se encuentra repetido.
     *   El username se encuentra repetido.
     *
     */
    fun addNewUser(user: DraftUser): User{
        TODO()
    }

    /**
     * Crea un nuevo tweet.
     * @throws UserException
     *  si el userId no existe.
     */
    fun addNewTweet(tweet: DraftTweet): Tweet{
        TODO()
    }

    /**
     * Devuelve el tweet con el id de tweetId.
     *
     * @throws UserException
     *  si el userId no existe.
     * @throws TweetException
     *  si el tweetId no existe.
     *  si el tweetId pertenece al mismo usuario.
     */
    fun addReTweet(tweet: DraftReTweet): Tweet{
        TODO()
    }

    /**
     * Devuelve el tweet con el id de tweetId.
     *
     * @throws UserException
     *  si el userId no existe.
     * @throws TweetException
     *  si el tweetId no existe.
     */
    fun replyTweet(tweet: DraftReplyTweet): Tweet{
        TODO()
    }

    /**
     * Devuelve el tweet con el id de tweetId.
     *
     * @throws UserException
     *  si el userId no existe.
     * @throws TweetException
     *  si el tweetId no existe.
     */
    fun addLike(tweetId: String, userId: String): Tweet{
        TODO()
    }

    /**
     * Devuelve al usuario con el id userId
     *
     * @throws UserException
     *  si el userId o el userToFollowingId no existe.
     */
    fun toggleFollow(userId: String, userToFollowingId: String): User {
        TODO()
    }

    /**
     * Devuelve la lista de tweets donde el content contenga el `text`
     */
    fun search(text: String): List<Tweet> {
        TODO()
    }

    /**
     * Devuelve una lista de tweets de los usuarios que el userId sigue
     * @throws UserException
     *  si el userId no existe.
     */
    fun getFollowingTweets(userId: String): List<Tweet> {
        TODO()
    }

    /**
     * Devuelve los usuarios con mas seguidores que no siga el usuario con el userId
     * @throws UserException
     *  si el userId no existe.
     */
    fun getUsersToFollow(userId: String): List<User> {
        TODO()
    }

    /**
     * Devuelve los post que tengan mas likes
     */
    fun getTrendingTopics(): List<Tweet> {
        TODO()
    }

    /**
     * Devuelve el usuario con el userId
     * @throws UserException
     *  si el userId no existe.
     */
    fun getUser(userId: String): User {
        TODO()
    }

    /**
     * Devuelve el tweet con el tweetId
     * @throws TweetException
     *  si el tweetId no existe.
     */
    fun getTweet(tweetId: String): Tweet {
        TODO()
    }
}