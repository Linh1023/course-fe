"use server";

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import HomeWrapper from "@/components/client/home/home_wrapper";
import { console } from "node:inspector";

const HomePage = async () => {
  const res_hot = await FetchServerGetApiNoToken(API.COURSE.COURSE_FILTER+ "?sort=hot&page=0&size=4" );
  const res_newest = await FetchServerGetApiNoToken(API.COURSE.COURSE_FILTER + "?sort=newest&page=0&size=4");
 
  
  let data_hot: CourseCardResponse[] = [];
  let data_newset: CourseCardResponse[] = [];

  if (  res_hot && res_hot.status == 200 ) {
    data_hot = res_hot.result;
  }
  if (  res_newest && res_newest.status == 200 ) {
    data_newset = res_newest.result;
  }

  return (
    <>
      <HomeWrapper data_hot={data_hot} data_newest={data_newset} />
    </>
  );
};

export default HomePage;
