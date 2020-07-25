/// <reference types="node" />
import { EventEmitter } from 'events';
import { Options } from 'ora';

export class MyEventEmitter extends EventEmitter {}
export type O = Options;
