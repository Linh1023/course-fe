
import { FetchServerGetApi, FetchServerGetApiNoRediect, FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import HomeWrapper from "@/components/client/home/home_wrapper";
import MyConnect from "@/components/client/share/MyConnect";
import { RandomQueryProvider } from "@/context/random_query_context";

export const dynamic = 'force-dynamic'

export default async function HomePage  ()  {
  const res_hot = await FetchServerGetApiNoToken(API.COURSE.COURSE_FILTER + "?sort=hot&page=1&size=4");
  const res_newest = await FetchServerGetApiNoToken(API.COURSE.COURSE_FILTER + "?sort=newest&page=1&size=4");
  const res_my_lesson = await FetchServerGetApiNoRediect(`${API.ACCOUNT.MY_COURSE}?perPage=3`);


  let data_hot: CourseCardResponse[] = [];
  let data_newset: CourseCardResponse[] = [];
  let data_my_lesson: CourseCardResponse[] = []




  if (res_hot && res_hot.status == 200) {
    data_hot = res_hot.result;
  }
  if (res_newest && res_newest.status == 200) {
    data_newset = res_newest.result;
  }

  if (res_my_lesson && res_my_lesson.status == 200) {
    data_my_lesson = res_my_lesson.result;
  }
  // const randomQuery = Math.random().toString(36).substring(8)


  return (
    <>
      {/* <RandomQueryProvider value={randomQuery} > */}
        <HomeWrapper data_hot={data_hot} data_newest={data_newset}
          data_my_lesson={data_my_lesson}
        />
        <MyConnect />
      {/* </RandomQueryProvider> */}

    </>
  );
};

