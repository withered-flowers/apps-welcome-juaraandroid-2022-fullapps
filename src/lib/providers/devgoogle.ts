import chromium from "chrome-aws-lambda";
import playwright from "playwright";

import {
  fetchProfileName,
  fetchNodeList,
  filterBadge,
  calculateTiers,
} from "$lib/utils/validator-devgoogle.js";

export const fetchDataAsJson = async (devGoogleUrl) => {
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  // split devGoogleUrl by http or https
  let modifiedUrl =
    devGoogleUrl.split("//").length > 1
      ? devGoogleUrl
      : `https://${devGoogleUrl}`;

  const page = await browser.newPage();
  await page.goto(modifiedUrl);

  // let startTime = performance.now();
  const profileName = await fetchProfileName(page);
  // let endTime = performance.now();
  // console.log("Fetch Profile Name", endTime - startTime);

  // startTime = performance.now();
  const nodeList = await fetchNodeList(page);
  // endTime = performance.now();
  // console.log("Fetch Node List", endTime - startTime);

  // startTime = performance.now();
  const validBadges = await filterBadge(nodeList);
  // endTime = performance.now();
  // console.log("Filter Badges", endTime - startTime);

  const tiers = calculateTiers(validBadges);

  // Finalize all
  await browser.close();

  return {
    profileName: profileName,
    tiers,
    validBadges: validBadges.length,
    detailValidBadges: validBadges,
  };
};
