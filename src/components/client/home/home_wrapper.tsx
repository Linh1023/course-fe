"use client"

import HomeContent from "./home_content"
interface HomeProps {
    data_hot: CourseCardResponse[];
    data_newest: CourseCardResponse[]; 
    data_my_lesson: CourseCardResponse[];
}

const HomeWrapper = (props:HomeProps) => {

    const { data_hot, data_newest, data_my_lesson } = props;

    

    return (
        <>
            <HomeContent data_hot={data_hot} data_newest = {data_newest}
            data_my_lesson = {data_my_lesson}
            />
        </>
    )
}

export default HomeWrapper  