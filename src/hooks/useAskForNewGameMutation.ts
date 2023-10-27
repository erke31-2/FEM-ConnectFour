import { useMutation } from "@tanstack/react-query"
import { askForNewGame } from "../firebase/service"
import { toast } from "sonner"

const useAskForNewGameMutation = () => {
  return (
    useMutation<void, Error, {path: string, playerId: number}>({
        mutationFn: async ({path, playerId}) => askForNewGame({path, playerId}),
        onSuccess: () => {
            toast.success("Request has sent!")
        }
    })
  )
}
export default useAskForNewGameMutation