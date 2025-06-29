import { API_HOST } from "@/utils/env";


const DOCUMENT_API = {
    UP_LOAD: `${API_HOST}/api/document/upload`,
    DOWNLOAD: `${API_HOST}/api/document/download`,
    DOWNLOAD_ASSIGNMENT: `${API_HOST}/api/document/download/assignment`,
    DOWNLOAD_SUBMISSION: `${API_HOST}/api/document/download/submission`,
    DOWNLOAD_DOCUMENT: `${API_HOST}/api/document/download/document`
    
}

export default DOCUMENT_API;