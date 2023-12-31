import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { subscribeRealTimeData } from "../firebase/service";


const useRealTimeQuery = <Data>(firebasePath: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = subscribeRealTimeData({
      path: firebasePath,
      callback: (value) => {
        queryClient.setQueryData([firebasePath], value);
      },
    });

    return () => unsubscribe();
  }, [queryClient, firebasePath]);

  return useQuery<Data, Error>({
    queryKey: [firebasePath],
    queryFn: () => new Promise<Data>(() => {}),    
  }) 
};

export default useRealTimeQuery;
