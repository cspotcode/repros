/// <reference types="node" />
import { EventEmitter } from 'events';

export class MyEventEmitter extends EventEmitter {}

// BELOW THIS LINE CAN BE IGNORED; IS FOR ANOTHER REPRODUCTION

// import * as ora from "ora";
// export const progressSpinner: ora.Ora;

// import Liftoff = require("liftoff");

// export const ExportedValue: Liftoff;
// export type ExportedType = Liftoff.Options;
