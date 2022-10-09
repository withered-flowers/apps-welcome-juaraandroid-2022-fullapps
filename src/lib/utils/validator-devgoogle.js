import dayjs from "dayjs";

import { LIST_OF_BADGE, DATE_RANGE, TIERS } from "$lib/configs/config";

export const isValidBadgeName = (badgeName) => {
  let bValid = false;

  // Check if the Badge is valid
  LIST_OF_BADGE.forEach((badge) => {
    if (badge.toLowerCase() === badgeName.toLowerCase()) {
      bValid = true;
    }
  });

  return bValid;
};

export const isValidQuestDate = (badgeDate) => {
  let bValid = false;

  // Compare with start date
  // cannot be before start date
  // invalid if under 0
  const diffMin = dayjs(badgeDate, "Asia/Jakarta").diff(
    dayjs(DATE_RANGE[0], "Asia/Jakarta"),
    "d"
  );

  // Compare with finish date
  // cannot be after finish date
  // invalid if over 0
  const diffMax = dayjs(badgeDate, "Asia/Jakarta").diff(
    dayjs(DATE_RANGE[1], "Asia/Jakarta"),
    "d"
  );

  if (diffMin >= 0 && diffMax <= 0) {
    bValid = true;
  }

  return bValid;
};

export const filterBadge = async (nodeList) => {
  // Fetch all the badge and make it into and object with
  // badgeName and badgeDateOfCompletion
  const allBadge = await Promise.all(
    nodeList.map(async (el) => {
      const badgeTitleElement = await el.$(".badge-meta > .badge-title");
      const badgeDateElement = await el.$(".badge-meta > .badge-date");

      const badgeTitle = await badgeTitleElement.evaluate(
        (el) => el.textContent
      );
      const badgeDate = await badgeDateElement.evaluate((el) => el.textContent);

      return {
        badgeName: badgeTitle,
        badgeDateOfCompletion: badgeDate,
      };
    })
  );

  // Filter the badge to show only counted for the event
  const filteredBadge = allBadge.filter((eachBadge) => {
    return (
      isValidBadgeName(eachBadge.badgeName) &&
      isValidQuestDate(eachBadge.badgeDateOfCompletion)
    );
  });

  return filteredBadge;
};

export const fetchProfileName = async (page) => {
  // let startTime = performance.now();
  await page.waitForSelector(".profile-name", {
    // idleTime: 2000,
    // timeout: 5000,
  });
  // let endTime = performance.now();
  // console.log("waitForSelector", endTime - startTime);

  let elementProfileName = await page.$(".profile-name > h2");
  let valueProfileName = await elementProfileName.evaluate(
    (el) => el.textContent
  );

  return valueProfileName;
};

export const fetchNodeList = async (page) => {
  await page.waitForSelector("#all-profile-badges-container", {
    // idleTime: 2000,
    // timeout: 30000,
  });

  let elementNodeList = await page.$$(
    "#all-profile-badges-container > div.badge"
  );

  return elementNodeList;
};

export const calculateTiers = (validBadges) => {
  const total = validBadges.length;
  let tiers = -1;

  TIERS.forEach((minBadge, index) => {
    if (total == minBadge) {
      tiers = index + 1;
    }
  });

  return tiers;
};
