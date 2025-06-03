"use server";

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import HomeWrapper from "@/components/client/home/home_wrapper";
import { console } from "node:inspector";

const HomePage = async () => {
  const res_hot = await FetchServerGetApiNoToken(API.COURSE.COURSE_HOT+ "?page=0&size=4" );
  const res_newest = await FetchServerGetApiNoToken(API.COURSE.COURSE_NEWEST+ "?page=0&size=4");
 
  
  console.log("NEWEST COURSES:", res_newest);
  let data_hot: CourseCardResponse[] = [];
  let data_newset: CourseCardResponse[] = [];

  if (res_hot.status == 200 && res_hot) {
    data_hot = res_hot.result;
  }
  if (res_newest.status == 200 && res_newest) {
    data_newset = res_newest.result;
  }

  return (
    <>
      <HomeWrapper data_hot={data_hot} data_newest={data_newset} />
    </>
  );
};

export default HomePage;
