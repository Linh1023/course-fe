import { FetchServerGetApi} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { columns } from "@/components/admin/comment/table/columns";
import { DataTable } from "@/components/admin/comment/table/data_table";
import { CommentResponse } from "@/types/response/comment_response";
async function getData(): Promise<CommentResponse[]> {
  const res = await FetchServerGetApi(API.COMMENT.ADMIN_LIST_COMMENT);
  console.log("res >>> ", res);
 if (res && res.status === 200) {
    return  res.result;
    //  console.log("currentAccount >>> ", currentAccount)
  }
  else {
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
