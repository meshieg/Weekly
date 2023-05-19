import axios from "axios";
// import { ITaskEntity } from "../utils/types";

const tagPrefix = `${process.env.REACT_APP_BACKEND_URL}/tag`;

export class TagService {

    static getAllTagsByUser = async (): Promise<ITag[]> => {
        const url = `${tagPrefix}/all-by-user`;
        return await axios.get(url)
            .then(res => {
                console.log(res.data)
                return res.data as ITag[]
                // return res.data.map((tags: ITag) => {
                //     return {

                //     } as ITag;
                // })
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}