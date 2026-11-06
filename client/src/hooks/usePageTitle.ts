import { useEffect } from "react";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title}・關西六日` : "關西六日・和歌山與京都紅葉";
  }, [title]);
}
