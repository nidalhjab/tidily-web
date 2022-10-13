import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../graphql/Queries";

interface UserInfo {
    whoAmI: {
        id: number,
        email: string,
        name: string,
        phone: string,
        img_file: string | ArrayBuffer | null

    };
}
export const useMe = () => {
    const { error, loading, data } = useQuery<UserInfo>(GET_USER_INFO);
    return {
        error, loading, userInfo: { ...data?.whoAmI }
    }

};
