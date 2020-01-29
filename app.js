process.chdir(__dirname);
const package_info = require("./package.json");
var software = package_info.name + " (V " + package_info.version + ")";
console.log(software);
console.log("===");
console.log();

/* PM 2 Init */ {
  // https://pm2.keymetrics.io/docs/usage/pm2-api/
  const pm2 = require("pm2");
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    pm2.list(function(err, processDescriptionList) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      dataToFile(processDescriptionList, "pm2_processDescription");
      console.log(processDescriptionList);
    });
  });
}

/* Helper Functions */ {
  function dataToFile(data, filename) {
    const fs = require("fs");
    fs.writeFileSync(__dirname + "/temp/" + filename + ".json", JSON.stringify(data, null, 2));
  }
}
