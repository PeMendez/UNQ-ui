package org.unq.modelo

class User(
    val id: String,
    val username: String,
    var email: String,
    var password: String,
    var image: String,
    var backgroundImage: String,
    val following: MutableList<User> = mutableListOf(),
    val followers: MutableList<User> = mutableListOf()
)