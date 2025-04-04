import { SetuParams, SetuResponse } from "@/types/setu";
import axios from "axios";


export async function getSetu(parm: SetuParams) {
    const response = await axios.post("/api/setu", parm, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data: SetuResponse = response.data as SetuResponse;
    if (data.error || !data.data) {
        throw new Error(data.error);
    }
    return data.data;
}