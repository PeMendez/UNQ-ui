import Search from '../../components/search/SearchComponent';
import {useSearchParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Api from '../../api/Api';

const  SearchRoute = () => {
  const [params] = useSearchParams()
  const searchText = params.get('searchText')
  const [result, setResult] = useState([])
  
  useEffect(() => {
    Api.getSearch(searchText)
      .then((data) => setResult(data))
  }, [searchText])
  return (
    Search(result)
  )
} 

export default SearchRoute;