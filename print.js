// این قسمت از کد برای شناخت پرینتر ها هست
// const { getPrinters } = require("pdf-to-printer");

// async function listPrinters() {
//   const printers = await getPrinters();
//   console.log(printers);
// }

// listPrinters();


// این قسمت از کد برای ارسال یک فایل پی دی اف به پرینتر برای چاپ هست
const {askAI} = require('./ai.js');
const express = require("express");
const { print } = require("pdf-to-printer");
const cors = require("cors");
// console.log(settings)

const app = express();
app.use(express.json());
app.use(cors());

const fs = require("fs");
const path = require("path");

function getLastFile() {

  const folder =
    "./uploads";

  const files =
    fs.readdirSync(folder);

  if(files.length === 0){
    return null;
  }

  // مرتب سازی بر اساس زمان
  const sortedFiles =
    files.sort((a,b)=>{

      const aTime =
        fs.statSync(
          path.join(folder,a)
        ).mtime.getTime();

      const bTime =
        fs.statSync(
          path.join(folder,b)
        ).mtime.getTime();

      return bTime - aTime;

    });

  return path.join(
    folder,
    sortedFiles[0]
  );

}

app.post('/print', async (req,res) => {
    console.log(req.body.message);
    const AIPrompt = req.body.message;
    // const lastFile = getLastFile();
    const settings = await askAI(AIPrompt);
    console.log(settings);
    // await getSettings(req.body.message);
        res.status(200).json({
            success : true,
            settings,
        })
})

app.post('/confirm-print', async (req,res) => {
    const lastFile = getLastFile();
    const settings = req.body.settings;
    console.log(settings);
    await print(lastFile, {
        printer:
        "Microsoft Print to PDF",
    //"TOSHIBA e-STUDIO"

    copies:
    settings.copies,

    monochrome:
    !settings.color,

    side:
    settings.duplex
    ? "duplexlong"
    : "simplex",

    paperSize:
    settings.paper,

    orientation:
    settings.orientation,

    pages:
    settings.pages

    });
    res.json({
      status : 'فایل چاپ شد!',
      success : true
    })
})



app.listen(8080, "0.0.0.0" , () => {
  console.log("Print started");
});
// module.exports = {
//     printFile
// };