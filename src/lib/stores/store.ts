import dayjs from "dayjs";
import { writable } from "svelte/store";
import { eventTimeStart, eventTimeEnd } from "$lib/configs/config";

export const isEventStarted = writable(false);
export const isEventEnded = writable(false);

export const checkEventStarted = () => {
  const currentTime: number = dayjs().valueOf();
  const eventStart: number = dayjs(eventTimeStart).valueOf();

  isEventStarted.update(() => currentTime >= eventStart);
};

export const checkEventEnded = () => {
  const currentTime: number = dayjs().valueOf();
  const eventEnd: number = dayjs(eventTimeEnd).valueOf();

  isEventEnded.update(() => currentTime >= eventEnd);
};
