"use client"

import HomeContent from "./home_content"
interface HomeProps {
    data_hot: CourseCardResponse[];
    data_newest: CourseCardResponse[]; 
}

const HomeWrapper = (props:HomeProps) => {

    const { data_hot, data_newest } = props;
    console.log("data_hot", data_hot);
    console.log("data_newest", data_newest);
    

    return (
        <>
            <HomeContent data_hot={data_hot} data_newest = {data_newest}/>
        </>
    )
}

export default HomeWrapper  