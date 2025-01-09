import { useQuery } from "@tanstack/react-query";
import { getUserListAction } from "./user.action";

export const useUserList = (id: number) => {
    return useQuery({
        queryKey: ['user-list', id],
        queryFn: () => getUserListAction(id),
        enabled: !!id,
    });
};