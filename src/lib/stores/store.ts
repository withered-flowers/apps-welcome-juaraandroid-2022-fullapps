import dayjs from "dayjs";
import { writable } from "svelte/store";
import { eventTimeStart, eventTimeEnd } from "$lib/configs/config";

export const isEventStarted = writable(false);
export const isEventEnded = writable(false);

export const checkEventStarted = () => {
  let currentTime: number = dayjs().valueOf();
  let eventStart: number = dayjs(eventTimeStart).valueOf();

  isEventStarted.update(() => currentTime >= eventStart);
};

export const checkEventEnded = () => {
  let currentTime: number = dayjs().valueOf();
  let eventEnd: number = dayjs(eventTimeEnd).valueOf();

  isEventEnded.update(() => currentTime >= eventEnd);
};
