import { useAppSelector } from "@/app/hooks";

export const getFirstTwoLetter = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const fullName = userInfo.data.user.name.split(" ");
  const firstLetterOfName = fullName[0][0];
  const firstLetterOfFatherName = fullName[1][0];
  return firstLetterOfName.toUpperCase() + firstLetterOfFatherName.toUpperCase();
};
