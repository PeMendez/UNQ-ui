package org

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.core.util.RouteOverviewPlugin
import org.unq.initTwitterSystem

fun main() {

    val twitterSystem = initTwitterSystem()
    val tokenController = TokenController(twitterSystem)
    val userController = UserController(twitterSystem,tokenController)
    val tweetController = TweetController(twitterSystem)

    val app = Javalin.create() {
        it.defaultContentType = "application/json"
        it.registerPlugin(RouteOverviewPlugin("/routes"))
        it.enableCorsForAllOrigins()
        it.accessManager(tokenController::validate)
    }.start(7071)


    app.before {
        it.header("Access-Control-Expose-Headers", "*")
    }

    app.routes{
        path("/login") {
            post(userController::login, Roles.ANYONE)
        }
        path("/register") {
            post(userController::register, Roles.ANYONE)
        }

        path("/user") {
            get(userController::getLoguedUser, Roles.USER)
            path("followingTweets"){
                get(userController::getFollowingTweets, Roles.USER)
            }
            path("usersToFollow"){
                get(userController::usersToFollow, Roles.USER)
            }
            path("{id}") {
                get(userController::getUser, Roles.ANYONE)
                path("follow") {
                    put(userController::toggleFollow, Roles.USER)
                }
            }
        }
        path("/search"){
            get(tweetController::search, Roles.USER)
        }
        path("/trendingTopics"){
            get(tweetController::getTrendingTopics, Roles.USER)
        }
        path("/tweet"){
            post(tweetController::addNewTweet, Roles.USER)
            path("{id}"){
                get(tweetController::getTweet, Roles.USER)
                path("like"){
                    put(tweetController::toggleLike, Roles.USER)
                }
                path("retweet"){
                    post(tweetController::addReTweet, Roles.USER)
                }
                path("reply"){
                    post(tweetController::replyTweet, Roles.USER)
                }

            }
        }
    }

}