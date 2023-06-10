import { AxiosInstance } from "../config/axios";

const tagPrefix = `${process.env.REACT_APP_BACKEND_URL}/tag`;

export class TagService {
  static getAllTagsByUser = async (): Promise<ITag[]> => {
    const url = `${tagPrefix}/all-by-user`;
    return await AxiosInstance.get(url)
      .then((res) => {
        return res.data as ITag[];
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static addTag = async (newTag: ITag) => {
    const url = `${tagPrefix}/add`;
    return await AxiosInstance.post(url, { tag: newTag })
      .then((res) => {
        return res.data as ITag;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static deleteTag = async (tagId: number) => {
    const url = `${tagPrefix}/delete/${tagId}`;
    return AxiosInstance.put(url)
      .then((res) => {
        if (res.data) {
          console.log("tag deleted successfully");
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static updateTag = async (updatedTag: ITag): Promise<ITag | void> => {
    const url = `${tagPrefix}/update/${updatedTag.id}`;
    return AxiosInstance.put(url, {
      tag: updatedTag,
    })
      .then((res) => {
        return {
          ...res.data,
        } as ITag;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
}
