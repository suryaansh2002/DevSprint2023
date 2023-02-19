import React, { useEffect, useState } from 'react'
import './Bookmarked.css'
import logo from '../../assets/logo.png'
import { BsBookmark, BsBookmarkFill, BsSearch, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import { AiOutlineHeart, AiFillHeart, AiFillCalendar, AiOutlineHome } from 'react-icons/ai'

export default function Bookmarked() {
    const [theme, setTheme] = useState('light')
    const [articles, setArticles] = useState([])
    useEffect(() => {
        var a = JSON.parse(localStorage.getItem('bookmarked'))
        console.log(a)
        var b = []
        a.map((s) => (b.push(JSON.parse(s))))
        console.log(b)

        setArticles(b)
    }, [])
    return (
        <div className='b-container' id={theme == 'dark' && 'dark-home-container'}>
            {theme == 'light' ? <button className='themeBtn2' onClick={() => { setTheme('dark') }}><BsFillMoonFill /></button> : <button onClick={() => { setTheme('light') }} className='themeBtn2' id={theme == 'dark' && 'themeDark'} >

                <BsFillSunFill />
            </button>}

            <div className='top' id={theme == 'dark' && 'dark-home-container'}></div>
            <a href='./home' className='home-icon' id={theme == 'dark' && 'themeDark'}><AiOutlineHome /></a>
            <div className='b-title' id={theme == 'dark' && 'themeDark'}>Bookmarked Posts</div>
            {articles && articles.map((item) => <>
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

                    <div className='rm'>
                        <a href={item.url} target='_blank' id={theme == 'dark' && 'search-icon'}>Read More...</a>
                    </div>

                </div>


            </>)}
        </div>
    )
}
