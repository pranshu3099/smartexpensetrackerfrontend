import { imageData } from "../../src/carouseldata/data";
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

export const getDate = (date) => {
  const dateTimeString = date;
  const new_date = new Date(dateTimeString);

  const day = new_date.getUTCDate();
  const month = new_date.toLocaleString("en-US", { month: "long" });
  const year = new_date.getUTCFullYear().toString().slice(-2);

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export const getImage = (category) => {
  const filteredImageData = imageData.filter((data) => {
    return data?.category === category;
  });
  return filteredImageData[0]?.src;
};

export const getTimeStamp = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  } ${ampm}`;

  return timeString;
};

export const getMonthAndYear = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { month, year };
};

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const GetMonthlyExpenseData = (data) => {
  if (data.length) {
    const data_obj = data[0];
    const { expenses_data } = data_obj;
    const obj = {};
    const result = new Array(12).fill(0);
    expenses_data.forEach((data) => {
      const { amount, month } = data;
      if (obj.hasOwnProperty(month)) {
        const prev_amount = obj[month];
        const new_amount = Number(amount) + Number(prev_amount);
        obj[month] = String(new_amount);
      } else {
        obj[month] = amount;
      }
    });

    for (const key in obj) {
      result[key] = Number(obj[key]);
    }
    return result;
  }
};
