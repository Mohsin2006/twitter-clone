import axios from "axios"
import USER_API_END_POINT from "../utils/constant.js"
import { useDispatch } from "react-redux"
import { getOtherUsers } from "../redux/userSlice.js"
import { useEffect } from "react"

const useOtherUsers = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
                    withCredentials: true
                });
                dispatch(getOtherUsers(res.data.otherUsers));
            } catch (error) {
               console.log(error); 
            }
        }

        fetchOtherUsers();

        // Optionally, if you want to return fetchMyProfile for external use:
        return fetchOtherUsers;
    }, [dispatch, id]); // Include dispatch and id in dependency array to ensure useEffect runs when they change
}

export default useOtherUsers;
