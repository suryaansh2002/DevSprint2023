import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import Sidenav from '../../Components/SideNav/Sidenav';
import './Home.css'
export default function Home() {
    const [articles, setArticles] = useState([])
    var url = 'https://newsdata.io/api/1/news?apikey=pub_1749158b4447894e481fefd089da75e713eda'
    
    var url2='https://newsdata.io/api/1/news?apikey=pub_1749158b4447894e481fefd089da75e713eda&page=16767944382f68b51653791e2e6020068f413d764f'
    var nextpage;
    url='https://newsapi.org/v2/everything?q=bitcoin&apiKey=d90e1e55f85341acb95ea40b3658f3ca'
    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res.data)
            const arr=[]
            res.data.articles.map((item)=>{
                if(item.urlToImage){
                    arr.push(item)
                }
            })
            // nextpage=res.data.nextpage;
            // url2=url+'&page='+nextpage;
            
      setArticles(arr)
        })
    }, [])
    return (
        <div className='home-container'>
            <div className='sidenav'>
                <div>Filter By:</div>

            </div>
            <div className='home-main'>
                {
                    articles.length>0 && articles.map((item) => (<div className='news-card'>
                        <div>
                            <img src={item.urlToImage || 'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg'} className='news-img' alt="Sorry no image"/>
                        </div>
                        <div className='news-title'>{item.title}</div>
                        <div className='content-ar'>{item.content}</div>
                    </div>)
                    )
                }
            </div>
        </div>

    )
}
