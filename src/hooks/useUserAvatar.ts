import { useState, useEffect } from "react";
import { fetchUserInfo } from "../services/api";

export const useUserAvatar = (username: string) => {
  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserInfo(username);
        if (data && data.data && data.data.icon_img) {
          setAvatar(data.data.icon_img.split("?")[0]);
        }
      } catch (err) {
        console.log("Error fetching user info:", err);
      }
    };
    loadUser();
  }, [username]);

  return avatar;
};
