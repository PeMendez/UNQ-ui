import Api.TwitterSystem.src.main.kotlin.org.TokenController
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.plugin.bundled.RouteOverviewPlugin
import org.unq.TwitterSystem

fun main() {

    val twitterSystem = TwitterSystem()
    val tokenController = TokenController(twitterSystem.users)
    val userController = UserController(twitterSystem,tokenController)

    val app = Javalin.create() {
        it.defaultContentType = "application/json"
        it.registerPlugin(RouteOverviewPlugin("/routes"))
        it.enableCorsForAllOrigins()
        it.accessManager(tokenController::validate)
    }.start(7070)


    app.before {
        it.header("Access-Control-Expose-Headers", "*")
    }

    app.routes{
        path("/login") {
            post(userController::login, Roles.USER)
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