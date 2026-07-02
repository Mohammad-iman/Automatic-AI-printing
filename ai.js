// const axios = require("axios");

// async function askAI(message) {
//   const response = await axios.post(
//     "http://localhost:11434/api/generate",
//     {
//       model: "qwen2.5:3b",
//       prompt: message,
//       stream: false
//     }
//   );

//   console.log(response.data.response);
// }

// askAI("سلام");

// درخواست کامل شده که باید هوش مصنوعی بو محدود به بر گردوندن یک جی سان کنیم

const axios = require("axios");

async function askAI(userText) {

const prompt = `
تو یک اپراتور چاپ هستی.

فقط JSON برگردان.

فرمت:

{
  "action":"print",
  "copies":1,
  "duplex":false,
  "color":false,
  "paper":"A4",
  "pages":"all",
  "orientation":"portrait"
}

در پاسخ هیچ متن اضافی ننویس.

و اگر کاربر همه مقدار ها رو بهت نداد مقدار های پیش فرض رو در نظر بگیر
مقدار های پیش فرض: 

{
  "action":"print",
  "copies":1,
  "duplex":false,
  "color":false,
  "paper":"A4",
  "pages":"all",
  "orientation":"portrait"
}

اگر هم کاربر گفت که مثلا "پشت و رو رنگی لطفا" یا "میخوام پشت و رو باشه و رنگی " و از اینجور درخواست ها پس منظورش این مقادیر "duplex":true,"color":true, در کنار مقادیر قبلی هست

درخواست کاربر:

${userText}
`;

const response = await axios.post(
  "http://localhost:11434/api/generate",
  {
    model: "qwen2.5:3b",
    prompt,
    stream:false
  }
);

// console.log(response.data.response);
const aiResponse = response.data.response;
const settings = aiResponse;
console.log(settings)
return settings;

// if(settings.copies > 10)
// {
//    settings.copies = 2;
// }

// if(settings.paper !== "A4")
// {
//    settings.paper = "A4";
// }

}


module.exports = {
  askAI
};
// askAI("میخوام فایلم پشت و رو باشه رنگی نباشه");