function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export { getInitials };
