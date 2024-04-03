export const useGetInitials = () => {
  const getInitials = (name, surname) => {
    const fullName = [name, surname].filter(Boolean).join(" ");

    const initials = fullName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");

    return initials;
  };

  return { getInitials };
};
