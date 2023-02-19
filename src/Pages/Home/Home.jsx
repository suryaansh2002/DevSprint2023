import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';

export default function Home() {
    const url='https://newsdata.io/api/1/news?apikey=pub_1749158b4447894e481fefd089da75e713eda'
    useEffect(() => {
        axios.get(url+'&lang=en').then((res) => {
            console.log(res.data.results)
        })
    }, [])
    return (
        <div>
            <Navbar />

        </div>
    )
}
