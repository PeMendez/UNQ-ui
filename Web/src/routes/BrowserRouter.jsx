import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeRoute from './home/HomeRoute';
import TweetRoute from './tweet/TweetRoute';
import Feed from '../components/home/Feed';
import UserRoute from './user/UserRoute';
import UserComponent from '../components/user/UserComponent';
import PrivateRoute from './PrivateRoute.jsx'
import Login from '../components/home/Login';
import SearchComponent from '../components/search/SearchComponent';
import TrendingTopics from '../components/tweet/TrendingTopics';
import UsersToFollow from '../components/user/UsersToFollow';
import NotFoundPage from '../components/home/NotFoundPage';

const Browser = ()=> 
   <BrowserRouter> 
   <Routes>
     <Route path="/">
       <Route index element={<HomeRoute/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/user">
         <Route index element={<PrivateRoute> <UserComponent/> </PrivateRoute>} />
         <Route path="usersToFollow" element={<PrivateRoute> <UsersToFollow/> </PrivateRoute>} />
         <Route path="followingTweets" element={<PrivateRoute> <Feed/> </PrivateRoute>} />
         <Route path=":userId" element={<PrivateRoute> <UserRoute/> </PrivateRoute>} />
       </Route>
       <Route path="/search/:searchText" element={<PrivateRoute> <SearchComponent/> </PrivateRoute>} />
       <Route path="/tweet/:tweetId" element={<PrivateRoute> <TweetRoute/> </PrivateRoute>} />       
       <Route path="/trendingTopics" element={<PrivateRoute> <TrendingTopics/> </PrivateRoute>} />
       <Route path="*" element={<NotFoundPage/>} />
     </Route>
   </Routes>
 </BrowserRouter>
export default Browser ;

 