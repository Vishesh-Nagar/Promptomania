'use client';
 
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data, handleTagClick})=>{ 
  return(
    <div className='mt-16 prompt_layout'>
        {data.map((post)=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            />
        ))}
    </div>
  )
}

const Feed = () => {

  const [allPosts, setAllPosts] = useState([])


    // search states

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null); 
  const [searchedResults, setSearchedResults] = useState([])
  


  const fetchPosts = async ()=> {
    const response = await fetch('/api/prompt', {cache:'no-store'})
    const data = await response.json();

    setAllPosts(data)
    
  }

  useEffect(() => { 
    fetchPosts()
  
  }, []);
   


  const filterPrompts = (searchText)=>{ 
    const regex = new RegExp(searchText, 'i');

    return allPosts.filter((item) => 
    regex.test(item.creator.username) || 
      regex.test(item.tag) || 
      regex.test(item.prompt)
    )
  }


  const handleSearchChange = (e)=>{
    clearTimeout(searchTimeout); 
    setSearchText(e.target.value);

    
    setSearchTimeout(
      setTimeout(()=>{ 
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult); 
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    
    setSearchText(tagName);
       

    const searchResult = filterPrompts(tagName); 

    setSearchedResults(searchResult); 

  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          />
      </form>

      {searchText ? (
        <PromptCardList
      data={searchedResults}
      handleTagClick={handleTagClick}
      />) : (
        <PromptCardList data= {allPosts} handleTagClick={handleTagClick}/>
      )}
    </section>  
  )
}

export default Feed
