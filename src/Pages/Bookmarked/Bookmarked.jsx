import React, { useEffect, useState } from 'react'
import './Bookmarked.css'
import logo from '../../assets/logo.png'
import { AiOutlineHeart, AiFillHeart, AiFillCalendar, AiOutlineHome } from 'react-icons/ai'

export default function Bookmarked() {
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
        <div className='b-container'>
            <a href='./home' className='home-icon'><AiOutlineHome/></a>
            <div className='b-title'>Bookmarked Posts</div>
            {articles && articles.map((item) => <>
                <div className='news-card'>
                    <div className='news-imBox'>
                        <img src={item.urlToImage} className='news-img'
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = logo;

                            }}

                        />
                    </div>
                    <div className='news-title'>{item.title}</div>
                    <div className='da-cont'>

                        <div className='news-date'><AiFillCalendar className='calender-icon' />{new Date(item.publishedAt).toDateString()}</div>
                        <div className='news-autor'>
                            Author:
                            <a target={item.author && '_blank'} href={item.author ? 'https://www.google.com/search?q=' + item.author : ''}>
                                {item.author ? item.author : 'Anonymous'}
                            </a>
                        </div>
                    </div>

                    {item.content && <div className='content-ar'>{item.content.slice(-6) == 'chars]' ? item.content.slice(0, -17) + '...' : item.content}</div>}

                    <div className='rm'>
                        <a href={item.url} target='_blank'>Read More...</a>
                    </div>

                </div>


            </>)}
        </div>
    )
}
