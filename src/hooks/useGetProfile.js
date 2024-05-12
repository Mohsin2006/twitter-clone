import axios from "axios"
import USER_API_END_POINT from "../utils/constant.js"
import { useDispatch } from "react-redux"
import { getMyProfile } from "../redux/userSlice.js"
import { useEffect } from "react"

const useGetProfile = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                    withCredentials: true
                });
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
               console.log(error); 
            }
        }

        fetchMyProfile();

        // Optionally, if you want to return fetchMyProfile for external use:
        return fetchMyProfile;
    }, [dispatch, id]); // Include dispatch and id in dependency array to ensure useEffect runs when they change
}

export default useGetProfile;
