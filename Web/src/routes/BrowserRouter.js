import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeRoute from './home/HomeRoute';
import SearchRoute from './search/SearchRoute';
import TweetRoute from './tweet/TweetRoute';
import Feed from '../components/home/Feed';
import UserRoute from './user/UserRoute';
import UserComponent from '../components/user/UserComponent';
import PrivateRoute from './PrivateRoute.jsx'
import Login from '../components/home/Login';
import TrendingTopicsRoute from './tweet/TrendingTopicsRoute.jsx'
import UsersToFollowRoute from './user/UsersToFollowRoute'
import SearchComponent from '../components/search/SearchComponent';

const Browser = ()=> 
   <BrowserRouter> 
     <Routes>
       <Route path="/login" element={<Login/>}/>
       <Route path="/user/followingTweets" element={<PrivateRoute> <Feed/> </PrivateRoute>}/>
       <Route path="/"  element={<HomeRoute/>}/>
       <Route path="/search/:searchText" element={<PrivateRoute> <SearchComponent/> </PrivateRoute>}/>
       <Route path="/tweet/:tweetId" element={<PrivateRoute> <TweetRoute/> </PrivateRoute>}/>     
       <Route path="/user" element={<PrivateRoute> <UserComponent/> </PrivateRoute>}/> 
       <Route path="user/:userId" element={<PrivateRoute> <UserRoute/> </PrivateRoute>}/>
       <Route path="/trendingTopics" element={<PrivateRoute> <TrendingTopicsRoute/> </PrivateRoute>}/>
       <Route path="/user/usersToFollow" element={<PrivateRoute> <UsersToFollowRoute/> </PrivateRoute>}/>
     </Routes>
   </BrowserRouter>
export default Browser ;

 