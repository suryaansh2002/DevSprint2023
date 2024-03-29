import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import Sidenav from '../../Components/SideNav/Sidenav';
import logo from '../../assets/logo.png'
import './Home.css'
import { AiOutlineHeart, AiFillHeart, AiFillCalendar } from 'react-icons/ai'
import { BsBookmark, BsBookmarkFill, BsSearch, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBContainer } from 'mdb-react-ui-kit';
import { GiHamburgerMenu } from 'react-icons/gi'
import {IoLogOutOutline} from 'react-icons/io5'
export default function Home() {
    const [articles, setArticles] = useState([])
    const [username, setUsername] = useState('')
    const [search, setSearch] = useState('')
    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')
    const [filter, setFilter] = useState('')
    const [theme, setTheme] = useState('light')


    const [url, setUrl] = useState('https://newsapi.org/v2/top-headlines?country=us&apiKey=579a2865d9ce4984a18171d4ed2e2b0e')
    useEffect(() => {
        if (!localStorage.getItem('newsprism')) {
            window.location.href = './'
        }
        else {
            setUsername('#' + localStorage.getItem('npusername'))
        }
        axios.get(url).then((res) => {
            console.log(res.data)
            const arr = []
            res.data.articles.map((item) => {
                if (item.urlToImage) {
                    item['Liked'] = false
                    if (JSON.parse(localStorage.getItem('bookmarked')).includes(JSON.stringify(item))) {
                        item['bookmarked'] = true
                    }
                    else {
                        item['bookmarked'] = false

                    }
                    arr.push(item)
                }
            })
            setArticles(arr)
        })
    }, [])

    const searchArticles = () => {
        const url2 = 'https://newsapi.org/v2/everything?q=' + search + '&apiKey=579a2865d9ce4984a18171d4ed2e2b0e'
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

    const searchLang = (lang) => {
        setLanguage(lang);
        const url2 = 'https://newsapi.org/v2/everything?q=' + search + 'language=' + lang + '&apiKey=579a2865d9ce4984a18171d4ed2e2b0e'
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
    const sortBy = (param) => {
        const url2 = 'https://newsapi.org/v2/everything?sortBy=' + param + '&apiKey=579a2865d9ce4984a18171d4ed2e2b0e'
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

    const getNav = () => {
        const navBar = document.getElementById('sidenav')
        if (navBar.style.display == 'block') {
            navBar.style.position = 'static';
            navBar.style.display = 'none';
        }
        else {
            navBar.style.position = 'fixed';
            navBar.style.display = 'block';
        }


    }
    const searchCategory = (cat) => {
        setCategory(cat)
        const url2 = 'https://newsapi.org/v2/top-headlines?category=' + cat + '&apiKey=579a2865d9ce4984a18171d4ed2e2b0e'
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



    return (
        <div className={'home-container'} >
            {theme == 'light' ? <button className='themeBtn' onClick={() => { setTheme('dark') }}><BsFillMoonFill /></button> : <button onClick={() => { setTheme('light') }} className='themeBtn' id={theme == 'dark' && 'themeDark'} >

                <BsFillSunFill />
            </button>}
            <div className='sidenav' id="sidenav">
                <div>
                    <img className="logo-nav" src={logo} />
                </div>
                <div className='un'>
                    WELCOME!<br />
                    {username}
                </div>
                <div className='filters'>
                    <div className='filterBy'>* Filter By:</div>
                    <select placeholder='Filter By' onChange={(e) => { setFilter(e.target.value) }}>
                        <option> -None- </option>
                        <option value={'lang'}>
                            Language
                        </option>
                        <option value={'sort'}>Sort By</option>
                        <option value={'cat'}>Category</option>
                    </select>
                    {filter == 'lang' && <>
                        <select onChange={(e) => searchLang(e.target.value)} >
                            <option value={'en'}>English</option>
                            <option value={'fr'}>French</option>
                            <option value={'es'}>Spanish</option>
                            <option value={'it'}>Italian</option>

                        </select>

                    </>}
                    {filter == 'sort' && <>
                        <select onChange={(e) => { sortBy(e.target.value) }}>

                            <option value={'relavency'}>Relavency</option>
                            <option value={'popularity'}>Popularity</option>
                            <option value={'publishedAt'}>Published Date</option>

                        </select>

                    </>}
                    {filter == 'cat' && <>
                        <select onChange={(e) => { searchCategory(e.target.value) }}>

                            <option value={'sports'}>Sports</option>
                            <option value={'business'}>Business</option>
                            <option value={'entertainment'}>Entertainment</option>

                        </select>

                    </>}

                    <div>


                    </div>
                    <div className='bMarked'>
                        <a href='./bookmarked'>* Bookmarked Posts</a>
                    </div>
                    <div>
                        <button className='logoutBtn' onClick={() => {
                            localStorage.removeItem('newsprism')
                            window.location.href = './';

                        }}>LogOut <IoLogOutOutline/></button>
                    </div>
                </div>
            </div>
              

       
            <div className='home-main'>
            <button className='hamburger' onClick={() => { getNav() }}>
                    <GiHamburgerMenu />

                </button>
                <form onSubmit={(e)=>{e.preventDefault(); searchArticles() }}>
                <div className='search-box'>
                    <input placeholder='Search...' className='search-inp' onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='search-btn btn' type="submit" onClick={() => { searchArticles() }}><BsSearch className='s-icon' /></button>
                </div>
                </form>
                <div className='box'>
                

                    {
                        articles.length > 0 && articles.map((item) => (<>

                            <div className='news-card' id={theme == 'dark' && 'dark-home-search'} >
                                <div className='news-imBox'>
                                    <img src={item.urlToImage} className='news-img'
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = logo;

                                        }}

                                    />
                                </div>
                                <div className='news-title' id={theme == 'dark' && 'search-icon'} >{item.title}</div>
                                <div className='da-cont' id={theme == 'dark' && 'search-icon'}>

                                    <div className='news-date' id={theme == 'dark' && 'search-icon'}><AiFillCalendar id={theme == 'dark' && 'search-icon'} className='calender-icon' />{new Date(item.publishedAt).toDateString()}</div>
                                    <div className='news-autor' id={theme == 'dark' && 'search-icon'}>
                                        Author:
                                        <a target={item.author && '_blank'} id={theme == 'dark' && 'search-icon'} href={item.author ? 'https://www.google.com/search?q=' + item.author : ''}>
                                            {item.author ? item.author : 'Anonymous'}
                                        </a>
                                    </div>
                                </div>
                                {item.content && <div className='content-ar' id={theme == 'dark' && 'search-icon'}>{item.content.slice(-6) == 'chars]' ? item.content.slice(0, -17) + '...' : item.content}</div>}

                                <div className='cards-btnC'>
                                    {item.Liked ?
                                        <button className='likeBtn' onClick={() => {
                                            var items = articles;
                                            items = items.map((a) => {
                                                if (a.url == item.url) {
                                                    console.log('here')
                                                    a.Liked = false;
                                                    console.log(a.Liked)
                                                    return a;
                                                }
                                                return a;
                                            })
                                            console.log(items)
                                            setArticles(
                                                items
                                            )
                                        }}
                                            id={theme == 'dark' && 'search-icon'}
                                        >
                                            <AiFillHeart />
                                        </button>

                                        :
                                        <button className='likeBtn' id={theme == 'dark' && 'search-icon'} onClick={() => {
                                            var items = articles;
                                            items = items.map((a) => {
                                                if (a.url == item.url) {
                                                    console.log('here')
                                                    a.Liked = true;
                                                    console.log(a.Liked)
                                                    return a;
                                                }
                                                return a;
                                            })
                                            console.log(items)
                                            setArticles(
                                                items
                                            )
                                        }}>
                                            <AiOutlineHeart />
                                        </button>
                                    }
                                    <div className='rm'>
                                        <a href={item.url} target='_blank' id={theme == 'dark' && 'search-icon'}>Read More...</a>
                                    </div>
                                    {
                                        item.bookmarked ? <button className='likeBtn' id={theme == 'dark' && 'search-icon'} onClick={() => {
                                            var items = articles;
                                            items = items.map((a) => {
                                                if (a.url == item.url) {
                                                    console.log('here')
                                                    a.bookmarked = false;
                                                    return a;
                                                }
                                                return a;
                                            })
                                            console.log(items)
                                            setArticles(
                                                items
                                            )
                                            var b = JSON.parse(localStorage.getItem('bookmarked'))
                                            b = b.filter((i) => {
                                                return i.url != item.url
                                            })
                                            localStorage.setItem('bookmarked', JSON.stringify(b));

                                        }}>
                                            <BsBookmarkFill />
                                        </button> :
                                            <button id={theme == 'dark' && 'search-icon'} className='likeBtn' onClick={() => {
                                                var items = articles;
                                                items = items.map((a) => {
                                                    if (a.url == item.url) {
                                                        console.log('here')
                                                        a.bookmarked = true;
                                                        return a;
                                                    }
                                                    return a;
                                                })
                                                console.log(items)
                                                setArticles(
                                                    items
                                                )
                                                var b = JSON.parse(localStorage.getItem('bookmarked'))
                                                console.log(b)
                                                b.push(JSON.stringify(item))
                                                localStorage.setItem('bookmarked', JSON.stringify(b));

                                            }}>
                                                <BsBookmark />
                                            </button>
                                    }
                                </div>
                            </div>



                        </>)
                        )
                    }
                </div>

            </div>
        </div>

    )
}
