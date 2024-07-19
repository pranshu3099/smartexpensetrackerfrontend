export const authmethod = localStorage.getItem("authmethod");
export const userData = JSON.parse(localStorage.getItem("userdata"));
export const bearer = localStorage.getItem("Bearer");
export const getCategory = (target, lastTag, setLastTag) => {
  if (lastTag !== "") {
    lastTag.style.textDecoration = "none";
  }
  let finalTag = target;
  if (target.tagName === "IMG") {
    target = target.parentElement;
    const pTag = target.querySelector("p");
    finalTag = pTag;
  }

  setLastTag(finalTag);
  finalTag.style.textDecoration = "underline";
  finalTag.style.textDecorationColor = "gray";
  finalTag.style.textUnderlineOffset = "6px";
  finalTag.style.textDecorationThickness = "5px";

  return finalTag.textContent;
};
