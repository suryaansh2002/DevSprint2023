import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import Sidenav from '../../Components/SideNav/Sidenav';
import logo from '../../assets/logo.png'
import './Home.css'
export default function Home() {
    const [articles, setArticles] = useState([])
    const [username, setUsername] = useState('')
    const [search, setSearch] = useState('')
    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')

    // const [search, setSearch] = useState('')
 
    
    
   const [url, setUrl] = useState('https://newsapi.org/v2/top-headlines?country=us&apiKey=d90e1e55f85341acb95ea40b3658f3ca')
    useEffect(() => {
        if (!localStorage.getItem('newsprism')) {
            window.location.href = './'
        }
        else {
            setUsername('#'+localStorage.getItem('npusername'))
        }
        axios.get(url).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
    }, [])

    const searchArticles = () => {
        const url2='https://newsapi.org/v2/everything?q='+search+'&apiKey=d90e1e55f85341acb95ea40b3658f3ca'
        axios.get(url2).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
    }

    const searchLang = (lang) =>{
        setLanguage(lang);
        const url2='https://newsapi.org/v2/everything?q='+search+'language='+lang+'&apiKey=d90e1e55f85341acb95ea40b3658f3ca'
        axios.get(url2).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
   
    }
    const sortBy = (param) =>{
        const url2='https://newsapi.org/v2/everything?sortBy='+param+'&apiKey=d90e1e55f85341acb95ea40b3658f3ca'
        axios.get(url2).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
   
    }

    const searchCategory = (cat) =>{
        setCategory(cat)
        const url2='https://newsapi.org/v2/top-headlines?category='+cat+'&apiKey=d90e1e55f85341acb95ea40b3658f3ca'
        axios.get(url2).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
   
    }

    // 

    return (
        <div className='home-container'>
            <div className='sidenav'>
            <div className='un'>
                Your Username:<br/>
                {username}
            </div>
                <div>Filter By:</div>
                <div>
                <div>Language</div>
                    <select onChange={(e)=>searchLang(e.target.value)} >
                        <option value={'en'}>English</option>
                        <option value={'fr'}>French</option>
                        <option value={'es'}>Spanish</option>
                        <option value={'it'}>Italian</option>

                    </select>

                    <div>Sort By</div>
                    <select onChange={(e)=>{sortBy(e.target.value)}}>
                    
                        <option value={'relavency'}>Relavency</option>
                        <option value={'popularity'}>Popularity</option>
                        <option value={'publishedAt'}>Published Date</option>

                    </select>

                    <div>Category</div>
                    <select onChange={(e)=>{searchCategory(e.target.value)}}>
                    
                        <option value={'sports'}>Sports</option>
                        <option value={'business'}>Business</option>
                        <option value={'entertainment'}>Entertainment</option>

                    </select>
                </div>

            </div>
            <div className='home-main'>
            <div className='search-box'>
                <input className='search-inp' onChange={(e)=>{setSearch(e.target.value)}}/>
                <button className='search-btn btn' onClick={()=>{searchArticles()}}>Search</button>
            </div>
                {
                    articles.length > 0 && articles.map((item) => (<div className='news-card'>
                        <div className='news-imBox'>
                            <img src={item.urlToImage} className='news-img'
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = logo;

                                }}

                            />
                        </div>
                        <div className='news-title'>{item.title}</div>
                        {item.content && <div className='content-ar'>{item.content.slice(-6)=='chars]'? item.content.slice(0,-14) :item.content}</div>}
                    </div>)
                    )
                }
            </div>
        </div>

    )
}
